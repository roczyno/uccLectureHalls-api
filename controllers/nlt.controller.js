import Nlt from "../models/nlt.model.js";

export const addNlt = async (req, res) => {
  try {
    const newNlt = new Nlt(req.body);
    const savedNlt = await newNlt.save();
    res.status(200).json(savedNlt);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getAllNlt = async (req, res) => {
  try {
    const nlt = await Nlt.find();
    res.status(200).json(nlt);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const bookNlt = async (req, res) => {
  const { startTime, endTime } = req.body;
  try {
    const nlt = await Nlt.findById(req.params.id);
    if (!nlt) {
      return res
        .status(404)
        .json({ message: "Schedule not available for booking" });
    }
    // Update availability to false
    const updatedNlt = await Nlt.findOneAndUpdate(
      {
        _id: nlt._id,
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

    res.json({ message: "Booking successful", nlt: updatedNlt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unbookNlt = async (req, res) => {
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
