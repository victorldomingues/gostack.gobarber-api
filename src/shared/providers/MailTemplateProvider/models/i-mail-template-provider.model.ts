import IParseMailTemplateDto from "../dtos/i-parse-mail-template.dto";

export default interface IMailTemplateProvider {
    parse(data: IParseMailTemplateDto): Promise<string>;
}