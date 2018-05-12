const jwt = require('jsonwebtoken');
const request = require('supertest');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should;

var chaiHttp = require('chai-http');

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

// before(populateUsers);

describe('POST api/user/register', () => {
    it('should register and create a new user', (done) => {
        const user = {
            firstName: "Joshi",
            lastName: "Blankenstein",
            email: "jb@gmail.com",
            password: "fiddlesticks"
        }

        chai.request(app)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                res.body.should.be.a('object');
                res.body.book.should.have.property('firstName');
                res.body.book.should.have.property('lastName');
                res.body.book.should.have.property('email');
                res.body.book.should.have.property('password');
                expect(res).to.have.header('x-auth');
                User.findOne({
                    email: 'jb@gmail.com'
                }).then(user => {
                    expect(user).toExist()
                    expect(user.password).toNotBe(password)
                }).catch((err) => done(err));
                done();
            });

    });

    it('should return errors if request is invalid', (done) => {
        chai.request(app)
            .post('/api/user/register')
            .send({
                email: 'monkey',
                password: "ble"
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
                    }).catch((err) => done(err))
            });

    });

    it('should reject invalid login', (done) => {
        chai.request(app)
            .post('/api/user/login')
            .send({
                email: users[1].email,
                password: "notpassword"
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                expect(res.statusCode).to.equal(400);
                expect(res).to.not.have.header('x-auth');
                User.findById(users[1]._id)
                    .then(user => {
                        // expect(user.token.length).toBe(0);
                        done();
                    }).catch((err) => done(err));

            });
    });

});