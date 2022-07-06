const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;
