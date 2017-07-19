import {PositionsListItem} from "./PostWaitingTimesResponseBody";

export class GetWaitingTimesResponseBody {
    constructor(public items: Array<PositionsListItem>) {
    }
}