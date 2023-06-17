const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
require("./user.model");

const { ObjectId } = Schema.Types;

const CATEGORY_ENUM = {
  name: "name",
  description: "description",
  topics: "topics",
  readme: "readme",
};
const keywordSchema = new Schema(
  {
    user: {
      type: ObjectId,
      required: true,
      ref: "user",
    },
    keyword: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(CATEGORY_ENUM),
    },
  },
  { timestamps: true },
);
keywordSchema.plugin(mongoosePaginate);

const KeywordModel = model("keyword", keywordSchema);

module.exports = {
  KeywordModel,
  CATEGORY_ENUM,
};
