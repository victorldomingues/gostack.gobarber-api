import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "@modules/users/services/create-user.service";

export default class UsersController {
    async create(request: Request, response: Response): Promise<Response> {
        try {
            const { name, email, password } = request.body;
            const crateUserService = container.resolve(CreateUserService);
            const user = await crateUserService.execute({ name, email, password });
            return response.json(user);
        } catch (err) {
            return response.status(400).json({ error: err.message })
        }
    }
}