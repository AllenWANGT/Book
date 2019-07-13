const express = require('express');
const router = express.Router();
const axios = require('axios');
// const config = require('../../config/config');
// const log4js = require('log4js');
// const logger = log4js.getLogger();

router.get('/list', (request, response) => {
    // Access BE
    axios.get('http://localhost:8080/getBooks').then((data) => {
        response.send(data.data);
    })
});


router.delete('/delete',(request, response)=>{
    axios.delete('http://localhost:8080/deleteBookById?bookId='+4).then(()=>{

    })
}

);



module.exports = router;