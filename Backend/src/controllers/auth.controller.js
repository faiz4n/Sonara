const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { username, email, password, role = "listener" } = req.body;

  const userAlreadyExists = await userModel.findOne({
    email,
  });

  if (userAlreadyExists) {
    return res.status(409).json({ msg: "Email already registered" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    role,
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  res.status(200).json({
    msg: "User created successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) return res.status(401).json({ msg: "Invalid credentials" });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    return res.status(401).json({ msg: "Invalid credentials" });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  res.status(200).json({
    msg: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({ msg: "Logged out successfully" });
}

async function verifyUser(req, res) {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ msg: "Unauthorized", user: null });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");
    return res.status(201).json({ msg: "Verified", user });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Unauthorized" });
  }
}

module.exports = { registerUser, loginUser, logoutUser, verifyUser };
