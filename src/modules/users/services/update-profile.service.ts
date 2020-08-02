import User from '../infra/typeorm/entities/user';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/i-users.repository';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/hash-provider.model';

interface Request {
    userId: string;
    name: string,
    email: string,
    oldPassword?: string,
    password?: string,
}

@injectable()
class UpdateProfileService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider) { }

    async execute({ name, email, password, oldPassword, userId }: Request): Promise<User> {

        let user = await this.usersRepository.findById(userId);

        if (!user)
            throw new AppError('User not found.');

        const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError('E-mail already in use.')
        }

        user.email = email;
        user.name = name;

        if (password && oldPassword) {

            const checkOldPassword = await this.hashProvider.compare(oldPassword, user.password);

            if (!checkOldPassword)
                throw new AppError('Old password invalid.');

            user.password = await this.hashProvider.generate(password);

        }

        this.usersRepository.save(user);

        const updatedUser = Object.assign({}, user);
        delete updatedUser.password;

        return updatedUser;

    }

}

export default UpdateProfileService;