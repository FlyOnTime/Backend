import {Get, JsonController} from "routing-controllers";
import {UsersContainer} from "../container/UsersContainer";

@JsonController()
export class UsersController {

    constructor(private usersContainer: UsersContainer) {
    }

    @Get("/users")
    getCurrentActiveUsers() {
        // return a list of all users locations and statuses
        // needs to be wrapped with Array#from because Map<K, V>#values returns a Iterator
        return Array.from(this.usersContainer.sessions.values())
        // We don't want to send the sessionId to the outside world, so let's use Array#map to purge those keys from the objects
            .map(data => {
                delete data.sessionId;
                return data;
            });
    }

}