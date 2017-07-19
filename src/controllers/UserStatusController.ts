import {Get, HttpCode, JsonController, OnUndefined} from "routing-controllers";

//TODO: Migrate routes from @link{backend.ts} here

@JsonController()
export class UserStatusController {

    // This route should return 204;
    @Get("/status")
    @HttpCode(204)
    @OnUndefined(404)
    updateUserStatus() {
        return null;
    }
}