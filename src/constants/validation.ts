import { VALIDATION } from './errorMessage';
import { ParamSchema, Location } from 'express-validator';
import { compareAIsAfterB, compareAIsBeforeTimeB, getCurrentTime, getTime } from '../components/utils/dayjs';
import {
  ADMIN_AUTHORITY_TYPE_LABELS,
  BOOTH_STATUSES,
  BOOTH_TYPES,
  PAYMENT_METHODS,
  PERCENTAGE_OPTIONS,
  RESERVATION_CANCEL_EVENT_CAUSES,
  RESERVATION_CANCEL_EVENT_REASONS,
  SALON_STATUSES,
  MONTHS,
  USER_EXPERIENCES,
  USER_GENDERS,
  USER_TYPES,
  LENGTH_EMAIL_MAX,
  LENGTH_ID,
  LENGTH_LICENSE_NUMBER_MAX,
  LENGTH_NAME_MAX,
  LENGTH_NAME_MIN,
  LENGTH_PASSWORD_MAX,
  LENGTH_PASSWORD_MIN,
  LENGTH_URL_MAX,
  LENGTH_ZIPCODE,
  RESET_TOKEN_TYPES,
} from './rules';

import { REGEXP_BIRTH, REGEXP_CHILD_PASSWORD, REGEXP_DATETIME, REGEXP_NAME, REGEXP_PASSWORD, REGEXP_TWO_DIGITS } from './regexp';
import dayjs from 'dayjs';

export const VALIDATION_STRING = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  errorMessage: 'Invalid string',
});

export const VALIDATION_IS_ARRAY = (where: Location): ParamSchema => ({
  in: [where],
  isArray: true,
  optional: { options: { nullable: true } },
  errorMessage: 'Invalid array',
});

export const VALIDATION_STRING_NULLABLE = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  optional: { options: { nullable: true } },
  errorMessage: 'Invalid string',
});

export const VALIDATION_ID_NULLABLE = (where: Location): ParamSchema => ({
  in: [where],
  optional: { options: { nullable: true } },
  isString: true,
  isLength: {
    options: { min: LENGTH_ID, max: LENGTH_ID },
  },
  errorMessage: 'Invalid ID',
});
export const VALIDATION_ID = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  isLength: {
    options: { min: LENGTH_ID, max: LENGTH_ID },
  },
  errorMessage: 'Invalid ID',
});

export const VALIDATION_NAME = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  isLength: {
    options: { min: LENGTH_NAME_MIN, max: LENGTH_NAME_MAX },
  },
  errorMessage: 'Invalid name',
});
export const VALIDATION_USER_NAME = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  isLength: {
    options: { min: LENGTH_NAME_MIN, max: LENGTH_NAME_MAX },
  },
  errorMessage: 'Invalid user name',
});

export const VALIDATION_NAME_KANA = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  isLength: {
    options: { min: LENGTH_NAME_MIN, max: LENGTH_NAME_MAX },
  },
  matches: {
    options: REGEXP_NAME,
  },
  errorMessage: 'Invalid name kana',
});

export const VALIDATION_BIRTH = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  matches: {
    options: REGEXP_BIRTH,
  },
  errorMessage: 'Invalid birth',
});

export const VALIDATION_TWO_DIGITS = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  matches: {
    options: REGEXP_TWO_DIGITS,
  },
  errorMessage: 'Invalid two digits',
});

export const VALIDATION_GENDER = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isIn: {
    options: [USER_GENDERS],
  },
  errorMessage:"Please provide a valid Gender"
});

export const VALIDATION_ZIPCODE = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isNumeric: true,
  isLength: {
    options: { min: LENGTH_ZIPCODE, max: LENGTH_ZIPCODE },
  },
  errorMessage: 'Invalid zipcode',
});

export const VALIDATION_PREFECTURE = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isString: true,
  errorMessage: 'Invalid prefecture',
});

export const VALIDATION_CITY = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isString: true,
  errorMessage: 'Invalid city',
});

export const VALIDATION_ADDRESS = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isString: true,
  errorMessage: 'Invalid address',
});

export const VALIDATION_TEL = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isNumeric: true,
  isMobilePhone: { options: ['ja-JP'] },
  errorMessage: 'Invalid tel',
});

export const VALIDATION_EMAIL = (where: Location): ParamSchema => ({
  in: [where],
  isEmail: true,
  isLength: {
    options: { max: LENGTH_EMAIL_MAX },
  },
  errorMessage: 'Invalid email',
});

