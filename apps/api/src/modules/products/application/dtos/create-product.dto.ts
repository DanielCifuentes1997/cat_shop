import { IsString, IsNumber, IsBoolean, IsOptional, Min, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsUrl()
  imageUrl: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}