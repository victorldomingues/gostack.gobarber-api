import "reflect-metadata"
import FakeUsersRepository from '../repositories/fakes/fake-users.repository';
import FakeHashProvider from "../providers/HashProvider/fakes/fake-hash.provider";
import ResetPasswordService from "./reset-password.service";
import FakeUserTokensRepository from "../repositories/fakes/fake-user-tokens.repository";
import AppError from "@shared/errors/AppError";

describe('ResetPassword', () => {

    let usersRepository: FakeUsersRepository;
    let userTokensRepository: FakeUserTokensRepository;
    let hashProvider: FakeHashProvider;
    let service: ResetPasswordService;

    beforeEach(() => {
        usersRepository = new FakeUsersRepository();
        userTokensRepository = new FakeUserTokensRepository();
        hashProvider = new FakeHashProvider();
        service = new ResetPasswordService(usersRepository, hashProvider, userTokensRepository);
    });

    it('should be able to reset password', async () => {

        const user = await usersRepository.create({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678'
        });
        const generate = jest.spyOn(hashProvider, 'generate');
        const { token } = await userTokensRepository.generate(user.id);
        await service.execute({ password: 'teste123123', token });
        const updatedUser = await usersRepository.findById(user.id);
        const hashedPasswrod = await hashProvider.generate('teste123123');
        await expect(generate).toHaveBeenCalledWith('teste123123');
        expect(updatedUser?.password).toBe(hashedPasswrod);
    });

    it('should be not able to reset password with non-existing token', async () => {

        const user = await usersRepository.create({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678'
        });

        const { token } = await userTokensRepository.generate(user.id);
        await expect(service.execute({ password: 'teste123123', token: 'x.y.z' })).rejects.toBeInstanceOf(AppError)
    });

    it('should be not able to reset password if passed more than 2 hours', async () => {

        const user = await usersRepository.create({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678'
        });
        const { token } = await userTokensRepository.generate(user.id);
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        });
        await expect(service.execute({ password: 'teste123123', token })).rejects.toBeInstanceOf(AppError)
    });


    it('should be not able to reset password if user does not exists', async () => {

        const user = await usersRepository.create({
            name: 'Joe No Arms',
            email: 'teste@teste.com.br',
            password: '12345678'
        });

        const { token } = await userTokensRepository.generate('not-exist-user');

        await expect(service.execute({ password: 'teste123123', token })).rejects.toBeInstanceOf(AppError)
    });

});

