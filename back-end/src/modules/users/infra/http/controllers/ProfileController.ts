import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);
    const user_id = request.user.id;

    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      corporate_name,
      fantasy_name,
      cnpj,
      email,
      state_registration,
      address,
      password,
      old_password,
    } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      corporate_name,
      fantasy_name,
      cnpj,
      email,
      state_registration,
      address,
      password,
      old_password,
    });

    return response.json(classToClass(user));
  }
}
