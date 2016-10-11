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
var FoundedRoutesSpoilerComponent = (function () {
    function FoundedRoutesSpoilerComponent() {
        this.placesForRouteSearch = [];
        this.foundedRoutes = [];
    }
    FoundedRoutesSpoilerComponent.prototype.showRoutes = function (placesForRouteSearch) {
        this.foundedRoutes = [];
        this.placesForRouteSearch = placesForRouteSearch;
        for (var i = 0; i < placesForRouteSearch.length - 1; i++) {
            this.foundedRoutes.push(['Avia - S7 - 2h 30m - 500$ ->', 'Bus - EuroBus - 30h 10m - 320$ ->', 'Train - EuroTrain - 25h 10m - 420$ ->']);
        }
    };
    FoundedRoutesSpoilerComponent = __decorate([
        core_1.Component({
            selector: 'founded-routes-spoiler',
            template: require('./founded-routes-spoiler.component.pug'),
            styles: [require('./founded-routes-spoiler.component.scss').toString()]
        }), 
        __metadata('design:paramtypes', [])
    ], FoundedRoutesSpoilerComponent);
    return FoundedRoutesSpoilerComponent;
}());
exports.FoundedRoutesSpoilerComponent = FoundedRoutesSpoilerComponent;
//# sourceMappingURL=founded-routes-spoiler.component.js.map