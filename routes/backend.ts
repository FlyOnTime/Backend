var express = require('express');
var router = express.Router();
var client = new (require('node-rest-client').Client);

// 

router.get("/travelInfo", function(req, res){
    var resultSchema = {
        id: "122016526840710660", 
        flightName: "CAI8002", 
        prefixIATA: "XC",
        prefixICAO: "CAI",
        flightNumber: "8002",
        scheduleDate: "2017-06-17",
        scheduleTime: "03:45:00",
        destination: "AYT",
        terminal: "3",
        gate: "G05",
        checkinStartTime: "2017-06-17T00:45:00.000+02:00",
        checkinEndTime: "2017-06-17T03:00:00.000+02:00",
        checkInPosition: ["30", "31"],
        expedtedTimeBoarding: "2017-06-17T03:15:00.000+02:00",
        expectedTimeGateOpen: "2017-06-17T01:00:00.000+02:00",
        expectedTimeGateClosing: "2017-06-17T03:35:00.000+02:00",
        luggageInformation: {
            itemNumber: 2,
            itemAllowance: "max. 23 kg, 1 bag",
            specialLuggageNumber: 1,
            specialLuggageType: "bicycle",
            specialLuggageAllowance: "max. 25 kg, 1 bag"
        },
        estimatedWaitingTimeTotalSeconds: "1200",
        estimatedIndoorWalkingDurationSeconds: "900",
        estimatedCheckInWaitingTimeSeconds: "720",
        estimatedSecurityCheckWaitingTimeSeconds: "1140",
        estimatedSecurityCheckWaitingTimeAccuracy: "94"    
    };
    res.send(resultSchema);
});

router.post("/travelInfo", function(req, res){
    var airlineCode = req.body.airlineCode;
    var flightNumber = req.body.flightNumber;
    var originFlightDate = req.body.originFlightDate;

    getAMSFlightData(airlineCode, flightNumber, originFlightDate, function(amsData){
        // Build response object
        var resultObject = 
        {
            id: amsData.id,
            flightName: amsData.flightName,
            prefixIATA: amsData.prefixIATA,
            prefixICAO: amsData.prefixICAO,
            flightNumber: amsData.flightNumber,
            scheduleDate: amsData.scheduleDate,
            scheduleTime: amsData.scheduleTime,
            destination: amsData.
        };
        res.send(
        {
            id: "122016526840710660",
            flightName: "CAI8002",
            prefixIATA: "XC",
            prefixICAO: "CAI",
            flightNumber: "8002",
            scheduleDate: "2017-06-17",
            scheduleTime: "03:45:00",
            destination: "AYT",
            terminal: "3",
            gate: "G05",
            checkinStartTime: "2017-06-17T00:45:00.000+02:00",
            checkinEndTime: "2017-06-17T03:00:00.000+02:00",
            checkInPosition: ["30", "31"],
            expectedTimeBoarding: "2017-06-17T03:15:00.000+02:00",
            expectedTimeGateOpen: "2017-06-17T01:00:00.000+02:00",
            expectedTimeGateClosing: "2017-06-17T03:35:00.000+02:00",
            luggageInformation: {
                itemNumber: 2,
                itemAllowance: "max. 23 kg, 1 bag",
                specialLuggageNumber: 1,
                specialLuggageType: "bicycle",
                specialLuggageAllowance: "max. 25 kg, 1 bag"
            },
            estimatedWaitingTimeTotalSeconds: "1200",
            estimatedIndoorWalkingDurationSeconds: "900",
            estimatedCheckInWaitingTimeSeconds: "720",
            estimatedSecurityCheckWaitingTimeSeconds: "1140",
            estimatedSecurityCheckWaitingTimeAccuracy: 94    
        });
    });
});

router.get("/flightInfo/:airlineCode/:flightNumber/:originFlightDate", function(req, res) {
    var airlineCode = req.params.airlineCode;
    var flightNumber = req.params.flightNumber;
    var originFlightDate = req.params.originFlightDate;


    // gather information for this flight
    // 
    getAMSFlightData(airlineCode, flightNumber, originFlightDate, function(amsData){
        res.send(amsData);
    });
    // var args = {
    //     headers: {}
    // };
    // args["headers"]["X-apiKey"] = "d017a45398ba4a8e14b7fe534fb9b54a";
    // client.get("https://api-dev.munich-airport.de/aci-flight-v1/flightDetails/" 
    //     + airlineCode + "/" + flightNumber + "/" + originFlightDate, 
    //     args, function(data, response){
    //         console.log(data);        
    //         res.send(data);
    // });
});

function getAMSFlightData(airlineCode, flightNumber, originFlightDate, callback) {
    // https://api-acc.schiphol.nl/public-flights/flights?app_id=a5ce65e3&app_key=34e2fc05aed1f047beeedb6c629972c1&airline=LH
    var args = {
        headers: {ResourceVersion: "v3"},
        parameters: { app_id: "a5ce65e3", app_key: "34e2fc05aed1f047beeedb6c629972c1", flightname: airlineCode + flightNumber, scheduleDate: originFlightDate}
    };
    console.log(args);
    // args["headers"]["ResourceVersion: v3"] = "d017a45398ba4a8e14b7fe534fb9b54a";
    client.get("https://api-acc.schiphol.nl/public-flights/flights", 
        args, function(data, response){
            console.log("getAMSFlightData");
            console.log(data);  
            // console.log(response);
            
            console.log("call callback");
              
            callback(data);
    });
}

module.exports = router;