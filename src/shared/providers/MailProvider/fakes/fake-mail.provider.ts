import IMailProvider from "../models/i-mail-provider.model";
import ISendMailDto from "../dtos/i-send-mail.dto";

export default class FakeMailProdiver implements IMailProvider {
    async sendMail({ to, templateData, from }: ISendMailDto): Promise<void> {
        console.log(`send to: ${to.name}. \nmessage: ${templateData.file}`)
    }
}