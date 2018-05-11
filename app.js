const express = require('express');
const bp = require('body-parser');
const helmet = require('helmet');

//Port 
const PORT = process.env.PORT || 4000;

// Defining our express app
const app = express();

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
app.listen(PORT, () => {
  console.log("listening on", PORT);
});