const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/list', (request, response) => {
    // Access BE
    const params = request.query;
    //console.log(params);
    axios.get('http://localhost:8080/user/getUsers',{params}).then((data) => {
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
        if (data.data.state==1) {
            //console.log( data.data.userId)
            request.session.userId = data.data.data.userId;
            //console.log(request.session.userId);
            response.send(data.data);
        } else {
            response.send(data.data);
        }
        //console.log(data.data);
    })
});

router.post('/isLogin',(req,res) => {
    // if(req.session.number){
    //     req.session.number = req.session.number +1;
    // }else{
    //     req.session.number = 1;
    // }
    // console.log(req.session.number)
     //console.log(req.session.userId);
     //res.redirect("http://localhost:3000/")
    //res.send()
})

router.post('/addUser', (request, response) => {
    // Access BEr
    const params = request.body;
    axios.post('http://localhost:8080/user/add/user',params).then((data) => {
        response.send(data.data);
        //console.log(data.data);
    })
});

router.post('/addAdmin', (request, response) => {
    // Access BEr
    const params = request.body;
    axios.post('http://localhost:8080/user/add/admin',params).then((data) => {
        response.send(data.data);
        //console.log(data.data);
    })
});

router.get('/getAdmin', (request, response) => {
    // Access BEr
    const params = request.query;
    axios.get('http://localhost:8080/user/getAdmins',{params}).then((data) => {
        response.send(data.data);
        //console.log(data.data);
    })
});

router.get('/delete', (request, response) => {
    // Access BEr
    const params = request.query;
    axios.get('http://localhost:8080/user/delete/user',{params}).then((data) => {
        response.send(data.data);
        //console.log(data.data);
    })
});


module.exports = router;