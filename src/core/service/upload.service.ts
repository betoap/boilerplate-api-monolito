import Fs from 'fs';
import sharp from 'sharp';

export class Upload {

  static async save(file, path: string) {
    const reader = Fs.createReadStream(file.path);
    // await Upload.createPath(path);
    const stream = Fs.createWriteStream(path);
    return reader.pipe(stream);
  }

  static cropImage(image: string, path: string, size?: {width?: number, height?: number}, quality:number = 80) {
    sharp(image)
      .resize({
        fit: sharp.fit.contain,
        ...size
      })
      .png({quality :  quality})
      .toFile(`${path}${image}`);
  }

  static createPath(path) {
    if (!Fs.existsSync(path)) {
      Fs.mkdirSync(path, { mode: '0777', recursive: true });
    }
  }

}
