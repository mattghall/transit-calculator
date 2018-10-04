$(document).ready(function() {
        $.get('apiKey.json', function(data) {
          var url = "https://maps.googleapis.com/maps/api/js?key=" + data.apiKey + "&callback=initMap"
          $("#mapscript").src(data);
        }, 'text');
});


function initMap() {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var downtownSeattle = new google.maps.LatLng(47.602384, -122.332895)
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: downtownSeattle
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('right-panel'));

    var control = document.getElementById('floating-panel');
    control.style.display = 'block';
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

    var onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    //document.getElementById('start').addEventListener('change', onChangeHandler);
    //document.getElementById('end').addEventListener('change', onChangeHandler);
    document.getElementById('submit').addEventListener('click', onChangeHandler);
  }


  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
   directionsService.route({
     origin: document.getElementById('start').value,
     destination: document.getElementById('end').value,
     travelMode: 'TRANSIT',
     transitOptions: {
       arrivalTime: new Date(nextThursday()),
       routingPreference: 'FEWER_TRANSFERS'
     }
   }, function(response, status) {
     if (status === 'OK') {
       directionsDisplay.setDirections(response);
       console.log(response);
     } else {
       window.alert('Directions request failed due to ' + status);
     }
   });
 }

 function nextThursday() {
    var d = new Date();
    d.setDate(d.getDate() + (4 + 7 - d.getDay()) % 7);
    d.setHours(8,30,0,0);
    return d;
 }
