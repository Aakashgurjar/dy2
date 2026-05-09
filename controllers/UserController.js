// const mongoose = require('mongoose');
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {sendMail} = require('../utils/SendMail')

exports.signup = async (req, res) => {
  const { email, password, fullName } = req.body;

  // console.log("backend", email, password, fullName);
  try {
    const existingUser = await User.findOne({ email });

    if (!email || !password || !fullName) {
      return res.status(404).json({
        message: "Please input valid details!",
      });
    }
    if (existingUser) {
      return res.status(404).json({
        message: "Email already exist!",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      fullName,
    });
    return res.status(200).json({
      message: "Signup Successfully",
      user,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
     console.log("User login :", user);

    if (!user || user == null ) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please signup first",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const payload = {
        email: user.email,
        id: user._id,
      };

      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      //  return res.status(200).json({
      //     success: true,
      //     token,
      //     user,
      //     message: "Logged In successfully",
      //  })
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged In successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (err) {
    console.log("err", err);
    return res.status(200).json({
      message: "Login failure, please try again",
      success: false,
    });
  }
};

exports.resetPasswordToken = async (req, res) => {
  try {
    // fetch email
    const { email } = req.body;
    
    // validation
    if (!email) {
      return res.status(401).json({
        message: "Your email is not correct",
        success: false,
      });
    }

    let token = crypto.randomUUID();

    const user = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );
    // console.log("user", user)

    const url = `http://localhost:3000/reset-password/${token}`;
    await sendMail(email, "Password reset link", `Password Reset Link: ${url}`)

    res.status(200).json({
      message: "Email Sent successfully, please check email and password",
      success: true,
      user,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // fetch new password
    const { token, newPassword } = req.body;

    // validation
    // if (!password || !newPassword) {
    //   return res.status(401).json({
    //     message: "your detail is not correct",
    //     success: false,
    //   });
    // }

    const updateDetails = await User.findOne({ token: token });

    if (updateDetails) {
      return res.json({
        success: false,
        message: "Token is invalid",
      });
    }

    if (updateDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Your token is expired, Please regenerate the token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOne(
      { token: token },
      {
        password: hashedPassword,
      },
      { new: true }
    );

    //    send Mail
    sendMail(email, "Password Reset Successfully", newPassword);

    res.status(200).json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
