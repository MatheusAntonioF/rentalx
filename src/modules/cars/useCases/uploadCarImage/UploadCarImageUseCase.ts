import { inject, injectable } from 'tsyringe';

import { ICarsImageRepository } from '../../repositories/ICarsImagesRepository';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImageRepository
  ) {}

  async execute(data: IRequest): Promise<void> {
    data.images_name.map(async (image) => {
      await this.carsImagesRepository.create(data.car_id, image);
    });
  }
}

export { UploadCarImageUseCase };
