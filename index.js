const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();




router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    if (true) {
        const userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        document.cookie = ('userId', userId, { maxAge: 900000, httpOnly: true });
    }
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