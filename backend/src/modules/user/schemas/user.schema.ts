import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from '../enums/gender.enum';

export type UserDocument = User & Document;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop()
  password?: string;
  
  @Prop({ unique: true })
  userId!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop()
  googleId?: string;

  @Prop()
  provider?: string;

  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: false })
  lastName?: string;

  @Prop({ required: false, enum: Object.values(Gender), type: String })
  gender?: Gender;

  @Prop({ required: false })
  birthDate?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
