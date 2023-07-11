import mongoose from "mongoose";

const NltSchema = new mongoose.Schema(
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

const NltModel = mongoose.model("Nlt", NltSchema);

export default NltModel;
