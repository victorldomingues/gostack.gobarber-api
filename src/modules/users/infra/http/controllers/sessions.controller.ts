import UsersRepository from "../../typeorm/repositories/users.repository";
import AuthenticateUserService from "@modules/users/services/authenticate-user.service";
import { Response, Request } from "express";
import { container } from "tsyringe";

export default class SessionsController {
    async create(request: Request, response: Response): Promise<Response> {

        const { email, password } = request.body;
        const service = container.resolve(AuthenticateUserService,);
        const { user, token } = await service.execute({ email, password });
        return response.json({ user, token });

    }
}