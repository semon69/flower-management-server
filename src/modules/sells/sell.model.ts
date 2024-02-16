import { Schema, model } from 'mongoose';
import { TMember, TSell } from './sell.interface';

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
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const MemberSchema = new Schema<TMember>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    points: {
      type: Number,
      required: true,
      default: 0
    },
    totalPurchase: {
      type: Number,
      required: true,
      default: 0
    },
    isRedeem: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
);

export const Sell = model<TSell>('Sells', SellSchema);
export const Member = model<TMember>('Members', MemberSchema);
