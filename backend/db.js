const mongoose = require("mongoose");
const uri = `mongodb+srv://hamzabadshah888:F8gsIeqqyb6GZLkD@pocket.cxqx47k.mongodb.net/?authSource=admin&compressors=zlib&retryWrites=true&w=majority&ssl=true`;

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
}

module.exports = connectToDatabase;
