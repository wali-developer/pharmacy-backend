import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsEnum(['Active', 'Inactive'])
  status: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class QueryCategoryDto {
  page?: string;
  limit?: string;
  sortBy?: string;
  search?: string;
  status?: 'Active' | 'Inactive';
}
