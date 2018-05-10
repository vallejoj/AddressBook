const express = require('express');
const bp = require('body-parser');
const helmet = require('helmet');

//Port 
const PORT = process.env.PORT || 4000;

// Defining our express app
const app = express();

//protection for our headers
app.use(helmet({
  frameguard: {
    action: 'deny'
  }
}));

// Server
app.listen(PORT, () => {
  console.log("listening on", PORT);
});

//parse data into readable JSON
app.use(
  bp.json({
    type: "*/*"
  })
);

