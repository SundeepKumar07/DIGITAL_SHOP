import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    const data = await mongoose.connect(process.env.MONGODB_URL);

    console.log(`✅ MongoDB connected: ${data.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;