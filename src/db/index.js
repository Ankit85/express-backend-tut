import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI === undefined) {
      throw new Error("MONGODB_URI variable not declared or is undefined");
    }

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      "MONGODB connected successfully!!! DB Host URI:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("MONGODB connection failed: ", error);
    process.exit(1);
  }
};

export default connectDB;
