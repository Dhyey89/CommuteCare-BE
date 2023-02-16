const express = require('express');
const bodyParser = require('body-parser');


const connectDB = require('./services/db');
const availableHelpersRoutes = require('./routes/availableHelpersRoute');
const userLoginRoutes = require('./routes/userLoginRoute');
const userSignupRoutes = require('./routes/userSignupRoute');
const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes');

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

app.use('/availableHelpers', availableHelpersRoutes);
app.use('/userLogin', userLoginRoutes);
app.use('/userSignup', userSignupRoutes);
app.use('/', forgotPasswordRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(port, () => console.log("hello there") );

connectDB();
