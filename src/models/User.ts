import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { PaginateModel, Schema, model } from 'mongoose';
import {  UserDocument } from '../@types/models';
import { comparePasswordFunction } from '../@types/index';
const passportLocalMongoose = require("passport-local-mongoose")

import mongoosePaginate from 'mongoose-paginate-v2';

export const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
})

export const SessionModel = model('Session', Session);






const userSchema = new Schema(
  {
    user_id: { type: String, unique: true, required: true,default:v4() },
    email: { type: String, unique: true, required: true },
    isEmailVerified: { type: Boolean, default: false },
    first_name: { type: String, },
    last_name: { type: String },
    first_name_kena: { type: String,  },
    last_name_kena: { type: String,   },
    zipcode: { type: String,  },
    province: { type: String,   },
    city: { type: String, },
    stripeAccountId: { type: String, default: null },
    address: { type: String },
    building_name: { type: String },
    room_number: { type: String },
    usage_status: { type: String , default: 'active' },
    active: { type: Boolean,default:true},
    password: { type: String},
    privilege: { type: String,default: "user" },
    deletedAt: { type: Date, default: null },
    refreshToken: {
      type: [Session],
    },
  },
  { timestamps: true },
);

userSchema.pre('save', function save(next: any) {
  const user = this as any;
  try {
    if (!user.isModified('password')) {
      return next();
    }
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    next();
  } catch (err) {
    next(err as any);
  }
});

userSchema.pre('findOneAndUpdate', function findOneAndUpdate(next : any) {
  try {
    const data: any = this.getUpdate();
    if (data) {
      const password = data.$set.password;
      if (password) {
        this.setOptions({});
        const hash = bcrypt.hashSync(password, 10);
        this.setUpdate({ ...data.$set, password: hash });
      }
    }
    next();
  } catch (err) {
    return next(err as any);
  }
});

const comparePassword: comparePasswordFunction = async function (this: any, candidatePassword: any, cb: any) {
  try {
    const isMatch = bcrypt.compareSync(candidatePassword, this.password);

    cb(null, isMatch);
  } catch (err) {
    cb(err, false);
  }
};

userSchema.methods.comparePassword = comparePassword;

userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    return ret
  },
})

 userSchema.plugin(passportLocalMongoose)
// userSchema.plugin(mongoosePaginate);

export const User = model<UserDocument>('User', userSchema) as PaginateModel<UserDocument>;
