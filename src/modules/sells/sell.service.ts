/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sell } from './sell.model';
import { TSell } from './sell.interface';
import { ParsedQs } from 'qs';
import { Flower } from '../flower/flower.model';

const createSellIntoDb = async (payload: TSell) => {

  const { flowerId } = payload;
  const fll = await Flower.findById(flowerId);

  const result = await Sell.create(payload);
  if (!result) {
    throw new Error('Failed to create sell');
  }

  await Flower.findByIdAndUpdate(
    flowerId,
    {
      quantity: fll!.quantity - payload.quantity,
    },
    {
      new: true,
    },
  );

  return result;
  
};

const getSellsFromDb = async (queryParams: ParsedQs) => {
  let startDate;
  let endDate = new Date();

  const { range } = queryParams;

  switch (range) {
    case 'daily':
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      break;
    case 'weekly':
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 6);
      break;
    case 'monthly':
      startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
      break;
    case 'yearly':
      startDate = new Date(endDate.getFullYear(), 0, 1);
      break;
    default:
      throw new Error('Invalid category');
  }
  const result = await Sell.find({
    createdAt: { $gte: startDate, $lte: endDate },
  });
  return result;
};

export const sellService = {
  getSellsFromDb,
  createSellIntoDb,
};
