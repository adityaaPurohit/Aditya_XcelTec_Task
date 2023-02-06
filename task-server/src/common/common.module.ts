import { Module } from '@nestjs/common';
import { CommomController } from './common.controller';
import { CommonService } from './common.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schema/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { AudioSchema, Audio } from './schema/Audio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Audio.name, schema: AudioSchema },
    ]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'secret',
        signOptions: { expiresIn: '3600s' },
      }),
    }),
  ],
  controllers: [CommomController],
  providers: [CommonService, AuthService, JwtGuard, JwtStrategy],
})
export class CommonModule {}
