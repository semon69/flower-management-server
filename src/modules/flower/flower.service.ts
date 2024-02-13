/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TFlower } from './flower.interface';
import { Flower } from './flower.model';
import { ParsedQs } from 'qs';

const createFlowerIntoDb = async (payload: TFlower) => {
  const result = await Flower.create(payload);
  return result;
};

const getFlowersFromDb = async (queryParams: ParsedQs) => {
  const {
    minPrice,
    maxPrice,
    bloomDate,
    color,
    type,
    minSize,
    maxSize,
    fragrance,
    season,
    name,
    popularity
  } = queryParams;

  // Construct a filter object based on the provided parameters
  const filter: any = {};

  if (minPrice) filter.price = { $gte: Number(minPrice) };
  if (maxPrice) filter.price = { $lte: Number(maxPrice) };

  if (minPrice && maxPrice)
    filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  if (bloomDate) filter.bloomDate = bloomDate;

  // if (color) filter.color = color;
  if (typeof color === 'string') {
    filter.color = { $regex: new RegExp(color, 'i') };
  }

  if (type) filter.type = type;

  if (minSize) filter.size = { $gte: Number(minSize) };
  if (maxSize) filter.size = { $lte: Number(maxSize) };

  if (minSize && maxSize)
    filter.size = { $gte: Number(minSize), $lte: Number(maxSize) };
  if (fragrance) filter.fragrance = fragrance;
  if (season) filter.season = season;
  if (popularity) filter.popularity = popularity;

  if (typeof name === 'string') {
    filter.name = { $regex: new RegExp(name, 'i') };
  }

  const result = await Flower.find(filter);
  return result;
};

const updateFlowerFromDb = async (_id: string, payload: Partial<TFlower>) => {
  const result = await Flower.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFlowerFromDb = async (_id: string) => {
  const result = await Flower.findByIdAndDelete(_id);
  return result;
};

const deleteMultipleFlower = async (ids: string[]) => {
  const results = await Flower.deleteMany({ _id: { $in: ids } });
  if (results.deletedCount === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No flowers found with the provided IDs"
    )
  }
  return results;
}

export const flowerService = {
  createFlowerIntoDb,
  getFlowersFromDb,
  updateFlowerFromDb,
  deleteFlowerFromDb,
  deleteMultipleFlower
};

