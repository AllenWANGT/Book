const express = require('express');
const router = express.Router();
const axios = require('axios');
// const config = require('../../config/config');
// const log4js = require('log4js');
// const logger = log4js.getLogger();

router.get('/list', (request, response) => {
    const params=request.query;

    // Access BE
    axios.get('http://localhost:8080/book/getBooks',{params}).then((data) => {
        response.send(data.data);
    })
});

router.get('/passBook', (request, response) => {
    const userId=request.session.userId;
    //console.log(userId)
    // Access BE
    axios.get('http://localhost:8080/book/get/passBook',{
        params:{
            userId:userId
        }
    }).then((data) => {
        response.send(data.data);
    })
});


router.get('/delete',(request, response)=>{
    const params = request.query;
    axios.get('http://localhost:8080/book/deleteBookById',{params}).then(()=>{
        response.send();
    }).catch(() =>{
        response.send();
    })
});


router.post('/addBook',(request, response)=>{
    const params = request.body;
    //console.log(params);
    axios.post('http://localhost:8080/book/addBook',params).then(()=>{
            response.send();
    }).catch(() => {
        response.send();
    })
    });

    router.post('/updateBook',(request, response)=>{
        const params = request.body;
        //console.log(params);
        axios.post('http://localhost:8080/book/updateBook',params).then(()=>{
                response.send();
        }).catch(() => {
            response.send();
            //console.log(1);
        })
        });
// router.post('/update',(request, response)=>{
//     axios.post('http://localhost:3000/book/new').then(()=>{
//     })
// }
// );
router.post('/borrow',(request, response)=>{
    const bookId = request.body.bookId;
    //console.log(bookId)
    //console.log(params);
    axios.get('http://localhost:8080/book/borrowBook',{
        params:{
            bookId:bookId
        }
    }).then((data)=>{
            response.send(data.data);
    }).catch(() => {
        response.send();
    })
});

router.post('/return',(request, response)=>{
    const bookId = request.body.bookId;
    //console.log(bookId)
    //console.log(params);
    axios.get('http://localhost:8080/book/returnBook',{
        params:{
            bookId:bookId
        }
    }).then((data)=>{
            response.send(data.data);
    }).catch((data) => {
        response.send(data.data);
    })
});


module.exports = router;