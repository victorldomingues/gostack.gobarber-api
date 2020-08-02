import "reflect-metadata"
import AppError from "@shared/errors/AppError";
import FakeUsersRepository from '../repositories/fakes/fake-users.repository';
import FakeHashProvider from "../providers/HashProvider/fakes/fake-hash.provider";
import ShowProfileService from "./show-profile.service";

describe('ShowProfile', () => {

    let repository: FakeUsersRepository;
    let hashProvider: FakeHashProvider;
    let service: ShowProfileService;

    beforeEach(() => {
        repository = new FakeUsersRepository();
        hashProvider = new FakeHashProvider();
        service = new ShowProfileService(repository);
    });

    it('should be able to show user profile', async () => {

        const generate = jest.spyOn(hashProvider, 'generate');

        const user = await repository.create({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678123'
        });

        const showUser = await service.execute({
            userId: user.id,
        });

        expect(showUser.email).toBe('teste@teste.com.br');
        expect(showUser.name).toBe('Joe No Arms');
    });


    it('should not be able to show user with not found id', async () => {

        const generate = jest.spyOn(hashProvider, 'generate');

        const user = await repository.create({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678123'
        });

        await expect(service.execute({
            userId: 'not-found-id',
        })).rejects.toBeInstanceOf(AppError)
    });

});