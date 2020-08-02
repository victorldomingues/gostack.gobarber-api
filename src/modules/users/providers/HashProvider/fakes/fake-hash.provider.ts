import IHashProvider from "../models/hash-provider.model";

export default class FakeHashProvider implements IHashProvider {

    async generate(payload: string): Promise<string> {
        return payload + '123';
    }

    async compare(payload: string, hashed: string): Promise<boolean> {
        return payload + '123' === hashed;
    }

}