import "reflect-metadata"

import AppError from "@shared/errors/AppError";
import CreateUserService from "./create-user.service";
import FakeUsersRepository from '../repositories/fakes/fake-users.repository';
import AuthenticateUserService from "./authenticate-user.service";
import FakeHashProvider from "../providers/HashProvider/fakes/fake-hash.provider";

describe('CreateUser', () => {

    let repository: FakeUsersRepository;
    let hashProvider: FakeHashProvider;
    let service: AuthenticateUserService;
    let userService: CreateUserService;

    beforeEach(() => {
        repository = new FakeUsersRepository();
        hashProvider = new FakeHashProvider();
        service = new AuthenticateUserService(repository, hashProvider);
        userService = new CreateUserService(repository, hashProvider);
    });

    it('should be able to authenticate', async () => {

        const user = await userService.execute({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678'
        });
        const reponse = await service.execute({
            email: 'teste@teste.com.br',
            password: '12345678'
        });
        expect(reponse).toHaveProperty('token')
        expect(reponse.user.email).toBe('teste@teste.com.br');
    });

    it('should not be able to authenticate with non existing user', async () => {

        await expect(service.execute({
            email: 'teste@teste.com.br',
            password: '12345678'
        })).rejects.toBeInstanceOf(AppError)
    });


    it('should not be able to authenticate with wrong password', async () => {
        const user = await userService.execute({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678'
        });

        await expect(service.execute({
            email: 'teste@teste.com.br',
            password: 'senha-errada'
        })).rejects.toBeInstanceOf(AppError)
    });


});