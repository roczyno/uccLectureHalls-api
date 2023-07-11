import LT from "../models/lt.model.js";

export const addLt = async (req, res) => {
  try {
    const newLt = new LT(req.body);
    const savedLt = await newLt.save();
    res.status(200).json(savedLt);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getAllLt = async (req, res) => {
  try {
    const lt = await LT.find();
    res.status(200).json(lt);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const bookLt = async (req, res) => {
  const { startTime, endTime } = req.body;
  try {
    const lt = await LT.findById(req.params.id);
    if (!lt) {
      return res
        .status(404)
        .json({ message: "Schedule not available for booking" });
    }
    // Update availability to false
    const updatedLt = await LT.findOneAndUpdate(
      {
        _id: lt._id,
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

    res.json({ message: "Booking successful", lt: updatedLt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unbookLt = async (req, res) => {
  const { startTime, endTime } = req.body;
  try {
    const calc = await LT.findById(req.params.id);
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
