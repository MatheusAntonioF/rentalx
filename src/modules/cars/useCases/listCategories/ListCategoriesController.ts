import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const all = await container.resolve(ListCategoriesUseCase).execute();

    return response.json(all);
  }
}

export { ListCategoriesController };
