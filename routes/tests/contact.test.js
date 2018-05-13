const jwt = require('jsonwebtoken');
const request = require('supertest');
const chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should;
const chaiHttp = require('chai-http');
const { ObjectID} = require('mongodb');

const {users, populateUsers} = require('./seed/seed');
const {app} = require('../../app.js');
const {User} = require('../../models/user.js');


chai.use(chaiHttp);
beforeEach(populateUsers);

describe('POST /api/contact/new', () => {
    it('should create a contact', done => {
        const sendContact = {
            contactFirstName: 'Vallejoon',
            contactLastName: 'ddddd',
            email: 'jvallejoj@fffmonogmail.com',
            phone: '7209855392'
        };
        chai.request(app)
            .post('/api/contact/new')
            .set('x-auth', users[0].tokens[0].token)
            .send(sendContact)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
    it('should recieve error if input is incorrect', done => {
        const sendContact = {
            contactFirstName: 'Vallejoon',
            contactLastName: 'ddddd',
            email: 'jvallejojfffmonogmail.com',
            phone: '7209855392'
        };
        chai.request(app)
            .post('/api/contact/new')
            .set('x-auth', users[0].tokens[0].token)
            .send(sendContact)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    });
    it('should error if there is no header', done => {
        const sendContact = {
            contactFirstName: 'Vallejoon',
            contactLastName: 'ddddd',
            email: 'jvallejojfffmonogmail.com',
            phone: '7209855392'
        };
        chai.request(app)
            .post('/api/contact/new')
            .send(sendContact)
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                done();
            });
    });
});