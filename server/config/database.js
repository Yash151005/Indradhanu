const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/indradhanu';
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📁 Database: ${conn.connection.name}`);
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection Warning: ${error.message}`);
    console.warn(`⚠️  Running in offline/mock mode`);
    // Don't exit - allow server to run in offline mode
  }
};

module.exports = connectDB;
