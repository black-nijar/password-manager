require('dotenv').config();
const express = require('express');
const app = express();
require('./dbConfig');
const bodyParser = require('body-parser');
const PORT = 5000;

app.use(bodyParser.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome');
});
require('./api')(app);

app.listen(PORT, () => console.log(`server is up & running at ${PORT}`));
