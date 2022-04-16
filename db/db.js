const mongoose = require('mongoose');
var link = "mongodb+srv://geepesh_agrawal:geepeshagrawal@cluster0.n8viw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectDB = {
  async function(){
    try {
    const conn = await mongoose.connect(link,{
      useNewUrlParser : true,
      useUnifiedTopology : true
    });
    console.log("mongo connected",conn.connection.host);
    } catch (e) {
      console.log("err");
    }
}

module.exports = connectDB;
