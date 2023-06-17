const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const REG_STATUS_ENUM = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    registrationStatus: {
      type: String,
      required: false,
      default: REG_STATUS_ENUM.PENDING,
      enum: Object.values(REG_STATUS_ENUM),
    },
    isSuspended: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);
userSchema.plugin(mongoosePaginate);

const UserModel = model("user", userSchema);

module.exports = {
  UserModel,
  REG_STATUS_ENUM,
};
