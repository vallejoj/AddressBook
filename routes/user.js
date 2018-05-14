const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const {authenticate} = require('../middleware/authenticate');
const {ObjectID} = require('mongodb');
const {mongoose} = require('../db/mongoose');
const {User} = require('../models/user');

//route for registering user which generates token
router.post('/register', (req, res) => {
 
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

//route for logging in that requires proper email and password
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
      res.status(400).send('Incorrect Password');
    });
});

//protected route for finding current user info, only accessible with the proper token in the header
router.get('/me', authenticate, (req, res) => {
  res.send(req.user);
});

//route for logging out by dropping token, only accessible with the proper token in the header
router.delete('/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token)
  .then(() => {
    res.status(200).send('Logged Out');
  }, () => {
    res.status(400).send('Invalid Logout');
  });
});

module.exports = router;