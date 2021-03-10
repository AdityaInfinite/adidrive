const { request, response } = require('express');
const express = require('express');
require('dotenv').config()
const fs = require('fs');
'use strict';

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('public/'));
app.use(express.json());

app.get('/files', (request, response) => {
    var files = fs.readdirSync('public/docs/');
    response.json({files});
	response.end();
});
app.get('/explorer', (request, response) => {
    response.sendFile(`${__dirname.replace(/\\/g, "/")}/public/explorer/explorer.html`)
});


app.post('/submit', (request, response) => {
    if (request.body.pass === process.env.password) {
        status = "success"
        fs.writeFile(`public/docs/${request.body.name}`, request.body.text, function (err) {
            if (err) throw err;
            console.log('Saved! in '+ request.body.name);
        });
    }else{
        status = "failure"
    }
    // console.log("hlo");
    response.json({
        status: status,
    });
    response.end();7
});