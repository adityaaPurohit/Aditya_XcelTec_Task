import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { extname } from 'path';
import { Audio } from './schema/Audio.schema';
const fs = require('fs');
@Injectable()
export class CommonService {
  constructor(@InjectModel(Audio.name) private audioModel: Model<Audio>) {}

  async uploadAudio(payload) {
    try {
      if (payload.id) {
        let allFiles = [];
        if (payload.image) allFiles.push(payload.image);
        if (payload.audio) allFiles.push(payload.audio);
        let folderName = 'audio';
        let filesSaved = await this.saveFiles(allFiles, folderName);

        await this.audioModel
          .updateOne({
            ...payload,
            image: filesSaved[0].image
              ? filesSaved[0].image
              : filesSaved[1].image,
            audio: filesSaved[1].audio
              ? filesSaved[1].audio
              : filesSaved[0].audio,
          })
          .where({ _id: payload.id });
        return await this.audioModel.findOne({
          _id: payload.id,
        });
      }

      let allFiles = [];
      if (payload.image) allFiles.push(payload.image);
      if (payload.audio) allFiles.push(payload.audio);
      let folderName = 'audio';
      let filesSaved = await this.saveFiles(allFiles, folderName);
      const saveAudio = await this.audioModel.create({
        ...payload,
        image: filesSaved[0].image ? filesSaved[0].image : filesSaved[1].image,
        audio: filesSaved[1].audio ? filesSaved[1].audio : filesSaved[0].audio,
      });

      return saveAudio;
    } catch (err) {
      throw err;
    }
  }

  async getAUdio() {
    try {
      return await this.audioModel.find();
    } catch (err) {
      throw err;
    }
  }

  async deleteAUdio(payload) {
    try {
      const findAudio = await this.audioModel.findOne({ _id: payload.id });
      if (!findAudio) throw new Error('Can not find Audio');

      await this.audioModel.deleteOne({ _id: payload.id });
      return 'Audio deleted successfully';
    } catch (err) {
      throw err;
    }
  }

  async saveFiles(fileInfo, path) {
    try {
      let response = [];
      for (let data of fileInfo) {
        let outputBuffer = data.buffer;
        const file_name = Math.random() + '_' + new Date().getTime();
        let extenstion = extname(data.originalname);
        const file_path: string = `public/${path}/${file_name}${extenstion}`;
        await fs.writeFile(file_path, outputBuffer, function(err) {
          if (err) throw err;
        });
        let fileType = null;

        if (data.mimetype.includes('image')) {
          fileType = 'image';
        }
        if (data.mimetype.includes('audio')) {
          fileType = 'audio';
        }
        let fileObj = {
          filePath: process.env.IMAGE_URL + file_path,
          fileType: fileType,
          fieldName: data.fieldname,
        };

        response.push({ [fileType]: fileObj });
      }
      return response;
    } catch (err) {
      throw err;
    }
  }
}
