import IStorageProvider from "../models/storage-provider.model";
import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload'
export default class DiskStorageProvider implements IStorageProvider {
    async saveFile(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadConfig.tempFolder, file),
            path.resolve(uploadConfig.uploadsFolder, file),
        );
        return file;
    }
    async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);
        try {
            await fs.promises.stat(filePath);
        } catch (error) {
            return;
        }
        await fs.promises.unlink(filePath);
    }
}