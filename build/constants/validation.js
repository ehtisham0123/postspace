"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHILD_ID = exports.ADMIN_ID = exports.PARENT_ID = exports.VALIDATION_PRODUCT_ID = exports.VALIDATION_TOKEN_TYPE = exports.VALIDATION_PERCENTAGE = exports.VALIDATION_BOOLEAN = exports.VALIDATION_LOCATION = exports.VALIDATION_BOOTH_STATUS = exports.VALIDATION_BOOTH_TYPE = exports.VALIDATION_CANCEL_CAUSE = exports.VALIDATION_CANCEL_REASON = exports.VALIDATION_BOOTH_DISABLED_END_DATETIME = exports.VALIDATION_BOOTH_DISABLED_START_DATETIME = exports.VALIDATION_PAYMENT_METHOD = exports.VALIDATION_MONTH = exports.VALIDATION_DATE = exports.VALIDATION_END_DATETIME = exports.VALIDATION_START_DATETIME = exports.VALIDATION_IMAGE_NULLABLE = exports.VALIDATION_IMAGE = exports.VALIDATION_NUMERIC = exports.VALIDATION_ADMIN_STATUS = exports.VALIDATION_SALON_STATUS = exports.VALIDATION_USER_TYPE = exports.VALIDATION_PRIVILEGE = exports.VALIDATION_PASSWORD_NULLABLE = exports.VALIDATION_CHILD_PASSWORD = exports.VALIDATION_PASSWORD = exports.VALIDATION_LICENSE_NUMBER = exports.VALIDATION_LICENSE_URL = exports.VALIDATION_IDENTITY_URL = exports.VALIDATION_YEAR_OF_EXPERIENCE = exports.VALIDATION_EMAIL = exports.VALIDATION_TEL = exports.VALIDATION_ADDRESS = exports.VALIDATION_CITY = exports.VALIDATION_PREFECTURE = exports.VALIDATION_ZIPCODE = exports.VALIDATION_GENDER = exports.VALIDATION_TWO_DIGITS = exports.VALIDATION_BIRTH = exports.VALIDATION_NAME_KANA = exports.VALIDATION_USER_NAME = exports.VALIDATION_NAME = exports.VALIDATION_ID = exports.VALIDATION_ID_NULLABLE = exports.VALIDATION_STRING_NULLABLE = exports.VALIDATION_IS_ARRAY = exports.VALIDATION_STRING = void 0;
exports.VALIDATION_CARD_ID = exports.VALIDATION_CREDIT_CARD_NAME = exports.VALIDATION_CREDIT_CARD_CVV = exports.VALIDATION_CREDIT_CARD_YEAR = exports.VALIDATION_CREDIT_CARD_EXPIRY = exports.VALIDATION_CREDIT_CARD_NUMBER = exports.VALIDATION_CARAM_SCHOOL = exports.VALIDATION_SCHOOL = exports.VALIDATION_GRADE = exports.VALIDATION_CHILD_ID = exports.VALIDATION_LOGIN_ID = exports.VALIDATION_ROOM_NUMBER = exports.VALIDATION_BUILDING_NAME = exports.VALIDATION_PROVINCE = exports.VALIDATION_ZOOM_PASSWORD = exports.VALIDATION_ZOOM_LICENCE_ID = exports.VALIDATION_ZOOM_ID = exports.VALIDATION_ZOOM_TARGET_GRADE = exports.VALIDATION_SCHEDULE_DATE_ID = exports.VALIDATION_SCHEDULE_UPDATE_DATE_TIME = exports.VALIDATION_UPDATE_SCHEDULE_DATE_TIME = exports.VALIDATION_SCHEDULE_DATE_TIME = exports.VALIDATION_SCHEDULE_TARGET_GRADE = exports.VALIDATION_SCHEDULE_ID = exports.VALIDATION_NEWS_CONTENT = exports.VALIDATION_NEWS_TITLE = exports.VALIDATION_NEWS_ID = exports.USAGE_ID = exports.VALIDATION_PRODUCT_STATUS = exports.VALIDATION_PRODUCT_PRICE = exports.VALIDATION_PRODUCT_NAME = exports.VALIDATION_OFFSET = void 0;
const dayjs_1 = require("../components/utils/dayjs");
const rules_1 = require("./rules");
const regexp_1 = require("./regexp");
const dayjs_2 = __importDefault(require("dayjs"));
const VALIDATION_STRING = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    errorMessage: 'Invalid string',
});
exports.VALIDATION_STRING = VALIDATION_STRING;
const VALIDATION_IS_ARRAY = (where) => ({
    in: [where],
    isArray: true,
    optional: { options: { nullable: true } },
    errorMessage: 'Invalid array',
});
exports.VALIDATION_IS_ARRAY = VALIDATION_IS_ARRAY;
const VALIDATION_STRING_NULLABLE = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    optional: { options: { nullable: true } },
    errorMessage: 'Invalid string',
});
exports.VALIDATION_STRING_NULLABLE = VALIDATION_STRING_NULLABLE;
const VALIDATION_ID_NULLABLE = (where) => ({
    in: [where],
    optional: { options: { nullable: true } },
    isString: true,
    isLength: {
        options: { min: rules_1.LENGTH_ID, max: rules_1.LENGTH_ID },
    },
    errorMessage: 'Invalid ID',
});
exports.VALIDATION_ID_NULLABLE = VALIDATION_ID_NULLABLE;
const VALIDATION_ID = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    isLength: {
        options: { min: rules_1.LENGTH_ID, max: rules_1.LENGTH_ID },
    },
    errorMessage: 'Invalid ID',
});
exports.VALIDATION_ID = VALIDATION_ID;
const VALIDATION_NAME = (where) => ({
    in: [where],
    isString: true,
    isLength: {
        options: { min: rules_1.LENGTH_NAME_MIN, max: rules_1.LENGTH_NAME_MAX },
    },
    errorMessage: 'Invalid name',
});
exports.VALIDATION_NAME = VALIDATION_NAME;
const VALIDATION_USER_NAME = (where) => ({
    in: [where],
    isString: true,
    isLength: {
        options: { min: rules_1.LENGTH_NAME_MIN, max: rules_1.LENGTH_NAME_MAX },
    },
    errorMessage: 'Invalid user name',
});
exports.VALIDATION_USER_NAME = VALIDATION_USER_NAME;
const VALIDATION_NAME_KANA = (where) => ({
    in: [where],
    isString: true,
    isLength: {
        options: { min: rules_1.LENGTH_NAME_MIN, max: rules_1.LENGTH_NAME_MAX },
    },
    matches: {
        options: regexp_1.REGEXP_NAME,
    },
    errorMessage: 'Invalid name kana',
});
exports.VALIDATION_NAME_KANA = VALIDATION_NAME_KANA;
const VALIDATION_BIRTH = (where) => ({
    in: [where],
    notEmpty: true,
    matches: {
        options: regexp_1.REGEXP_BIRTH,
    },
    errorMessage: 'Invalid birth',
});
exports.VALIDATION_BIRTH = VALIDATION_BIRTH;
const VALIDATION_TWO_DIGITS = (where) => ({
    in: [where],
    notEmpty: true,
    matches: {
        options: regexp_1.REGEXP_TWO_DIGITS,
    },
    errorMessage: 'Invalid two digits',
});
exports.VALIDATION_TWO_DIGITS = VALIDATION_TWO_DIGITS;
const VALIDATION_GENDER = (where) => ({
    in: [where],
    notEmpty: true,
    isIn: {
        options: [rules_1.USER_GENDERS],
    },
    errorMessage: "Please provide a valid Gender"
});
exports.VALIDATION_GENDER = VALIDATION_GENDER;
const VALIDATION_ZIPCODE = (where) => ({
    in: [where],
    notEmpty: true,
    isNumeric: true,
    isLength: {
        options: { min: rules_1.LENGTH_ZIPCODE, max: rules_1.LENGTH_ZIPCODE },
    },
    errorMessage: 'Invalid zipcode',
});
exports.VALIDATION_ZIPCODE = VALIDATION_ZIPCODE;
const VALIDATION_PREFECTURE = (where) => ({
    in: [where],
    notEmpty: true,
    isString: true,
    errorMessage: 'Invalid prefecture',
});
exports.VALIDATION_PREFECTURE = VALIDATION_PREFECTURE;
const VALIDATION_CITY = (where) => ({
    in: [where],
    notEmpty: true,
    isString: true,
    errorMessage: 'Invalid city',
});
exports.VALIDATION_CITY = VALIDATION_CITY;
const VALIDATION_ADDRESS = (where) => ({
    in: [where],
    notEmpty: true,
    isString: true,
    errorMessage: 'Invalid address',
});
exports.VALIDATION_ADDRESS = VALIDATION_ADDRESS;
const VALIDATION_TEL = (where) => ({
    in: [where],
    notEmpty: true,
    isNumeric: true,
    isMobilePhone: { options: ['ja-JP'] },
    errorMessage: 'Invalid tel',
});
exports.VALIDATION_TEL = VALIDATION_TEL;
const VALIDATION_EMAIL = (where) => ({
    in: [where],
    isEmail: true,
    isLength: {
        options: { max: rules_1.LENGTH_EMAIL_MAX },
    },
    errorMessage: 'Invalid email',
});
exports.VALIDATION_EMAIL = VALIDATION_EMAIL;
const VALIDATION_YEAR_OF_EXPERIENCE = (where) => ({
    in: [where],
    notEmpty: true,
    isIn: {
        options: [rules_1.USER_EXPERIENCES],
    },
    errorMessage: 'Invalid year of experience',
});
exports.VALIDATION_YEAR_OF_EXPERIENCE = VALIDATION_YEAR_OF_EXPERIENCE;
const VALIDATION_IDENTITY_URL = (where) => ({
    in: [where],
    isString: true,
    isLength: {
        options: { max: rules_1.LENGTH_URL_MAX },
    },
    errorMessage: 'Invalid identity url',
});
exports.VALIDATION_IDENTITY_URL = VALIDATION_IDENTITY_URL;
const VALIDATION_LICENSE_URL = (where) => ({
    in: [where],
    isString: true,
    isLength: {
        options: { max: rules_1.LENGTH_URL_MAX },
    },
    errorMessage: 'Invalid license url',
});
exports.VALIDATION_LICENSE_URL = VALIDATION_LICENSE_URL;
const VALIDATION_LICENSE_NUMBER = (where) => ({
    in: [where],
    isString: true,
    isLength: {
        options: { max: rules_1.LENGTH_LICENSE_NUMBER_MAX },
    },
    errorMessage: 'Invalid license number',
});
exports.VALIDATION_LICENSE_NUMBER = VALIDATION_LICENSE_NUMBER;
const VALIDATION_PASSWORD = (where) => ({
    in: [where],
    isString: true,
    matches: {
        options: regexp_1.REGEXP_PASSWORD,
    },
    isLength: {
        options: { min: rules_1.LENGTH_PASSWORD_MIN, max: rules_1.LENGTH_PASSWORD_MAX },
    },
    errorMessage: 'Invalid password',
});
exports.VALIDATION_PASSWORD = VALIDATION_PASSWORD;
const VALIDATION_CHILD_PASSWORD = (where) => ({
    in: [where],
    isString: true,
    matches: {
        options: regexp_1.REGEXP_CHILD_PASSWORD,
    },
    isLength: {
        options: { min: rules_1.LENGTH_PASSWORD_MIN, max: rules_1.LENGTH_PASSWORD_MAX },
    },
    errorMessage: 'Invalid password',
});
exports.VALIDATION_CHILD_PASSWORD = VALIDATION_CHILD_PASSWORD;
const VALIDATION_PASSWORD_NULLABLE = (where) => ({
    in: [where],
    optional: { options: { nullable: true } },
    isString: true,
    matches: {
        options: regexp_1.REGEXP_PASSWORD,
    },
    isLength: {
        options: { min: rules_1.LENGTH_PASSWORD_MIN, max: rules_1.LENGTH_PASSWORD_MAX },
    },
    errorMessage: 'Invalid password',
});
exports.VALIDATION_PASSWORD_NULLABLE = VALIDATION_PASSWORD_NULLABLE;
const VALIDATION_PRIVILEGE = (where) => ({
    in: [where],
    notEmpty: true,
    isIn: {
        options: [rules_1.ADMIN_AUTHORITY_TYPE_LABELS],
    },
    errorMessage: 'Invalid privilege',
});
exports.VALIDATION_PRIVILEGE = VALIDATION_PRIVILEGE;
const VALIDATION_USER_TYPE = (where) => ({
    in: [where],
    optional: { options: { nullable: true } },
    isIn: {
        options: [rules_1.USER_TYPES],
    },
    errorMessage: 'Invalid user type',
});
exports.VALIDATION_USER_TYPE = VALIDATION_USER_TYPE;
const VALIDATION_SALON_STATUS = (where) => ({
    in: [where],
    notEmpty: true,
    isIn: {
        options: [rules_1.SALON_STATUSES],
    },
    errorMessage: 'Invalid salon status',
});
exports.VALIDATION_SALON_STATUS = VALIDATION_SALON_STATUS;
const VALIDATION_ADMIN_STATUS = (where) => ({
    in: [where],
    notEmpty: true,
    isIn: {
        options: [rules_1.ADMIN_AUTHORITY_TYPE_LABELS],
    },
    errorMessage: 'Invalid admin status',
});
exports.VALIDATION_ADMIN_STATUS = VALIDATION_ADMIN_STATUS;
const VALIDATION_NUMERIC = (where) => ({
    in: [where],
    notEmpty: true,
    isNumeric: true,
    errorMessage: 'Invalid numeric',
});
exports.VALIDATION_NUMERIC = VALIDATION_NUMERIC;
const VALIDATION_IMAGE = (where) => ({
    in: [where],
    notEmpty: true,
    isString: true,
    errorMessage: 'Invalid image',
});
exports.VALIDATION_IMAGE = VALIDATION_IMAGE;
const VALIDATION_IMAGE_NULLABLE = (where) => ({
    in: [where],
    optional: { options: { nullable: true } },
    notEmpty: true,
    isString: true,
    errorMessage: 'Invalid image',
});
exports.VALIDATION_IMAGE_NULLABLE = VALIDATION_IMAGE_NULLABLE;
const VALIDATION_START_DATETIME = (where) => ({
    in: [where],
    matches: {
        options: regexp_1.REGEXP_DATETIME,
    },
    custom: {
        options: (value, { req, location, path }) => {
            return (0, dayjs_1.compareAIsAfterB)((0, dayjs_1.getTime)(value).format(), (0, dayjs_1.getCurrentTime)().format());
        },
    },
    errorMessage: 'Invalid start datetime',
});
exports.VALIDATION_START_DATETIME = VALIDATION_START_DATETIME;
const VALIDATION_END_DATETIME = (where) => ({
    in: [where],
    matches: {
        options: regexp_1.REGEXP_DATETIME,
    },
    custom: {
        options: (value, { req, location, path }) => {
            return (0, dayjs_1.compareAIsBeforeTimeB)(req.body.startTime, value);
        },
    },
    errorMessage: 'Invalid end datetime',
});
exports.VALIDATION_END_DATETIME = VALIDATION_END_DATETIME;
const VALIDATION_DATE = (where) => ({
    in: [where],
    notEmpty: true,
    matches: {
        options: regexp_1.REGEXP_DATETIME,
    },
    errorMessage: 'Invalid date',
});
exports.VALIDATION_DATE = VALIDATION_DATE;
const VALIDATION_MONTH = (where) => ({
    in: [where],
    notEmpty: true,
    isIn: {
        options: [rules_1.MONTHS],
    },
    errorMessage: 'Invalid month',
});
exports.VALIDATION_MONTH = VALIDATION_MONTH;
const VALIDATION_PAYMENT_METHOD = (where) => ({
    in: [where],
    notEmpty: true,
    isIn: {
        options: [rules_1.PAYMENT_METHODS],
    },
    errorMessage: 'Invalid payment method',
});
exports.VALIDATION_PAYMENT_METHOD = VALIDATION_PAYMENT_METHOD;
const VALIDATION_BOOTH_DISABLED_START_DATETIME = (where) => ({
    in: [where],
    matches: {
        options: regexp_1.REGEXP_DATETIME,
    },
    custom: {
        options: (value, { req, location, path }) => {
            return (0, dayjs_1.compareAIsAfterB)(value, (0, dayjs_1.getCurrentTime)().format());
        },
    },
    errorMessage: 'Invalid start datetime',
});
exports.VALIDATION_BOOTH_DISABLED_START_DATETIME = VALIDATION_BOOTH_DISABLED_START_DATETIME;
const VALIDATION_BOOTH_DISABLED_END_DATETIME = (where) => ({
    in: [where],
    matches: {
        options: regexp_1.REGEXP_DATETIME,
    },
    custom: {
        options: (value, { req, location, path }) => {
            return (0, dayjs_1.compareAIsBeforeTimeB)(req.body.startTime, value);
        },
    },
    errorMessage: 'Invalid end datetime',
});
exports.VALIDATION_BOOTH_DISABLED_END_DATETIME = VALIDATION_BOOTH_DISABLED_END_DATETIME;
const VALIDATION_CANCEL_REASON = (where) => ({
    in: [where],
    notEmpty: true,
    isIn: {
        options: [rules_1.RESERVATION_CANCEL_EVENT_REASONS],
    },
    errorMessage: 'Invalid cancel reason',
});
exports.VALIDATION_CANCEL_REASON = VALIDATION_CANCEL_REASON;
const VALIDATION_CANCEL_CAUSE = (where) => ({
    in: [where],
    notEmpty: true,
    isIn: {
        options: [rules_1.RESERVATION_CANCEL_EVENT_CAUSES],
    },
    errorMessage: 'Invalid cancel cause',
});
exports.VALIDATION_CANCEL_CAUSE = VALIDATION_CANCEL_CAUSE;
const VALIDATION_BOOTH_TYPE = (where) => ({
    in: [where],
    notEmpty: true,
    isIn: {
        options: [rules_1.BOOTH_TYPES],
    },
    errorMessage: 'Invalid booth type',
});
exports.VALIDATION_BOOTH_TYPE = VALIDATION_BOOTH_TYPE;
const VALIDATION_BOOTH_STATUS = (where) => ({
    in: [where],
    notEmpty: true,
    isIn: {
        options: [rules_1.BOOTH_STATUSES],
    },
    errorMessage: 'Invalid booth status',
});
exports.VALIDATION_BOOTH_STATUS = VALIDATION_BOOTH_STATUS;
const VALIDATION_LOCATION = (where) => ({
    in: [where],
    isArray: true,
    custom: {
        options: (value, { req, location, path }) => {
            return value.length === 2;
        },
    },
    errorMessage: 'Invalid location',
});
exports.VALIDATION_LOCATION = VALIDATION_LOCATION;
const VALIDATION_BOOLEAN = (where) => ({
    in: [where],
    isBoolean: true,
    errorMessage: 'Invalid boolean',
});
exports.VALIDATION_BOOLEAN = VALIDATION_BOOLEAN;
const VALIDATION_PERCENTAGE = (where) => ({
    in: [where],
    notEmpty: true,
    isIn: {
        options: [rules_1.PERCENTAGE_OPTIONS],
    },
    errorMessage: 'Invalid percentage',
});
exports.VALIDATION_PERCENTAGE = VALIDATION_PERCENTAGE;
const VALIDATION_TOKEN_TYPE = (where) => ({
    in: [where],
    notEmpty: true,
    isIn: {
        options: [rules_1.RESET_TOKEN_TYPES],
    },
    errorMessage: 'Invalid token type',
});
exports.VALIDATION_TOKEN_TYPE = VALIDATION_TOKEN_TYPE;
const VALIDATION_PRODUCT_ID = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    errorMessage: 'Invalid product id',
});
exports.VALIDATION_PRODUCT_ID = VALIDATION_PRODUCT_ID;
const PARENT_ID = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    errorMessage: 'Parent Id is required in params',
});
exports.PARENT_ID = PARENT_ID;
const ADMIN_ID = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    errorMessage: 'Admin Id is required in params',
});
exports.ADMIN_ID = ADMIN_ID;
const CHILD_ID = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    errorMessage: 'Child Id is required in params',
});
exports.CHILD_ID = CHILD_ID;
const VALIDATION_OFFSET = (where) => ({
    in: [where],
    isNumeric: true,
    notEmpty: true,
    errorMessage: 'Offset must be a number and not empty'
});
exports.VALIDATION_OFFSET = VALIDATION_OFFSET;
const VALIDATION_PRODUCT_NAME = (where) => ({
    in: [where],
    notEmpty: true,
    isString: true,
    errorMessage: 'Invalid product name',
});
exports.VALIDATION_PRODUCT_NAME = VALIDATION_PRODUCT_NAME;
const VALIDATION_PRODUCT_PRICE = (where) => ({
    in: [where],
    notEmpty: true,
    isNumeric: true,
    errorMessage: 'Invalid product price',
});
exports.VALIDATION_PRODUCT_PRICE = VALIDATION_PRODUCT_PRICE;
// status
const VALIDATION_PRODUCT_STATUS = (where) => ({
    in: [where],
    notEmpty: true,
    isBoolean: true,
    // can be null
    optional: { options: { nullable: true } },
    errorMessage: 'Invalid product status',
});
exports.VALIDATION_PRODUCT_STATUS = VALIDATION_PRODUCT_STATUS;
const USAGE_ID = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    errorMessage: 'USAGE Id is required in params',
});
exports.USAGE_ID = USAGE_ID;
const VALIDATION_NEWS_ID = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    errorMessage: 'Invalid News id',
});
exports.VALIDATION_NEWS_ID = VALIDATION_NEWS_ID;
const VALIDATION_NEWS_TITLE = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid News title' });
exports.VALIDATION_NEWS_TITLE = VALIDATION_NEWS_TITLE;
const VALIDATION_NEWS_CONTENT = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid News content' });
exports.VALIDATION_NEWS_CONTENT = VALIDATION_NEWS_CONTENT;
const VALIDATION_SCHEDULE_ID = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Schedule id' });
exports.VALIDATION_SCHEDULE_ID = VALIDATION_SCHEDULE_ID;
// Target Group
// 1. grades 1-3
// 2. grades 4-6
let targetGroup = [1, 2];
const VALIDATION_SCHEDULE_TARGET_GRADE = (where) => ({ in: [where], isString: true, notEmpty: true, isIn: { options: [targetGroup] }, errorMessage: 'Invalid Target Group' });
exports.VALIDATION_SCHEDULE_TARGET_GRADE = VALIDATION_SCHEDULE_TARGET_GRADE;
// dateTime format: 2020-12-31T23:59:59.999Z (ISO 8601)
// is an array of dateTime
const VALIDATION_SCHEDULE_DATE_TIME = (where) => ({ in: [where], isArray: true, errorMessage: 'Invalid Schedule dateTime here',
    custom: {
        options: (value, { req, location, path }) => {
            return value.every((item) => {
                // check valid date with dayjs in format: 2020-12-31T23:59:59.999Z
                return (0, dayjs_2.default)(item).isValid();
            });
        }
    }
});
exports.VALIDATION_SCHEDULE_DATE_TIME = VALIDATION_SCHEDULE_DATE_TIME;
const VALIDATION_UPDATE_SCHEDULE_DATE_TIME = (where) => ({ in: [where], isArray: true, errorMessage: 'Invalid Schedule dateTime here',
    optional: { options: { nullable: true } },
    custom: {
        options: (value, { req, location, path }) => {
            return value.every((item) => {
                // check valid date with dayjs in format: 2020-12-31T23:59:59.999Z
                return (0, dayjs_2.default)(item).isValid();
            });
        }
    }
});
exports.VALIDATION_UPDATE_SCHEDULE_DATE_TIME = VALIDATION_UPDATE_SCHEDULE_DATE_TIME;
// export const VALIDATION_SCHEDULE_UPDATE_DATE_TIME  is and array  object with 2 keys
// 1. dateTime
// 2. _id
const VALIDATION_SCHEDULE_UPDATE_DATE_TIME = (where) => ({ in: [where], isArray: true, errorMessage: 'Invalid Schedule dateTime update',
    optional: { options: { nullable: true } },
    custom: {
        options: (value, { req, location, path }) => {
            return value.every((item) => {
                // check valid date with dayjs in format: 2020-12-31T23:59:59.999Z
                return (0, dayjs_2.default)(item.dateTime).isValid() && item._id;
            });
        }
    }
});
exports.VALIDATION_SCHEDULE_UPDATE_DATE_TIME = VALIDATION_SCHEDULE_UPDATE_DATE_TIME;
// removed Date validation with dates id and ids are array of string and can be null
const VALIDATION_SCHEDULE_DATE_ID = (where) => ({ in: [where], isArray: true, errorMessage: 'Invalid Schedule date id', optional: { options: { nullable: true } },
    custom: {
        options: (value, { req, location, path }) => {
            return value.every((item) => {
                return typeof item === 'string';
            });
        }
    }
});
exports.VALIDATION_SCHEDULE_DATE_ID = VALIDATION_SCHEDULE_DATE_ID;
const VALIDATION_ZOOM_TARGET_GRADE = (where) => ({ in: [where], isString: true, notEmpty: true, isIn: { options: [targetGroup] }, errorMessage: 'Invalid Target Group' });
exports.VALIDATION_ZOOM_TARGET_GRADE = VALIDATION_ZOOM_TARGET_GRADE;
const VALIDATION_ZOOM_ID = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Zoom room id' });
exports.VALIDATION_ZOOM_ID = VALIDATION_ZOOM_ID;
const VALIDATION_ZOOM_LICENCE_ID = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Zoom licence id' });
exports.VALIDATION_ZOOM_LICENCE_ID = VALIDATION_ZOOM_LICENCE_ID;
// zoom password is required
const VALIDATION_ZOOM_PASSWORD = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Zoom password' });
exports.VALIDATION_ZOOM_PASSWORD = VALIDATION_ZOOM_PASSWORD;
// VALIDATION_PROVINCE
const VALIDATION_PROVINCE = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Province' });
exports.VALIDATION_PROVINCE = VALIDATION_PROVINCE;
// VALIDATION_BUILDING_NAME
const VALIDATION_BUILDING_NAME = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Building name', optional: { options: { nullable: true } } });
exports.VALIDATION_BUILDING_NAME = VALIDATION_BUILDING_NAME;
// VALIDATION_ROOM_NUMBER
const VALIDATION_ROOM_NUMBER = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Room number', optional: { options: { nullable: true } } });
exports.VALIDATION_ROOM_NUMBER = VALIDATION_ROOM_NUMBER;
// VALIDATION_LOGIN_ID,
const VALIDATION_LOGIN_ID = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Login id',
    isLength: { options: { min: 6, max: rules_1.LENGTH_NAME_MAX } }
});
exports.VALIDATION_LOGIN_ID = VALIDATION_LOGIN_ID;
// VALIDATION_CHILD_ID
const VALIDATION_CHILD_ID = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Child id' });
exports.VALIDATION_CHILD_ID = VALIDATION_CHILD_ID;
// VALIDATION_GRADE,
const VALIDATION_GRADE = (where) => ({ in: [where], isNumeric: true, notEmpty: true, errorMessage: 'Invalid Grade', isIn: { options: [targetGroup] } });
exports.VALIDATION_GRADE = VALIDATION_GRADE;
// VALIDATION_SCHOOL,
const VALIDATION_SCHOOL = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid School' });
exports.VALIDATION_SCHOOL = VALIDATION_SCHOOL;
// VALIDATION_CARAM_SCHOOL
const VALIDATION_CARAM_SCHOOL = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Caram School' });
exports.VALIDATION_CARAM_SCHOOL = VALIDATION_CARAM_SCHOOL;
// VALIDATION Credit CARD NUMBER with min 12 and max 19 digits
const VALIDATION_CREDIT_CARD_NUMBER = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Card number must be between 13 and 19 digits long', isLength: { options: { min: 12, max: 19 } } });
exports.VALIDATION_CREDIT_CARD_NUMBER = VALIDATION_CREDIT_CARD_NUMBER;
// VALIDATION_CREDIT_CARD_EXPIRY is a string with format: MM
const VALIDATION_CREDIT_CARD_EXPIRY = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Expiry date', isLength: { options: { min: 2, max: 2 } } });
exports.VALIDATION_CREDIT_CARD_EXPIRY = VALIDATION_CREDIT_CARD_EXPIRY;
// VALIDATION_CREDIT_CARD_YEAR is a string with format: YYYY
const VALIDATION_CREDIT_CARD_YEAR = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Expiry year', isLength: { options: { min: 4, max: 4 } } });
exports.VALIDATION_CREDIT_CARD_YEAR = VALIDATION_CREDIT_CARD_YEAR;
// VALIDATION_CREDIT_CARD_CVV is a string with format: 3 digits
const VALIDATION_CREDIT_CARD_CVV = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid CVV', isLength: { options: { min: 3, max: 3 } } });
exports.VALIDATION_CREDIT_CARD_CVV = VALIDATION_CREDIT_CARD_CVV;
// VALIDATION_CREDIT_CARD_NAME is a string with format: 3 digits and can be null
const VALIDATION_CREDIT_CARD_NAME = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Name', isLength: { options: { min: 3, max: 50 } }, optional: { options: { nullable: true } } });
exports.VALIDATION_CREDIT_CARD_NAME = VALIDATION_CREDIT_CARD_NAME;
// VALIDATION_CARD_ID is a string
const VALIDATION_CARD_ID = (where) => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Payment Method id' });
exports.VALIDATION_CARD_ID = VALIDATION_CARD_ID;
