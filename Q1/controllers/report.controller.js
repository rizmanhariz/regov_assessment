const { startOfDay, endOfDay, parseISO } = require("date-fns");
const { ObjectId } = require("mongoose").Types;
const { KeywordModel } = require("../models/keyword.model");

async function getReport(req, res) {
  const {
    startDate,
    endDate,
    category,
    userId,
    type,
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

  const groupingMap = {
    day: "%Y-%m-%d",
    week: "%Y-%V",
    month: "%Y-%m",
  };

  const data = await KeywordModel.aggregate([
    {
      $match: filter,
    },
    {
      $group: {
        _id: {
          keyword: "$keyword",
          date: { $dateToString: { format: groupingMap[type], date: "$createdAt" } },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        keyword: "$_id.keyword",
        time: "$_id.date",
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
