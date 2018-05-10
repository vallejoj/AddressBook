const express = require('express');
const router = express.Router();

const {ObjectID} = require('mongodb');
const {mongoose} = require('../db/mongoose');

const {User} = require('../models/user');

console.log("User");

module.exports = router;