export const VALIDATION_YEAR_OF_EXPERIENCE = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isIn: {
    options: [USER_EXPERIENCES],
  },
  errorMessage: 'Invalid year of experience',
});

export const VALIDATION_IDENTITY_URL = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  isLength: {
    options: { max: LENGTH_URL_MAX },
  },
  errorMessage: 'Invalid identity url',
});

export const VALIDATION_LICENSE_URL = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  isLength: {
    options: { max: LENGTH_URL_MAX },
  },
  errorMessage: 'Invalid license url',
});

export const VALIDATION_LICENSE_NUMBER = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  isLength: {
    options: { max: LENGTH_LICENSE_NUMBER_MAX },
  },
  errorMessage: 'Invalid license number',
});

export const VALIDATION_PASSWORD = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  matches: {
    options: REGEXP_PASSWORD,
  },
  isLength: {
    options: { min: LENGTH_PASSWORD_MIN, max: LENGTH_PASSWORD_MAX },
  },
  errorMessage: 'Invalid password',
});
export const VALIDATION_CHILD_PASSWORD = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  matches: {
    options: REGEXP_CHILD_PASSWORD,
  },
  isLength: {
    options: { min: LENGTH_PASSWORD_MIN, max: LENGTH_PASSWORD_MAX },
  },
  errorMessage: 'Invalid password',
});

export const VALIDATION_PASSWORD_NULLABLE = (where: Location): ParamSchema => ({
  in: [where],
  optional: { options: { nullable: true } },
  isString: true,
  matches: {
    options: REGEXP_PASSWORD,
  },
  isLength: {
    options: { min: LENGTH_PASSWORD_MIN, max: LENGTH_PASSWORD_MAX },
  },
  errorMessage: 'Invalid password',
});

export const VALIDATION_PRIVILEGE = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isIn: {
    options: [ADMIN_AUTHORITY_TYPE_LABELS],
  },
  errorMessage: 'Invalid privilege',
});



export const VALIDATION_USER_TYPE = (where: Location): ParamSchema => ({
  in: [where],
  optional: { options: { nullable: true } },
  isIn: {
    options: [USER_TYPES],
  },
  errorMessage: 'Invalid user type',
});

export const VALIDATION_SALON_STATUS = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isIn: {
    options: [SALON_STATUSES],
  },
  errorMessage: 'Invalid salon status',
});

export const VALIDATION_ADMIN_STATUS = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isIn: {
    options: [ADMIN_AUTHORITY_TYPE_LABELS],
  },
  errorMessage: 'Invalid admin status',

});

export const VALIDATION_NUMERIC = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isNumeric: true,
  errorMessage: 'Invalid numeric',
});

export const VALIDATION_IMAGE = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isString: true,
  errorMessage: 'Invalid image',
});

export const VALIDATION_IMAGE_NULLABLE = (where: Location): ParamSchema => ({
  in: [where],
  optional: { options: { nullable: true } },
  notEmpty: true,
  isString: true,
  errorMessage: 'Invalid image',
});

export const VALIDATION_START_DATETIME = (where: Location): ParamSchema => ({
  in: [where],
  matches: {
    options: REGEXP_DATETIME,
  },
  custom: {
    options: (value, { req, location, path }) => {
      return compareAIsAfterB(getTime(value).format(), getCurrentTime().format());
    },
  },
  errorMessage: 'Invalid start datetime',
});

export const VALIDATION_END_DATETIME = (where: Location): ParamSchema => ({
  in: [where],
  matches: {
    options: REGEXP_DATETIME,
  },
  custom: {
    options: (value, { req, location, path }) => {
      return compareAIsBeforeTimeB(req.body.startTime, value);
    },
  },
  errorMessage: 'Invalid end datetime',
});

export const VALIDATION_DATE = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  matches: {
    options: REGEXP_DATETIME,
  },
  errorMessage: 'Invalid date',
});

export const VALIDATION_MONTH = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isIn: {
    options: [MONTHS],
  },
  errorMessage: 'Invalid month',
});

export const VALIDATION_PAYMENT_METHOD = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isIn: {
    options: [PAYMENT_METHODS],
  },
  errorMessage: 'Invalid payment method',
});

