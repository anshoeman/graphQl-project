const mongoose = require('mongoose');
const URI = "mongodb+srv://anshumannehru:anshuman@cluster0.k5afh.mongodb.net/?retryWrites=true&w=majority"
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
}
module.exports = connectDB;
