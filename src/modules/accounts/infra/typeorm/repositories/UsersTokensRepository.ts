import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '../../../dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '../../../repositories/IUsersTokensRepository';
import { UserTokens } from '../entities/UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserTokens> {
    return this.repository.findOne({
      where: {
        user_id,
        refresh_token: token,
      },
    });
  }

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create(data);

    await this.repository.save(userToken);

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository };
