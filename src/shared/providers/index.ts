import { container } from "tsyringe";
import IStorageProvider from "./StorageProvider/models/storage-provider.model";
import DiskStorageProvider from "./StorageProvider/implementations/disk-storage.provider";
import IMailProvider from "@shared/providers/MailProvider/models/i-mail-provider.model";
import EtherealMailProdiver from "@shared/providers/MailProvider/implementations/ethereal-mail.provider";
import IMailTemplateProvider from "./MailTemplateProvider/models/i-mail-template-provider.model";
import HandlebarsMailProdiver from "./MailTemplateProvider/implementations/handlebars-mail-template.provider";

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailProdiver
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProdiver)
);