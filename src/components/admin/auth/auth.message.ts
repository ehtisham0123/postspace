import { ADMIN_EMAIL } from '../../../constants/rules';
// import { FRONT_ADMIN_URL, SENDGRID_EMAIL_SENDER } from '../../../middleware/env';

// /**
//  * @description 仮
//  * @param email
//  * @param code
//  * @returns
//  */
// export const RESET_PASSWORD_MESSAGE = (email: string, token: string) => ({
//   to: email,
//   from: SENDGRID_EMAIL_SENDER,
//   subject: 'Acceptance of password reset requests',
//   text: `Your password reset has been accepted. Please complete the password reset at the following URL. ${FRONT_ADMIN_URL}/resetPassword/${token}Please note that you may not be able to use the service if you do not complete the confirmation within one hour.  `,
//   html: `Your password reset has been accepted. <br>Please complete the password reset at the following URL.<br><a href="${FRONT_ADMIN_URL}/resetPassword/${token}">${FRONT_ADMIN_URL}/resetPassword/${token}</a><br><br>Please note that you may not be able to use the service if you do not complete the confirmation within one hour.`,
// });

// export const CONFIRM_REGISTRATION_MESSAGE = (email: string) => ({
//   to: email,
//   from: SENDGRID_EMAIL_SENDER,
//   subject: 'Reception of salon manager registration',
//   text: `Salon manager registration accepted. We are currently reviewing, so please wait for a while`,
//   html: `Salon manager registration accepted. <br>We are currently reviewing, so please wait for a while. `,
// });

// export const CONFIRM_REGISTRATION_MESSAGE_TO_ADMIN = () => ({
//   to: ADMIN_EMAIL,
//   from: SENDGRID_EMAIL_SENDER,
//   subject: 'Reception of salon manager registration',
//   text: `サロン管理者登録の受け付けました。${FRONT_ADMIN_URL}`,
//   html: `サロン管理者登録の受け付けました。<br>管理ページで確認してください。<br>${FRONT_ADMIN_URL}`,
// });
