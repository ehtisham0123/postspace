import { refreshToken } from './../components/admin/auth/auth.controller';
/* eslint-disable no-use-before-define */
import mongoose from 'mongoose';
import { comparePasswordFunction } from './index';

export type UserDocument = mongoose.Document & {
  userId: string;
  email: string;
  password: string;
  type: number;
  status: number;
  name: string;
  nameKana: string;
  birth: Date;
  gender: number;
  zipcode: string;
  prefecture: string;
  city: string;
  address: string;
  tel: string;
  yearsOfExperience: number;
  identificationPath: string;
  deletedAt: Date | null;
  comparePassword: comparePasswordFunction;
};
