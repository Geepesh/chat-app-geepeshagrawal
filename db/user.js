const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
  user : {
    type : String,
    required : true
  }
})

const User = mongoose.model('user',msgSchema);
module.exports = User;
