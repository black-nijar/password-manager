require('dotenv').config();
const express = require('express');
const app = express();
require('./dbConfig');

const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.listen(PORT, () => console.log(`server is up & running at ${PORT}`));
