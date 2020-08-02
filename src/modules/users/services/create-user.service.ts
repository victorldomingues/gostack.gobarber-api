import User from '../infra/typeorm/entities/user';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/i-users.repository';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/hash-provider.model';
interface Request {
    name: string,
    email: string,
    password: string
}

@injectable()
class CreateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider) { }

    async execute({ name, email, password }: Request): Promise<User> {

        let user = await this.usersRepository.findByEmail(email);

        if (user)
            throw new AppError('This user e-mail is already exists', 401);

        const hashedPassword = await this.hashProvider.generate(password);

        user = await this.usersRepository.create({ name, email, password: hashedPassword });

        const responseUser = Object.assign({}, user);

        delete responseUser.password;

        return responseUser;

    }

}

export default CreateUserService;