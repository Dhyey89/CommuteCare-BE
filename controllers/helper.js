const fs = require('fs');
const path = require('path');
const moment= require("moment");
// const { validationResult } = require('express-validator/check');

const Helper = require('../models/helper');
exports.getHelpers = async (req, res, next) => {  const day = req.query.day;
  const time = req.query.time;

// const isHelper=Helper.find({availability:day});
// console.log(isHelper);


  Helper.find({ ["availability." + day]: { $exists: true } }, (err, helpers_) => {
    if (err) return res.status(500).send(err);

    const availableHelpers = [];
    helpers_.forEach(helper => {
      // const [start, end] = (helper.availability[day]);
      const timeArray = helper.availability[day].split(",");
      console.log(timeArray)
      const startTime = moment(timeArray[0], 'hh:mm');
      const endTime = moment(timeArray[1], 'hh:mm');
      const inputTime = moment(time, 'hh:mm');
      if (inputTime.isBetween(startTime, endTime)) {
        availableHelpers.push(helper);
      }
    });
    const availableHelpersJSON = JSON.stringify(availableHelpers);
    return res.send(availableHelpersJSON);
  });
}
  