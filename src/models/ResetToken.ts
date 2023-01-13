import { PaginateModel, Schema, model } from 'mongoose'
import { ResetTokenDocument } from '../@types/models'

import mongoosePaginate from 'mongoose-paginate-v2'

const resetTokenSchema = new Schema(
  {
    resetTokenId: { type: String, unique: true, required: true },
    jwt: { type: String, required: true },
    isRevoked: { type: Boolean, default: false },
    type: { type: String, required: true },
    expireAt: { type: Date, expires: 1 * 60 * 60, default: Date.now },
    userId: { type: String, required: true },
  },
  { timestamps: true }
)

resetTokenSchema.plugin(mongoosePaginate)

export const ResetToken = model<ResetTokenDocument>('ResetToken', resetTokenSchema) as PaginateModel<ResetTokenDocument>
