let app = require('express')();
const express = require('express');
let server = require('http').createServer(app);
var usersblocked = {};
var indefblockedusers = [];
let io = require('socket.io')(server, {cors: {origin: '*'}});
let cors = require('cors');
const { waitForDebugger } = require('inspector');
let mysql = require('mysql');
const { Pool } = require('pg');
let pg = require('pg').Pool;
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});
db.connect();
var port = process.env.PORT || 3001;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var blockedUsers = {};
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
    let sql = 'SELECT coordenada FROM mapacache WHERE terminobusqueda = $1;';
    let value = [req.params.localizacion];
    db.query(sql, value, function (err,data) {
            if (err) {
                throw err
            }
            res.json(data.rows);
    });
});
app.get('/listall', function(req,res) {
    let sql = 'SELECT * FROM mapacache';
    db.query(sql, function (err,data) {
        if (err) {
            throw err
        }
        res.json(data.rows);
    });
});
app.post('/newcoordinate', jsonParser, function(req, res) {
    let sql = 'INSERT INTO mapacache(coordenada, terminobusqueda) VALUES ($1, $2);';
    let values = [req.body.coordenada, req.body.terminobusqueda];
    db.query(sql, values, function (err,data) {
            if (err) {
                throw err
            }
            res.json(data);
    });
});
app.get('/cani', function(req, res) {
    let sql = 'SELECT issearching from apilimits;';
    db.query(sql, function (err, data) {
        if (err){
            throw err
        }
        res.json(data.rows);
    });
});
app.post('/operatecon', function(req, res) {
    let sql = 'UPDATE apilimits SET issearching = NOT issearching;';
    db.query(sql, function (err, data) {
       if (err) {
           throw err
       }
       res.json(data); 
    }); 
});

io.on('connection', (socket) => {
    console.log("connection detected");
    console.log(usersblocked);
    io.emit('addthis', usersblocked);
    io.emit('addthisadmin', indefblockedusers);
    io.emit('addthisadmin2', blockedUsers);
    socket.on('send', (data, username) => {
        var blocked = false;
        if (blockedUsers[username] !== 0 && blockedUsers[username] !== undefined) {
            blocked = true;
            data = "You have been blocked by the moderators, please try again in " + blockedUsers[username] + " minutes";
        }
        if (indefblockedusers.indexOf(username) !== -1) {
            blocked = true;
            data = "You have been blocked by the moderators indefinitely, if there has been any error, please make an appeal.";
        }
        io.emit('newmessage', data, username, blocked);
    });
    socket.on('delete', (data) => {
        io.emit('deletethis', data);
    })
    socket.on('block', (username, time) => {
    if (blockedUsers[username] !== 0 && blockedUsers[username] !== undefined) {
        if (time === -1) {
            indefblockedusers.push(username);
        }
    } else {
        if (time === -1) {
            indefblockedusers.push(username);
        } else {
            blockedUsers[username] = (time/1000)/60;
            io.emit('addthisadmin2', blockedUsers);
            setTimeout(() => {blockedUsers[username] = 0;
                io.emit('addthisadmin2', blockedUsers);
                }, time);
        }
    }
    });
    socket.on('unblock', (username) => {
        console.log("trying to unblock");
        indefblockedusers = indefblockedusers.filter(username9 => username !== username9);
        blockedUsers[username] = 0;
    });
    socket.on('blockthis', (username, username2) => {
        if (usersblocked[''+username] === undefined) {
            usersblocked[''+username] = [];
        }
        usersblocked[''+username].push(username2);
        console.log(usersblocked[''+username]);
        console.log(usersblocked);
    });
    socket.on('unblockthis', (username, username2)  => {
        usersblocked[''+username] = usersblocked[''+username].filter(usernames => usernames !== username2);
        console.log(usersblocked);
    });
});
