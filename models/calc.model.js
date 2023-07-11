import mongoose from "mongoose";

const CalcSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    capacity: {
      type: Number,
    },
    schedules: [
      {
        startTime: String,
        endTime: String,
        availability: Boolean,
      },
    ],
  },
  { timestamps: true }
);

const CalcModel = mongoose.model("Calc", CalcSchema);

export default CalcModel;
