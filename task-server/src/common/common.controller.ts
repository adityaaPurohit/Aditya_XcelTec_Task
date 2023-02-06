import {
  Controller,
  Post,
  Res,
  HttpStatus,
  UnprocessableEntityException,
  Get,
  Body,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { CommonService } from './common.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('common')
export class CommomController {
  constructor(private readonly commonService: CommonService) {}
  @UseGuards(JwtGuard)
  @Post('insertAudio')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  async insertAudio(
    @UploadedFiles()
    files: {
      audio?: Express.Multer.File;
      image?: Express.Multer.File;
    },
    @Body() body: any,
    @Res() res: any,
  ): Promise<any> {
    if (files.audio) body.audio = files.audio[0];
    if (files.image) body.image = files.image[0];
    if (!body.id) {
      if (!files.audio)
        throw new UnprocessableEntityException('Audio field can not be empty');
      if (!files.image)
        throw new UnprocessableEntityException('image field can not be empty');
    }
    return await this.commonService
      .uploadAudio(body)
      .then(async response => {
        return res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          data: response,
        });
      })
      .catch((error: any) => {
        throw new UnprocessableEntityException(error.message);
      });
  }

  @UseGuards(JwtGuard)
  @Get('/audio')
  async getAudio(@Res() res: any): Promise<object> {
    return this.commonService.getAUdio().then(data => {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: data,
      });
    });
  }

  @UseGuards(JwtGuard)
  @Post('/delete-audio')
  async deleteAudio(@Res() res: any, @Body() body: any): Promise<object> {
    return this.commonService.deleteAUdio(body).then(data => {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: data,
      });
    });
  }
}
