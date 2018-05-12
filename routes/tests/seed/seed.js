const {
    ObjectID
} = require('mongodb');
const jwt = require('jsonwebtoken');
const {
    JWT_SECRET
} = require('../../../config/config.js');
const {
    User
} = require('../../../models/user.js');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

console.log("anything?")
const users = [{
    _id: userOneId,
    firstName: "Jman",
    lastName: "MgGilicuty",
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
    firstName: "Day",
    lastName: "Man",
    email: 'dayman@gmail.com',
    password: 'mypassword2',
}];

var populateUsers = (done) => {
    console.log("DATATIME")
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        console.log(users[0], "user")
        return Promise.all([userOne, userTwo])
    }).then((data) => {
        console.log("data", data)
    });
}


module.exports = {
    users,
    populateUsers
};