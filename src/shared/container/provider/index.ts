import { container } from 'tsyringe';

import IStorageProvider from "./StorageProvider/model/IStorageProvider";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";
import IMailProvider from './MailProvider/models/IMailProvider';
import MailProvider from './MailProvider/implementations/MailProvider';
import { UserTokenRepository } from 'modules/users/repositories/userToken.repository';
import PrismaUserTokenRepository from 'modules/users/repositories/prisma/prismaUserToken.repository';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider
);

container.registerSingleton<IMailProvider>(
    'MailProvider',
    MailProvider
)

container.registerSingleton<UserTokenRepository>(
    'UserTokenRepository',
    PrismaUserTokenRepository
)
