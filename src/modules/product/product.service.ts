import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ProductServiceDB } from './product.DB.service';
import { ProductDTO, ProductDTOUpdate } from './validation/product';
import * as slug from 'slug';
@Injectable()
export class ProductService {
  constructor(private _ProductServiceDB: ProductServiceDB) {}
  async createProduct(body: ProductDTO, req: any) {
    const { name, quantity, price, description } = body;

    if (!req.user || !req.user._id) {
      throw new BadRequestException('User information is missing');
    }
    const productExists = await this._ProductServiceDB.findOneByName(name);
    if (productExists) {
      throw new ConflictException('Product with this name already exists.');
    }
    const createdProduct = await this._ProductServiceDB.createProduct({
      name,
      slug: slug(name, { lower: true, strict: true }),
      quantity,
      price,
      description,
      createdBy: req.user._id,
    });
    return {
      message: 'done',
      product: createdProduct, // إرجاع المنتج الذي تم إنشاؤه
    };
  }

  async deleteProduct(params: any) {
    const { id } = params;
    const existingProduct = await this._ProductServiceDB.findbyid(id);
    if (!existingProduct) {
      throw new BadRequestException('invalid product-Id');
    }
    const product = await this._ProductServiceDB.deleteProduct(id);
    return {
      message: 'Product successfully deleted',
      product,
    };
  }

  async updateProduct(data: ProductDTOUpdate, params: any, req: any) {
    const { id } = params;
    const { name, price, description, quantity } = data;
    let isUpdated: boolean = false;

    const existingProduct = await this._ProductServiceDB.findbyid(id);
    if (!existingProduct) {
      throw new BadRequestException('Invalid product ID');
    }

    if (name) {
      if (existingProduct.name === name) {
        throw new BadRequestException(
          'The entered name is the same as the current name',
        );
      }
      existingProduct.name = name;
      isUpdated = true; // تعيين isUpdated إلى true بعد التحديث
    }

    if (price) {
      if (existingProduct.price === price) {
        throw new BadRequestException(
          'The entered price is the same as the current price',
        );
      }
      existingProduct.price = price;
      isUpdated = true; // تعيين isUpdated إلى true بعد التحديث
    }

    if (description) {
      if (existingProduct.description === description) {
        throw new BadRequestException(
          'The entered description is the same as the current description',
        );
      }
      existingProduct.description = description;
      isUpdated = true; // تعيين isUpdated إلى true بعد التحديث
    }

    if (quantity) {
      if (existingProduct.quantity === quantity) {
        throw new BadRequestException(
          'The entered quantity is the same as the current quantity',
        );
      }
      existingProduct.quantity = quantity;
      isUpdated = true; // تعيين isUpdated إلى true بعد التحديث
    }

    // إذا تم تحديث أي حقل، قم بتحديث الـ updatedBy
    if (isUpdated) {
      existingProduct.updatedBy = req.user._id; // تعيين updatedBy
      const updatedProduct = await existingProduct.save(); // حفظ التغييرات
      return {
        message: 'Product successfully updated',
        updatedProduct,
      };
    }

    return {
      message: 'No changes were made to the product', // إذا لم يحدث أي تحديث
    };
  }

  async allProducts() {
    const products = this._ProductServiceDB.allProducts();
    return products;
  }
}
