import {Get, HttpCode, JsonController} from "routing-controllers";

//TODO: Migrate routes from @link{backend.ts} here

@JsonController()
export class UserStatusController {

    // This route should return 204;
    // TODO: This route should just return nothing. @see{https://github.com/pleerock/routing-controllers/issues/224}
    @Get("/status")
    @HttpCode(204)
    updateUserStatus() {
        return {};
    }
}