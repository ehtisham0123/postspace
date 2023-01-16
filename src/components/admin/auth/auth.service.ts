import { getToken ,getRefreshToken} from './../../utils/Authenticate';
import randomstring from 'randomstring';
import {  LENGTH_ID, RESET_TOKEN_TYPES } from '../../../constants/rules';
import { Logger } from '../../../middleware/log4';
import { Admin, ResetToken } from '../../../models';
import {
  badImplementationException,
  dataConflictException,
  dataNotExistException,
  HttpException,
  validationException,
} from '../../utils/apiErrorHandler';


import { ADMIN_BOOTH_PRIVILEGE_APPLYING, ADMIN_SUPER_PRIVILEGE, RESET_TOKEN_TYPES_RESET_PASSWORD } from '../../../constants/language/japan';
import {
  ADMIN_NOT_FOUND,
  EMAIL_EXIST,
  EMAIL_NOT_FOUND,
  INVALID_RESET_TOKEN,
  RESET_TOKEN_NOT_FOUND,
} from '../../../constants/errorMessage';

export const createAdmin = async (
  userName:string,
  password: string,
) => {
  let error: Error | HttpException | undefined, session, data;
  try {
    session = await Admin.startSession();
    session.startTransaction();

    const admin = new Admin({
      adminId: randomstring.generate(LENGTH_ID),
      userName,
      password,
      privilege: "admin",
    });

    data = await Admin.findOne({ userName }, null);
    if (data) {
      throw dataConflictException(new Error(EMAIL_EXIST));
    }

    await admin.save();

    await Promise.resolve({
      message:"success"
    });

    await session.commitTransaction();
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);

    if (session) await session.abortTransaction();
  } finally {
    if (session) session.endSession();
  }
  if (error) {
    Logger.error(error);
    return Promise.reject(error);
  } else {
    return Promise.resolve();
  }
};

export const forgotPassword = async (userName: string) => {
  let error: Error | HttpException | undefined, session;
  try {
    session = await Admin.startSession();
    session.startTransaction();

    const admin = await Admin.findOne({ userName }, null, { session });
    if (!admin) throw dataNotExistException(new Error(EMAIL_NOT_FOUND));

    const { adminId } = admin;

    const jwtoken = getToken({id:admin._id,type:'admin'});
    const refreshToken = getRefreshToken({id:admin._id,type:'admin'});


    const resetToken = new ResetToken({
      resetTokenId: randomstring.generate(LENGTH_ID),
      jwt: jwtoken,
      type: RESET_TOKEN_TYPES.indexOf(RESET_TOKEN_TYPES_RESET_PASSWORD),
    });

    await resetToken.save({ session });

    // sendMessage(RESET_PASSWORD_MESSAGE(email, resetToken.resetTokenId));

    await session.commitTransaction();
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);

    if (session) await session.abortTransaction();
  } finally {
    if (session) session.endSession();
  }
  if (error) {
    Logger.error(error);
    return Promise.reject(error);
  } else {
    return Promise.resolve();
  }
};

export const updatePassword = async (password: string, token: string) => {
  let error: Error | HttpException | undefined, session;
  try {
    // session = await ResetToken.startSession();
    // session.startTransaction();

    const resetToken = await ResetToken.findOne({ resetTokenId: token, isRevoked: false }, null, { session });
    if (!resetToken) throw dataNotExistException(new Error(INVALID_RESET_TOKEN));
    Logger.warn(resetToken);

    if (resetToken.type !== "admin") throw dataNotExistException(new Error(INVALID_RESET_TOKEN));


    const  adminId = "payload";

    const admin = await Admin.findOneAndUpdate({ adminId }, { $set: { password } }, { session });
    if (!admin) throw dataNotExistException(new Error(ADMIN_NOT_FOUND));

    await ResetToken.findOneAndUpdate({ resetTokenId: token }, { $set: { isRevoked: true } }, { session });

    // await session.commitTransaction();
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);

    // if (session) await session.abortTransaction();
  } finally {
    // if (session) session.endSession();
  }
  if (error) {
    Logger.error(error);
    return Promise.reject(error);
  } else {
    return Promise.resolve();
  }
};
