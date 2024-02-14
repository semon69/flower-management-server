import { Schema, model } from 'mongoose';
import { TSell } from './sell.interface';

export const SellSchema = new Schema<TSell>(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellDate: {
      type: String,
      required: true,
    },
    flowerId: {
      type: Schema.Types.ObjectId,
      required: true 
    }
  },
  {
    timestamps: true,
  },
);

export const Sell = model<TSell>('Sells', SellSchema);
