import jwt from "jsonwebtoken";
import Users from "../models/users.model";
import CryptoJS from "crypto-js";

export const createUser = async (req, res) => {
  const user = new Users({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
