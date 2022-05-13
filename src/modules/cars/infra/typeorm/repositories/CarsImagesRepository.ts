import { getRepository, Repository } from 'typeorm';

import { ICarsImageRepository } from '../../../repositories/ICarsImagesRepository';
import { CarImages } from '../entities/CarImage';

class CarsImagesRepository implements ICarsImageRepository {
  private repository: Repository<CarImages>;

  constructor() {
    this.repository = getRepository(CarImages);
  }

  async create(car_id: string, image_name: string): Promise<CarImages> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };
