import { sign } from "jsonwebtoken";
import AppError from "../../../shared/errors/AppErrors";
import { injectable, inject } from 'tsyringe';
import User from "../entities/User";
import { UsersRepository } from "../repositories/users.repository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

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
        private usersRepository: UsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const findUser = await this.usersRepository.findByEmail(email);

        if(!findUser) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(password, findUser.password);
        if(!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const secret = process.env.SECRET;
        console.log(secret)
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
