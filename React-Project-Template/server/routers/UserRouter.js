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

router.post('/login', (request, response, ) => {
    // Access BE
    axios.get('http://localhost:8080/login', {
        params: {
            id: request.body.userId,
            password: request.body.userPassword
        }
    }).then((data) => {
        if (data.data) {
            //request.session.userId = data.data.id;
            response.send(data.data);
        } else {
            response.send(data.data);
        }
        //console.log(data.data);
    })
});

router.post('/addUser', (request, response) => {
    // Access BEr
    const params = request.body;
    axios.post('http://localhost:8080/add/user',params).then((data) => {
        response.send(data.data);
        //console.log(data.data);
    })
});


module.exports = router;