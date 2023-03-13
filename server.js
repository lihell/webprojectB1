const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const express = require("express");
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());app.use("/public", express.static("public"));
app.get("/", (_, res) => res.redirect("/public/"));

let sessions = [];

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.get("/getCommentsMain", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    fs.readFile(__dirname + '/ressources/commentsMain.json', (err, commentData) => {
        const jsonComment = JSON.parse(commentData)
        console.log("Get request made")
        console.log(jsonComment)
        res.send(jsonComment)
    });
})

app.get("/getCommentsVorspeise", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    fs.readFile(__dirname + '/ressources/commentsVorspeise.json', (err, commentData) => {
        const jsonComment = JSON.parse(commentData)
        console.log("Get request made")
        console.log(jsonComment)
        res.send(jsonComment)
    });
})

app.get("/getCommentsHauptspeise", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    fs.readFile(__dirname + '/ressources/commentsHauptspeise.json', (err, commentData) => {
        const jsonComment = JSON.parse(commentData)
        console.log("Get request made")
        console.log(jsonComment)
        res.send(jsonComment)
    });
})
app.get("/getCommentsNachspeise", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    fs.readFile(__dirname + '/ressources/commentsNachspeise.json', (err, commentData) => {
        const jsonComment = JSON.parse(commentData)
        console.log("Get request made")
        console.log(jsonComment)
        res.send(jsonComment)
    });
})

app.get("/getFav", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    fs.readFile(__dirname + '/ressources/favorites.json', (err, favData) => {
        const jsonFav = JSON.parse(favData)
        console.log("Mein Get request made")
        console.log(jsonFav)
        res.send(jsonFav)
    });
})

app.post("/fav", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    const data = req.body;
    console.log(data);
    fs.readFile(__dirname + "/ressources/favorites.json", (err, fileData) => {
        if (err) throw err;
        let existing = false;
        // Parse the JSON data into a JavaScript object
        const existingData = JSON.parse(fileData);

        console.log("Hier sind meine LOGS!!!!!!!" + data.userID)

        console.log(req.body)

        existingData.forEach(object => {
            if (object.userID === data.userID && object.buttonID === data.buttonID){
                object.isFavNow = !(object.isFavNow)
                existing = true;
            }
            console.log(object.userID + "    " + object.buttonID)
        })
        // Merge the existing data with the new data received in the request
        let newData
        if (!existing){
            newData = [...existingData, req.body];
        } else {
            newData = existingData;
        }
        existing = false;
        //console.log(newData)

        // Write the updated data back to the file
        fs.writeFile(__dirname + "/ressources/favorites.json", JSON.stringify(newData), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    });
});

app.post("/postCommentsMain", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");

    // Read the existing data from the file
    fs.readFile(__dirname + "/ressources/commentsMain.json", (err, fileData) => {
        if (err) throw err;

        // Parse the JSON data into a JavaScript object
        const existingData = JSON.parse(fileData);

        console.log(existingData)

        console.log(req.body)

        // Merge the existing data with the new data received in the request
        const newData = [...existingData, req.body];

        console.log(newData)

        // Write the updated data back to the file
        fs.writeFile(__dirname + "/ressources/commentsMain.json", JSON.stringify(newData), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    });
});

app.post("/postCommentsVorspeise", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");

    // Read the existing data from the file
    fs.readFile(__dirname + "/ressources/commentsVorspeise.json", (err, fileData) => {
        if (err) throw err;
        console.log("im going into the post request")
        // Parse the JSON data into a JavaScript object
        const existingData = JSON.parse(fileData);

        console.log(existingData)

        console.log(req.body)

        // Merge the existing data with the new data received in the request
        const newData = [...existingData, req.body];

        console.log(newData)

        // Write the updated data back to the file
        fs.writeFile(__dirname + "/ressources/commentsVorspeise.json", JSON.stringify(newData), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    });
});

app.post("/postCommentsHauptspeise", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");

    // Read the existing data from the file
    fs.readFile(__dirname + "/ressources/commentsHauptspeise.json", (err, fileData) => {
        if (err) throw err;

        // Parse the JSON data into a JavaScript object
        const existingData = JSON.parse(fileData);

        console.log(existingData)

        console.log(req.body)

        // Merge the existing data with the new data received in the request
        const newData = [...existingData, req.body];

        console.log(newData)

        // Write the updated data back to the file
        fs.writeFile(__dirname + "/ressources/commentsHauptspeise.json", JSON.stringify(newData), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    });
});

app.post("/postCommentsNachspeise", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");

    // Read the existing data from the file
    fs.readFile(__dirname + "/ressources/commentsNachspeise.json", (err, fileData) => {
        if (err) throw err;

        // Parse the JSON data into a JavaScript object
        const existingData = JSON.parse(fileData);

        console.log(existingData)

        console.log(req.body)

        // Merge the existing data with the new data received in the request
        const newData = [...existingData, req.body];

        console.log(newData)

        // Write the updated data back to the file
        fs.writeFile(__dirname + "/ressources/commentsNachspeise.json", JSON.stringify(newData), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    });
});

app.get("/getReservations", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    fs.readFile(__dirname + '/ressources/reservations.json', (err, reservationData) => {
        const jsonComment = JSON.parse(reservationData)
        console.log("Get request made")
        console.log(jsonComment)
        res.send(jsonComment)
    });
})

app.post("/postReservation", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");

    fs.readFile(__dirname + "/ressources/reservations.json", (err, reservationData) => {
        if (err) throw err;

        // Parse the JSON data into a JavaScript object
        const existingData = JSON.parse(reservationData);

        console.log(existingData)

        console.log(req.body)

        // Merge the existing data with the new data received in the request
        const newData = [...existingData, req.body];

        console.log(newData)

        // Write the updated data back to the file
        fs.writeFile(__dirname + "/ressources/reservations.json", JSON.stringify(newData), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    })
})

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

app.listen(8000);
console.log('Running at Port 8000');