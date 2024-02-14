import { Types } from "mongoose";


export type TSell = {
  name: string;
  quantity: number;
  price: number
  sellDate: string;
  flowerId: Types.ObjectId
};
