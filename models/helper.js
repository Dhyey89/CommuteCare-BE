const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const helperSchema = new Schema(
  {
    name: {
      firstname:{
        type: String,
        required: true
      },
      lastname:{
      type: String,
      required: true
    }},
    dob: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    mob: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    helped: {
      type: Number,
      required: true
    },
    
    description:{
      type: String,
      required: true
    },
   availability: {
    Monday: {
      type: String,
      default: ""
    },
    Tuesday: {
      type: String,
      default: ""
    },
    Wednesday: {
      type: String,
      default: ""
    },
    Thursday: {
      type: String,
      default: ""
    },
    Friday: {
      type: String,
      default: ""
    },
    Saturday: {
      type: String,
      default: ""
    },
    Sunday: {
      type: String,
      default: ""
    }
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model('helpers_1', helperSchema);
