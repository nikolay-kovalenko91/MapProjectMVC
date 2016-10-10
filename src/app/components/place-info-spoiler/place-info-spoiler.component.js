"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var PlaceInfoSpoilerComponent = (function () {
    function PlaceInfoSpoilerComponent() {
        this.places = [];
        this.isPlaceInfoSpoilerVisible = true;
    }
    PlaceInfoSpoilerComponent.prototype.showInfo = function (place) {
        place.wifi = {},
            place.cells = {},
            place.rates = {},
            place.couchserfers = {},
            place.apartments = {},
            place.aeroports = {},
            place.busStops = {},
            place.railwayStops = {};
        place.wifi.count = 20;
        place.cells.count = 10;
        place.rates.usual = 5.0;
        place.couchserfers.count = 50;
        place.apartments.count = 50;
        place.aeroports.count = 10;
        place.busStops.count = 10;
        place.railwayStops.count = 10;
        this.places.push(place);
        console.log(this.places);
    };
    PlaceInfoSpoilerComponent = __decorate([
        core_1.Component({
            selector: 'place-info-spoiler',
            template: require('./place-info-spoiler.component.pug'),
            styles: [require('./place-info-spoiler.component.scss').toString()]
        }), 
        __metadata('design:paramtypes', [])
    ], PlaceInfoSpoilerComponent);
    return PlaceInfoSpoilerComponent;
}());
exports.PlaceInfoSpoilerComponent = PlaceInfoSpoilerComponent;
//# sourceMappingURL=place-info-spoiler.component.js.map