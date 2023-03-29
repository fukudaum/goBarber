import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from "../../../shared/errors/AppErrors";
import { UsersRepository } from "../repositories/users.repository";
import { UserTokenRepository } from "../repositories/userToken.repository";
import IMailProvider from "../../../shared/container/provider/MailProvider/models/IMailProvider";

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

            const forgotPasswordTemplate = path.resolve(
                __dirname,
                '..',
                'views',
                'forgot_password.hbs'
            );

            await this.mailProvider.sendMail({
                to: {
                    name: user.name,
                    email: user.email,
                },
                subject: '[GoBarber] Recuperação de senha',
                templateData: {
                    file: forgotPasswordTemplate,
                    variables: {
                        name: user.name,
                        link: `http://localhost:3000/reset_password?token=${userToken.token}`,
                    },
                }
            });
        }

    }
}

export default SendForgotPasswordEmailService;
