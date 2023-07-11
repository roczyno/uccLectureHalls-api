import Swlt from "../models/swlt.model.js";

export const addSwlt = async (req, res) => {
  try {
    const newSwlt = new Swlt(req.body);
    const savedSwlt = await newSwlt.save();
    res.status(200).json(savedSwlt);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getAllSwlt = async (req, res) => {
  try {
    const swlt = await Swlt.find();
    res.status(200).json(swlt);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const bookSwlt = async (req, res) => {
  const { startTime, endTime } = req.body;
  try {
    const swlt = await Swlt.findById(req.params.id);
    if (!swlt) {
      return res
        .status(404)
        .json({ message: "Schedule not available for booking" });
    }
    // Update availability to false
    const updatedSwlt = await Swlt.findOneAndUpdate(
      {
        _id: swlt._id,
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

    res.json({ message: "Booking successful", swlt: updatedSwlt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unbookSwlt = async (req, res) => {
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
