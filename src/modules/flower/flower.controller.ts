import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { flowerService } from './flower.service';
import { ParsedQs } from 'qs';

const createFlower = catchAsync(async (req, res) => {
  const result = await flowerService.createFlowerIntoDb(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flower created successfully',
    data: result,
  });
});

const getAllFlowers = catchAsync(async (req, res) => {
  const queryParams: ParsedQs = req.query;
  const result = await flowerService.getFlowersFromDb(queryParams);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fetched all Flowers successfully',
    data: result,
  });
});

const updateFlower = catchAsync(async (req, res) => {
  const _id = req.params._id;
  const result = await flowerService.updateFlowerFromDb(_id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update A Flower successfully',
    data: result,
  });
});

const deleteFlower = catchAsync(async (req, res) => {
  const _id = req.params._id;
  const result = await flowerService.deleteFlowerFromDb(_id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Delete A Flower successfully',
    data: result,
  });
});
const deleteMultipleFlower = catchAsync(async (req, res) => {
  const ids = req.body;
  const result = await flowerService.deleteMultipleFlower(ids);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Selected Flowers deleted successfully',
    data: result,
  });
});

const createCupon = catchAsync(async (req, res) => {
  const result = await flowerService.createCupon(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cupon Created successfully',
    data: result,
  });
});

const getSingleCupon = catchAsync(async (req, res) => {
  const cupon = req.params.cupon;
  const result = await flowerService.getSingleCupon(cupon);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Get Cupon successfully',
    data: result,
  });
});

export const flowerController = {
  createFlower,
  getAllFlowers,
  updateFlower,
  deleteFlower,
  deleteMultipleFlower,
  createCupon,
  getSingleCupon,
};
