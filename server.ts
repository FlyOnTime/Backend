/**
 * Created by jossi on 16.06.2017.
 */
import express = require('express');
import htmlparser = require("htmlparser2");
import jsonld = require('jsonld'); 
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
const app = express();

var apitest = require("./routes/apitest");
var backend = require("./routes/backend");

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/apitest", apitest);
app.use("/backend", backend);

let parser = new htmlparser.Parser({
    onopentag: function(name, attribs){
        if(name === "script" && attribs.type === "application/ld+json"){
            console.log("Found JSON-LD");
        }
    },
    ontext: function(text){
        console.log("-->", text);
        try {
            let flightObject: Object = JSON.parse(text);
            console.log(flightObject["@type"])
        } catch (err) {

        }
    },
    onclosetag: function(tagname){
        if(tagname === "script"){
            console.log("That's it?!");
        }
    }
}, {decodeEntities: true});
parser.write('<html> <head> <script type="application/ld+json"> { "@context": "http://schema.org", "@type": "FlightReservation", "reservationNumber": "RXJ34P", "reservationStatus": "http://schema.org/Confirmed", "underName": { "@type": "Person", "name": "Eva Green" }, "reservationFor": { "@type": "Flight", "flightNumber": "110", "airline": { "@type": "Airline", "name": "United", "iataCode": "UA" }, "departureAirport": { "@type": "Airport", "name": "San Francisco Airport", "iataCode": "SFO" }, "departureTime": "2017-03-04T20:15:00-08:00", "arrivalAirport": { "@type": "Airport", "name": "John F. Kennedy International Airport", "iataCode": "JFK" }, "arrivalTime": "2017-03-05T06:30:00-05:00" }, "airplaneSeat": "9A", "airplaneSeatClass": { "@type": "AirplaneSeatClass", "name": "Business" }, "ticketNumber": "ABC1234", "ticketToken": "qrCode:AB34" } </script> </head> <body> <p> This a test for a Go-To action in Gmail. </p> </body> </html>');
parser.end();

// Google Maps Directions API Key
// AIzaSyBIqZZoPNUY72VvnJQEvukFgBOXWShvobU

//Basic route
app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.listen(3000 || process.env.PORT, "0.0.0.0", function () {
    console.log('Example app listening on port 3000!')
});
