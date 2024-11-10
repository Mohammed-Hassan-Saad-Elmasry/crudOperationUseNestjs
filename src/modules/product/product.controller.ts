import { CloudinaryService } from './../../utils/cloudinary';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductDTO, ProductDTOUpdate } from './validation/product';
import { CanActivate } from 'src/guard/guard.guard';
import { Roles } from 'src/roles/roles.decorator';
import { log } from 'console';
@Controller('product')
export class ProductController {
  constructor(
    private _ProductService: ProductService,
    private _CloudinaryService: CloudinaryService,
  ) {}
  @Post()
  @Roles(['Admin'])
  @UseGuards(CanActivate)
  createProduct(@Body() body: ProductDTO, @Req() req: any) {
    log(req);
    return this._ProductService.createProduct(body, req);
  }
  @UseGuards(CanActivate)
  @Delete(':id')
  deleteProduct(@Param() params: any) {
    return this._ProductService.deleteProduct(params);
  }
  //@SetMetadata("ro",[""])
  @UseGuards(CanActivate)
  @Put(':id')
  updateproduct(
    @Body() data: ProductDTOUpdate,
    @Param() params: any,
    @Req() req: any,
  ) {
    return this._ProductService.updateProduct(data, params, req);
  }
  @Get()
  allProducts() {
    return this._ProductService.allProducts();
  }
}
