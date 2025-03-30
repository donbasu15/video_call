import httpStatus from "http-status";
import { User } from "../models/user_model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("incorrect credential");
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Incorrect credential" });
    }
    if (await bcrypt.compare(password, user.password)) {
      let token = crypto.randomBytes(20).toString("hex");
      user.token = token;
      await user.save();
      console.log("logged in");
      return res
        .status(httpStatus.OK)
        .json({ message: "Logged in", token: token });
    } else {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Wrong credentials" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: `something went wrong ${e}` });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("user already exists");
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });

    const user = await newUser.save();
    console.log("user registered");
    return res.status(httpStatus.CREATED).json({ message: "User registed" });
  } catch (e) {
    return res.json({ message: `Something went wrong ${e}` });
  }
};

export { login, register };
