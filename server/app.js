'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const moveService = require('./moveService');

const port = process.env.PORT || 3000;
const publicFolder = path.join(__dirname, 'public');

const app = express();
app.use(bodyParser.json());
app.use('/', express.static(publicFolder));
app.use('/api', moveService.router);

app.listen(port, () => console.log(`Listening on port ${port}`));
