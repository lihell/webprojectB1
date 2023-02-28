const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();


router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
router.get('/error', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/error.html'));
});
router.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/login.html'));
});
router.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/about_me.html'));
});
router.get('/menu', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/menu.html'));
});
router.get('/reservations', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/reservations.html'));
});

app.use(express.static(__dirname + ''));
app.use('/', router);
app.listen(process.env.port || 3030);
console.log('Running at Port 3030');