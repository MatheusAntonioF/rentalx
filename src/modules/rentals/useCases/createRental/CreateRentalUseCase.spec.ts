import dayjs from 'dayjs';

import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../../cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'teste',
      description: 'teste',
      daily_rate: 100,
      license_plate: 'teste',
      fine_amount: 340,
      category_id: 'teste',
      brand: 'teste',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '123123',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'teste',
      description: 'teste',
      daily_rate: 100,
      license_plate: 'teste',
      fine_amount: 340,
      category_id: 'teste',
      brand: 'teste',
    });

    const car1 = await carsRepositoryInMemory.create({
      name: 'teste',
      description: 'teste',
      daily_rate: 100,
      license_plate: 'teste',
      fine_amount: 340,
      category_id: 'teste',
      brand: 'teste',
    });

    const fakeUserId = 'testeUserId';

    await createRentalUseCase.execute({
      user_id: fakeUserId,
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: fakeUserId,
        car_id: car1.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'teste',
      description: 'teste',
      daily_rate: 100,
      license_plate: 'teste',
      fine_amount: 340,
      category_id: 'teste',
      brand: 'teste',
    });

    await createRentalUseCase.execute({
      user_id: 'xxxx',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: 'yyyy',
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: 'yyyy',
        car_id: 'test id',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
