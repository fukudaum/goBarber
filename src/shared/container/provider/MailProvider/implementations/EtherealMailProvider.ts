import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendMail.dto";
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";

@injectable()
export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter | undefined;

    constructor(

        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider
    ) {
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

    public async sendMail({ to, subject, from, templateData }: ISendMailDTO): Promise<void> {
        if(this.client) {
            const info = await this.client.sendMail({
                from: {
                    name: from?.name || 'Equipe GoBarber',
                    address: from?.email || 'equipe@gobarber.com.br'
                },
                to: {
                    name: to.name,
                    address: to.email,
                },
                subject,
                html: await this.mailTemplateProvider.parse(templateData),
            });

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    }

}
