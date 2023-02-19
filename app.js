const express = require('express');
const bodyParser = require('body-parser');


const connectDB = require('./services/db');
const availableHelpersRoutes = require('./routes/availableHelpersRoute');
const createBookingRoutes = require('./routes/createBookingRoute');
const userLoginRoutes = require('./routes/userLoginRoute');
const userSignupRoutes = require('./routes/userSignupRoute');
const forgotPasswordRoutes = require('./routes/forgotPasswordRoute');
const resetPasswordRoutes = require('./routes/resetPasswordRoute');

const app = express();

const port = process.env.PORT || 5000;

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', availableHelpersRoutes);
app.use('/', createBookingRoutes);
app.use('/', userLoginRoutes);
app.use('/', userSignupRoutes);
app.use('/', forgotPasswordRoutes);
app.use('/', resetPasswordRoutes);


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

connectDB();

app.listen(port, () => console.log("hello there") );

