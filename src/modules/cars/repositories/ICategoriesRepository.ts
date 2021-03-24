import { Category } from '../model/Category';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create(data: ICreateCategoryDTO): void;
}

export { ICategoriesRepository };
