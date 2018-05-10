const express = require('express');
const router = express.Router();

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
  console.log("BODY", req.body);
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });

  user.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


router.post("/signin");

module.exports = router;