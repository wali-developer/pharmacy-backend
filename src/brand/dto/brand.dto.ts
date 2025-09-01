import { PartialType } from '@nestjs/mapped-types';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  categories: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  subCategories?: string[];

  @IsOptional()
  @IsString()
  icon: Express.Multer.File;

  @IsEnum(['Active', 'Inactive'])
  status: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

export class QueryBrandDto {
  page?: string;
  limit?: string;
  sortBy?: string;
  search?: string;
  status?: 'Active' | 'Inactive';
  category?: string;
}
