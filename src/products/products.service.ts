import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; // this is a generic type
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

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

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const [product, index] = this.findProduct(productId);
    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }
  deleteProduct(productId: string) {
    const [product, index] = this.findProduct(productId);
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return [product, productIndex];
  }
}
