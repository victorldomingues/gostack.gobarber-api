import "reflect-metadata";
import FakeUsersRepository from "../repositories/fakes/fake-users.repository";
import SendForgotPasswordEmailService from './send-forgot-password-email-service'
import FakeMailProdiver from "../../../shared/providers/MailProvider/fakes/fake-mail.provider";
import AppError from "@shared/errors/AppError";
import FakeUserTokensRepository from "../repositories/fakes/fake-user-tokens.repository";

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProdiver;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;
describe('SendForgotPasswordEmail', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProdiver();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        sendForgotPasswordEmailService = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
    });

    it('should be able to recover the password using the email', async () => {

        const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');
        await fakeUsersRepository.create({
            email: 'teste@teste.com',
            name: 'teste',
            password: '12345678'
        })
        await sendForgotPasswordEmailService.execute({
            email: 'teste@teste.com'
        });
        await expect(sendEmail).toHaveBeenCalled();
    });

    it('should be able to recover a non-existing user password', async () => {

        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        await fakeUsersRepository.create({
            email: 'teste@teste.com',
            name: 'teste',
            password: '12345678'
        });

        await sendForgotPasswordEmailService.execute({
            email: 'teste@teste.com'
        });

        await expect(generateToken).toHaveBeenCalled();
    });

    it('should generate a forgot password token', async () => {

        await fakeUsersRepository.create({
            email: 'teste@teste.com',
            name: 'teste',
            password: '12345678'
        })
        await expect(sendForgotPasswordEmailService.execute({
            email: 'teste@teste2.com'
        })).rejects.toBeInstanceOf(AppError);
    });

});