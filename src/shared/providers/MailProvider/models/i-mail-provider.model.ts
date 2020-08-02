import ISendMailDto from "../dtos/i-send-mail.dto";

export default interface IMailProvider {
    sendMail(data: ISendMailDto): Promise<void>;
}