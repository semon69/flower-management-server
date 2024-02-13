/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TLoginUser } from '../../globalInterface/globalInterface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { createToken, verifyToken } from './user.utils';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';

const totalUser = async () => {
  const result = await User.find();
  return result;
};

const registerUserIntoDb = async (payload: TUser) => {
  payload.role = 'user';
  const result = await User.create(payload);
  const { password, ...otherFields } = result.toObject();
  return otherFields;
};

const userLogin = async (payload: TLoginUser) => {
  // checking if the user is exist
  // const user = await User.isUserExistsUsername(payload?.username);
  const user = await User.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  const userData = {
    _id: user?._id,
    email: user?.email,
  };

  const jwtPayload = {
    _id: user?._id,
    email: user?.email,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_expires_in as string,
  );
  
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_expires_in_refresh as string,
  );

  return {
    token,
    refreshToken
  };
};

const refreshToken = async (proposToken: string) => {

  if (!proposToken) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized person',
    );
  }

  // check, is token is valid
  const decoded = verifyToken(
    proposToken,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;
  const { userId, iat } = decoded;

  // check, is users exists or not
  const user = await User.findOne(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user is not found');
  }

  const jwtPayload = {
    _id: user?._id,
    email: user?.role,
  };
  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_expires_in as string,
  );

  return {
    token,
  };
};

export const userService = {
  registerUserIntoDb,
  userLogin,
  refreshToken,
  totalUser
};
