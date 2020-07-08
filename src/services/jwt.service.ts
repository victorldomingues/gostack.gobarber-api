import User from "../models/user";
import { sign, verify } from "jsonwebtoken";
import { authConfig } from "../config/auth";

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}
const jwtService = {
    createToken: (user: User) => {
        const { secret, expiresIn } = authConfig.jwt;
        return sign({}, secret, {
            subject: user.id,
            expiresIn: expiresIn
        });
    },
    verify: (token: string): TokenPayload => {
        const { secret } = authConfig.jwt;
        return verify(token, secret) as TokenPayload;
    }
}

export default jwtService;