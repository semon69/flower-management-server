/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  name: string;
  role: "manager" | "seller" | "user"
  email: string;
  password: string;
  gender: string;
};

export interface UserModel extends Model<TUser> {
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
