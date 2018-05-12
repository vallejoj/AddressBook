const {
    ObjectID
} = require('mongodb');

const jwt = require('jsonwebtoken');
const expect = require('expect');
const request = require('supertest');
const {
    users,
    populateUsers
} = require('./seed/seed');

const {
    app
} = require('../../app.js');


const {
    User
} = require('../../models/user.js');



populateUsers();

// describe('POST api/user/register'), () => {
//     it('should register a new user', (done) => {
//         var text = 'Test todo text';
//         request(router)
//             .post('api/user/register')
//             .send({
//                 text
//             })
//             .expect(200)

//     })
// }