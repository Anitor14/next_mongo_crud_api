import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; // this is a generic type
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    // the productModel is being created by mongoose.
    @InjectModel('Product') private readonly productModel: Model<Product>, // this simply tells nest js that you want to inject mongoose model.
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    // const prodId = Math.random().toString();
    const newProduct = await this.productModel.create({
      title: title,
      description: description,
      price: price,
    });
    return newProduct.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId); // find product returns a mongoose model object.
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
  }

  async deleteProduct(productId: string) {
    // const [product, index] = this.findProduct(productId);
    // this.products.splice(index, 1);
    const result = await this.productModel.deleteOne({ _id: productId }).exec();
    console.log(result);
    if (result.deletedCount === 0) {
      throw new NotFoundException(`could not find product with this`);
    }
  }

  private async findProduct(id: string): Promise<Product> {
    //we return a promise which yields a product.
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`could not find product with this ${id}`);
    }
    if (!product) {
      throw new NotFoundException(`could not find product with this ${id}`);
    }
    // return {
    //   // this is a transformed object , that returns the product _id with just id.
    //   id: product.id,
    //   title: product.title,
    //   description: product.description,
    //   price: product.price,
    // };
    return product;
  }
}
