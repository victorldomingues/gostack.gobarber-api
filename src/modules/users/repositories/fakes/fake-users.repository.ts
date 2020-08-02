import IUsersRepository from "@modules/users/repositories/i-users.repository";
import { CreateUserDto } from "@modules/users/dtos/CreateUserDto";
import User from "@modules/users/infra/typeorm/entities/user";
import { uuid } from "uuidv4";
import FindAllProvidersDto from "@modules/users/dtos/find-all-providers.dto";

class FakeUsersRepository implements IUsersRepository {

    private users: User[] = [];

    constructor() {

    }

    async findAllProviders(query?: FindAllProvidersDto): Promise<User[]> {
        if (query?.exceptUserId) return this.users.filter(user => user.id !== query.exceptUserId)
        return this.users;
    }

    async find(): Promise<User[]> {

        return this.users.map(x => {
            const user = x;
            delete user.password;
            return user;
        });

    }

    async findById(id: string): Promise<User | undefined> {
        return this.users.find(x => x.id === id);
    }

    async create({ email, name, password }: CreateUserDto): Promise<User> {
        const user = { email, name, password, id: uuid() } as User;
        return await this.save(user);
    }

    async save(data: User): Promise<User> {
        const index = this.users.findIndex(x => x.id === data.id);
        if (index > -1)
            this.users[index] = data;
        else
            this.users.push(data);
        return data;
    }

    async findByEmail(email: string): Promise<User | undefined> {

        return this.users.find(x => x.email === email);
    }

}

export default FakeUsersRepository;