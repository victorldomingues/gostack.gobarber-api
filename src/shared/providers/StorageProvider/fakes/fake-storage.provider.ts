import IStorageProvider from "../models/storage-provider.model";
export default class FakeStorageProvider implements IStorageProvider {
    private storage: string[] = [];
    async saveFile(file: string): Promise<string> {
        this.storage.push(file);
        return file;
    }
    async deleteFile(file: string): Promise<void> {
        const index = this.storage.findIndex(x => x === file);
        this.storage.splice(index, 1);
    }
}