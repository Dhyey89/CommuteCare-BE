const fs = require("fs");
const path = require("path");
const moment = require("moment");
// const { validationResult } = require('express-validator/check');

const Helper = require("../models/helperModel");
const Booking = require("../models/bookingModel");

exports.createBooking = async (req, res, next) => {
  //console.log(req.body);
  const helperId = req.body.helperId;
  const userId = req.userId;
  const day = req.body.day;
  const startTime = req.body.starttime;
  const duration = req.body.duration;

  const helper = await Helper.findById(helperId);

  if (!helper) {
    return res.status(404).send("Helper not found.");
  }
  const helperAvailability = helper.availability[day];
  if (!helperAvailability) {
    return res
      .status(400)
      .send("Helper's availability not set for the specified day.");
  }

  const start = moment(startTime, "hh:mm");
  const end = start.clone().add(duration, "minutes");
  const timeArray = helper.availability[day].split(",");
  const availabilityStart = moment(timeArray[0], "HH:mm");
  //console.log("timeArray[0]"+timeArray[0]);
  const availabilityEnd = moment(timeArray[1], "HH:mm");
  
  if (start.isBefore(availabilityStart) || end.isAfter(availabilityEnd)) {
    return res
      .status(400)
      .send(
        "The requested booking time slot is not within the helper's availability for the specified day."
      );
  }

  const existingBookings = await Booking.find({
    helper: helperId,
    day: day,
    $or: [
      { starttime: { $lt: end.toDate() }, endtime: { $gt: start.toDate() } }, // new booking starts during an existing booking
      { starttime: { $gte: start.toDate(), $lt: end.toDate() } }, // new booking starts before an existing booking
      { endtime: { $gt: start.toDate(), $lte: end.toDate() } }, // new booking ends after an existing booking
    ],
  });

  if (existingBookings.length > 0) {
    return res.status(400).send("This time slot is already booked.");
  }

  const booking = new Booking({
    helper: helperId,
    user: userId,
    day: day,
    starttime: start.toDate(),
    endtime: end.toDate(),
  });

  await booking.save((err) => {
    if (err) return res.status(500).send(err);
    return res.send("Booking created successfully.");
  });
};
