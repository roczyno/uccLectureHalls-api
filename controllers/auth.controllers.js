import jwt from "jsonwebtoken";
import Users from "../models/users.model.js";
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

export const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      username: req.body.username,
    });

    !user && res.status(401).json("wrong credentials");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(401).json("wrong password");
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    console.log(error);
  }
};
