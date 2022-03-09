import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type UserDocument = User & Document;

@Schema({
  timestamps: {
    currentTime: () => Date.now(),
  },
})
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true, index: 1 })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, min: 8, max: 16 })
  password: string;

  @Prop({ enum: ['admin', 'user'], default: 'user' })
  role: string;

  @Prop()
  phoneNumber: string;

  @Prop({ default: 'https://randomuser.me/api/portraits/women/90.jpg' })
  profilePictureUrl: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  activeUntil: number;

  @Prop()
  createdAt: number;

  @Prop()
  updatedAt: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
