const express = require('express');
const router = express.Router();

const {firebase,firebase_app} = require('../db/firebase');

router.post("/new-contact");

module.exports = router;