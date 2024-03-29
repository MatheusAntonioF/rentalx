import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository') private carsRepository: ICarsRepository
  ) {}

  async execute(data: IRequest): Promise<Rental> {
    const minimumHour = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      data.car_id
    );

    if (carUnavailable) throw new AppError('Car is unavailable');

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      data.user_id
    );

    if (rentalOpenToUser)
      throw new AppError('There is a rental in progress for user');

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      data.expected_return_date
    );

    if (compare < minimumHour) throw new AppError('Invalid return time');

    const rental = await this.rentalsRepository.create({
      user_id: data.user_id,
      car_id: data.car_id,
      expected_return_date: data.expected_return_date,
    });

    await this.carsRepository.updateAvailable(data.car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
