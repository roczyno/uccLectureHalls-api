import Calc from "../models/calc.model.js";

export const addCalc = async (req, res) => {
  try {
    const newCalc = new Calc(req.body);
    const savedCalc = await newCalc.save();
    res.status(200).json(savedCalc);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getAllCalc = async (req, res) => {
  try {
    const calc = await Calc.find();
    res.status(200).json(calc);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const bookCalc = async (req, res) => {
  const { startTime, endTime } = req.body;
  try {
    const calc = await Calc.findById(req.params.id);
    if (!calc) {
      return res
        .status(404)
        .json({ message: "Schedule not available for booking" });
    }
    // Update availability to false
    const updatedCalc = await Calc.findOneAndUpdate(
      {
        _id: calc._id,
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

    res.json({ message: "Booking successful", calc: updatedCalc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unbookCalc = async (req, res) => {
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
