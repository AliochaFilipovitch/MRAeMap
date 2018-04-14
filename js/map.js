      var map;
      var markers = [];

      //first function

      function initMap() {
        var Paris = { lat: 48.72, lng: 2.3522219000000177 };

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: Paris,
          styles: [{"stylers": [{ "saturation": -100 }]}]
        });

        // Adds a marker at the center of the map.
        //addMarkerSpecial(Paris);

        //getMarker("http://localhost/MRAE/map/json/a16.json", "https://cdn.pixabay.com/photo/2014/05/26/09/48/icon-354359_640.png", new google.maps.Size(30, 40));
        //getMarker("http://localhost/MRAE/map/json/kk16.json", "https://cdn.pixabay.com/photo/2014/05/26/09/48/icon-354359_640.png", new google.maps.Size(30, 40));
        
        //getMarker("http://localhost/MRAE/map/json/a17.json", "https://cdn0.iconfinder.com/data/icons/flat-file-format/100/pdf-512.png", new google.maps.Size(45, 45));
        //getMarker("http://localhost/MRAE/map/json/kk17.json", "https://cdn0.iconfinder.com/data/icons/flat-file-format/100/pdf-512.png", new google.maps.Size(45, 45));
        
        //getMarker("http://localhost/MRAE/map/json/a18.json", "https://pixy.org/src/10/102839.png", new google.maps.Size(28, 40));
        //getMarker("http://localhost/MRAE/map/json/a18r.json", "https://pixy.org/src/10/102839.png", new google.maps.Size(28, 40));
       	//getMarker("http://localhost/MRAE/map/json/kk18.json", "https://pixy.org/src/10/102839.png", new google.maps.Size(28, 40));
        //getMarker("http://localhost:4567/data", "https://pixy.org/src/10/102839.png", new google.maps.Size(28, 40));

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

      }

      //second function

      function getMarker(url, urlimg, sizeimg) {

      ajaxGet(url, function (reponse) {
          var datascan = JSON.parse(reponse);
          console.log(datascan);
          datascan.forEach(function (datacan) {

            ajaxGet("https://maps.googleapis.com/maps/api/geocode/json?address="+datacan[0]+"&region=fr&key=AIzaSyDrSeUPSfISuSl5eKyleitVVaA-P8Tff8g", function (reponse) {
              var dataville = JSON.parse(reponse);
              console.log(dataville);
              var villelocation = dataville.results[0].geometry.location;
              //console.log(villelocation);
              addMarker(villelocation, datacan[0], datacan[1], datacan[2], urlimg, sizeimg);
              console.log(markers.length-1);
              
            });
          });
        });

      }

      // 3th function //Adds a marker to the map and push to the array.
      
      function addMarker(location, name, title, url, urlimg, sizeimg) {

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

        var contentString = '<h3>'+name+'</h3><h6>'+title+'<br><a href="'+url+'" target="_blank"><img src="../img/pdfred.png" width="50" height="50"></a></h6>';

        var infowindow = new google.maps.InfoWindow({
          //content: name+' ; '+title+' ; '+url
          content: contentString
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

        markers.push(marker);
      }

      