const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const helperRoutes = require('./routes/helper');


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

app.use('/helper', helperRoutes);
// app.use('/user', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(port, () => console.log("hello there") );

mongoose
  .connect(
    'mongodb+srv://Dhyey:dhyey@cluster0.xpjedvc.mongodb.net/test'
  ,{useNewUrlParser: true,
    useUnifiedTopology: true})
  .then(result => {
   
  })
  .catch(err => console.log(err));
