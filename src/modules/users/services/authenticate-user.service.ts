import jwtService from './jwt.service';
import User from '../infra/typeorm/entities/user';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/i-users.repository';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/hash-provider.model';

interface IRequest {
    email: string,
    password: string
}
interface IResponse {
    user: User,
    token: string
}

@injectable()
class AuthenticateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {

        let user = await this.usersRepository.findByEmail(email);

        if (!user) throw new AppError('Incorrect email/password combination.', 401);

        const passwordMatched = await this.hashProvider.compare(password, user.password);

        if (!passwordMatched) throw new AppError('Incorrect email/password combination.', 401);

        const token = jwtService.createToken(user);

        const responseUser = Object.assign({}, user);

        delete responseUser.password;

        return {
            user: responseUser,
            token
        };

    }
}


export default AuthenticateUserService;