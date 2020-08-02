import "reflect-metadata"
import AppError from "@shared/errors/AppError";
import ListProvidersService from "./list-providers.service";
import FakeUsersRepository from "@modules/users/repositories/fakes/fake-users.repository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/fake-hash.provider";
import FindAllProvidersDto from "@modules/users/dtos/find-all-providers.dto";

describe('ShowProfile', () => {

    let repository: FakeUsersRepository;
    let hashProvider: FakeHashProvider;
    let service: ListProvidersService;

    beforeEach(() => {
        repository = new FakeUsersRepository();
        hashProvider = new FakeHashProvider();
        service = new ListProvidersService(repository);
    });

    it('should be able to list all providers', async () => {
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
        const user3 = await repository.create({
            name: 'Joe No Arms 3',
            email: 'teste3@teste.com.br',
            password: '12345678123'
        });
        const user4 = await repository.create({
            name: 'Joe No Arms 4',
            email: 'teste4@teste.com.br',
            password: '12345678123'
        });

        const providers = await service.execute({ userId: user.id });

        const existUserId1 = providers.includes(user);

        expect(providers.length).toBe(3);
        expect(existUserId1).toBe(false);

    });



});