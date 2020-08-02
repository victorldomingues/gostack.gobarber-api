import { Response, Request } from "express";
import ResetPasswordService from "@modules/users/services/reset-password.service";
import { container } from "tsyringe";

export default class ResetPasswordController {
    async create(request: Request, response: Response): Promise<Response> {

        const { token, password } = request.body;

        const service = container.resolve(
            ResetPasswordService,
        );

        await service.execute({ token, password });

        return response.status(204).json();

    }
}