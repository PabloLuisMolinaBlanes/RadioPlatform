let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server, {cors: {origin: '*'}});
let cors = require('cors');
const { waitForDebugger } = require('inspector');
let mysql = require('mysql');
var port = process.env.PORT || 3001;
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
    next();
});
app.get('/list', function(req, res) {
    let sql = `SELECT * FROM mapacache`;
    db.query(sql, function(err,data) {
            if (err) {
                throw err;
            }
            res.json(data);
    });
});
io.on('connection', (socket) => {
    console.log("connection detected");
});
