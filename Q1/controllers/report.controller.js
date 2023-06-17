const { startOfDay, endOfDay, parseISO } = require("date-fns");
const { ObjectId } = require("mongoose").Types;
const { KeywordModel } = require("../models/keyword.model");

async function getReport(req, res) {
  const {
    startDate,
    endDate,
    category,
    userId,
  } = req.query;
  const starting = startOfDay(parseISO(startDate));
  const ending = endOfDay(parseISO(endDate));

  const filter = {
    createdAt: {
      $gte: starting,
      $lte: ending,
    },
  };
  if (userId) {
    filter.user = new ObjectId(userId);
  }
  if (category) {
    filter.category = category;
  }

  const data = await KeywordModel.aggregate([
    {
      $match: filter,
    },
    {
      $group: {
        _id: "$keyword",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        keyword: "$_id",
        _id: 0,
        count: 1,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ]);

  res.send(data);
}

module.exports = {
  getReport,
};
