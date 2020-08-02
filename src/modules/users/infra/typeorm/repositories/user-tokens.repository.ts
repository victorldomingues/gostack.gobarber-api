import { Repository, getRepository } from "typeorm";

import IUserTokensRepository from "@modules/users/repositories/i-user-tokens.repository";
import UserToken from "../entities/user-token";

class UserTokensRepository implements IUserTokensRepository {

    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    async findByToken(token: string): Promise<UserToken | undefined> {
        return await this.ormRepository.findOne({
            where: {
                token
            }
        });
    }

    async generate(userId: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({ userId });
        await this.ormRepository.save(userToken);
        return userToken;
    }

}

export default UserTokensRepository;