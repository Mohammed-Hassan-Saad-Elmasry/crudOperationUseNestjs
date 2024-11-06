import { Product } from './../schema/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, ObjectId } from 'mongoose';

@Injectable()
export class ProductServiceDB {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findOneByName(name: string): Promise<Product> {
    const product = await this.productModel.findOne({ name });
    return product;
  }
  async findbyid(id: ObjectId) {
    const existingProduct = await this.productModel.findById({ _id: id });
    return existingProduct;
  }
  async createProduct(data: any) {
    const product = await this.productModel.create(data);
    return product;
  }
  async deleteProduct(productId: ObjectId) {
    const product = await this.productModel.findByIdAndDelete(
      { _id: productId },
      {
        new: true,
      },
    );
    return product;
  }
  async allProducts() {
    const product=await this.productModel.find().populate('creator');
    return{
      message:"Products Is",
      product
    } 
    // .populate('createdBy', 'username email')
    // .populate('updatedBy', 'username email');
  }
}
