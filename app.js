require('./config/server.config.js');

//packages
const express = require('express');
const bp = require('body-parser');
const helmet = require('helmet');

// Defining express app
const app = express();

//Port
const port = process.env.PORT;

//routes
const user = require('./routes/user.js');
const contact = require('./routes/contact.js');

//protection for  headers
app.use(helmet({
  frameguard: {
    action: 'deny'
  }
}));

//parse data into readable JSON
app.use(
  bp.json({
    type: '*/*'
  })
);

//routes
app.use('/api/user', user);
app.use('/api/contact', contact);

//server
app.listen(port, () => {
  console.log('listening on', port);
});

//export for testing
module.exports = {
  app
};