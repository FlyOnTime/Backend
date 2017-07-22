/**
 * Created by jossi on 18.07.2017.
 */

export class WaitingTimesResponseBody {
    constructor(public items: Array<PositionsListItem>) {
    }

}

export class Location {
    constructor(public lat: number, public lng: number) {
    }
}

export class AirportArrivalTime {
    constructor(public mins: number, public date: Date) {
    }
}

export class PositionsListItem {
    constructor(public point: Location, public type: PointTypes, public waitingTimeInSeconds: number) {
    }
}

// TODO: Add more point types?
export enum PointTypes {
    SECURITY,
    CHECKIN
}