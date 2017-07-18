import {Body, Get, JsonController, Post} from "routing-controllers";

//TODO: Migrate routes from @link{backend.ts} here

@JsonController()
export class RegistrationController {

    @Get("/register")
    registerUser() {
        let userId: number = Math.floor(Math.random() * CRITERIA.MAX_USER_ID_VALUE) + CRITERIA.MIN_USER_ID_VALUE;
        return new RegisterRequestBody(userId, "", CRITERIA.SESSION_VALID_HOURS)
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