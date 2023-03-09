const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const express = require("express");
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());app.use("/public", express.static("public"));
app.get("/", (_, res) => res.redirect("/public/"));

let sessions = [];

app.post("/fav", (req, res) => {
    const data = req.body;
    console.log(data);
    // Do something with the data...
    res.send('Data received!');
});

app.post("/login", (req, res) => {
    const username = req.body.username || "";
    const password = req.body.password || "";

    // existiert der Benutzer in einer z.B. Datenbank?
    // ist das Passwort korrekt bzw. auch so hinterlegt in der Datenbank

    if (username !== "admin" || password !== "passwd") {
        res.send("sadasdasdasdasdasdasd")
        return;
    }

    const sessionId = Math.floor(Math.random() * 100000);

    sessions.push(`${sessionId}`);

    res.cookie("token", sessionId, { maxAge: 5 * 60 * 1000 });
    res.redirect("/secure");
});

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    // session id aus sessions löschen
    sessions = [];
    res.redirect("/");
});

app.all("/secure", (req, res, next) => {
    console.log("sdasdasdasds")
    res.header('Access-Control-Allow-Origin', '*');
    if (req.cookies.token === undefined) {
        console.log("sds")
        res.redirect("/error");
        return;
    }

    console.log(`request with session id: ${req.cookies.token}`);
    if (!sessions.includes(req.cookies.token)) {
        res.redirect("/error/#error");
        return;
    }

    next();
});

app.use("/secure", express.static("secure"));

app.listen(8080);