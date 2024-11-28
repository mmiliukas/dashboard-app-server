const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.json({
        message: `Pong! ${Date.now()}`
    });
});

module.exports = router;
