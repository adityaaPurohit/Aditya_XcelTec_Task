import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'The email should not be empty' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The password should not be empty' })
  password: string;
}
