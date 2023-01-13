import { getToken ,getRefreshToken} from './../../utils/Authenticate';
import randomstring from 'randomstring';
import { ADMIN_AUTHORITY_TYPE_LABELS, LENGTH_ID, RESET_TOKEN_TYPES } from '../../../constants/rules';
import { Logger } from '../../../middleware/log4';
import { User, ResetToken } from '../../../models';
import {
  badImplementationException,
  dataConflictException,
  dataNotExistException,
  HttpException,
  validationException,
} from '../../utils/apiErrorHandler';
// import { sendMessage } from '../../utils/sgMailer';

import { ADMIN_BOOTH_PRIVILEGE_APPLYING, ADMIN_SUPER_PRIVILEGE, RESET_TOKEN_TYPES_RESET_PASSWORD } from '../../../constants/language/japan';
import {
  ADMIN_NOT_FOUND,
  EMAIL_EXIST,
  EMAIL_NOT_FOUND,
  INVALID_RESET_TOKEN,
  RESET_TOKEN_NOT_FOUND,
} from '../../../constants/errorMessage';

export const createUser = async (
  userName:string,
  password: string,
) => {
  let error: Error | HttpException | undefined, session, data;
  try {
    session = await User.startSession();
    session.startTransaction();

    const user = new User({
      userId: randomstring.generate(LENGTH_ID),
      userName,
      password,
      privilege: "user",
    });

    data = await User.findOne({ userName }, null);
    if (data) {
      throw dataConflictException(new Error(EMAIL_EXIST));
    }

    await user.save();

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
    session = await User.startSession();
    session.startTransaction();

    const user = await User.findOne({ userName }, null, { session });
    if (!user) throw dataNotExistException(new Error(EMAIL_NOT_FOUND));

    const { userId } = user;

    const jwtoken = getToken({id:user._id,type:'user'});
    const refreshToken = getRefreshToken({id:user._id,type:'user'});


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

    if (resetToken.type !== "user") throw dataNotExistException(new Error(INVALID_RESET_TOKEN));


    const  userId = "payload";

    const user = await User.findOneAndUpdate({ userId }, { $set: { password } }, { session });
    if (!user) throw dataNotExistException(new Error(ADMIN_NOT_FOUND));

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
