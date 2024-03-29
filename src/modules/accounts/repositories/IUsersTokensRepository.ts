import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(token: string): Promise<UserTokens>;
}

export { IUsersTokensRepository };
