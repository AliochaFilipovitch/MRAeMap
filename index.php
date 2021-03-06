<?php
  require_once('config/db.php');
?>
<!--
 * Map MRAe IdF 
 * Created by Alexis Queune
 * May 2018
 * All rights reserved
-->

<!DOCTYPE html>
<html>
  <head>
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-117571533-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-117571533-1');
    </script>

    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Bootstrap 4 WEB -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">

    <!-- jQuery WEB -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <title>MRAe Map</title>

    <link rel="stylesheet" type="text/css" href="css/mystyle.css">

  </head>
  <body>
    <!--<img src="http://www.side.developpement-durable.gouv.fr/EXPLOITATION/AEGLOB/basicimagedownload.ashx?repositoryId=2&itemId=1990" id="logoleft">
    <div class="alert alert-success" role="alert" id="textleft">
      Missions régionales d'autorité environnementale
    </div>-->
    <div id="badgeleft">
      <h6>Décisions et Avis rendus par l'autorité<br>environnementale d'Île-de-France sur<br>les plans et programmes</h6><br>
      <ol>
        <li>
          Choisissez une ou plusieurs année(s) :<br>
          <input type="checkbox" id="customRadioInline1" name="customRadioInline1"> <span class="badge badge-warning">2018</span> 
          <input type="checkbox" id="customRadioInline2" name="customRadioInline2"> <span class="badge badge-danger">2017</span> 
          <input type="checkbox" id="customRadioInline3" name="customRadioInline3"> <span class="badge badge-success">2016</span>
        </li><br>
        <li>
          Validez la recherche pour afficher des<br>Décisions ou des Avis :<br>
        <button type="button" class="btn btn-outline-primary btn-sm" id="kkId">Décisions</button>
        <button type="button" class="btn btn-outline-primary btn-sm" id="aId">Avis</button>
        <button type="button" class="btn btn-outline-danger btn-sm" id="kkNewId">New</button>
<!--       <button type="button" class="btn btn-outline-danger btn-sm" id="allId">Tout</button><br>
 -->    </li>
      </ol> 

      <small><span class="text-muted">Connectée à <a href="http://www.mrae.developpement-durable.gouv.fr" target="_blank">www.mrae.fr</a><br>Carte SIG réalisée par <a href="https://www.linkedin.com/in/alexis-queune/" target="_blank">Alexis Queune</a></span></small>
    </div>

    <div id="map"></div>
<!--     <footer class="footer">
      <div class="container">
        <small><span class="text-muted"><img src="img/code.png" width="20" height="20"> handcoded by <a href="mailto:alexis.queune@developpement-durable.gouv.fr">Alexis Queune</a> <img src="img/connect_plug.png" width="20" height="20"> connected to <a href="http://www.mrae.developpement-durable.gouv.fr" target="_blank">www.mrae.fr</a> <img src="img/circle.svg" width="20" height="20">refresh <a href="https://mrae-api.herokuapp.com" target="_blank">API</a></span></small>
      </div>
    </footer> -->
    <script src="js/ajax.js"></script>
    <script src="js/map.js"></script>
    <!--<script src="../js/markerclusterer.js"></script>-->
<!--     <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js">
    </script> -->
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=<?php echo KEY_API_GOOGLE_MAP; ?>&callback=initMap">
    </script>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
<!--     <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script> -->
  </body>
</html>
