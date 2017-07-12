"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var bodyParser = require("body-parser");
var EmailParser_1 = require("./model/EmailParser");
var DecoratorPlayground_1 = require("./routes/DecoratorPlayground");
require("reflect-metadata");
/*var apitest = require("./routes/apitest");
var backend = require("./routes/backend");

app.use("/apitest", apitest);
app.use("/backend", backend);*/
var app = routing_controllers_1.createExpressServer({
    controllers: [__dirname + "/controllers/*.js"] // we specify controllers we want to use
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var parser = new EmailParser_1.EmailParser();
parser.main();
var desc = new DecoratorPlayground_1.DecoratorPlayground("test");
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("App listening on port " + port);
});
