import { Injectable } from '@nestjs/common';
import { del, put } from '@vercel/blob';

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

@Injectable()
export class BlobService {
  //   Upload file to vercel blob storage
  async upload(file: Express.Multer.File, folder = 'images') {
    const fileName = folder
      ? `${folder}/${Date.now()}-${file.originalname}`
      : `${Date.now()}-${file.originalname}`;

    const blob = await put(fileName, file.buffer, {
      access: 'public',
      token: BLOB_TOKEN,
      addRandomSuffix: true,
    });
    return { url: blob.url };
  }

  //   Delete file from vercel blob storage
  async deleteFile(fileUrl: string) {
    await del(fileUrl, { token: BLOB_TOKEN });
  }

  //   Update file in vercel blob storage
  async updateFile(
    oldFileUrl: string,
    newFile: Express.Multer.File,
    folder: string,
  ) {
    if (oldFileUrl) {
      await this.deleteFile(oldFileUrl);
    }
    return await this.upload(newFile, folder);
  }
}
