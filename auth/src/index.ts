import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI must be defined");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db ");
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("Running on 3000!");
  });
};
start();
