const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
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
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');