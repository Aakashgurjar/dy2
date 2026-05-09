const express = require("express");
const cors = require("cors");
const app = express();
const passport = require("passport");
const session = require("express-session");

const connectDb = require("./db/database.js");
require("dotenv").config();

const auth = require("./routes/userRoute.js")
const indexRoute = require("./routes/PostRoute.js");
const userRoute = require("./routes/userRoute.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(bodyParser.json());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://dy2-three.vercel.app"
  ],
  credentials: true
}));

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);


connectDb();
app.use("/api/posts", indexRoute);
app.use("/api", userRoute);
app.use("/auth", auth);



app.get("/profile", (req, res) => {
  try { 
    //  const email = req.user._json?.email;
    // console.log("user get in profile",email)

    if (req.isAuthenticated() && req.user) {
      const { _id, email, username } = req.user;
      res.status(200).json({ _id, email, username });
    } else {
      return res.status(401).json({ message: "Not authenticated" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,

    });
  }
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server start at port ${port}`);
});
