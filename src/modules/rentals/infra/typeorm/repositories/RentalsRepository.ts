import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '../../../dtos/ICreateRentalDTO';
import { IRentalsRepository } from '../../../repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOne(id);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { car_id, end_date: null } });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    Object.assign(rental, data);

    await this.repository.save(rental);

    return rental;
  }
}

export { RentalsRepository };
