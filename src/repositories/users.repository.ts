import { Repository, EntityRepository } from "typeorm";
import Appointment from "../models/appointment";
import User from "../models/user";

@EntityRepository(User)
class UsersRepository extends Repository<User> {
    async findByEmail(email: string): Promise<User | null> {
        const user = await this.findOne({
            where: { email }
        });
        return user || null;
    }
}

export default UsersRepository;