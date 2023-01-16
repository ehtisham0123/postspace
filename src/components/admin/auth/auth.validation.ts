import { Schema } from 'express-validator';
import {
  VALIDATION_BOOLEAN,
  VALIDATION_EMAIL,
  VALIDATION_ID,
  VALIDATION_NAME,
  VALIDATION_PASSWORD,
  VALIDATION_TEL,
  VALIDATION_USER_NAME,
} from '../../../constants/validation';

export const LOGIN_SCHEMA: Schema = {
  userName: VALIDATION_USER_NAME('body'),
  password: VALIDATION_PASSWORD('body'),
};

export const FORGOT_PASSWORD_SCHEMA: Schema = {
  email: VALIDATION_EMAIL('body'),
};

export const UPDATE_PASSWORD_SCHEMA: Schema = {
  password: VALIDATION_PASSWORD('body'),
  token: VALIDATION_ID('body'),
};

export const REGISTER_ADMIN_SCHEMA: Schema = {
  userName: VALIDATION_USER_NAME('body'),
  password: VALIDATION_PASSWORD('body'),
};
