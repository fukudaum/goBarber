import AppError from "../../../shared/errors/AppErrors";
import { injectable, inject } from 'tsyringe';
import User from "../entities/User";
import { UsersRepository } from "../repositories/users.repository";
import IMailProvider from "../../../shared/container/provider/MailProvider/models/IMailProvider";
import { UserTokenRepository } from "../repositories/userToken.repository";

interface Request {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokenRepository')
        private userTokenRepository: UserTokenRepository,
    ) {}

    public async execute({ email }: Request): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('Email not found', 404);
        }

        if(user?.id) {
            const userToken = await this.userTokenRepository.generate(user.id);
        }

        await this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido.');
    }
}

export default SendForgotPasswordEmailService;
