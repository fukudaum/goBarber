import { UsersRepository } from "../repositories/users.repository";
import { compare } from "bcryptjs";
import User from "../entities/User";

interface Request {
    email: string
    password: string
}

interface Response {
    user: User
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

        return {
            user: findUser
        }
    }
}

export default AutheticateUserService;
