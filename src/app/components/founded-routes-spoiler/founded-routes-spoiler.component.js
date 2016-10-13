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
var searchRouteMain_1 = require("../../services/searchRouteMain");
var FoundedRoutesSpoilerComponent = (function () {
    function FoundedRoutesSpoilerComponent(_searchRouteMainService) {
        this._searchRouteMainService = _searchRouteMainService;
        this.placesForRouteSearch = [];
        this.foundedRoutes = [];
        this.placesPositions = [];
    }
    FoundedRoutesSpoilerComponent.prototype.showRoutes = function (placesForRouteSearch) {
        //this._searchRouteMainService.getRoutes();
        this.foundedRoutes = [];
        this.sortPlaces(placesForRouteSearch); // fills this.placesForRouteSearch
        this.getPlacesPosition(this.placesForRouteSearch); // fills this.placesPositions
        var testfoundedRoutes = [];
        this._searchRouteMainService.getRoutes(this.placesPositions)
            .subscribe(function (res) {
            testfoundedRoutes = res;
            console.log(testfoundedRoutes);
        });
        /*
        for (let i = 0; i < this.placesForRouteSearch.length-1; i++) {
            this.foundedRoutes.push(['Avia - S7 - 2h 30m - 500$ ->','Bus - EuroBus - 30h 10m - 320$ ->','Train - EuroTrain - 25h 10m - 420$ ->']);
        }
        */
    };
    FoundedRoutesSpoilerComponent.prototype.getPlacesPosition = function (placesForRouteSearch) {
        for (var i = 0; i < placesForRouteSearch.length - 1; i++) {
            this.placesPositions.push({
                oPos: placesForRouteSearch[i].geometry.location.lat().toString() + ',' +
                    placesForRouteSearch[i].geometry.location.lng().toString(),
                dPos: placesForRouteSearch[i + 1].geometry.location.lat().toString() + ',' +
                    placesForRouteSearch[i + 1].geometry.location.lng().toString()
            });
        }
    };
    FoundedRoutesSpoilerComponent.prototype.sortPlaces = function (placesForRouteSearch) {
        // not sorting yet
        this.placesForRouteSearch = placesForRouteSearch;
    };
    FoundedRoutesSpoilerComponent = __decorate([
        core_1.Component({
            selector: 'founded-routes-spoiler',
            template: require('./founded-routes-spoiler.component.pug'),
            styles: [require('./founded-routes-spoiler.component.scss').toString()],
            providers: [searchRouteMain_1.SearchRouteMainService]
        }), 
        __metadata('design:paramtypes', [searchRouteMain_1.SearchRouteMainService])
    ], FoundedRoutesSpoilerComponent);
    return FoundedRoutesSpoilerComponent;
}());
exports.FoundedRoutesSpoilerComponent = FoundedRoutesSpoilerComponent;
//# sourceMappingURL=founded-routes-spoiler.component.js.map