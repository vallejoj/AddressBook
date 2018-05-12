const jwt = require('jsonwebtoken');
const request = require('supertest');
const chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should;

const chaiHttp = require('chai-http');

const {
    ObjectID
} = require('mongodb');

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

chai.use(chaiHttp);

beforeEach(populateUsers);

// describe('GET api/user/me', () => {
//     it('should get your user data if authenticated', (done) => {
//         request(app)
//             .get('/api/users/me')
//             .set('x-auth', users[0].tokens[0].token)

//             .expect((res) => {
//                 expect(res.body._id).toBe(users[0]._id.toHexString());
//                 expect(res.body.email).toBe(users[0].email);
//             })
//             .end(done);
//     })

//     it('should return 401 if not authenticated', (done) => {
//         done();
//     })
// });


describe('POST api/user/register', () => {
    it('should register and create a new user', (done) => {
        const sendUser = {
            firstName: 'Joshi',
            lastName: 'Blankenstein',
            email: 'jb@gmail.com',
            password: 'fiddlesticks'
        };

        chai.request(app)
            .post('/api/user/register')
            .send(sendUser)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res).to.have.header('x-auth');
                User.findOne({
                    email: 'jb@gmail.com'
                }).then(user => {
                    expect(user);
                }).catch((err) => done(err));
                done();
            });

    });

    it('should return errors if request is invalid', (done) => {
        chai.request(app)
            .post('/api/user/register')
            .send({
                email: 'monkey',
                password: 'ble'
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });

    });

    it('should not create user if email there is already the same email', (done) => {
        chai.request(app)
            .post('/api/user/register')
            .send({
                email: users[0].email
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    });
});

describe('POST api/user/login', () => {

    it('should login user and return auth token', (done) => {
        chai.request(app)
            .post('/api/user/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                expect(res.statusCode).to.equal(200);
                expect(res).to.have.header('x-auth');
                User.findById(users[1]._id)
                    .then(user => {
                        // expect(user.token[0].toInclude({
                        //     access: 'auth',
                        //     token: res.headers['x-auth']
                        // }));
                        done();
                    }).catch((err) => done(err));
            });
    });

    it('should reject invalid login', (done) => {
        chai.request(app)
            .post('/api/user/login')
            .send({
                email: users[1].email,
                password: 'notpassword'
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                expect(res.statusCode).to.equal(400);
                expect(res).to.not.have.header('x-auth');
                done();
            });
    });
    it('should reject invalid login', (done) => {
        chai.request(app)
            .post('/api/user/login')
            .send({
                email: users[1].email,
                password: 'notpassword'
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                expect(res.statusCode).to.equal(400);
                expect(res).to.not.have.header('x-auth');
                done();
            });
    });
});
describe('DELETE api/user/login', () => {
    it('should remove auth token on log out', (done) => {
        chai.request(app)
            .delete('/api/user/logout')
            .set('x-auth', users[0].tokens[0].token)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                if (err) {
                    return done(err);
                }
                User.findById(users[0]._id).then(user => {
                    expect(user.tokens.length).to.equal(0);
                    done();
                }).catch((err) => done(err));
            });
    });
});