import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateUserAvartarService from "@modules/users/services/update-user-avatar.service";

export default class UserAvatarController {
    async update(request: Request, response: Response): Promise<Response> {
        const updateUserAvatarService = container.resolve(UpdateUserAvartarService);
        const user = await updateUserAvatarService.execute({ userId: request.user.id, avatarFilename: request.file.filename });
        delete user.password;
        return response.json(user);
    }
}