import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'The email should not be empty' })
  email: string;
}
