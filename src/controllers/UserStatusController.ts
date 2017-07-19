import {Body, Get, JsonController, Post} from "routing-controllers";

//TODO: Migrate routes from @link{backend.ts} here

@JsonController()
export class UserStatusController {

    @Get("/status")
    updateUserStatus() {
        return new UserStatusRequestBody("");
    }
}