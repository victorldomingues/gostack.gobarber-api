import User from "../infra/typeorm/entities/user";
import { CreateUserDto } from "../dtos/CreateUserDto";
import FindAllProvidersDto from "../dtos/find-all-providers.dto";

export default interface IUsersRepository {
    find(): Promise<User[] | undefined>
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findAllProviders(query?: FindAllProvidersDto): Promise<User[]>;
    create(data: CreateUserDto): Promise<User>;
    save(data: User): Promise<User>;
}