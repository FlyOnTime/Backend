import {Body, Get, JsonController, Post} from "routing-controllers";

//TODO: Migrate routes from @link{backend.ts} here

@JsonController()
export class FeedController {

    @Get("/")
    getAll() {
        return "Basic route is here";
    }

}