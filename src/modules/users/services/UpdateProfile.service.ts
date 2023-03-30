import { UsersRepository } from "../repositories/users.repository";
import { injectable, inject } from 'tsyringe';
import User from "../entities/User";
import AppError from "../../../shared/errors/AppErrors";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface Request {
    user_id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ user_id, name, email, password, old_password }: Request): Promise<User> {
        const user = await this.usersRepository.findUnique(user_id);

        if(!user) {
            throw new AppError('User not found!');
        }

        const userWithAlreadyExistingEmail = await this.usersRepository.findByEmail(email);

        if(userWithAlreadyExistingEmail) {
            throw new AppError('Email already registered!');
        }

        if(password && !old_password) {
            throw new AppError('Old password must be informed!');
        }

        if(password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(user.password, old_password);
            if(!checkOldPassword) {
                throw new AppError('Passwords doesnt match!');
            }

            password = await this.hashProvider.generateHash(password);
        }

        const updatedUser = await this.usersRepository.update(user_id, name, email, password);

        return updatedUser;
    }
}

export default UpdateProfileService;
