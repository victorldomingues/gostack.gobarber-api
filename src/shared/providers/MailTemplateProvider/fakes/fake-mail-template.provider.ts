import IMailTemplateProvider from "../models/i-mail-template-provider.model";
import IParseMailTemplateDto from "../dtos/i-parse-mail-template.dto";

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
    async parse({ file: template, variables }: IParseMailTemplateDto): Promise<string> {
        return template;
    }
}