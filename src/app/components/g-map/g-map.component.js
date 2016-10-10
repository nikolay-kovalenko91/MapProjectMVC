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
var GmapComponent = (function () {
    function GmapComponent(zone) {
        this.placesOutput = new core_1.EventEmitter();
        this.map = null;
        this.zone = zone;
    }
    GmapComponent.prototype.ngOnInit = function () {
        this.initMap();
    };
    GmapComponent.prototype.initMap = function () {
        var _this = this;
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 55.7558, lng: 37.6173 },
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        var icon = {
            //url: '',
            url: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        };
        var markers = [];
        var geocoder = new google.maps.Geocoder;
        var sendPlaceToParent = function (value) {
            _this.zone.run(function () {
                _this.placesOutput.emit(value);
            });
        };
        var clearPath = function () {
            if (_this.placesForRouteSearch) {
                _this.flightPath.setMap(null);
            }
        };
        this.map.addListener('bounds_changed', function () {
            searchBox.setBounds(_this.map.getBounds());
        });
        searchBox.addListener('places_changed', function () {
            clearPath();
            makeMarkerForInput(); // Sends place to represent and make marker
        });
        google.maps.event.addListener(this.map, 'click', function (event) {
            clearPath();
            makeMarkerForClick(event.latLng); // Sends place to represent and make marker
        });
        var makeMarkerForInput = function () {
            var places = searchBox.getPlaces();
            sendPlaceToParent(places); // sends it to the parent element
            if (places.length == 0) {
                return;
            }
            //var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                //icon.url = place.icon,
                markers.push(new google.maps.Marker({
                    map: _this.map,
                    icon: icon,
                    title: place.name,
                    //draggable:true,
                    animation: google.maps.Animation.DROP,
                    position: place.geometry.location
                }));
            });
        };
        var makeMarkerForClick = function (location) {
            geocoder.geocode({ 'location': location }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //map.setZoom(11);
                        //icon.url = 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png';
                        var marker = new google.maps.Marker({
                            position: location,
                            icon: icon,
                            title: 'xxx',
                            //draggable:true,
                            map: _this.map,
                            animation: google.maps.Animation.DROP,
                        });
                        //infowindow.setContent(results[1].formatted_address);
                        //infowindow.open(map, marker);
                        markers.push(marker);
                        sendPlaceToParent(results[1]); // sends it to the parent element
                    }
                    else {
                    }
                }
                else {
                }
            });
        };
    };
    GmapComponent.prototype.createPath = function (placesForRouteSearch) {
        this.placesForRouteSearch = placesForRouteSearch;
        var flightPlanCoordinates = [];
        placesForRouteSearch.forEach(function (element) {
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
    };
    GmapComponent = __decorate([
        core_1.Component({
            selector: 'g-map',
            template: require('./g-map.component.pug'),
            styles: [require('./g-map.component.scss').toString()],
            outputs: ['placesOutput']
        }), 
        __metadata('design:paramtypes', [core_1.NgZone])
    ], GmapComponent);
    return GmapComponent;
}());
exports.GmapComponent = GmapComponent;
//# sourceMappingURL=g-map.component.js.map