import { getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/users.repository";
import uploadConfig from '../config/upload';
import path from 'path';
import fs from 'fs';
import User from "../models/user";

interface Request {
    userId: string,
    avatarFilename: string
}
class UpdateUserAvartarService {
    async execute({ userId, avatarFilename }: Request): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findOne(userId);
        if (!user) throw new Error('Only authenticated users can change avatar.')

        if (user.avatar) {
            //deletar avatar anterior
            const userAvatarFilePath = path.resolve(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvartarService;