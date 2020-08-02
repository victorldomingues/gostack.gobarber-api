import IMailProvider from "../models/i-mail-provider.model";
import nodemailer, { Transporter } from 'nodemailer';
import ISendMailDto from "../dtos/i-send-mail.dto";
import IMailTemplateProvider from "@shared/providers/MailTemplateProvider/models/i-mail-template-provider.model";
import { inject, injectable } from "tsyringe";

@injectable()
export default class EtherealMailProdiver implements IMailProvider {

    private client: Transporter;
    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider
    ) {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
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
    async sendMail({ to, from, subject, templateData }: ISendMailDto): Promise<void> {

        const message = await this.client.sendMail({
            subject: subject,
            from: {
                name: from?.name || 'Equipe GoBarber',
                address: from?.email || "equipe@gobarber.com.br"
            },
            to: {
                name: to.name,
                address: to.email
            },
            html: await this.mailTemplateProvider.parse(templateData),

        });
        console.log('Message sent: %s', message.messageId);
        console.log('Message URL: %s', nodemailer.getTestMessageUrl(message));
    }
}