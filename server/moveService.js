const express = require('express');
const moveEngine = require('./moveEngine');

const handleComputerMove = (req, res) => {
    
    const state = req.body;
    console.log(`request JSON:  ${JSON.stringify(state)}`);
    
    const responseData = moveEngine.computerMove(state);
    console.log(`response JSON: ${JSON.stringify(responseData)}`);
    
    return res.json(responseData);
};

const router = express.Router();
router.post('/computerMove', handleComputerMove);

module.exports = {
    router
};
