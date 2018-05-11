const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {
  ObjectID
} = require('mongodb');
const {
  mongoose
} = require('../db/mongoose');

const {
  User
} = require('../models/user');

router.post("/register", (req, res) => {
  console.log(req.body, "USer")

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });

  user.save().then(() => {
    return user.generateAuthToken();
  }).then(token => {
    console.log("SEND USER", user);
    res.header('x-auth', token).send(user);
  }).catch((error) => {
    res.status(400).send(error);
  });
});




router.post("/login", (req, res) => {
  console.log(req.body);
  var body = _.pick(req.body, ['email', 'password']);

  User.loginByEmail(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((error) => {
    res.status(400).send("Wrong Password");
  });
});

module.exports = router;