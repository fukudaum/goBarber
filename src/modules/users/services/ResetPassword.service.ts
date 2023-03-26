import AppError from "../../../shared/errors/AppErrors";
import { injectable, inject } from 'tsyringe';
import { UsersRepository } from "../repositories/users.repository";
import { UserTokenRepository } from "../repositories/userToken.repository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import { differenceInHours } from "date-fns";

interface Request {
    password: string;
    token: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository,

        @inject('UserTokenRepository')
        private userTokenRepository: UserTokenRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ password, token }: Request): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if(!userToken) {
            throw new AppError('Token invalid!', 404);
        }

        const user = await this.usersRepository.findUnique(userToken?.user_id);

        if(!user?.id) {
            throw new AppError('User not found', 404);
        }

        if(differenceInHours(Date.now(), userToken.created_at) > 2) {
            throw new AppError('Token Expired');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);
        await this.usersRepository.updatePassword(user?.id, hashedPassword);
    }
}

export default ResetPasswordService;
