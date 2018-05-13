const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const _ = require('lodash');


const {authenticate} = require('../middleware/authenticate');
const {ObjectID} = require('mongodb');
const {mongoose} = require('../db/mongoose');
const {User} = require('../models/user');

//route for registering user
router.post('/register', (req, res) => {
  console.log(req.body, 'User');

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });

  user.save()
  .then(() => {
      return user.generateAuthToken();
    })
  .then(token => {
      res.header('x-auth', token).send(user);
    })
  .catch(error => {
      res.status(400).send(error);
    });
});

//route for logging in
router.post('/login', (req, res) => {

  const body = _.pick(req.body, ['email', 'password']);

  User.loginByEmail(body.email, body.password)
    .then(user => {
      return user.generateAuthToken()
      .then(token => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch(error => {
      res.status(400).send('Wrong Password');
    });
});

//route for finding the user who is logged in
router.get('/me', authenticate, (req, res) => {
  res.send(req.user);
});

//route for logging out
router.delete('/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token)
  .then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

module.exports = router;