import User from '../infra/typeorm/entities/user';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/i-users.repository';
import { injectable, inject } from 'tsyringe';
interface Request {
    userId: string;
}

@injectable()
class ShowProfileService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository) { }

    async execute({ userId }: Request): Promise<User> {

        const user = await this.usersRepository.findById(userId);

        if (!user)
            throw new AppError('User not found.');

        const responseUser = Object.assign({}, user);

        delete responseUser.password;

        return responseUser;

    }

}

export default ShowProfileService;