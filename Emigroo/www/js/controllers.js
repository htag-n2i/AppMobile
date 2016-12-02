angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('NewsCtrl', function($scope, NewsFactory) {
  $scope.news = NewsFactory.all();
})

.controller('NewCtrl', function($scope, $stateParams, NewsFactory) {
  $scope.new = NewsFactory.get($stateParams.newsId);
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
    function getContent(title, date, address) {
        var res = "<h4>" + title + "</h4>";
        res += "<p>" + address + "</p>";
        return res;
    }

    var geocoder = new google.maps.Geocoder();

    $cordovaGeolocation.getCurrentPosition(null).then(function(position){
   
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   
      var mapOptions = {
        center: latLng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
   
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      geocoder.geocode( { 'address': "41 rue de Selestat, Strasbourg"}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) 
          {
            var marker = new Marker({
                map: map,
                position: results[0].geometry.location,
                icon: {
                    path: MAP_PIN,
                    fillColor: '#00CCBB',
                    fillOpacity: 1,
                    strokeColor: '#000000',
                    strokeWeight: 1
                },
                map_icon_label: '<span class="map-icon map-icon-clothing-store"></span>'
            });
            var infowindow = new google.maps.InfoWindow({
                content: getContent("Distribution d'habits", null, "41 rue de Selestat, Strasbourg")
            });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
          }
      });
      var myLocation = new google.maps.Marker({
          position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          map: map,
          title: "My Location"
      });

      map.addListener('tilesLoaded', function() {
        console.log('loaded');
      });
   
    }, function(error){
      console.log("Could not get location");
    });
});