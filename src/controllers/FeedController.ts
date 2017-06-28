import {Body, Get, JsonController, Post} from "routing-controllers";
import "reflect-metadata";

//TODO: Migrate routes from @link{backend.ts} here

@JsonController()
export class FeedController {

    @Get("/users")
    getAll() {
        return "This action returns all users";
    }

    @Post("/users")
    post(@Body() user: any) {
        return "Saving user...";
    }

}