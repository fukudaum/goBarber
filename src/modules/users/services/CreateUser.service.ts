import { hash } from "bcryptjs";
import AppError from "../../../shared/errors/AppErrors";
import { injectable, inject } from 'tsyringe';
import User from "../entities/User";
import { UsersRepository } from "../repositories/users.repository";

interface Request {
    name: string;
    password: string;
    email: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository
    ) {}

    public async execute({ name, password, email }: Request): Promise<User | undefined> {
        const findUser = await this.usersRepository.findByEmail(email);

        if(findUser) {
            throw new AppError('This email is already registered!');
        }

        const hashedPassword = await hash(password, 8)

        const user = await this.usersRepository.create({  name, password: hashedPassword, email });

        return user;
    }
}

export default CreateUserService;
