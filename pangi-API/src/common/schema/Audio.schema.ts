import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
export type AudioDocument = Audio & Document;

@Schema()
export class Audio {
  @Prop({ type: String })
  song_name: string;

  @Prop({ type: Object, required: true })
  audio: Object;

  @Prop({ type: Object, required: true })
  image: Object;

  @Prop({ type: String })
  discription: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}
export const AudioSchema = SchemaFactory.createForClass(Audio);
