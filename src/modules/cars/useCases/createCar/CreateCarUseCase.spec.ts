import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('CreateCar', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Fiat',
      description: 'asdfasdf',
      daily_rate: 100,
      license_plate: 'asdf',
      fine_amount: 60,
      brand: 'asdf',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Fiat',
      description: 'asdfasdf',
      daily_rate: 100,
      license_plate: 'asdf',
      fine_amount: 60,
      brand: 'asdf',
      category_id: 'category',
    });

    await expect(
      createCarUseCase.execute({
        name: 'Fiat',
        description: 'asdfasdf',
        daily_rate: 100,
        license_plate: 'asdf',
        fine_amount: 60,
        brand: 'asdf',
        category_id: 'category',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Fiat',
      description: 'asdfasdf',
      daily_rate: 100,
      license_plate: 'asdf',
      fine_amount: 60,
      brand: 'asdf',
      category_id: 'category',
    });

    expect(car.available).toBeTruthy();
  });
});
