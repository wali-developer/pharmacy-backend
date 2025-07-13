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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI ?? ''),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    BrandModule,
    UnitsModule,
    SubCategoriesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
