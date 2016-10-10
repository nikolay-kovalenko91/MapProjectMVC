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
var place_info_spoiler_component_1 = require("../place-info-spoiler/place-info-spoiler.component");
var founded_routes_spoiler_component_1 = require("../founded-routes-spoiler/founded-routes-spoiler.component");
var SearchRepresentComponent = (function () {
    function SearchRepresentComponent() {
        this.isRateDropdownVisible = false;
        this.isShareDropdownVisible = false;
        this.isGoDropdownVisible = false;
        this.isGoBtnDisabled = true;
        this.placesForRouteSearch = [];
    }
    SearchRepresentComponent.prototype.ngAfterViewInit = function () {
    };
    SearchRepresentComponent.prototype.showInfo = function (place) { this.placeSpoilerComponent.showInfo(place); };
    SearchRepresentComponent.prototype.showRoutes = function (placesForRouteSearch) { this.routesSpoilerComponent.showRoutes(placesForRouteSearch); };
    SearchRepresentComponent.prototype.OnGetPlace = function (placesOutput) {
        var _this = this;
        //placesOutput: array of places, but now I suggest to use only one place from the whole bunch
        this.placeSpoilerComponent.isPlaceInfoSpoilerVisible = true;
        if (placesOutput instanceof Array) {
            placesOutput.forEach(function (place) {
                _this.showInfo(place);
                _this.placesForRouteSearch.push(place);
            });
        }
        else {
            var place = placesOutput;
            this.showInfo(place);
            this.placesForRouteSearch.push(place);
        }
        if (this.placesForRouteSearch.length > 1) {
            this.isGoBtnDisabled = false;
        }
    };
    SearchRepresentComponent.prototype.onGoClick = function () {
        this.isGoBtnDisabled = true;
        this.placeSpoilerComponent.isPlaceInfoSpoilerVisible = false;
        this.showRoutes(this.placesForRouteSearch);
    };
    __decorate([
        core_1.ViewChild(place_info_spoiler_component_1.PlaceInfoSpoilerComponent), 
        __metadata('design:type', place_info_spoiler_component_1.PlaceInfoSpoilerComponent)
    ], SearchRepresentComponent.prototype, "placeSpoilerComponent", void 0);
    __decorate([
        core_1.ViewChild(founded_routes_spoiler_component_1.FoundedRoutesSpoilerComponent), 
        __metadata('design:type', founded_routes_spoiler_component_1.FoundedRoutesSpoilerComponent)
    ], SearchRepresentComponent.prototype, "routesSpoilerComponent", void 0);
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