import path from 'path'
import fs from 'fs'

interface IUploadType {
    name: string,
    mv: (destination: string) => Promise<void>

}

export const uploadFile = async (file: IUploadType, destinationPath: string, allowedExtensions: string[]): Promise<string> => {
    if (!file) {
        throw new Error('File not found')
    }

    const ext = path.extname(file.name).toLowerCase();
    const fileName = `thumbnail_${Date.now()}${ext}`;
    const fullPath = path.join(destinationPath, fileName);

    if (!allowedExtensions.includes(ext)) {
        throw new Error(
            `upload-file error: Invalid file type. Only ${allowedExtensions.join(", ")} files are allowed.`
        );
    }

    if (!fs.existsSync(destinationPath)) {
        console.log("upload-file error: Destination path does not exist.");
    } else {
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            console.log("upload-file error: Existing file deleted.");
        }
    }

    try {
        await file.mv(fullPath);
        return fullPath;
    } catch (error: Error | unknown) {
        throw new Error(`Error while uploading file: ${error}`);
    }
};