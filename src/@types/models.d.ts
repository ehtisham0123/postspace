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

export type AdminDocument = mongoose.Document & {

  adminId: string;
  userName: string;
  password: string;
  privilege: String;
  deletedAt: Date | null;
  comparePassword: comparePasswordFunction;
  refreshToken: any;
  token?: string;
};

export type ResetTokenDocument = mongoose.Document & {
  resetTokenId: string;
  jwt: string;
  isRevoked: boolean;
  type: string;
  userId: string;
};
export type LineChannelAccessDocument = mongoose.Document & {
  expires_in: string;
  token_type: string;
  channel_access_token: string;
  key_id: string;
};
