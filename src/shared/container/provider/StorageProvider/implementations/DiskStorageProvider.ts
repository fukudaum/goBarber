import fs from 'fs';
import path from 'path';
import uploadConfig from '../../../../../config/upload';
import IStorageProvider from "../model/IStorageProvider";

export default class DiskStorageProvider implements IStorageProvider {
    async saveFile(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadConfig.directory, file),
            path.resolve(uploadConfig.uploadsFolder, file),
        );

        return file;
    }

    async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }

}
