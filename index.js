const { request, response } = require('express');
const express = require('express');
const fs = require('fs');
'use strict';

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('public/'));
app.use(express.json());

app.post('/submit', (request, response) => {
    if (request.body.pass === "adi") {
        status = "success"
        fs.writeFile(`public/docs/${request.body.name}`, request.body.text, function (err) {
            if (err) throw err;
            console.log('Saved! in '+ request.body.name);
        });
        fs.appendFile('public/links.html',`<br> <a href="/docs/${request.body.name}">${request.body.name}</a>` , function (err) {
            if (err) throw err;
          });
    }else{
        status = "failure"
    }
    // console.log("hlo");
    response.json({
        status: status,
    });
    response.end();
});