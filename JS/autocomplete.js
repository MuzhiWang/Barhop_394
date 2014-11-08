function autoComplete() {
    autoCompleteStart = new google.maps.places.Autocomplete(
        (document.getElementById('start')),
        {types: []});
    google.maps.event.addListener(autoCompleteStart, 'place_changed', function() {
        var startPlace = autoCompleteStart.getPlace();
        document.getElementById("startpointlat").value = startPlace.geometry.location.lat();
        document.getElementById("startpointlng").value = startPlace.geometry.location.lng();
        origin = "(" + document.getElementById("startpointlat").value  + ", " + document.getElementById("startpointlng").value + ")";   
        console.log(origin);      
    });

    autoCompleteEnd = new google.maps.places.Autocomplete(
       (document.getElementById('end')),
       {types: []});
    google.maps.event.addListener(autoCompleteEnd, 'place_changed', function() {
        var endPlace = autoCompleteEnd.getPlace();
        document.getElementById("endpointlat").value = endPlace.geometry.location.lat();
        document.getElementById("endpointlng").value = endPlace.geometry.location.lng();
        destination = "(" + document.getElementById("endpointlat").value  + ", " + document.getElementById("endpointlng").value + ")";   
        console.log(destination);      
    });

    autoCompleteFilter = new google.maps.places.Autocomplete(
        (document.getElementById('filter-location')),
        {types: []});
    google.maps.event.addListener(autoCompleteFilter, 'place_changed', function(){
        var location = autoCompleteFilter.getPlace();
    });
}

$(document).ready(function() {
    autoComplete();
});
