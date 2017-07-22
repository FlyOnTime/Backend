import {Location} from "./waitingTimes/PostWaitingTimesResponseBody";
import {Status} from "./status/UpdateStatusRequestBody";

export class UserModel {
    constructor(public id: number, public sessionId: string) {
    }
}

export class UserSessionModel {
    constructor(public sessionId: string, public location: Location, public status: Status) {
    }
}