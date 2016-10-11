import {Component} from '@angular/core';

@Component({
    selector: 'place-info-spoiler',
    template: require('./place-info-spoiler.component.pug'),
    styles: [require('./place-info-spoiler.component.scss').toString()]
})

export class PlaceInfoSpoilerComponent {
    places: any[];
    isPlaceInfoSpoilerVisible: boolean;

    constructor() {
        this.places = [];
        this.isPlaceInfoSpoilerVisible = true;
    }

    showInfo(place: any) {
        place.wifi = {},
        place.cells = {},
        place.shops = {},
        place.couchserfers = {},
        place.apartments = {},
        place.aeroports = {},
        place.busStops= {},
        place.railwayStops= {};

        place.wifi.count = 20;
        place.cells.count = 10;
        place.shops.usual = 5.0;
        place.couchserfers.count = 50;
        place.apartments.count = 50;
        place.aeroports.count = 10;
        place.busStops.count = 10;
        place.railwayStops.count = 10;

        this.places.push(place);
    }
}