import {Component,AfterViewInit,ViewChild} from '@angular/core';
import {PlaceInfoSpoilerComponent} from "../place-info-spoiler/place-info-spoiler.component";
import {FoundedRoutesSpoilerComponent} from "../founded-routes-spoiler/founded-routes-spoiler.component";

@Component({
    selector: 'search-represent',
    template: require('./search-represent.component.pug'),
    styles: [require('./search-represent.component.scss').toString()]
})

export class SearchRepresentComponent implements AfterViewInit{
    places: any[];
    placesForRouteSearch: any[];
    isRateDropdownVisible: boolean;
    isShareDropdownVisible: boolean;
    isGoDropdownVisible: boolean;
    isGoBtnDisabled: boolean;

    @ViewChild(PlaceInfoSpoilerComponent)
    private placeSpoilerComponent: PlaceInfoSpoilerComponent;
    @ViewChild(FoundedRoutesSpoilerComponent)
    private routesSpoilerComponent: FoundedRoutesSpoilerComponent;

    ngAfterViewInit() {
    }
    showInfo(place) { this.placeSpoilerComponent.showInfo(place); }
    showRoutes(placesForRouteSearch) { this.routesSpoilerComponent.showRoutes(placesForRouteSearch); }

    constructor(){
        this.isRateDropdownVisible = false;
        this.isShareDropdownVisible = false;
        this.isGoDropdownVisible = false;
        this.isGoBtnDisabled = true;
        this.placesForRouteSearch = [];
    }

    OnGetPlace(placesOutput:any) {
         //placesOutput: array of places, but now I suggest to use only one place from the whole bunch
        this.placeSpoilerComponent.isPlaceInfoSpoilerVisible = true;
        if (placesOutput instanceof Array) {
            placesOutput.forEach((place) => {
                this.showInfo(place);
                this.placesForRouteSearch.push(place);
            });
        } else {
            let place = placesOutput;
            this.showInfo(place);
            this.placesForRouteSearch.push(place);
        }
        if (this.placesForRouteSearch.length > 1) {
            this.isGoBtnDisabled = false;
        }

    }
    onGoClick() {
        this.isGoBtnDisabled = true;
        this.placeSpoilerComponent.isPlaceInfoSpoilerVisible = false;
        this.showRoutes(this.placesForRouteSearch);
    }
}