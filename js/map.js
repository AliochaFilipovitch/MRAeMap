      var map;
      var markers = [];

      //first function

      function initMap() {
        var Paris = { lat: 48.866667, lng: 2.3522219000000177 };

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: Paris,
          styles: [{"stylers": [{ "saturation": -100 }]}]
        });

        // Adds a marker at the center of the map.
        //addMarkerSpecial(Paris);

        $(document).ready(function() {

          $('#kkId').click(function(){
            //console.log('Décisions');
            deleteMarkers();
            var year18 = $("[id='customRadioInline1']").is(':checked');
            var year17 = $("[id='customRadioInline2']").is(':checked');
            var year16 = $("[id='customRadioInline3']").is(':checked');

            if (year18 == true) {
              // getMarker("../json/geocode/kk18.json", "https://pixy.org/src/10/102839.png", new google.maps.Size(45, 55));
              getMarkerGeocode("https://mrae-api.herokuapp.com/data_kk", "https://pixy.org/src/10/102839.png", new google.maps.Size(45, 55));

            }

            if (year17 == true) {
              getMarker("../json/geocode/kk17.json", "https://cdn0.iconfinder.com/data/icons/flat-file-format/100/pdf-512.png", new google.maps.Size(45, 45));
            }

            if (year16 == true) {
              getMarker("../json/geocode/kk16.json", "img/icon-354359_640.png", new google.maps.Size(20, 30));
            }

          });

          $('#aId').click(function(){
            //console.log('Avis');
            deleteMarkers();
            var year18a = $("[id='customRadioInline1']").is(':checked');
            var year17a = $("[id='customRadioInline2']").is(':checked');
            var year16a = $("[id='customRadioInline3']").is(':checked');

            if (year18a == true) {
              getMarker("../json/geocode/a18.json", "https://pixy.org/src/10/102839.png", new google.maps.Size(45, 55));
              //getMarkerGeocode("https://mrae-api.herokuapp.com/data_kk", "https://pixy.org/src/10/102839.png", new google.maps.Size(45, 55));
            }

            if (year17a == true) {
              getMarker("../json/geocode/a17.json", "https://cdn0.iconfinder.com/data/icons/flat-file-format/100/pdf-512.png", new google.maps.Size(45, 45));
            }

            if (year16a == true) {
              getMarker("../json/geocode/a16.json", "img/icon-354359_640.png", new google.maps.Size(20, 30));
            }

          });

          
        //   $('#allId').click(function(){

        // deleteMarkers();

        // getMarker("../json/geocode/a18.json", "https://pixy.org/src/10/102839.png", new google.maps.Size(45, 55));
        // //getMarkerGeocode("http://localhost/MRAE/map/json/a18r.json", "https://pixy.org/src/10/102839.png", new google.maps.Size(45, 55));
        // getMarker("../json/geocode/kk18.json", "https://pixy.org/src/10/102839.png", new google.maps.Size(45, 55));
        // //getMarkerGeocode("http://localhost/MRAE/map/json/kk18r.json", "https://pixy.org/src/10/102839.png", new google.maps.Size(45, 55));


        // getMarker("../json/geocode/a17.json", "https://cdn0.iconfinder.com/data/icons/flat-file-format/100/pdf-512.png", new google.maps.Size(45, 45));
        // getMarker("../json/geocode/kk17.json", "https://cdn0.iconfinder.com/data/icons/flat-file-format/100/pdf-512.png", new google.maps.Size(45, 45));

        // getMarker("../json/geocode/a16.json", "img/icon-354359_640.png", new google.maps.Size(20, 30));
        // getMarker("../json/geocode/kk16.json", "img/icon-354359_640.png", new google.maps.Size(20, 30));

        // });


         });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});


      }

      //second function // Without Geocode

      function getMarker(url, urlimg, sizeimg) {

      ajaxGet(url, function (reponse) {
          var datascan = JSON.parse(reponse);
          console.log(datascan);
          datascan.forEach(function (datacan) {

              addMarker(datacan[0], datacan[1], datacan[2], urlimg, sizeimg);
              console.log(markers.length-1);
              
          });

      });

      }

      // 3th function // With Geocode

      function getMarkerGeocode(url, urlimg, sizeimg) {

      ajaxGet(url, function (reponse) {
          var datascan = JSON.parse(reponse);
          console.log(datascan);
          datascan.forEach(function (datacan) {

            ajaxGet("https://maps.googleapis.com/maps/api/geocode/json?address="+datacan[0]+"&region=fr&key=AIzaSyDrSeUPSfISuSl5eKyleitVVaA-P8Tff8g", function (reponse) {
              var dataville = JSON.parse(reponse);
              console.log(dataville);
              var villelocation = dataville.results[0].geometry.location;
              //console.log(villelocation);
              addMarker(villelocation, datacan[1], datacan[2], urlimg, sizeimg);
              console.log(markers.length-1);
              
            });
          });
        });

      }

      // 4th function //Adds a marker to the map and push to the array.
      
      function addMarker(location, title, url, urlimg, sizeimg) {

        var marker = new google.maps.Marker({
          position: location,
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          icon: {
            url: urlimg,
            //size: new google.maps.Size(64, 64),
            scaledSize: sizeimg
          }
        });

        var contentString = '<h6>Document <a href="'+url+'" target="_blank">PDF</a></h6>';

        var infowindow = new google.maps.InfoWindow({
          //content: name+' ; '+title+' ; '+url
          content: contentString
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

        markers.push(marker);
      }


      // 5th function //Delete all markers

      function setMapOnAll(map){
        for (var i = 0; i < markers.length; i++) {
           markers[i].setMap(map);
        }

      }

      function clearMarkers() {
        setMapOnAll(null);

      }

      function deleteMarkers() {
        clearMarkers();
        markers =[];

      }




      