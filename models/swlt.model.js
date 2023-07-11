import mongoose from "mongoose";

const SwltSchema = new mongoose.Schema(
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

const SwltModel = mongoose.model("Swlt", SwltSchema);

export default SwltModel;
