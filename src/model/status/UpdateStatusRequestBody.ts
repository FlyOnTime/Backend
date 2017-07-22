import {Location} from "../waitingTimes/PostWaitingTimesResponseBody";

export class UpdateStatusRequestBody {
    constructor(public userId: number, public userLocation: Location, public status: Status) {
    }
}

export enum Status {
    APPROACHING_AIRPORT,
    AT_AIRPORT,
    UNKNOWN
}