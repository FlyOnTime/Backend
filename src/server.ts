import {useContainer, useExpressServer} from "routing-controllers";
import * as bodyParser from "body-parser";
import {json, urlencoded} from "body-parser";
import {Express} from "express";
import {EmailParser} from "./parse/EmailParser";
import "reflect-metadata";
import {Container} from "typedi";
import {AuthorizationChecker} from "./auth/AuthorizationChecker";

let express = require("express");

useContainer(Container);

const app: Express = express();
app.use(json());
app.use(urlencoded({extended: true}));
useExpressServer(app, {
    controllers: [__dirname + "/controllers/*.js"], // we specify controllers we want to use
    authorizationChecker: AuthorizationChecker.authorizationChecker,
    currentUserChecker: AuthorizationChecker.currentUserChecker
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let parser = new EmailParser();
parser.main();

const port: number = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`App listening on port ${port}`)
});