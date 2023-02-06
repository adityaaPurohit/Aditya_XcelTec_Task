import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
      