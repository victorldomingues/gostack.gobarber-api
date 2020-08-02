import IMailTemplateProvider from "../models/i-mail-template-provider.model";
import IParseMailTemplateDto from "../dtos/i-parse-mail-template.dto";
import handlebars from 'handlebars';
import fs from 'fs';

export default class HandlebarsMailProdiver implements IMailTemplateProvider {
    async parse({ file, variables }: IParseMailTemplateDto): Promise<string> {
        const fileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8'
        });
        const compiledTemplate = handlebars.compile(fileContent);
        return compiledTemplate(variables);
    }
}