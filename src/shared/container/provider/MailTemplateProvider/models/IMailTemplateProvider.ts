import IParseEmailTemplateDTO from "../dto/IParseMailTemplate.dto";

export default interface IMailTemplateProvider {
    parse(data: IParseEmailTemplateDTO): Promise<string>;
}
