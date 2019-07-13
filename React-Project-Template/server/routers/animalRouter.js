const express = require('express');
const router = express.Router();
const axios = require('axios');
// const config = require('../../config/config');
// const log4js = require('log4js');
// const logger = log4js.getLogger();

router.get('/list', (request, response) => {
    // Access BE
    axios.get('http://www.baidu.com').then((data) => {
        response.send(data.data);
    })
});

module.exports = router;