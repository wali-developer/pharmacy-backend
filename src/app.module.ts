import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { BrandModule } from './brand/brand.module';
import { UnitsModule } from './units/units.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { BlobModule } from './blob/blob.module';
import * as Joi from 'joi';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        PORT: Joi.number().default(3000),
        MONGO_URI: Joi.string().uri().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI ?? ''),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    SubCategoriesModule,
    BrandModule,
    UnitsModule,
    BlobModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
