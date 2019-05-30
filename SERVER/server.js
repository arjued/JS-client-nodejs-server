const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const messages = require('./messages')
const session = require('./session')

app.use(bodyParser.json());
app.use(cors())

const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'chat'
});

db.connect();

app.post('/getMessage', function (request, response) {
    messages.getMessage(request, response, db)
});

app.post('/sendMessage', function (request, response) {
    messages.sendMessage(request, response, db)
});

app.post('/newRequirement', function (request, response) {
    messages.newRequirement(request, response, db)
});

app.post('/getConnection', function (request, response) {
    session.getConnId(request, response, db)
});

app.listen(8000, () => console.log(`App listening on port 8000 !`))