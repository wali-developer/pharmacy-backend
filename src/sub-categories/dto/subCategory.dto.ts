import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsEnum(['Active', 'Inactive'])
  status: string;
}

export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {}
