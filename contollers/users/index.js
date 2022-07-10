const mongoose = require('mongoose');
const User = require('../../models/user');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

module.exports.userSignup = async (req, res) => {
  console.log(req.body, req);
  let body = {
    email: req.body.signupEmail,
    password: req.body.signupPassword,
  };
  let userExist = await User.find({ email: body.email });
  if (userExist.length > 0) {
    return res.json({
      msg: 'User already exists with this email',
      user: { email: body.email },
    });
  }
  let user = await User.create(body);

  return res.json({
    msg: 'Signup successful',
    user: { email: user.email },
  });
};

module.exports.userLogin = async (req, res) => {
  // console.log(req.body)

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    var userobj = { ...user };
    // console.log(user);

    // console.log(userobj._doc._id.toString());

    let token = jsonwebtoken.sign(userobj, process.env.JWT_KEY, {
      expiresIn: '2h',
    });
    console.log(userobj);
    return res.json({
      msg: 'Login successful',
      details: {
        token,
        userID: userobj._doc._id.toString(),
        username: userobj._doc.email.toString(),
        project: userobj.projects,
      },
    });
  }

  return res.json({
    msg: 'Invalid Credentials',
  });
};
