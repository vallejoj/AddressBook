require('./server.config.js');

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