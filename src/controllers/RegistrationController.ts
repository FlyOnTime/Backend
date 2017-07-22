import {Get, JsonController} from "routing-controllers";
import {RegisterRequestBody} from "../model/register/RegisterResponseBody";
//import v4 as thing from "uuid";
import * as uuid from "uuid";
import {UsersContainer} from "../container/UsersContainer";

//TODO: Migrate routes from @link{backend.ts} here

@JsonController()
export class RegistrationController {

    constructor(private userContainter: UsersContainer) {
    }

    @Get("/register")
    registerUser() {
        // Let's generate a nice userId
        let userId: number = Math.floor(Math.random() * CRITERIA.MAX_USER_ID_VALUE) + CRITERIA.MIN_USER_ID_VALUE;
        // Generate a sessionId
        let sessionId: string = uuid.v4();
        // Set the uid and sessionId in the UserContainer to store it
        this.userContainter.sessions.set(userId, sessionId);
        /*  Return the generated data wrapped in a RegisterRequestBody
            It will then be serialized and sent as JSON
         */
        return new RegisterRequestBody(userId, sessionId, CRITERIA.SESSION_VALID_HOURS)
    }

}

class CRITERIA {
    private static _MAX_USER_ID_VALUE: number = 6000;
    private static _MIN_USER_ID_VALUE: number = 1;

    private static _SESSION_VALID_HOURS: number = 48;

    static get MAX_USER_ID_VALUE(): number {
        return this._MAX_USER_ID_VALUE;
    }
    static get MIN_USER_ID_VALUE(): number {
        return this._MIN_USER_ID_VALUE;
    }
    static get SESSION_VALID_HOURS(): number {
        return this._SESSION_VALID_HOURS;
    }
}