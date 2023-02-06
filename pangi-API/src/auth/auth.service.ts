import { Injectable, BadRequestException } from '@nestjs/common';
import * as bycrpt from 'bcrypt';
import { User, UserDocument } from '../common/schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async hashingPassword(password: string) {
    return bycrpt.hash(password, 12);
  }

  async register(user): Promise<User | any> {
    try {
      const { email, password } = user;
      let existingUser = await this.userModel.findOne({ email: email });
      if (existingUser)
        throw new Error('User with this email already registered.');
      const hashedPassword = await this.hashingPassword(password);
      user.password = hashedPassword;
      return await new this.userModel(user).save();
    } catch (err) {
      throw err;
    }
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bycrpt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    let userExist = await this.userModel.findOne({
      email: email,
      user_type: 'admin',
    });
    if (!userExist) return null;

    const pwdMatch = await this.doesPasswordMatch(password, userExist.password);

    if (!pwdMatch) return null;

    return userExist;
  }

  async login(userInfo): Promise<{ token: string; user_data: User } | null> {
    try {
      const { email, password } = userInfo;
      let user = await this.validateUser(email, password);

      if (!user)
        throw new Error('You have entered an invalid email or password');
      const jwt = await this.jwtService.signAsync({ user });
      return { token: jwt, user_data: user };
    } catch (err) {
      throw err;
    }
  }
}
