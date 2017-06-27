var express = require('express');
var router = express.Router();
var client = new (require('node-rest-client').Client);
router.get("/queueGVA", function (req, res) {
    var args = {
        headers: {}
    };
    args["headers"]["api-token"] = "jmc5FhtjPk7GycYMSR8qggAaD5Nn9bt58fYq93zPXwm7yVJ2Ct2vmsvP7TM7F52DVBEVe4";
    client.get("https://api-developer.gva.ch/api/airports/1.0/airport/GVA", args, function (data, response) {
        console.log(data);
        res.send(data);
    });
});
router.get("/aciServiceMUC", function (req, res) {
    var args = {
        headers: {}
    };
    args["headers"]["X-apiKey"] = "d017a45398ba4a8e14b7fe534fb9b54a";
    client.get("https://api-dev.munich-airport.de/aci-service-v1/topServices/MUC", args, function (data, response) {
        console.log(data);
        res.send(data);
    });
});
router.get("/serviceCategories", function (req, res) {
    var args = {
        headers: {}
    };
    args["headers"]["X-apiKey"] = "d017a45398ba4a8e14b7fe534fb9b54a";
    client.get("https://api-dev.munich-airport.de/aci-service-v1/serviceCategories/MUC", args, function (data, response) {
        console.log(data);
        res.send(data);
    });
});
module.exports = router;
