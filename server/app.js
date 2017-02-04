'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const engine = require('./engine');
const port = process.env.PORT || 3000;

const apiRouter = express.Router();
apiRouter.post('/computerMove', handleComputerMove);

const app = express();
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/api', apiRouter);
app.listen(port, () => console.log(`Listening on port ${port}`));

function handleComputerMove(req, res) {
    
    const state = req.body;
    console.log(`request JSON:  ${JSON.stringify(state)}`);
    
    const responseData = engine.computerMove(state);
    console.log(`response JSON: ${JSON.stringify(responseData)}`);
    
    return res.json(responseData);
}
