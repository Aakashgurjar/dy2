const express = require('express');
const passport = require('passport');
const router = express.Router();

const userControllers = require('../controllers/UserController');

router.post('/signup', userControllers.signup );
router.post('/login', userControllers.login );
router.post('/reset-password-token', userControllers.resetPasswordToken);
router.post('/reset-password', userControllers.resetPassword);

router.get("/github", passport.authenticate("github",{ scope: ["user:email"] })); // ["profile", "email"]

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:3000/profile");
  }
);


 
module.exports = router;