import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { userService } from './user.service';
import config from '../../config';

const totalUsers = catchAsync(async (req, res) => {
  const result = await userService.totalUser();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Data fetched successfully',
    data: result,
  });
});

const updateRole = catchAsync(async (req, res) => {
  const id = req.params.id
  const {role} = req.body

  const result = await userService.updateRole(id, role);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Make Seller successfully',
    data: result,
  });
});

const registerUser = catchAsync(async (req, res) => {
  const result = await userService.registerUserIntoDb(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Registered successfully',
    data: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const result = await userService.userLogin(req.body);
  const { refreshToken, token } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User login successful',
    data: { token },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await userService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token generated successfully',
    data: result,
  });
});

export const userController = {
  registerUser,
  userLogin,
  refreshToken,
  totalUsers,
  updateRole
};
