const express = require('express');
const router = express.Router();

const {JWT_SECRET} = require('../config/config.js');
const {authenticate} = require('../middleware/authenticate');
const {firebase,firebase_app} = require('../db/firebase');
const {body,validationResult} = require('express-validator/check');

const contactBody = ['contactFirstName', 'contactLastName', 'phone'];

//create new contact using a protected route and validating the body
router.post('/new', authenticate,
    body('email').isEmail().withMessage('must be an email'), body(contactBody).matches(/^[a-z0-9 -]+$/i),
    (req, res) => {

        const fullname = `${req.user.firstName} ${req.user.lastName}'s`;
        const contact = `${req.body.contactFirstName} ${req.body.contactLastName}`;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const resBody = {
                outcome: errors.array()
            };
            res.status(400).send(resBody);
        } else {
            firebase.database().ref(`${fullname} contacts/${contact}/`).set({
                Phone: req.body.phone,
                Email: req.body.email
            })
            .then(() => {
                res.status(200).send(req.body);
            })
            .catch(err => {
                res.status(400).send();
            });
        }
    });

module.exports = router;