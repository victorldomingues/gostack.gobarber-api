import uploadConfig from '@config/upload';
import path from 'path';
import fs from 'fs';
import User from "../infra/typeorm/entities/user";
import IUsersRepository from "../repositories/i-users.repository";
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/providers/StorageProvider/models/storage-provider.model';
import AppError from '@shared/errors/AppError';

interface Request {
    userId: string,
    avatarFilename: string
}

@injectable()
class UpdateUserAvartarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider) { }

    async execute({ userId, avatarFilename }: Request): Promise<User> {

        const user = await this.usersRepository.findById(userId);

        if (!user) throw new AppError('Only authenticated users can change avatar.')

        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }

        const fileName = await this.storageProvider.saveFile(avatarFilename);
        user.avatar = fileName;
        await this.usersRepository.save(user);
        return user;
    }
}

export default UpdateUserAvartarService;