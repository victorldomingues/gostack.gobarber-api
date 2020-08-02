import { Repository, getRepository, Not } from "typeorm";
import User from "../entities/user";
import IUsersRepository from "@modules/users/repositories/i-users.repository";
import { CreateUserDto } from "@modules/users/dtos/CreateUserDto";
import FindAllProvidersDto from "@modules/users/dtos/find-all-providers.dto";

class UsersRepository implements IUsersRepository {

    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    findAllProviders({ exceptUserId }: FindAllProvidersDto): Promise<User[]> {
        if (exceptUserId) {
            return this.ormRepository.find({
                where: {
                    id: Not(exceptUserId)
                }
            });
        }
        return this.ormRepository.find();
    }

    async find(): Promise<User[]> {

        const users = await this.ormRepository.find();
        return users.map(x => {
            const user = x;
            delete user.password;
            return user;
        });

    }

    async findById(id: string): Promise<User | undefined> {
        return await this.ormRepository.findOne({
            where: { id }
        });
    }

    async create(data: CreateUserDto): Promise<User> {
        const user = await this.ormRepository.create(data);
        return await this.save(user);
    }

    async save(data: User): Promise<User> {
        return await this.ormRepository.save(data);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return await this.ormRepository.findOne({
            where: { email }
        });
    }

}

export default UsersRepository;