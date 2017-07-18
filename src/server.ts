import {createExpressServer, useContainer} from "routing-controllers";
import * as bodyParser from "body-parser";
import {Express} from "express";
import {EmailParser} from "./parse/EmailParser";
import {DecoratorPlayground} from "./routes/DecoratorPlayground";
import "reflect-metadata";
import {Container} from "typedi";

/*var apitest = require("./routes/apitest");
var backend = require("./routes/backend");

app.use("/apitest", apitest);
app.use("/backend", backend);*/

useContainer(Container);

const app: Express = createExpressServer({
    controllers: [__dirname + "/controllers/*.js"] // we specify controllers we want to use
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let parser = new EmailParser();
parser.main();

let desc: DecoratorPlayground = new DecoratorPlayground("test");

const port: number = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`App listening on port ${port}`)
});