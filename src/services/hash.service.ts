import { hash, compare } from "bcrypt";

const hashService = {
    encrypt: async (text: string) => {
        return await hash(text, 8);
    },
    compare: async (text: string, hashedText: string) => {
        return await compare(text, hashedText);
    }
}
export default hashService;