import mongoose from "mongoose";

interface Connection {
  isConnected?: boolean;
}

const connection: Connection = {};

export const connectToDb = async (): Promise<void> => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }

    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error("MongoDB URI is not defined in the environment variables");
      throw new Error("MongoDB URI is not defined in the environment variables");
    }

    const db = await mongoose.connect(mongoUri);
    connection.isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Couldn't connect to MongoDB");
  }
};
