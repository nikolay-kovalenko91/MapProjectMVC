import {Component} from '@angular/core';

@Component({
    selector: 'search-represent',
    template: require('./search-represent.component.pug'),
    styles: [require('./search-represent.component.scss').toString()]
})

export class SearchRepresentComponent {
    places: any[];
    placesForRouteSearch: any[];
    isRateDropdownVisible: boolean;
    isShareDropdownVisible: boolean;
    isGoDropdownVisible: boolean;
    isGoBtnDisabled: boolean;

    constructor(){
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

    OnGetPlace(placesOutput:any) {
        //placesOutput: array of places, but now I suggest to use only one place from the whole bunch
        if (placesOutput instanceof Array) {
            placesOutput.forEach((place) => {
                place.wifi = {},
                place.cells = {},
                place.rates = {},
                place.couchserfers = {},
                place.apartments = {},
                place.aeroports = {},
                place.busStops= {},
                place.railwayStops= {};

                place.wifi.count = 20;
                place.cells.count = 10;
                place.rates.usual = 5.0;
                place.couchserfers.count = 50;
                place.apartments.count = 50;
                place.aeroports.count = 10;
                place.busStops.count = 10;
                place.railwayStops.count = 10;
                this.places.push(place);
            });
        } else {
            let place = placesOutput;
            place.wifi = {},
            place.cells = {},
            place.rates = {},
            place.couchserfers = {},
            place.apartments = {},
            place.aeroports = {},
            place.busStops= {},
            place.railwayStops= {};

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
    }
    onGoClick() {
        this.placesForRouteSearch = this.places;
        this.places = [];
        this.isGoBtnDisabled = true;
    }
}