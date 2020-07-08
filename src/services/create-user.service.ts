import { getCustomRepository } from 'typeorm';
import User from '../models/user';
import UsersRepository from '../repositories/users.repository';
import hashService from './hash.service';
import AppError from '../errors/AppError';
interface Request {
    name: string,
    email: string,
    password: string
}

class CreateUserService {
    async execute({ name, email, password }: Request): Promise<User> {

        const usersRepository = getCustomRepository(UsersRepository);
        let user = await usersRepository.findByEmail(email);

        if (user)
            throw new AppError('This user e-mail is already exists', 401);

        const hashedPassword = await hashService.encrypt(password);

        user = usersRepository.create({ name, password: hashedPassword, email });

        await usersRepository.save(user);

        delete user.password;

        return user;

    }
}


export default CreateUserService;