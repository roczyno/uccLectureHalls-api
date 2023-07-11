import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/users.route.js";
import cors from "cors";
import ltRouter from "./routes/lt.route.js";
import calcRouter from "./routes/calc.route.js";
import codeRouter from "./routes/code.route.js";
import swltRouter from "./routes/swlt.route.js";
import nltRouter from "./routes/nlt.route.js";

const app = express();
dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  console.log("connected to mongoDb");
}

//middlewares
app.use(cors());

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/lt", ltRouter);
app.use("/api/code", codeRouter);
app.use("/api/calc", calcRouter);
app.use("/api/nlt", nltRouter);
app.use("/api/swlt", swltRouter);

app.listen(5000, () => {
  main();
  console.log("server running...");
});
