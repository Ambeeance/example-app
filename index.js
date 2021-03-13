const { ambeeance } = require('ambeeance-client')
const axios = require('axios');
const express = require('express');
require('express-async-errors');
const app = express();

const config = ambeeance({
  type: 'planets',
  id: 1,
  include_films: false,
});

const swapiUrl = 'https://swapi.dev/api';

app.get('/endpoint', async (req, res) => {
  const swapiResponse = await axios.get(`${swapiUrl}/${config.type}/${config.id}`);
  const result = {
    name: swapiResponse.data.name
  };

  if (config.include_films) {
    result.films = swapiResponse.data.films
  }
  
  res.status(200).send(result);
});

app.listen(4001);
