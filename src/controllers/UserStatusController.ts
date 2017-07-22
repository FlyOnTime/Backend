import {Body, CurrentUser, JsonController, Patch} from "routing-controllers";
import {UserModel, UserSessionModel} from "../model/UserModel";
import {UpdateStatusRequestBody} from "../model/status/UpdateStatusRequestBody";
import {UsersContainer} from "../container/UsersContainer";
import {Location} from "../model/waitingTimes/PostWaitingTimesResponseBody";

//TODO: Migrate routes from @link{backend.ts} here

@JsonController()
export class UserStatusController {

    constructor(private usersContainer: UsersContainer) {
    }

    // This route should return 204;
    @Patch("/status")
    updateUserStatus(@CurrentUser({required: true}) user: UserModel, @Body() request: UpdateStatusRequestBody) {
        let storedUser: UserSessionModel = this.usersContainer.sessions.get(user.id);
        storedUser.location = new Location(request.userLocation.lat, request.userLocation.lng);
        storedUser.status = request.status;
        return this.usersContainer.sessions.get(user.id);
    }
}