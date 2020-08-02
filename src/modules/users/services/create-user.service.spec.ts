import "reflect-metadata"
import AppError from "@shared/errors/AppError";
import CreateUserService from "./create-user.service";
import FakeUsersRepository from '../repositories/fakes/fake-users.repository';
import FakeHashProvider from "../providers/HashProvider/fakes/fake-hash.provider";
describe('AuthenticateUser', () => {


    let repository: FakeUsersRepository;
    let hashProvider: FakeHashProvider;
    let service: CreateUserService;

    beforeEach(() => {
        repository = new FakeUsersRepository();
        hashProvider = new FakeHashProvider();
        service = new CreateUserService(repository, hashProvider);
    });

    it('should be able to create  a new user', async () => {

        const user = await service.execute({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678'
        });
        expect(user).toHaveProperty('id');
        expect(user.name).toBe('Joe No Arms');
        expect(user.email).toBe('teste@teste.com.br');
    });
    it('should not be able to create two users on the same email', async () => {
        const user = await service.execute({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678'
        });

        // esperar que a operação seja rejeitada, lance uma exceção do tipo AppError
        await expect(service.execute({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678'
        })).rejects.toBeInstanceOf(AppError);
    });
});

