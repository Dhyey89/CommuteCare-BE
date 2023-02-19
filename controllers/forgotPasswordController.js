const nodemailer = require('nodemailer');
const crypto = require('crypto');
const ResetToken = require('../models/resetTokenModel');
const User = require('../models/userModel');

exports.forgotPassword = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });

  // If user with email exists, generate a unique token and save it to the database
  if (user) {
    const token = crypto.randomBytes(20).toString('hex');
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);
    const resetToken = new ResetToken({ email: email, token: token, expiresAt: expirationTime });
    await resetToken.save();

    // Send an email to the user with a link to the password reset form
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dhyeypatel108@gmail.com',
        pass: 'kjnkioqyitotosey'
      }
    });

    const mailOptions = {
      from: 'dhyeypatel108@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      text: `Hello from Commute Care
      Please click on the following link to reset your password: http://localhost:5000/reset-password/${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.send('Email sent!');
  } else {
    res.status(404).send('User not found.');
  }
};


