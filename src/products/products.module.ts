import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './products.controller';
import { ProductSchema } from './products.model';
import { ProductsService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),//you inject the mongoose model , you give it a name and the schema that defines how the model should look like.
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
