import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '../../../../shared/container/providers/StorageProvider/IStorageProvider';
import { ICarsImageRepository } from '../../repositories/ICarsImagesRepository';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImageRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider
  ) {}

  async execute(data: IRequest): Promise<void> {
    data.images_name.map(async (image) => {
      await this.carsImagesRepository.create(data.car_id, image);

      await this.storageProvider.save(image, 'cars');
    });
  }
}

export { UploadCarImageUseCase };
