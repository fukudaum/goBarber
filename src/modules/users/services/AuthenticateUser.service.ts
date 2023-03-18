import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import AppError from "shared/errors/AppErrors";
import { injectable, inject } from 'tsyringe';
import User from "../entities/User";
import { UsersRepository } from "../repositories/users.repository";

interface Request {
    email: string
    password: string
}

interface Response {
    user: User
    token: string
}

@injectable()
class AutheticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository
    ) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const findUser = await this.usersRepository.findByEmail(email);

        if(!findUser) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await compare(password, findUser.password);

        if(!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
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
        throw new AppError('Incorrect email/password combination.', 401);
    }
}

export default AutheticateUserService;
