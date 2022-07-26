import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      corporate_name: 'César Augusto Souza',
      fantasy_name: 'Transportes Cézar',
      cnpj: 87944392000125,
      email: 'teste@teste.com',
      state_registration: 23158094,
      address: 'Av. Farroupilha, 4545 - Mal. Rondon, Canoas - RS, 92020-475',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      corporate_name: 'César Augusto Souza',
      fantasy_name: 'Transportes Cézar',
      cnpj: 87944392000125,
      email: 'teste@teste.com',
      state_registration: 23158094,
      address: 'Av. Farroupilha, 4545 - Mal. Rondon, Canoas - RS, 92020-475',
      password: '123456',
    });

    expect(
      createUser.execute({
        corporate_name: 'César Augusto Souza',
        fantasy_name: 'Transportes Cézar',
        cnpj: 87944392000125,
        email: 'teste@teste.com',
        state_registration: 23158094,
        address: 'Av. Farroupilha, 4545 - Mal. Rondon, Canoas - RS, 92020-475',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
