const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

const db = require('./config/databaseConnection');

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', require('./routes'));


app.listen(PORT, (err) => {
    if(err){console.log('error in connecting with express server ', err); return;}
    console.log('express server is successfully listening on port:', PORT);
    return;
});