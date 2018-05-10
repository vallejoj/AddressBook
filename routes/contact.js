const express = require('express');
const router = express.Router();

const {
    FIREBASE_CONFIG
} = ('../config/config.js');

const firebase = require('firebase/app');
require('firebase/database');

const app = firebase.initializeApp({
    FIREBASE_CONFIG
});

module.exports = router;