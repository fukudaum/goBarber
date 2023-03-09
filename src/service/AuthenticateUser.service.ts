import { UsersRepository } from "../repositories/users.repository";
import { compare } from "bcryptjs";
import User from "../entities/User";
import { sign } from "jsonwebtoken";
import auth from "../config/auth";

interface Request {
    email: string
    password: string
}

interface Response {
    user: User
    token: string
}

class AutheticateUserService {
    constructor(private usersRepository: UsersRepository) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const findUser = await this.usersRepository.findByEmail(email);

        if(!findUser) {
            throw new Error('Incorrect email/password combination.');
        }

        const passwordMatched = await compare(password, findUser.password);

        if(!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        }

        const secret = process.env.SECRET;

        if(secret) {
            const token = sign({  }, secret, {
                subject: findUser.id,
                expiresIn: process.env.EXPIRESIN,
            });

            return {
                user: findUser,
                token
            }
        }
        throw new Error('Incorrect email/password combination.');
    }
}

export default AutheticateUserService;
