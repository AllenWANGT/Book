const express = require('express');
const router = express.Router();
const axios = require('axios');
// const config = require('../../config/config');
// const log4js = require('log4js');
// const logger = log4js.getLogger();

router.get('/list', (request, response) => {
    const params=request.query;

    // Access BE
    axios.get('http://localhost:8080/getBooks',{params}).then((data) => {
        response.send(data.data);
    })
});


router.get('/delete',(request, response)=>{
    const params = request.query;
    axios.get('http://localhost:8080/deleteBookById',{params}).then(()=>{
        response.send();
    }).catch(() =>{
        response.send();
    })
});


router.post('/addBook',(request, response)=>{
    const params = request.body;
    //console.log(params);
    axios.post('http://localhost:8080/addBook',params).then(()=>{
            response.send();
    }).catch(() => {
        response.send();
    })
    });

    // router.post('/updateBook',(request, response)=>{
    //     const params = request.body;
    //     //console.log(params);
    //     axios.post('http://localhost:8080/updateBook',params).then(()=>{
    //             response.send();
    //     }).catch(() => {
    //         response.send();
    //         //console.log(1);
    //     })
    //     });
// router.post('/update',(request, response)=>{
//     axios.post('http://localhost:3000/book/new').then(()=>{
//     })
// }
// );


module.exports = router;