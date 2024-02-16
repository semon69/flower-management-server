/* eslint-disable @typescript-eslint/no-explicit-any */
import { Member, Sell } from './sell.model';
import { TMember, TSell } from './sell.interface';
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

const createMemberIntoBd = async (payload: TMember) => {
  const result = await Member.create(payload);
  if (!result) {
    throw new Error('Failed to create sell');
  }

  return result;
};

const getMembers = async () => {
  const result = await Member.find();
  if (!result) {
    throw new Error('Failed to find member');
  }

  return result;
};

const getSingleMember = async (email: string) => {
  const result = await Member.findOne({ email });
  if (!result) {
    throw new Error('Failed to find member');
  }

  return result;
};

const calculatePoints = async ({
  email,
  points,
  purchaseAmount,
}: {
  email: string;
  points: number;
  purchaseAmount: number;
}) => {
  const result = await Member.findOneAndUpdate(
    { email },
    {
      points: points,
      totalPurchase: purchaseAmount,
    },
  );
  if (!result) {
    throw new Error('Failed to calculate');
  }

  return result;
};
const updateRedeemStatus = async (email: string) => {
  const result = await Member.updateOne(
    { email },
    { $set: { isRedeem: true } },
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
  createMemberIntoBd,
  getMembers,
  getSingleMember,
  calculatePoints,
  updateRedeemStatus,
};
