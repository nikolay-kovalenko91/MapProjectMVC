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
    private map: any = null;
    private flightPath: any;
    private placesForRouteSearch: any[];
    zone: NgZone;
    constructor(zone:NgZone) {
        this.zone = zone;
    }

    ngOnInit() {
        this.initMap();
    }

    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 55.7558, lng: 37.6173},
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });

        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        var icon = {
            //url: '',
            url :'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        };
        var markers = [];
        var geocoder = new google.maps.Geocoder;
        var sendPlaceToParent = (value: any) => {
            this.zone.run(() => {
                this.placesOutput.emit(value);
            });
        };
        var clearPath = () => {
            if (this.placesForRouteSearch) {
                this.flightPath.setMap(null);
            }
        };

        this.map.addListener('bounds_changed', () => {
            searchBox.setBounds(this.map.getBounds());
        });
        searchBox.addListener('places_changed', () => {
            clearPath();
            makeMarkerForInput(); // Sends place to represent and make marker
        });
        google.maps.event.addListener(this.map, 'click', (event) => {
            clearPath();
            makeMarkerForClick(event.latLng); // Sends place to represent and make marker
        });
        var makeMarkerForInput = () => {
            let places = searchBox.getPlaces();
            sendPlaceToParent(places); // sends it to the parent element
            if (places.length == 0) {
                return;
            }
            //var bounds = new google.maps.LatLngBounds();
            places.forEach((place) => {
                //icon.url = place.icon,
                markers.push(new google.maps.Marker({
                    map: this.map,
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
                            map: this.map,
                            animation: google.maps.Animation.DROP,
                        });
                        //infowindow.setContent(results[1].formatted_address);
                        //infowindow.open(map, marker);
                        markers.push(marker);
                        results[1].geometry.location = location; // Exact coordinates by click
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
    createPath(placesForRouteSearch: any[]) {
        this.placesForRouteSearch = placesForRouteSearch;
        let flightPlanCoordinates: {
            lat: number,
            lng: number
        }[] = [];
        placesForRouteSearch.forEach(element => {
            flightPlanCoordinates.push({
                lat: element.geometry.location.lat(),
                lng: element.geometry.location.lng()
            });
        });

        this.flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: false,
            strokeColor: '#17C802',
            strokeOpacity: 1.0,
            strokeWeight: 3
        });
        this.flightPath.setMap(this.map);
    }

}