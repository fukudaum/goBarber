import { container } from 'tsyringe';

import IStorageProvider from "./StorageProvider/model/IStorageProvider";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";
import IMailProvider from './MailProvider/models/IMailProvider';
import MailProvider from './MailProvider/implementations/EtherealMailProvider';
import { UserTokenRepository } from 'modules/users/repositories/userToken.repository';
import PrismaUserTokenRepository from 'modules/users/repositories/prisma/prismaUserToken.repository';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    new EtherealMailProvider()
)

container.registerSingleton<UserTokenRepository>(
    'UserTokenRepository',
    PrismaUserTokenRepository
)
