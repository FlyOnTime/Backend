import {RetrofitDecorators} from "./RetrofitDecorators";

export class Retrofit {

    constructor(url: string) {
        RetrofitDecorators.uri = url;
    }

    GET(endpoint: string, t: any): Function {
        return RetrofitDecorators.GET(endpoint, t);
    }

}