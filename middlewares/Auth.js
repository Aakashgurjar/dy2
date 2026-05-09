const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.Auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token =
      authHeader?.replace("Bearer ", "").trim() ||
      req.cookies?.token ||
      req.body?.token;

      console.log("toke ni is " , token );

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next(); // pass control to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
