import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateUserService';
import ListUserService from '../../../services/ListUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute();

    return response.json(classToClass(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      corporate_name,
      fantasy_name,
      cnpj,
      email,
      address,
      state_registration,
      password,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      corporate_name,
      fantasy_name,
      cnpj,
      email,
      address,
      state_registration,
      password,
    });

    return response.json(classToClass(user));
  }
}
