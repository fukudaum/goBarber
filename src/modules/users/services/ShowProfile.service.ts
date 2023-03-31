import { UsersRepository } from "../repositories/users.repository";
import { injectable, inject } from 'tsyringe';
import User from "../entities/User";
import AppError from "../../../shared/errors/AppErrors";

interface Request {
    user_id: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository,
    ) {}

    public async execute({ user_id }: Request): Promise<User> {
        const user = await this.usersRepository.findUnique(user_id);

        if(!user) {
            throw new AppError('User not found!');
        }

        return user;
    }
}

export default ShowProfileService;
