import {createExpressServer} from "routing-controllers";
import * as bodyParser from "body-parser";
import {Express} from "express";
import {EmailParser} from "./model/EmailParser";
import {DecoratorPlayground} from "./routes/DecoratorPlayground";

/*var apitest = require("./routes/apitest");
var backend = require("./routes/backend");

app.use("/apitest", apitest);
app.use("/backend", backend);*/

const app: Express = createExpressServer({
    controllers: [__dirname + "/controllers/*.js"] // we specify controllers we want to use
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let parser = new EmailParser();
parser.main();

let desc: DecoratorPlayground = new DecoratorPlayground;
desc.doStuff();

const port: number = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`App listening on port ${port}`)
});