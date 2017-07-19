import {Patch, HttpCode, JsonController, OnUndefined} from "routing-controllers";

//TODO: Migrate routes from @link{backend.ts} here

@JsonController()
export class UserStatusController {

    // This route should return 204;
    @Patch("/status")
    @HttpCode(204)
    @OnUndefined(404)
    updateUserStatus() {
        return null;
    }
}