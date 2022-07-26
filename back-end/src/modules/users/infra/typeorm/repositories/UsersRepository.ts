import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    corporate_name,
    fantasy_name,
    cnpj,
    email,
    state_registration,
    address,
    password,
  }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({
      corporate_name,
      fantasy_name,
      cnpj,
      email,
      state_registration,
      address,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByCorporateName(
    corporate_name: string,
  ): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        corporate_name,
      },
    });

    return user;
  }

  public async findByCnpj(cnpj: number): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        cnpj,
      },
    });

    return user;
  }

  public async findByFantasyName(
    fantasy_name: string,
  ): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        fantasy_name,
      },
    });

    return user;
  }

  public async findByStateRegistration(
    state_registration: number,
  ): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        state_registration,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async findByAddress(address: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        address,
      },
    });

    return user;
  }
}

export default UsersRepository;
