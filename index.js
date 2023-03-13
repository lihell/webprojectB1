const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();

let homePageCount = 0;
let aboutMeCount = 0;
let menuCount = 0;
let reservationCount = 0;


router.get('/', function (req, res) {
    homePageCount += 1;
    res.sendFile(path.join(__dirname + '/index.html'));
    res.send(homePageCount)
    if (true) {
        const userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        document.cookie = ('userId', userId, {maxAge: 900000, httpOnly: true});
    }
});
router.get('/about', function (req, res) {
    aboutMeCount += 1;
    res.sendFile(path.join(__dirname + '/html/about_me.html'));
    res.send(aboutMeCount)
});
router.get('/menu', function (req, res) {
    menuCount += 1;
    res.sendFile(path.join(__dirname + '/html/menu.html'));
    res.send(menuCount)
});
router.get('/reservations', function (req, res) {
    reservationCount += 1;
    res.sendFile(path.join(__dirname + '/html/reservations.html'));
    res.send(reservationCount)
});

app.use(express.static(__dirname + ''));
app.use('/', router);
app.listen(process.env.port || 3030);
console.log('Running at Port 3030');