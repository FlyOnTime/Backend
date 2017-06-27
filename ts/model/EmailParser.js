"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var fs = require("fs");
var colors = require('colors/safe');
require('colors').enabled = true;
var JSONLDMarkupParsingStrategy_1 = require("./strategy/JSONLDMarkupParsingStrategy");
var EmailParser = (function () {
    function EmailParser() {
        // Strategy used to parse the data
        this.strategy = new JSONLDMarkupParsingStrategy_1.JSONLDMarkupParsingStrategy();
    }

    EmailParser.prototype.main = function () {
        var _this = this;
        fs.readFile("ExampleInput.html", "utf8", function (err, fileContents) {
            if (!err) {
                var flightInfo = _this.strategy.getData(fileContents);
                console.log("Flight reservation for", colors.yellow(flightInfo["underName"]["name"]));
                console.log("With reservation number", colors.yellow(flightInfo["reservationNumber"]));
                console.log("Reservation status", colors.yellow(flightInfo["reservationStatus"] == "http://schema.org/Confirmed" ? "Confirmed" : "Not confirmed yet"));
                console.log("From", colors.yellow(flightInfo["reservationFor"]["departureAirport"]["name"]), "to", colors.yellow(flightInfo["reservationFor"]["arrivalAirport"]["name"]));
                console.log("Flying with", colors.yellow(flightInfo["reservationFor"]["airline"]["name"]), "flight", colors.yellow("#" + flightInfo["reservationFor"]["airline"]["iataCode"] + flightInfo["reservationFor"]["flightNumber"]));
            }
        });
    };
    return EmailParser;
}());
exports.EmailParser = EmailParser;
