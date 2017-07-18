import * as fs from "fs";
import {Observable} from "@reactivex/rxjs";
import { parse } from "romagny13-html-parser";
let colors = require('colors/safe');
require('colors').enabled = true;
import {ParsingStrategy} from "../model/strategy/ParsingStrategy";
import {JSONLDMarkupParsingStrategy} from "../model/strategy/JSONLDMarkupParsingStrategy";

export class EmailParser {

    // Strategy used to parse the data
    private strategy: ParsingStrategy = new JSONLDMarkupParsingStrategy();

    main(): void {
        fs.readFile("ExampleInput.html", "utf8", (err, fileContents: string) => {
            if (!err) {
                const flightInfo = this.strategy.getData(fileContents);
                console.log("Flight reservation for", colors.yellow(flightInfo["underName"]["name"]));
                console.log("With reservation number", colors.yellow(flightInfo["reservationNumber"]));
                console.log("Reservation status", colors.yellow(flightInfo["reservationStatus"] == "http://schema.org/Confirmed" ? "Confirmed" : "Not confirmed yet"));
                console.log("From", colors.yellow(flightInfo["reservationFor"]["departureAirport"]["name"]), "to", colors.yellow(flightInfo["reservationFor"]["arrivalAirport"]["name"]));
                console.log("Flying with", colors.yellow(flightInfo["reservationFor"]["airline"]["name"]), "flight", colors.yellow("#" + flightInfo["reservationFor"]["airline"]["iataCode"] + flightInfo["reservationFor"]["flightNumber"]));
            }
        });
    }

}