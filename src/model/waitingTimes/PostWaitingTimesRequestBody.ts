import {Location} from "./PostWaitingTimesResponseBody";

export class PostWaitingTimesRequestBody {
    constructor(public userId: number, public userLocation: Location, transportationMode: TransportationModes) {
    }
}

export enum TransportationModes {
    CAR,
    BUS,
    TRAIN,
    BIKE,
    FOOT
}