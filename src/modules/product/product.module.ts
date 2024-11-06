import { Module } from '@nestjs/common';
import { ProductServiceDB } from './product.DB.service';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRegister } from '../schema/product.schema';
import { ServiceDB } from '../auth/auth.Db.Service';
import { userRegister } from '../schema/user.model';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [ProductRegister, userRegister],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductServiceDB,
    ServiceDB,
    JwtService
  ],
})
export class ProductModule {}
