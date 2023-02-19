const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref : 'User'
  },
  bookings: [{
    type: Schema.Types.ObjectId
  
  // Helpers: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Helpers_1'
  //   }
  // ]
}]

})

module.exports = mongoose.model('User', userSchema);
