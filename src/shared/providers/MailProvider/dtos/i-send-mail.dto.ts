import IParseMailTemplateDto from "@shared/providers/MailTemplateProvider/dtos/i-parse-mail-template.dto";

interface IMailContact {
    name: string;
    email: string;
}

export default interface ISendMailDto {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplateDto;
}