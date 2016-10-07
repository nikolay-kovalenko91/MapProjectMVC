function placeMarkerForInput() {
    searchBox.getPlaces().forEach(function (element, index, array) {
        console.log(element);
        places.push(element);
    });
    if (places.length == 0) {
        return;
    }
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
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
}
;
function placeMarkerForClick(location) {
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
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                //infowindow.setContent(results[1].formatted_address);
                //infowindow.open(map, marker);
                markers.push(marker);
                places.push(results[1]);
            }
            else {
            }
        }
        else {
        }
    });
}
//# sourceMappingURL=g-map.functions.js.map