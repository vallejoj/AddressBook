require('./config/server.config.js');

//packages
const express = require('express');
const bp = require('body-parser');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');

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
app.use( helmet.hsts( { maxAge: 7776000000 } ) ) ;
app.use( helmet.frameguard( 'SAMEORIGIN' ) ) ;
app.use( helmet.xssFilter( { setOnOldIE: true } ) ) ;
app.use( helmet.noSniff() ) ;

//parse data into readable JSON
app.use(
  bp.json({
    type: '*/*'
  })
);

//settings for rate limiter
app.enable('trust proxy'); 
const limiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes 
  max: 100, // limit each IP to 100 requests per windowMs 
  delayMs: 0 // disable delaying 
});

//apply limiter to all routes
app.use(limiter);

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




 

