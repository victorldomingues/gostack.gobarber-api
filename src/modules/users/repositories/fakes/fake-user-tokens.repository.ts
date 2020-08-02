import { uuid } from "uuidv4";
import IUserTokensRepository from "../i-user-tokens.repository";
import UserToken from "@modules/users/infra/typeorm/entities/user-token";

class FakeUserTokensRepository implements IUserTokensRepository {

    private userTokens: UserToken[] = [];

    constructor() {

    }

    async findByToken(token: string): Promise<UserToken | undefined> {
        return this.userTokens.find(userToken => userToken.token === token);
    }

    async generate(userId: string): Promise<UserToken> {
        const userToken = new UserToken();
        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        this.userTokens.push(userToken);
        return userToken;
    }



}

export default FakeUserTokensRepository;