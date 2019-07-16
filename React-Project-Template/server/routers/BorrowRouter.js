const express = require('express');
const router = express.Router();
const axios = require('axios');
// const config = require('../../config/config');
// const log4js = require('log4js');
// const logger = log4js.getLogger();

router.get('/list', (request, response) => {
    // Access BE
    const params=request.query;
    axios.get('http://localhost:8080/getBorrow',{params}).then((data) => {
        console.log(data.data)
        response.send(data.data);
    })
});
router.get('/update', (request, response) => {
    // Access BE
    //console.log(request.body);
    const params = request.query;
    axios.get('http://localhost:8080/updateBorrow',{params}).then(() => {
    //console.log(data.data)
    response.send();
    })
}); 
module.exports = router;