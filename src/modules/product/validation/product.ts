import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class ProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class ProductDTOUpdate {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsNumber()
  price: number;
  @IsOptional()
  @IsNumber()
  quantity: number;
}
