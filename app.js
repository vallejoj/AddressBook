let env = process.env.NODE_ENV || 'development';
console.log(env);
if (env === "development") {
  process.env.PORT = 4000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/AddressBook';
} else if (env === 'test') {
  console.log("TEST")
  process.env.PORT = 4000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/AddressBookTest';
}


const express = require('express');
const bp = require('body-parser');
const helmet = require('helmet');



// Defining our express app
const app = express();

//Port
const port = process.env.PORT;

//routes
const user = require("./routes/user.js");
const contact = require("./routes/contact.js");

//protection for our headers
app.use(helmet({
  frameguard: {
    action: 'deny'
  }
}));

//parse data into readable JSON
app.use(
  bp.json({
    type: "*/*"
  })
);

//routes
app.use("/api/user", user);
app.use("/api/contact", contact);

// Server
app.listen(port, () => {
  console.log("listening on", port);
});

module.exports = {
  app
};