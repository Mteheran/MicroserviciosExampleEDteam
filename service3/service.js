var express = require("express"),
  app = express(),
  bodyParser = require("body-parser")

var cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var router = express.Router();

router.post("/counter", function (req, res) {
    var text  = req.body.text;
    var response  = { "words": text.trim().split(/\s+/).length, "characters": text.length }
    res.send(response);
});

app.use(router);

app.listen(7020, function () {
  console.log("Node server running on http://localhost:7020");
});