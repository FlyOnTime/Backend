import {Service} from "typedi";
import {UserSessionModel} from "../model/UserModel";


// This is hacky. I know.
@Service()
export class UsersContainer {
    sessions: Map<number, UserSessionModel> = new Map()
}