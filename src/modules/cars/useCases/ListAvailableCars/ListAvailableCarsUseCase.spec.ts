import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Available Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Fiat',
      description: 'asdfasdf',
      daily_rate: 100,
      license_plate: 'asdf',
      fine_amount: 60,
      brand: 'asdf',
      category_id: 'category',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Fiat',
      description: 'asdfasdf',
      daily_rate: 100,
      license_plate: 'asdf',
      fine_amount: 60,
      brand: 'teste_brand',
      category_id: 'category',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'teste_brand',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Fiat',
      description: 'asdfasdf',
      daily_rate: 100,
      license_plate: 'asdf',
      fine_amount: 60,
      brand: 'teste_brand',
      category_id: 'category',
    });

    const cars = await listCarsUseCase.execute({
      name: 'Fiat',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Fiat',
      description: 'asdfasdf',
      daily_rate: 100,
      license_plate: 'asdf',
      fine_amount: 60,
      brand: 'teste_brand',
      category_id: 'category',
    });

    const cars = await listCarsUseCase.execute({
      category_id: 'category',
    });

    expect(cars).toEqual([car]);
  });
});
