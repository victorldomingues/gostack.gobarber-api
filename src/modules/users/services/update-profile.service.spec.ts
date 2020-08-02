import "reflect-metadata"
import AppError from "@shared/errors/AppError";
import FakeUsersRepository from '../repositories/fakes/fake-users.repository';
import FakeHashProvider from "../providers/HashProvider/fakes/fake-hash.provider";
import UpdateProfileService from "./update-profile.service";
describe('UpdateProfile', () => {

    let repository: FakeUsersRepository;
    let hashProvider: FakeHashProvider;
    let service: UpdateProfileService;

    beforeEach(() => {
        repository = new FakeUsersRepository();
        hashProvider = new FakeHashProvider();
        service = new UpdateProfileService(repository, hashProvider);
    });

    it('should be able to update user profile data', async () => {

        const generate = jest.spyOn(hashProvider, 'generate');

        const user = await repository.create({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678123'
        });

        const updatedUser = await service.execute({
            userId: user.id,
            name: 'Joe No Arms 2',
            email: 'teste2@teste.com.br',
            password: 'senha123',
            oldPassword: '12345678'
        });

        expect(updatedUser.email).toBe('teste2@teste.com.br');
        expect(updatedUser.name).toBe('Joe No Arms 2');
        await expect(generate).toHaveBeenCalled();
    });

    it('should not be able to update user profile with another used e-mail', async () => {

        const generate = jest.spyOn(hashProvider, 'generate');

        const user = await repository.create({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678123'
        });

        const user2 = await repository.create({
            name: 'Joe No Arms 2',
            email: 'teste2@teste.com.br',
            password: '12345678123'
        });

        await expect(service.execute({
            userId: user2.id,
            name: 'Joe No Arms 3',
            email: 'teste@teste.com.br',
            password: 'senha123',
            oldPassword: '12345678'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to update user profile data with user not found', async () => {

        const generate = jest.spyOn(hashProvider, 'generate');

        const user = await repository.create({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678123'
        });

        await expect(service.execute({
            userId: 'not-found-id',
            name: 'Joe No Arms 3',
            email: 'teste@teste.com.br',
            password: 'senha123',
            oldPassword: '12345678'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to update user profile password with old password invalid', async () => {

        const generate = jest.spyOn(hashProvider, 'generate');

        const user = await repository.create({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678123'
        });

        await expect(service.execute({
            userId: 'not-found-id',
            name: 'Joe No Arms 2',
            email: 'teste2@teste.com.br',
            password: 'senha123',
            oldPassword: 'invalid-old-password'
        })).rejects.toBeInstanceOf(AppError);

        await expect(service.execute({
            userId: 'not-found-id',
            name: 'Joe No Arms 2',
            email: 'teste2@teste.com.br',
            password: 'senha123'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should be able to update user profile with not send password', async () => {

        const user = await repository.create({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678123'
        });

        const updatedUser = await service.execute({
            userId: user.id,
            name: 'Joe No Arms 2',
            email: 'teste2@teste.com.br'
        });

        expect(updatedUser.email).toBe('teste2@teste.com.br');
        expect(updatedUser.name).toBe('Joe No Arms 2');

    });

});

