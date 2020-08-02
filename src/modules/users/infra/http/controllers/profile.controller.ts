import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateProfileService from "@modules/users/services/update-profile.service";
import ShowProfileService from "@modules/users/services/show-profile.service";


export default class ProfileController {

    async show(request: Request, response: Response): Promise<Response> {
        const userId = request.user.id;
        const showProfileService = container.resolve(ShowProfileService);
        try {
            const user = await showProfileService.execute({ userId });
            return response.json(user);
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }
    }
    async update(request: Request, response: Response): Promise<Response> {
        try {
            const userId = request.user.id;
            const { name, email, password } = request.body;
            const updateProfileService = container.resolve(UpdateProfileService);
            const user = await updateProfileService.execute({ name, email, password, userId });
            return response.json(user);
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }
    }
}