import { UsersRepository } from "../../users/repositories/users.repository";
import { injectable, inject } from 'tsyringe';
import User from "../../users/entities/User";
import AppError from "../../../shared/errors/AppErrors";

interface Request {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository,
    ) {}

    public async execute({ user_id }: Request): Promise<User[]> {
        const users = await this.usersRepository.findAllProviders({
            exceptUserId: user_id
        });

        if(!users?.length) {
            throw new AppError('Users not found!');
        }

        return users;
    }
}

export default ListProvidersService;
