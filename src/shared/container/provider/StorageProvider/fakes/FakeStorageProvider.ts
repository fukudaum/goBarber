import IStorageProvider from "../model/IStorageProvider";

export default class FakeStorageProvider implements IStorageProvider {
    private storage: string[] = [];

    async saveFile(file: string): Promise<string> {
        this.storage.push(file);

        return file;
    }

    async deleteFile(file: string): Promise<void> {
        const findIndex = this.storage.findIndex(item => {
            item === file
        });

        this.storage.splice(findIndex, 1);
    }

}
