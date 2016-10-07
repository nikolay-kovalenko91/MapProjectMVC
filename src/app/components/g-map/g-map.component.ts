import {Component, OnInit, EventEmitter, NgZone} from '@angular/core';
declare var google: any;

@Component({
    selector: 'g-map',
    template: require('./g-map.component.pug'),
    styles: [require('./g-map.component.scss').toString()],
    outputs: ['placesOutput']
})

export class GmapComponent implements OnInit{
    public placesOutput = new EventEmitter<any>();
    public places: any[];
    zone: NgZone;
    constructor(zone:NgZone) {
        this.zone = zone;
    }

    ngOnInit() {
        this.initMap();
    }

    initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 55.7558, lng: 37.6173},
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });

        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        var icon = {
            //url: '',
            url :'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        };
        var markers = [];
        var places = [];
        var geocoder = new google.maps.Geocoder;
        var sendPlaceToParent = (value: any) => {
            this.zone.run(() => {
                this.placesOutput.emit(value);
            });
        };

        map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
        });
        searchBox.addListener('places_changed', () => {
            makeMarkerForInput(); // Sends place to represent and make marker
        });
        google.maps.event.addListener(map, 'click', (event) => {
            makeMarkerForClick(event.latLng); // Sends place to represent and make marker
        });
        var makeMarkerForInput = () => {
            let places = searchBox.getPlaces();
            sendPlaceToParent(places); // sends it to the parent element
            if (places.length == 0) {
                return;
            }
            //var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
                //icon.url = place.icon,
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    //draggable:true,
                    animation: google.maps.Animation.DROP,
                    position: place.geometry.location
                }));
            });
        };
        var makeMarkerForClick = (location) => {
            geocoder.geocode({'location': location}, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //map.setZoom(11);
                        //icon.url = 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png';
                        var marker = new google.maps.Marker({
                            position: location,
                            icon: icon,
                            title: 'xxx',
                            //draggable:true,
                            map: map,
                            animation: google.maps.Animation.DROP,
                        });
                        //infowindow.setContent(results[1].formatted_address);
                        //infowindow.open(map, marker);
                        markers.push(marker);
                        sendPlaceToParent(results[1]); // sends it to the parent element
                    } else {
                        //window.alert('No results found');
                    }
                } else {
                    //window.alert('Geocoder failed due to: ' + status);
                }
            });
        };
    }

}