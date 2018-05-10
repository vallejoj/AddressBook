const firebase = require('firebase/app');
require('firebase/database');
const{ FIREBASE_CONFIG }= require('../config/config.js');

const firebase_app = firebase.initializeApp(
 FIREBASE_CONFIG
);

module.exports = {
    firebase,
    firebase_app
};