export const VALIDATION_BOOTH_DISABLED_START_DATETIME = (where: Location): ParamSchema => ({
  in: [where],
  matches: {
    options: REGEXP_DATETIME,
  },
  custom: {
    options: (value, { req, location, path }) => {
      return compareAIsAfterB(value, getCurrentTime().format());
    },
  },
  errorMessage: 'Invalid start datetime',
});

export const VALIDATION_BOOTH_DISABLED_END_DATETIME = (where: Location): ParamSchema => ({
  in: [where],
  matches: {
    options: REGEXP_DATETIME,
  },
  custom: {
    options: (value, { req, location, path }) => {
      return compareAIsBeforeTimeB(req.body.startTime, value);
    },
  },
  errorMessage: 'Invalid end datetime',

});

export const VALIDATION_CANCEL_REASON = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isIn: {
    options: [RESERVATION_CANCEL_EVENT_REASONS],
  },
  errorMessage: 'Invalid cancel reason',
});

export const VALIDATION_CANCEL_CAUSE = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isIn: {
    options: [RESERVATION_CANCEL_EVENT_CAUSES],
  },
  errorMessage: 'Invalid cancel cause',
});

export const VALIDATION_BOOTH_TYPE = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isIn: {
    options: [BOOTH_TYPES],
  },
  errorMessage: 'Invalid booth type',
});

export const VALIDATION_BOOTH_STATUS = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isIn: {
    options: [BOOTH_STATUSES],
  },
  errorMessage: 'Invalid booth status',
});

export const VALIDATION_LOCATION = (where: Location): ParamSchema => ({
  in: [where],
  isArray: true,
  custom: {
    options: (value, { req, location, path }) => {
      return value.length === 2;
    },
  },
  errorMessage: 'Invalid location',
});

export const VALIDATION_BOOLEAN = (where: Location): ParamSchema => ({
  in: [where],
  isBoolean: true,
  errorMessage: 'Invalid boolean',
});

export const VALIDATION_PERCENTAGE = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isIn: {
    options: [PERCENTAGE_OPTIONS],
  },
  errorMessage: 'Invalid percentage',
});

export const VALIDATION_TOKEN_TYPE = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isIn: {
    options: [RESET_TOKEN_TYPES],
  },
  errorMessage: 'Invalid token type',
});



export const VALIDATION_PRODUCT_ID = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  errorMessage: 'Invalid product id',
});
export const PARENT_ID = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  errorMessage: 'Parent Id is required in params',
});

export const ADMIN_ID = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  errorMessage: 'Admin Id is required in params',
});
export const CHILD_ID = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  errorMessage: 'Child Id is required in params',
});
export const VALIDATION_OFFSET = (where: Location): ParamSchema => ({
  in: [where],
  isNumeric: true,
  notEmpty: true,
  errorMessage: 'Offset must be a number and not empty'
});

export const VALIDATION_PRODUCT_NAME = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isString: true,
  errorMessage: 'Invalid product name',
});


export const VALIDATION_PRODUCT_PRICE = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isNumeric: true,
  errorMessage: 'Invalid product price',
});

// status


export const VALIDATION_PRODUCT_STATUS = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isBoolean: true,
  // can be null
  optional: { options: { nullable: true } },
  errorMessage: 'Invalid product status',
});


export const USAGE_ID = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  errorMessage: 'USAGE Id is required in params',
});

export const VALIDATION_NEWS_ID = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  errorMessage: 'Invalid News id',
});

