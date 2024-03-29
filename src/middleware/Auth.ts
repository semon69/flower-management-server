import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../errors/AppError';
import { User } from '../modules/user/user.model';


export const USER_ROLE = {
  manager: 'manager',
  seller: 'seller'
} as const;

export type TUserRole = keyof typeof USER_ROLE;

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    // check, is token sent by user
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized person',
      );
    }

    // check, is token is valid
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Person');
    }
    const { role, email } = decoded;

    // check, is users exists or not
    const user = await User.findOne({email: email});

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'The user is not found');
    }

    // check, is users deleted or not
    const userEmail = user?.email;
    if (userEmail !== email) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Person');
    }

    // if (role !== 'user') {
    //   throw new AppError(
    //     httpStatus.UNAUTHORIZED,
    //     'Unauthorized person',
    //   );
    // }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized person',
      );
    }

    next();
  });
};
export default auth;
