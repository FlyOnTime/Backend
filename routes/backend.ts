var express = require('express');
var router = express.Router();
var client = new (require('node-rest-client').Client);
var papaparse = require('papaparse');

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
    var Papa = require('papaparse');
    var data = [ [541.901960784,364.176470588,367.980392157,561.392156863,455.901960784,485.431372549,471.607843137,444.333333333,360.31372549,307.764705882,364.470588235,386.333333333,338.647058824,374.921568627,445.411764706,369.352941176,348.647058824,389.058823529],
                [351.882352941,364.470588235,374.0,384.254901961,368.882352941,344.098039216,323.450980392,310.0,270.294117647,274.156862745,308.803921569,326.411764706,280.803921569,337.784313725,345.0,366.470588235,409.745098039,344.019607843],
                [298.176470588,320.274509804,380.156862745,368.411764706,360.0,329.333333333,384.666666667,398.666666667,361.862745098,363.137254902,323.137254902,344.843137255,354.450980392,363.588235294,371.450980392,377.254901961,297.941176471,288.68627451],
                [386.235294118,511.980392157,491.784313725,322.666666667,279.019607843,347.764705882,386.333333333,429.098039216,498.215686275,421.039215686,296.235294118,368.921568627,331.607843137,450.392156863,446.803921569,382.450980392,298.431372549,253.058823529],
                [467.735849057,358.41509434,422.773584906,525.547169811,297.150943396,438.490566038,531.188679245,511.849056604,493.754716981,450.58490566,462.169811321,533.566037736,422.981132075,532.320754717,651.528301887,624.660377358,545.339622642,614.943396226],
                [495.901960784,476.019607843,428.784313725,372.294117647,314.62745098,306.862745098,396.941176471,402.392156863,368.549019608,353.176470588,506.490196078,617.235294118,656.607843137,630.176470588,518.078431373,503.921568627,524.196078431,478.921568627]
    ];
    console.log(data[0][0]);
    console.log("MYDATA");
    
    
    
    
    var airlineCode = req.body.airlineCode;
    var flightNumber = req.body.flightNumber;
    var originFlightDate = req.body.originFlightDate;

    
    
    getAMSFlightData(airlineCode, flightNumber, originFlightDate, function(amsData){
        // Build response object
        console.log(amsData);
        
        var resultObject = 
        {
            id: amsData.id,
            flightName: amsData.flightName,
            prefixIATA: amsData.prefixIATA,
            prefixICAO: amsData.prefixICAO,
            flightNumber: amsData.flightNumber,
            scheduleDate: amsData.scheduleDate,
            scheduleTime: amsData.scheduleTime,
            destination: "KBP",
            terminal: amsData.terminal,
            gate: amsData.gate,
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
        };

        res.send(resultObject);

        // {
        //     id: "122016526840710660",
        //     flightName: "CAI8002",
        //     prefixIATA: "XC",
        //     prefixICAO: "CAI",
        //     flightNumber: "8002",
        //     scheduleDate: "2017-06-17",
        //     scheduleTime: "03:45:00",
        //     destination: "AYT",
        //     terminal: "3",
        //     gate: "G05",
        //     checkinStartTime: "2017-06-17T00:45:00.000+02:00",
        //     checkinEndTime: "2017-06-17T03:00:00.000+02:00",
        //     checkInPosition: ["30", "31"],
        //     expectedTimeBoarding: "2017-06-17T03:15:00.000+02:00",
        //     expectedTimeGateOpen: "2017-06-17T01:00:00.000+02:00",
        //     expectedTimeGateClosing: "2017-06-17T03:35:00.000+02:00",
        //     luggageInformation: {
        //         itemNumber: 2,
        //         itemAllowance: "max. 23 kg, 1 bag",
        //         specialLuggageNumber: 1,
        //         specialLuggageType: "bicycle",
        //         specialLuggageAllowance: "max. 25 kg, 1 bag"
        //     },
        //     estimatedWaitingTimeTotalSeconds: "1200",
        //     estimatedIndoorWalkingDurationSeconds: "900",
        //     estimatedCheckInWaitingTimeSeconds: "720",
        //     estimatedSecurityCheckWaitingTimeSeconds: "1140",
        //     estimatedSecurityCheckWaitingTimeAccuracy: 94    
        // });
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