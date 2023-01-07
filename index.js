const express = require('express');

const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
    return res.send('<h1>RUNNING</h1>');
});


app.listen(PORT, (err) => {
    if(err){console.log('error in connecting with express server ', err); return;}
    console.log('express server is successfully listening on port:', PORT);
    return;
});