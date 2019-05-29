const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

var jsonParser = bodyParser.json()

app.use(bodyParser.json());
app.use(cors())

var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'chat'
});

db.connect();

app.post('/get', function (request, response) {
    require('./getRequest').getRequest(request, response, db)
});

app.post('/send', jsonParser, function (request, response) {
    require('./sendRequest').sendMessage(request, response, db)
});


app.post('/new', function (request, response) {
    require('./newRequest').newRequest(request, response, db)
});

app.post('/con', function (request, response) {
    require('./newRequest').getConnId(request, response, db)
});


app.listen(8000, () => console.log(`Example app listening on port 8000 !`))