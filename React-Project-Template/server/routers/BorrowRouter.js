const express = require('express');
const router = express.Router();
const axios = require('axios');
// const config = require('../../config/config');
// const log4js = require('log4js');
// const logger = log4js.getLogger();

router.get('/list', (request, response) => {
    // Access BE
    const params=request.query;
    axios.get('http://localhost:8080/borrow/getBorrow',{params}).then((data) => {
        console.log(data.data)
        response.send(data.data);
    })
});
router.get('/update', (request, response) => {
    // Access BE
    //console.log(request.body);
    const params = request.query;
    axios.get('http://localhost:8080/borrow/updateBorrow',{params}).then(() => {
    //console.log(data.data)
    response.send();
    })
}); 

router.post('/create', (request, response) => {
    // Access BE
    //console.log(request.body);
    //console.log(request.session.userId)
    const userId=request.session.userId;
    const bookId = request.body.bookId;
    //console.log(bookId);
    axios.post('http://localhost:8080/borrow/createBorrow',{
        bookId:bookId,
        userId:userId
    }).then((data) => {
    //console.log(data.data)
    response.send(data.data);
    })
}); 

router.post('/delete', (request, response) => {
    // Access BE
    //console.log(request.body);
    //console.log(request.session.userId)
    const userId=request.session.userId;
    const bookId = request.body.bookId;
    //console.log(userId);
    //console.log(bookId);
    axios.get('http://localhost:8080/borrow/deleteBorrow',{
        params:{
        bookId:bookId,
        userId:userId
        }
        
    }).then((data) => {
    //console.log(data.data)
    response.send(data.data);
    })
});


router.post('/refuse', (request, response) => {
    // Access BE
    //console.log(request.body);
    //console.log(request.session.userId)
    const userId=request.body.userId;
    const bookId = request.body.bookId;
    //console.log(userId);
    //console.log(bookId);
    axios.get('http://localhost:8080/borrow/deleteBorrow',{
        params:{
        bookId:bookId,
        userId:userId
        }
        
    }).then((data) => {
    //console.log(data.data)
    response.send(data.data);
    })
});
module.exports = router;