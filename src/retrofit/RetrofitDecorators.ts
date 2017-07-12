// @GET Decorator to annotate (interface) methods to indicate the endpoint should be requested with GET
import {Observable} from "@reactivex/rxjs";
import {TypedJSON} from "typedjson-npm";
const rp = require('request-promise');

export class RetrofitDecorators {

    static uri: string;

    public static GET(endpoint: string, t: any): Function {

        const request_method: string = "get";

        const host: string = this.uri;

        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            let returnType = Reflect.getMetadata("design:returntype", target, propertyKey);
            console.log(Reflect.getOwnMetadataKeys(target));
            Reflect.defineMetadata("method", "GET", target);
            Reflect.defineMetadata("endpoint", endpoint, target);
            descriptor.value = function () {
                return Observable
                    .fromPromise(
                        rp(`${host}/${endpoint}`)
                    ).map(data => TypedJSON.parse(data.toString(), t));
            };
        };
    }

    URL(host: string, endpoint: string) {
        return `${host}/${endpoint}`;
    }

}