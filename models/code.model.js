import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema(
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

const CodeModel = mongoose.model("Code", CodeSchema);

export default CodeModel;
