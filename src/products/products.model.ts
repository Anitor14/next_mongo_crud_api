import * as mongoose from 'mongoose';

// This is the schema representing how the mongoose model should look like.
export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export interface Product extends mongoose.Document {
  //mongoose.Document is an interface produced by mongoose.
  // we cannot instantiate interfaces.
  id: string;
  title: string;
  description: string;
  price: number;
}
