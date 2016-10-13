import {Component} from '@angular/core';
import {SearchRouteMainService} from "../../services/searchRouteMain";
import {SearchRouteSentData} from "../../classes/SearchRouteSentData";

@Component({
    selector: 'founded-routes-spoiler',
    template: require('./founded-routes-spoiler.component.pug'),
    styles: [require('./founded-routes-spoiler.component.scss').toString()],
    providers: [SearchRouteMainService]
})

export class FoundedRoutesSpoilerComponent {
    placesForRouteSearch: any[];
    foundedRoutes: any[];
    placesPositions: SearchRouteSentData[];

    constructor(private _searchRouteMainService: SearchRouteMainService){
        this.placesForRouteSearch = [];
        this.foundedRoutes = [];
        this.placesPositions = [];
    }

    showRoutes(placesForRouteSearch: any[]) {
        //this._searchRouteMainService.getRoutes();

        this.foundedRoutes = [];
        this.sortPlaces(placesForRouteSearch); // fills this.placesForRouteSearch
        this.getPlacesPosition(this.placesForRouteSearch); // fills this.placesPositions

        let testfoundedRoutes = [];
        this._searchRouteMainService.getRoutes(this.placesPositions)
            .subscribe(res => {
                testfoundedRoutes = res;
                console.log(testfoundedRoutes);
            });


        /*
        for (let i = 0; i < this.placesForRouteSearch.length-1; i++) {
            this.foundedRoutes.push(['Avia - S7 - 2h 30m - 500$ ->','Bus - EuroBus - 30h 10m - 320$ ->','Train - EuroTrain - 25h 10m - 420$ ->']);
        }
        */
    }

    getPlacesPosition(placesForRouteSearch: any[]) {
        for(let i = 0; i < placesForRouteSearch.length - 1; i++){
            this.placesPositions.push({
                oPos: placesForRouteSearch[i].geometry.location.lat().toString() + ',' +
                        placesForRouteSearch[i].geometry.location.lng().toString(),
                dPos: placesForRouteSearch[i+1].geometry.location.lat().toString() + ',' +
                        placesForRouteSearch[i+1].geometry.location.lng().toString()
            });
        }
    }

    sortPlaces(placesForRouteSearch: any[]) {
        // not sorting yet
        this.placesForRouteSearch = placesForRouteSearch;
    }
}