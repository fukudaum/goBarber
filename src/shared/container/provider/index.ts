import { container } from 'tsyringe';

import IStorageProvider from "./StorageProvider/model/IStorageProvider";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";
import IMailProvider from './MailProvider/models/IMailProvider';
import MailProvider from './MailProvider/implementations/EtherealMailProvider';
import { UserTokenRepository } from 'modules/users/repositories/userToken.repository';
import PrismaUserTokenRepository from 'modules/users/repositories/prisma/prismaUserToken.repository';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementationis/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider)
);

container.registerSingleton<UserTokenRepository>(
    'UserTokenRepository',
    PrismaUserTokenRepository
);

