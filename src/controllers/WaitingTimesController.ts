import {CurrentUser, Get, JsonController, Param, Post} from "routing-controllers";
import {UserModel} from "../model/UserModel";
import * as fs from "fs";
import {Observable, Observer} from "@reactivex/rxjs";
import {Location, PointTypes, PositionsListItem} from "../model/waitingTimes/PostWaitingTimesResponseBody";

const csv = require('csv');

//TODO: Migrate routes from @link{backend.ts} here

@JsonController()
export class WaitingTimesController {

    @Get("/waitingTimes/:airport")
    getWaitingTimesForAirport(@Param("airport") airport: string) {

        let positions: Array<PositionsListItem> = [];

        return this.getCurrentWaitingTime()
            .map(waitingTime => {
                // Let's ceil the calculated waiting time
                let ceiledWaitingTime: number = Math.ceil(waitingTime);
                // Generate a new location
                let location: Location = new Location(53.631929, 10.005365);
                // Because we don't have the data, we can only use PointTypes.CHECKIN as dummy data
                // Same goes for the location, as the waiting times are calculated for the whole airport
                positions.push(new PositionsListItem(location, PointTypes.CHECKIN, ceiledWaitingTime));
                return positions;
            })
            // We know that we will only get one result
            // If we don't use Observable#take, Observable#onComplete is never called and the promise doesn't get resolved or even rejected
            .take(1)
            // Convert it to a promise that will be returned and handled by routing-controllers
            .toPromise();
    }

    readFileRx(filename: string, encoding: string = "utf8"): Observable<string> {
        return Observable.create((emitter: Observer<string>) => {
            fs.readFile(filename, encoding, function (err, data: string) {
                if (err) {
                    emitter.error(err)
                }
                emitter.next(data)
            });
        })
    }

    parseCsvRx(data: string): Observable<Array<Array<string>>> {
        return Observable.create((emitter: Observer<string>) => {
            csv.parse(data, (err, data) => {
                if (err) emitter.error(err);
                emitter.next(data);
            });
        });
    }

    getHeadersFromCsv(input: Array<Array<string>>): Array<number> {
        return input[0].map(val => {
            return Number(val)
        })
    }

    getCurrentWaitingTime(): Observable<number> {
        return this.getParsedWaitingTimes()
            .map(data => {
                let headers: Array<number> = this.getHeadersFromCsv(data);
                // get a new date object with the current time
                let date: Date = new Date();
                // get the corresponding header's index for the current hour
                let hourIndex: number = headers.indexOf(date.getHours());
                let dayIndex: number = date.getDay();
                return Number(data[dayIndex][hourIndex])
            })
    }

    getWaitingTime(day: number, hour: number): Observable<number> {
        return this.getParsedWaitingTimes()
        // return the data for the current hour
            .map(data => {
                return Number(data[day][hour])
            });
    }

    getParsedWaitingTimes(): Observable<Array<Array<string>>> {
        return Observable.of("././public/ressources/finalstrings.csv")
        // Get the file contents
            .flatMap(filename => this.readFileRx(filename))
            // Parse the file contents
            .flatMap(data => this.parseCsvRx(data));
    }

    @Post("/waitingTimes/:airport")
    getWaitingTimesForUser(@CurrentUser({required: true}) user: UserModel, @Param("airport") airport: string) {



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