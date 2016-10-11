import {Component} from '@angular/core';

@Component({
    selector: 'founded-routes-spoiler',
    template: require('./founded-routes-spoiler.component.pug'),
    styles: [require('./founded-routes-spoiler.component.scss').toString()]
})

export class FoundedRoutesSpoilerComponent {
    placesForRouteSearch: any[];
    foundedRoutes: any[];

    constructor(){
        this.placesForRouteSearch = [];
        this.foundedRoutes = [];
    }

    showRoutes(placesForRouteSearch: any[]) {
        this.foundedRoutes = [];
        this.placesForRouteSearch = placesForRouteSearch;
        for (let i = 0; i < placesForRouteSearch.length-1; i++) {
            this.foundedRoutes.push(['Avia - S7 - 2h 30m - 500$ ->','Bus - EuroBus - 30h 10m - 320$ ->','Train - EuroTrain - 25h 10m - 420$ ->']);
        }
    }
}