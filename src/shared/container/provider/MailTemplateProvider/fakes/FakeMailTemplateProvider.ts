import IParseEmailTemplateDTO from "../dto/IParseMailTemplate.dto";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

export class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse({ file, variables }: IParseEmailTemplateDTO): Promise<string> {

        return 'Mail Content'
    }
}
