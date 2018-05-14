const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = require('../../../config-fake/config.js');
const {User} = require('../../../models/user.js');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    firstName: 'Jman',
    lastName: 'MgGilicurrty',
    email: 'vallejomon@gmail.com',
    password: 'mypassword',
    tokens: [{
        access: 'auth',
        token: jwt.sign({
            _id: userOneId,
            access: 'auth'
        }, JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    firstName: 'Day',
    lastName: 'Man',
    email: 'dayman@gmail.com',
    password: 'mypassword2',
}];

const populateUsers = (done) => {
    User.remove({})
    .then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();
        return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = {
    users,
    populateUsers
};