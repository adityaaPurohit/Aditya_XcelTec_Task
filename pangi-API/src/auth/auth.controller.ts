import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: CreateAdminDto, @Res() res: any): Promise<any> {
    return await this.authService
      .register(body)
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

  @Post('/login')
  async login(@Body() body: LoginUserDTO, @Res() res: any): Promise<any> {
    return await this.authService
      .login(body)
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
}
