const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
    },
    isApproved: {
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
};