export const VALIDATION_NEWS_TITLE = (where: Location): ParamSchema => ({in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid News title'});
export const VALIDATION_NEWS_CONTENT = (where: Location): ParamSchema => ({in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid News content'});

export const VALIDATION_SCHEDULE_ID = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Schedule id' });

// Target Group
// 1. grades 1-3
// 2. grades 4-6

let targetGroup = [1, 2];

export const VALIDATION_SCHEDULE_TARGET_GRADE = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, isIn: { options: [targetGroup] }, errorMessage: 'Invalid Target Group' });

// dateTime format: 2020-12-31T23:59:59.999Z (ISO 8601)
// is an array of dateTime

export const VALIDATION_SCHEDULE_DATE_TIME = (where: Location): ParamSchema => ({ in: [where], isArray: true, errorMessage: 'Invalid Schedule dateTime here',

custom: {
    options: (value, { req, location, path }) => {
      return value.every((item:string) => {
        // check valid date with dayjs in format: 2020-12-31T23:59:59.999Z
        return dayjs(item).isValid();
      });
    }
  }
});


export const VALIDATION_UPDATE_SCHEDULE_DATE_TIME = (where: Location): ParamSchema => ({ in: [where], isArray: true, errorMessage: 'Invalid Schedule dateTime here',
optional: { options: { nullable: true } },
custom: {
    options: (value, { req, location, path }) => {
      return value.every((item:string) => {
        // check valid date with dayjs in format: 2020-12-31T23:59:59.999Z
        return dayjs(item).isValid();
      });
    }
  }
});


// export const VALIDATION_SCHEDULE_UPDATE_DATE_TIME  is and array  object with 2 keys
// 1. dateTime
// 2. _id

export const VALIDATION_SCHEDULE_UPDATE_DATE_TIME = (where: Location): ParamSchema => ({ in: [where], isArray: true, errorMessage: 'Invalid Schedule dateTime update',
optional: { options: { nullable: true } },
custom: {

    options: (value, { req, location, path }) => {
      return value.every((item:any) => {
        // check valid date with dayjs in format: 2020-12-31T23:59:59.999Z
        return dayjs(item.dateTime).isValid() && item._id;
      });
    }
  }
});



// removed Date validation with dates id and ids are array of string and can be null

export const VALIDATION_SCHEDULE_DATE_ID = (where: Location): ParamSchema => ({ in: [where], isArray: true, errorMessage: 'Invalid Schedule date id' ,optional: { options: { nullable: true } }
,
custom: {
    options: (value, { req, location, path }) => {
      return value.every((item:string) => {
        return typeof item === 'string';
      });
    }
  }
});



export const VALIDATION_ZOOM_TARGET_GRADE = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, isIn: { options: [targetGroup] }, errorMessage: 'Invalid Target Group' });

export const VALIDATION_ZOOM_ID = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Zoom room id' });
export const VALIDATION_ZOOM_LICENCE_ID = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Zoom licence id' });

// zoom password is required

export const VALIDATION_ZOOM_PASSWORD = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Zoom password' });


// VALIDATION_PROVINCE

export const VALIDATION_PROVINCE = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Province' });

// VALIDATION_BUILDING_NAME

export const VALIDATION_BUILDING_NAME = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Building name' ,optional: { options: { nullable: true } } });

// VALIDATION_ROOM_NUMBER

export const VALIDATION_ROOM_NUMBER = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Room number',optional: { options: { nullable: true } } })



// VALIDATION_LOGIN_ID,

export const VALIDATION_LOGIN_ID = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Login id' ,
isLength: { options: { min: 6, max: LENGTH_NAME_MAX } } 
});


// VALIDATION_CHILD_ID

export const VALIDATION_CHILD_ID = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Child id' });

// VALIDATION_GRADE,

export const VALIDATION_GRADE = (where: Location): ParamSchema => ({ in: [where], isNumeric:true , notEmpty: true, errorMessage: 'Invalid Grade',isIn: { options: [targetGroup] } });

// VALIDATION_SCHOOL,

export const VALIDATION_SCHOOL = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid School' });

// VALIDATION_CARAM_SCHOOL

export const VALIDATION_CARAM_SCHOOL = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Caram School' });

// VALIDATION Credit CARD NUMBER with min 12 and max 19 digits

export const VALIDATION_CREDIT_CARD_NUMBER = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Card number must be between 13 and 19 digits long',isLength: { options: { min: 12, max: 19 } } });

// VALIDATION_CREDIT_CARD_EXPIRY is a string with format: MM

export const VALIDATION_CREDIT_CARD_EXPIRY = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Expiry date',isLength: { options: { min: 2, max: 2 } } });

// VALIDATION_CREDIT_CARD_YEAR is a string with format: YYYY

export const VALIDATION_CREDIT_CARD_YEAR = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Expiry year',isLength: { options: { min: 4, max: 4 } } });

// VALIDATION_CREDIT_CARD_CVV is a string with format: 3 digits

export const VALIDATION_CREDIT_CARD_CVV = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid CVV',isLength: { options: { min: 3, max: 3 } } });

// VALIDATION_CREDIT_CARD_NAME is a string with format: 3 digits and can be null

export const VALIDATION_CREDIT_CARD_NAME = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Name',isLength: { options: { min: 3, max: 50 } },optional: { options: { nullable: true } } });

// VALIDATION_CARD_ID is a string

export const VALIDATION_CARD_ID = (where: Location): ParamSchema => ({ in: [where], isString: true, notEmpty: true, errorMessage: 'Invalid Payment Method id' });


