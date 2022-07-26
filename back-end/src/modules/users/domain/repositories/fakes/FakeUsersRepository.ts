import { v4 as uuidv4 } from 'uuid';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { IUser } from '../../models/IUser';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    corporate_name,
    fantasy_name,
    cnpj,
    email,
    state_registration,
    address,
    password,
  }: ICreateUser): Promise<User> {
    const user = new User();

    user.id = uuidv4();
    user.corporate_name = corporate_name;
    user.fantasy_name = fantasy_name;
    user.state_registration = state_registration;
    user.cnpj = cnpj;
    user.address = address;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  // public async remove(user: User): Promise<void> {}

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  public async findByCorporateName(
    corporate_name: string,
  ): Promise<IUser | undefined> {
    const user = this.users.find(
      user => user.corporate_name === corporate_name,
    );
    return user;
  }

  public async findByCnpj(cnpj: number): Promise<IUser | undefined> {
    const user = this.users.find(user => user.cnpj === cnpj);
    return user;
  }

  public async findByStateRegistration(
    state_registration: number,
  ): Promise<IUser | undefined> {
    const user = this.users.find(
      user => user.state_registration === state_registration,
    );
    return user;
  }

  public async findByFantasyName(
    fantasy_name: string,
  ): Promise<IUser | undefined> {
    const user = this.users.find(user => user.fantasy_name === fantasy_name);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  public async findByAddress(address: string): Promise<IUser | undefined> {
    const user = this.users.find(user => user.address === address);
    return user;
  }
}

export default FakeUsersRepository;
