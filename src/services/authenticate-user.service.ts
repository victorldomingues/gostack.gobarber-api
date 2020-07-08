import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/users.repository';
import hashService from './hash.service';
import User from '../models/user';
import jwtService from './jwt.service';
import AppError from '../errors/AppError';

interface Request {
    email: string,
    password: string
}
interface Response {
    user: User,
    token: string
}

class AuthenticateUserService {
    async execute({ email, password }: Request): Promise<Response> {

        const usersRepository = getCustomRepository(UsersRepository);

        let user = await usersRepository.findByEmail(email);

        if (!user) throw new AppError('Incorrect email/password combination.', 401);

        const passwordMatched = await hashService.compare(password, user.password);

        if (!passwordMatched) throw new AppError('Incorrect email/password combination.', 401);

        delete user.password;

        const token = jwtService.createToken(user);

        return {
            user,
            token
        };

    }
}


export default AuthenticateUserService;