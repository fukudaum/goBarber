import ISendMailDTO from "../dtos/ISendMail.dto";

export default interface IMailProvider {
    sendMail(data: ISendMailDTO): Promise<void>;
}
