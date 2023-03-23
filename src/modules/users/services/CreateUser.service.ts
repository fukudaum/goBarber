import AppError from "../../../shared/errors/AppErrors";
import { injectable, inject } from 'tsyringe';
import User from "../entities/User";
import { UsersRepository } from "../repositories/users.repository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface Request {
    name: string;
    password: string;
    email: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ name, password, email }: Request): Promise<User | undefined> {
        const findUser = await this.usersRepository.findByEmail(email);

        if(findUser) {
            throw new AppError('This email is already registered!');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            password: hashedPassword,
            email
        });

        return user;
    }
}

export default CreateUserService;
