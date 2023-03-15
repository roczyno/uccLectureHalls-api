import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";

const app = express();
dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  console.log("connected to mongoDb");
}

//middlewares

app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(5000, () => {
  main();
  console.log("server running...");
});
