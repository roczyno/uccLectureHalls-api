import mongoose from "mongoose";

const LtSchema = new mongoose.Schema(
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

const LtModel = mongoose.model("Lt", LtSchema);

export default LtModel;
