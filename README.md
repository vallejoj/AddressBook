# STRV ADDRESS BOOK
Address book backend server using Node.js and Express.js


# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- Fill in the config.js under config-fake folder with your Firebase info (you may have to make your on date base if you do not already have one(https://docs.mongodb.com/manual/installation/#tutorials))and JWT Secret 
- Fill in MONGODB_URI in the server.config.fake file
- You can then start the server using `node app.js`



# Code Overview

##
Routes 

### POST /router/user/register

Response body:

    {
     
    "firstName": "Joshi",
    "lastName": "Vallejo",
    "email": "vallejodudemon@gmail.com",
    "_id": "5af7ac67a31ab1c2036fbb41"
    
    }

### POST /router/user/login

Response body:

    {
     
    "firstName": "Joshi",
    "lastName": "Vallejo",
    "email": "vallejodudemon@gmail.com",
    "_id": "5af7ac67a31ab1c2036fbb41"
    
    }
  
### GET /router/user/me
Response body:

    {
     
    "contactFirstName"": "Joshi",
    "contactLastName"": "VallejoMon",
    "email": "vallejodudemon@gmail.com",
    "phone": "8087223333"
    
    }  




## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - 
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `db/` - This contains our initlization code of Mongoose and Firebase


