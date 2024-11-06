import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Product {
  @Prop({ required: true, unique: true, lowercase: true })
  name: string;
  @Prop({ required: true })
  slug: string;
  @Prop()
  description: string;
  @Prop({ required: true })
  price: number;
  @Prop({ default: 0 })
  quantity: number;
  @Prop({ required: true, ref: 'User' })
  createdBy: mongoose.Schema.Types.ObjectId;
  @Prop({ ref: 'User' })
  updatedBy: mongoose.Schema.Types.ObjectId;
}
export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('creator', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
});
export const ProductRegister = MongooseModule.forFeature([
  { name: Product.name, schema: ProductSchema },
]);
