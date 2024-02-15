import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { sellService } from './sell.service';
import { ParsedQs } from 'qs';

const createsell = catchAsync(async (req, res) => {
  const result = await sellService.createSellIntoDb(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Sell Histoty is Saved in Database successfully',
    data: result,
  });
});

const getMembers = catchAsync(async (req, res) => {
  const result = await sellService.getMembers();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'get all member successfully',
    data: result,
  });
});

const getSingleMember = catchAsync(async (req, res) => {
  const email = req.params.email
  const result = await sellService.getSingleMember(email);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'get member successfully',
    data: result,
  });
});
const createMember = catchAsync(async (req, res) => {
  const result = await sellService.createMemberIntoBd(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Become member successfully',
    data: result,
  });
});

const calculatePoints = catchAsync(async (req, res) => {
  const result = await sellService.calculatePoints(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Calculate points successfully',
    data: result,
  });
});

const getAllSells = catchAsync(async (req, res) => {
  const queryParams: ParsedQs = req.query;
  const result = await sellService.getSellsFromDb(queryParams);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fetched all Sells History successfully',
    data: result,
  });
});

export const sellController = {
  createsell,
  getAllSells,
  createMember,
  getMembers,
  getSingleMember,
  calculatePoints
};
