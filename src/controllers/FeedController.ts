import {Body, Get, JsonController, Post} from "routing-controllers";
import "reflect-metadata";

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