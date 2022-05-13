import { CarImages } from '../infra/typeorm/entities/CarImage';

interface ICarsImageRepository {
  create(car_id: string, image_name: string): Promise<CarImages>;
}

export { ICarsImageRepository };
