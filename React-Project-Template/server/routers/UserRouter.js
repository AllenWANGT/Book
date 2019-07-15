const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/list', (request, response) => {
    // Access BE
    axios.get('http://localhost:8080/getUsers').then((data) => {
        response.send(data.data);
        //console.log(data.data);


    })
});


module.exports = router;
