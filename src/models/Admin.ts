
import bcrypt from 'bcryptjs';
import { PaginateModel, Schema, model } from 'mongoose';
import { AdminDocument } from '../@types/models';
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
const adminSchema = new Schema(
  {
    adminId: { type: String, unique: true, required: true },
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    privilege: { type: String,default: "admin" },
    deletedAt: { type: Date, default: null },
    refreshToken: {
      type: [Session],
    },
  },
  { timestamps: true },
);

adminSchema.pre('save', function save(next) {
  const admin = this as any;
  try {
    if (!admin.isModified('password')) {
      return next();
    }
    const hash = bcrypt.hashSync(admin.password, 10);
    admin.password = hash;
    next();
  } catch (err) {
    next(err as any);
  }
});

adminSchema.pre('findOneAndUpdate', function findOneAndUpdate(next) {
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

adminSchema.methods.comparePassword = comparePassword;

adminSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    return ret
  },
})

adminSchema.plugin(passportLocalMongoose)

adminSchema.plugin(mongoosePaginate);

export const Admin = model<AdminDocument>('Admin', adminSchema);
