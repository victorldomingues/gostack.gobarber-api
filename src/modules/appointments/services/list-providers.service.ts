import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/i-users.repository';
import User from '@modules/users/infra/typeorm/entities/user';
interface Request {
    userId: string;
}

@injectable()
class ListProvidersService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository) { }

    async execute({ userId }: Request): Promise<User[]> {

        const providers = await this.usersRepository.findAllProviders({
            exceptUserId: userId
        });

        return providers;

    }

}

export default ListProvidersService;