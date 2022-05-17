import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '../../../dtos/ICreateRentalDTO';
import { IRentalsRepository } from '../../../repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({ car_id });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({ user_id });
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    Object.assign(rental, data);

    await this.repository.save(rental);

    return rental;
  }
}

export { RentalsRepository };
