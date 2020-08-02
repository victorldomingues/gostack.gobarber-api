import UsersRepository from "../../typeorm/repositories/users.repository";
import { container } from "tsyringe";
import { Response, Request } from "express";
import SendForgotPasswordEmailService from "@modules/users/services/send-forgot-password-email-service";
import EtherealMailProdiver from "@shared/providers/MailProvider/implementations/ethereal-mail.provider";
import UserTokensRepository from "../../typeorm/repositories/user-tokens.repository";

export default class ForgotPasswordController {
    async create(request: Request, response: Response): Promise<Response> {

        const usersRepository = container.resolve(UsersRepository);
        const mailProvider = container.resolve(EtherealMailProdiver);
        const userTokensRepository = container.resolve(UserTokensRepository);
        const { email } = request.body;
        const service = new SendForgotPasswordEmailService(usersRepository, mailProvider, userTokensRepository);
        await service.execute({ email });
        return response.status(204).json();

    }
}