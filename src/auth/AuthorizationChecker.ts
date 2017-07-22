import {Action} from "routing-controllers";
import {Container} from "typedi";
import {UsersContainer} from "../container/UsersContainer";
import {isUndefined} from "util";
import {UserModel} from "../model/UserModel";

export class AuthorizationChecker {


    static authorizationChecker = async (action: Action, roles: string[]) => {
        const token = action.request.headers["sessionid"];
        const sessionId = Container.get(UsersContainer).sessions.get(action.request.body["userId"]);
        return sessionId == token;
    };


    static currentUserChecker = async (action: Action) => {
        const token = action.request.headers["sessionid"];
        const sessionId = Container.get(UsersContainer).sessions.get(action.request.body["userId"]);
        return new Promise(function (resolve, reject) {
            if (!isUndefined(sessionId) && !isUndefined(token) && token == sessionId) {
                resolve(new UserModel(action.request.body["userId"], token));
            }
            else {
                reject(Error("None found"));
            }
        });
    }
}