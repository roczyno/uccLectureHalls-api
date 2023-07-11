import Code from "../models/code.model.js";

export const addCode = async (req, res) => {
  try {
    const newCode = new Code(req.body);
    const savedCode = await newCode.save();
    res.status(200).json(savedCode);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getAllCode = async (req, res) => {
  try {
    const code = await Code.find();
    res.status(200).json(code);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const bookCode = async (req, res) => {
  const { startTime, endTime } = req.body;
  try {
    const code = await Code.findById(req.params.id);
    if (!code) {
      return res
        .status(404)
        .json({ message: "Schedule not available for booking" });
    }
    // Update availability to false
    const updatedCode = await Code.findOneAndUpdate(
      {
        _id: code._id,
        "schedules.startTime": startTime,
        "schedules.endTime": endTime,
        "schedules.availability": true,
      },
      {
        $set: {
          "schedules.$.availability": false,
        },
      },
      { new: true }
    );

    res.json({ message: "Booking successful", code: updatedCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unbookCode = async (req, res) => {
  const { startTime, endTime } = req.body;
  try {
    const calc = await Calc.findById(req.params.id);
    if (!calc) {
      return res
        .status(404)
        .json({ message: "Schedule not available for unbooking" });
    }
    // Update availability to true
    const updatedCalc = await Calc.findOneAndUpdate(
      {
        _id: calc._id,
        "schedules.startTime": startTime,
        "schedules.endTime": endTime,
        "schedules.availability": false,
      },
      {
        $set: {
          "schedules.$.availability": true,
        },
      },
      { new: true }
    );

    res.json({ message: "unBooking successful", calc: updatedCalc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
