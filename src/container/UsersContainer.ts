import {Service} from "typedi";


// This is hacky. I know.
@Service()
export class UsersContainer {
    sessions: Map<number, string> = new Map()
}