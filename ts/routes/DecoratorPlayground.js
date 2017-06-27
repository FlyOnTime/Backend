"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
Object.defineProperty(exports, "__esModule", {value: true});
var rxjs_1 = require("@reactivex/rxjs");
var DecoratorPlayground = (function () {
    function DecoratorPlayground() {
    }

    DecoratorPlayground.prototype.getSchipholFlightDataRx = function (airlineCode, flightNumber, originFlightDate) {
        var URL = "https://api-acc.schiphol.nl/public-flights/flights";
        return rxjs_1.Observable.fromEvent(client.get(URL, {
            headers: {ResourceVersion: "v3"},
            parameters: {
                app_id: "a5ce65e3",
                app_key: "34e2fc05aed1f047beeedb6c629972c1",
                flightname: airlineCode + flightNumber,
                scheduleDate: originFlightDate
            }
        }), "receiveData");
    };
    DecoratorPlayground.prototype.doStuff = function () {
    };
    return DecoratorPlayground;
}());
__decorate([
    GET(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], DecoratorPlayground.prototype, "getSchipholFlightDataRx", null);
__decorate([
    GET(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DecoratorPlayground.prototype, "doStuff", null);
exports.DecoratorPlayground = DecoratorPlayground;
doStuffInterface();
function GET(value) {
    return function (target, propertyKey, descriptor) {
        console.log(descriptor);
        descriptor.configurable = value;
    };
}
