import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, lowercase: true })
  username: string;
  @Prop({ required: true, lowercase: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: 'User', enum: ['User', 'Admin'], required: true })
  role: string;
}

export const userSchema = SchemaFactory.createForClass(User);
export const userRegister = MongooseModule.forFeature([
  { name: User.name, schema: userSchema },
]);
