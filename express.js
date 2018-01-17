const express = require('express');
const packageInfo = require('./package.json');

const app = express();

app.get('/', function (req, res) {
    res.json({ version: packageInfo.version });
});

const server = app.listen(process.env.PORT | 8080, function () {
    const host = server.address().address | 'localhost';
    const port = server.address().port | 8080;

    console.log('Web server started at http://%s:%s', host, port);
});