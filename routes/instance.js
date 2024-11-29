const express = require('express');
const router = express.Router();
const { parseInstance } = require('./utils');

router.get('/', function (req, res, next) {
    const instance = req.query["instance"] || "";
    res.json(parseInstance(instance, process.env.APP_SECRET));
});

module.exports = router;
