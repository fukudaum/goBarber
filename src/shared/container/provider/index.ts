import IStorageProvider from "./StorageProvider/model/IStorageProvider";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";
import { container } from 'tsyringe';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider
);
