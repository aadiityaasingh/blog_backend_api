const bcrypt = require("bcrypt");
const userModel = require("../models/user.model.js");
const generateToken = require("../utils/generateToken.js");

async function registerUser (req,res) {
    try {
        const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const userExists = await userModel.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered",
      token: generateToken(user._id),
    });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

async function loginUser(req, res){
    try {
         const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      token: generateToken(user._id),
    });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    registerUser,
    loginUser,
}