import {Get, JsonController, Param, Post} from "routing-controllers";

//TODO: Migrate routes from @link{backend.ts} here

@JsonController()
export class WaitingTimesController {

    @Get("/waitingTimes/:airport")
    getWaitingTimesForAirport( @Param("airport") airport: string) {

        // return new WaitingTimesResponseBody();

        return "[ { 'points': { 'lat': 53.593361,'lng': 10.013886},'type': 'SECURITY','waitingTimeInSeconds': 400},{'point': {'lat': 53.631862,'lng': 10.005338},'type': 'CHECKIN','waitingTimeInSeconds': 700}]";
    }

    @Post("/waitingTimes/:airport")
    getWaitingTimesForUser( @Param("airport") airport: string) {
        let response = {
            "airportArrivalTime": {
                "mins": 10,
                "date": "2017-07-15T11:03:00+02:00"
            },
            "items": [
                {
                    "point": {
                        "lat": 53.593361,
                        "lng": 10.013886
                    },
                    "type": "SECURITY",
                    "waitingTimeInSeconds": 400
                },
                {
                    "point": {
                        "lat": 53.631862,
                        "lng": 10.005338
                    },
                    "type": "CHECKIN",
                    "waitingTimeInSeconds": 700
                }
            ]
        };
        return JSON.stringify(response);
    }
}