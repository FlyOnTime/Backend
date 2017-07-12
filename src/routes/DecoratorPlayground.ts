import {Observable} from "@reactivex/rxjs";
import "reflect-metadata";
import {Retrofit} from "../retrofit/Retrofit";
import {TestRequestModel} from "../model/data/TestRequestModel";
import {TypedJSON} from "typedjson-npm";
//import {RetrofitDecorators} from "./RetrofitDecorators";
//import {GET} from "./RetrofitDecorators";


export class DecoratorPlayground {



    constructor(m: string) {
        this.exampleRoute()
            //.map(data => TypedJSON.parse(data.toString(), TestRequestModel))
            .subscribe(data => console.log(JSON.stringify(data)), error => console.log(error));
    }

    //@GET("")
    getSchipholFlightDataRx(airlineCode, flightNumber, originFlightDate): Observable<any> {

        const URL: string = "https://api-acc.schiphol.nl/public-flights/flights";

        return Observable.fromEvent(
            client.get(
                URL,
                {
                    headers: {ResourceVersion: "v3"},
                    parameters: { app_id: "a5ce65e3", app_key: "34e2fc05aed1f047beeedb6c629972c1", flightname: airlineCode + flightNumber, scheduleDate: originFlightDate}
                }
            ),
            "receiveData"
        );
    }

    @(new Retrofit("https://jsonplaceholder.typicode.com")).GET("posts", TestRequestModel)
    exampleRoute(): Observable<Array<TestRequestModel>> {

    }

    dummyObservable(): Observable<any> {
        return Observable.empty();
    }

}