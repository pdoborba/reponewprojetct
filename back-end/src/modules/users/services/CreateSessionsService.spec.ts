import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsService from './CreateSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let fakeHashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      corporate_name: 'César Algusto Souza',
      fantasy_name: 'Transporte Cézar',
      cnpj: 87944392000125,
      email: 'teste@teste.com',
      state_registration: 23158094,
      address: 'Av. Farroupilha, 4545 - Mal. Rondon, Canoas - RS, 92020-475',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existent user', async () => {
    expect(
      createSession.execute({
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    expect(
      createSession.execute({
        email: 'teste@teste.com',
        password: '567890',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
