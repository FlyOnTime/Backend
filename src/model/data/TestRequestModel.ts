import {JsonMember, JsonObject} from "typedjson-npm";

@JsonObject
export class TestRequestModel {

    @JsonMember
    userId: number;
    @JsonMember
    id: number;
    @JsonMember
    title: string;
    @JsonMember
    body: string;

}