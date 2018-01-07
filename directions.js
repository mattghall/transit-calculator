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
        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
        var arrival = new Date('January 11 2017');
        arrival.setHours(8);
        arrival.setMinutes(30);
        var transitOptions = {
          arrivalTime: arrival,
          routingPreference: 'LESS_WALKING'
        };
        var request = {
          origin: start,
          destination: end,
          travelMode: 'TRANSIT',
          transitOptions: transitOptions
        };

        directionsService.route(request, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
