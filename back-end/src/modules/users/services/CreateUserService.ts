import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashPovider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    corporate_name,
    fantasy_name,
    cnpj,
    email,
    address,
    state_registration,
    password,
  }: ICreateUser): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      corporate_name,
      fantasy_name,
      cnpj,
      email,
      state_registration,
      address,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
