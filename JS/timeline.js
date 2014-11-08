//var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
//var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';


function calculateDistances(obj, origin, destination, destTime) {

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, function (response, status){callback(obj, response, status, destTime)});
}

function callback(obj, response, status, destTime) {
  if (status != google.maps.DistanceMatrixStatus.OK) {
    alert('Error was: ' + status);
    return
  } else {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    var totaltime = 0;
    //deleteOverlays();

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      //addMarker(origins[i], false);
      for (var j = 0; j < results.length; j++) {
        totaltime = totaltime + results[j].duration.value;
        totaltime=totaltime/60;
      }
    }
    totaltime = Math.round(totaltime)
    drawTimeline(obj, destTime, totaltime);
    $(window).resize(function(){
            drawTimeline(obj, destTime, totaltime);
        });
  }
}



function drawTimeline(obj, destTime, rideTime){
    console.log(obj.attr('data-time'))
    var timeline = obj.find('.timeline');
    var screenWidth = obj.find('.timeline').width();
    if (screenWidth > 795){
        screenWidth = 795;
    }



    var timeWidth = screenWidth - (35*4);


    var fullTime = destTime + (2*rideTime);            

    var destWidth = destTime/fullTime;
    var driveWidth = rideTime/fullTime;


    obj.find('.line-drive').css('width',  (timeWidth*driveWidth)-1+'px')
    obj.find('.line-dest').css('width',  (destWidth*timeWidth)-1+'px')

    obj.find('.line-drive p').html(""+rideTime+' mins');
    obj.find('.line-dest p').html(""+destTime+' mins');

}


