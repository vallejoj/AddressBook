# STRV ADDRESS BOOK
Address book backend server using Node.js and Express.js


# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- Fill in the config.js under config-fake folder with your Firebase info (you may have to make your on database if you do not already have one(https://docs.mongodb.com/manual/installation/#tutorials))and JWT_SECRET with your own secret
- In config.js and  config.json make sure to fill in MONGO_URI to equal your mongo db URI which looks something like 'mongodb://localhost:27017/{nameofdatabase}'
- You can then start the server using `node server.js`

# How to test

##NPM TEST 
-You can run 'npm test' in the terminal in the root of the project to make sure that the routes are working 

##POSTMAN
-You can either create request using Postman('https://www.getpostman.com/') at 'localhost:4000/' or 'https://floating-gorge-67548.herokuapp.com/' with the routes below. Test the routes in order. 
### POST /api/user/register
### POST /api/user/login

To test routes below make sure to grap x-auth token in the header response and then for your header request fill in key value with `x-auth ` under key and the token under value. 

### GET /api/user/me
### POST /api/contact/new
### DELETE /api/user/logout

# Code Overview

##Routes 

### POST /api/user/register
This route is to create/register our user. 

Request body:

    {
    "firstName": string,
    "lastName": string,
    "email": string,
    "password": string   
    }
Response body:

    {  
    "firstName": "Joshi",
    "lastName": "Vallejo",
    "email": "vallejodudemon@gmail.com",
    "_id": "5af7ac67a31ab1c2036fbb41"
    }

### POST /api/user/login
This route is used to login our user

Request body:

    {
    "email": string,
     "password": string
    }
Response body:

    { 
    "firstName": "Joshi",
    "lastName": "Vallejo",
    "email": "vallejodudemon@gmail.com",
    "_id": "5af7ac67a31ab1c2036fbb41"
    }
  
### GET /api/user/me
This route is to get the information of who is logged in 

Header

    {
    "x-auth": "token
    }
Response body:

    {

    }  

### POST /api/contact/new
This route is user to create a contact, route is protected so one would need to be logged in and have a token to add to user

Header

    {
    "x-auth": "token
    }
Request body:

    {
    "contactFirstName"": string,
    "contactLastName"": string,
    "email": string,
    "phone": string
    }  

Response body:

    {
    "contactFirstName"": "Joshi",
    "contactLastName"": "VallejoMon",
    "email": "vallejodudemon@gmail.com",
    "phone": "8087223333"
    }  

### Delete /api/user/logout
This route is to logout

Header

    {
    "x-auth": "token
    }
   
Response body:

    {
       Logged Out  
    }


## Dependencies
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md) - Used for hashing passwords 
- [body-parser](https://github.com/expressjs/body-parser) - Parse incoming request bodies in a middleware before your handlers, available under the req.body property
- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-validator](https://github.com/express-validator/express-validator) - User for validating data before sending it to server
- [firebase](https://www.npmjs.com/package/firebase) - User to initialize firebase, in this case Firebase database
- [helmet](https://github.com/helmetjs/helmet) - Helmet helps you secure your Express apps by setting various HTTP headers
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [lodash](https://github.com/lodash/lodash) - Gives access to the Lodash library 
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongodb](https://github.com/mongodb/mongo) - Gives us access to Mongodb
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [router](https://www.npmjs.com/package/router) - Simple middleware-style router
- [snyk](https://www.npmjs.com/package/snyk) - Snyk helps you find, fix and monitor known vulnerabilities in Node.js npm
- [validator](https://www.npmjs.com/package/validator) - A library of string validators and sanitizers.


## Dev Dependencies
- [chai](https://github.com/chaijs/chai) - Chai is an assertion library, similar to Node's built-in assert. It makes testing much easier by giving you lots of assertions you can run against your code.
- [chai-http](https://github.com/chaijs/chai-http) - HTTP integration testing with Chai assertions.
- [mocha](https://github.com/mochajs/mocha) - ☕️ Simple, flexible, fun JavaScript test framework for Node.js & The Browser ☕️
- [supertest](https://github.com/visionmedia/supertest) - Super-agent driven library for testing node.js HTTP servers using a fluent API


## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config-fake/` - file to give a model of what the config should look like
- `db/` - This contains our initlization code of Mongoose and Firebase
- `middleware/` - This contains our custom middleware, in this case our authenicate middleware used to create private routes
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `routes/` - This folder contains the route definitions for our API.
- `routes/test` - This folder contains our test for both our contact and user routes
- `routes/test/seed` - This contains our dummy data for our test database

## Hosted on Heroku 
https://git.heroku.com/floating-gorge-67548.git




