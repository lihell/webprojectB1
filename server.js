/*server.js*/
let express = require("express");
let app = express();

app.use("/", express.static('public'))

var listener = app.listen(8080, function () {
    console.log("Listening on port " + listener.address().port);
});
