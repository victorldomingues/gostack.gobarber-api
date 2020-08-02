import IHashProvider from "../models/hash-provider.model";
import { hash, compare } from "bcrypt";

export default class BCryptHashProvider implements IHashProvider {

    async generate(payload: string): Promise<string> {
        return await hash(payload, 8);
    }

    async compare(payload: string, hashed: string): Promise<boolean> {
        return await compare(payload, hashed);
    }

}