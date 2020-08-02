import User from '../infra/typeorm/entities/user';

import IUsersRepository from '../repositories/i-users.repository';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/hash-provider.model';
import IUserTokensRepository from '../repositories/i-user-tokens.repository';
import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';

interface Request {
    token: string;
    password: string
}

@injectable()
class ResetPasswordService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

    ) { }

    async execute({ token, password }: Request): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists')
        }

        const tokenCreatedAt = userToken.createdAt;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired')
        }

        const user = await this.usersRepository.findById(userToken.userId);

        if (!user) {
            throw new AppError('User does not exists');
        }

        user.password = await this.hashProvider.generate(password);

        await this.usersRepository.save(user);

    }
}

export default ResetPasswordService;