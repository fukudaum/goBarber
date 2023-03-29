import IParseEmailTemplateDTO from "../../MailTemplateProvider/dto/IParseMailTemplate.dto";

interface IMailContact {
    name: string;
    email: string;
}

export default interface ISendMailDTO {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseEmailTemplateDTO;
}
