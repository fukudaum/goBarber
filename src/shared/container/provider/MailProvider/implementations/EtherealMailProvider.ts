import IMailProvider from "../models/IMailProvider";
import nodemailer, { Transporter } from 'nodemailer';

export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter | undefined;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;
        });
    }

    public async sendMail(to: string, body: string): Promise<void> {
        if(this.client) {
            const info = await this.client.sendMail({
                from: 'Equipe GoBarber <equip@gobarber.com.br>',
                to,
                subject: 'Recuperação de senha',
                text: body,
            });

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    }

}
