let app = require('express')();
const express = require('express');
let server = require('http').createServer(app);
let io = require('socket.io')(server, {cors: {origin: '*'}});
let cors = require('cors');
const { waitForDebugger } = require('inspector');
let mysql = require('mysql');
var port = process.env.PORT || 3001;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mrhacker,thisisapersonalproject.',
    database: 'radioplatform',
    port: '3306'
});
server.listen(port, function() {
    console.log('listening in http://localhost:'+port);
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    express.json();
    next();
});
app.get('/list/:localizacion', function(req, res) {
    let sql = `SELECT coordenada FROM mapacache WHERE terminobusqueda = (?)`;
    let value = [req.params.localizacion];
    db.query(sql, [value], function(err,data) {
            if (err) {
                throw err;
            }
            res.json(data);
    });
});
app.get('/listall', function(req,res) {
    let sql = 'SELECT * FROM mapacache';
    db.query(sql, function(err,data) {
        if (err) {
            throw err
        }
        res.json(data);
    });
});
app.post('/newcoordinate', jsonParser, function(req, res) {
    let sql = `INSERT INTO mapacache(coordenada, terminobusqueda) VALUES (?)`;
    let values = [req.body.coordenada, req.body.terminobusqueda];
    db.query(sql, [values], function(err,data) {
            if (err) {
                throw err;
            }
            res.json(data);
    });
});
app.get('/cani', function(req, res) {
    let sql = `SELECT issearching from apilimits`;
    db.query(sql, function(err, data) {
        if (err){
            throw err;
        }
        res.json(data);
    });
});
app.post('/operatecon', function(req, res) {
    let sql = `UPDATE apilimits SET issearching = NOT issearching`;
    db.query(sql, function(err, data) {
       if (err) {
           throw err;
       }
       res.json(data); 
    }); 
});

io.on('connection', (socket) => {
    console.log("connection detected");
    socket.on('send', (data) => {
        io.emit('newmessage', data);
    });
});
