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
var SearchRepresentComponent = (function () {
    function SearchRepresentComponent() {
        this.isRateDropdownVisible = false;
        this.isShareDropdownVisible = false;
        this.isGoDropdownVisible = false;
        this.isGoBtnDisabled = true;
        this.places = [];
        this.placesForRouteSearch = [];
        /*this.places = [
            {formatted_address: 'Avenida Dom João II E, Lisbon, Portugal'}
        ];*/
    }
    SearchRepresentComponent.prototype.OnGetPlace = function (placesOutput) {
        var _this = this;
        //placesOutput: array of places, but now I suggest to use only one place from the whole bunch
        if (placesOutput instanceof Array) {
            placesOutput.forEach(function (place) {
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
                _this.places.push(place);
            });
        }
        else {
            var place = placesOutput;
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
        }
        if (this.places.length > 1) {
            this.isGoBtnDisabled = false;
        }
    };
    SearchRepresentComponent.prototype.onGoClick = function () {
        this.placesForRouteSearch = this.places;
        this.places = [];
        this.isGoBtnDisabled = true;
    };
    SearchRepresentComponent = __decorate([
        core_1.Component({
            selector: 'search-represent',
            template: require('./search-represent.component.pug'),
            styles: [require('./search-represent.component.scss').toString()]
        }), 
        __metadata('design:paramtypes', [])
    ], SearchRepresentComponent);
    return SearchRepresentComponent;
}());
exports.SearchRepresentComponent = SearchRepresentComponent;
//# sourceMappingURL=search-represent.component.js.map