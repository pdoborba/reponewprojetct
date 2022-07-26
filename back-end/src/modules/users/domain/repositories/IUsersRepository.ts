import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
  findAll(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | undefined>;
  findByCorporateName(corporate_name: string): Promise<IUser | undefined>;
  findByFantasyName(fantasy_name: string): Promise<IUser | undefined>;
  findByCnpj(cnpj: number): Promise<IUser | undefined>;
  findByStateRegistration(
    state_registration: number,
  ): Promise<IUser | undefined>;
  findByAddress(address: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
