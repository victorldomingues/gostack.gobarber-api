import "reflect-metadata"
import AppError from "@shared/errors/AppError";
import FakeUsersRepository from '../repositories/fakes/fake-users.repository';
import FakeStorageProvider from "@shared/providers/StorageProvider/fakes/fake-storage.provider";
import UpdateUserAvartarService from "./update-user-avatar.service";
describe('UpdateUserAvatar', () => {

    let userRepository: FakeUsersRepository;
    let provider: FakeStorageProvider;
    let service: UpdateUserAvartarService;

    beforeEach(() => {
        userRepository = new FakeUsersRepository();
        provider = new FakeStorageProvider();
        service = new UpdateUserAvartarService(userRepository, provider);
    });

    it('should be able to upload avatar', async () => {

        const user = await userRepository.create({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678'
        });
        await service.execute({ avatarFilename: 'avatar.jpg', userId: user.id });
        expect(user.avatar).toBe('avatar.jpg');

    });

    it('should not be able to upload avatar from non existent user', async () => {
        const provider = new FakeStorageProvider();
        const userRepository = new FakeUsersRepository();

        const service = new UpdateUserAvartarService(userRepository, provider);
        const user = await userRepository.create({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678'
        });
        await expect(service.execute({ avatarFilename: 'avatar.jpg', userId: 'non-user' })).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating a new avatar', async () => {
        const userRepository = new FakeUsersRepository();
        const provider = new FakeStorageProvider();

        // fica espiando a função
        const deleteFile = jest.spyOn(provider, 'deleteFile');

        const service = new UpdateUserAvartarService(userRepository, provider);
        const user = await userRepository.create({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678'
        });
        await service.execute({ avatarFilename: 'avatar.jpg', userId: user.id });
        await service.execute({ avatarFilename: 'avatar2.jpg', userId: user.id });

        // verifica se funcao foi chamada
        await expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

        expect(user.avatar).toBe('avatar2.jpg');
    });

});

