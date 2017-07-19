export class UpdateStatusRequestBody {
    constructor(public userId: number, public status: Status) {
    }
}

export enum Status {
    APPROACHING_AIRPORT,
    AT_AIRPORT,
    UNKNOWN
}