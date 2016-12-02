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

.controller('EventsCtrl', function($scope, EventsFactory) {
  $scope.events = EventsFactory.all();
})

.controller('EventCtrl', function($scope, $stateParams, EventsFactory) {
  $scope.event = EventsFactory.get($stateParams.eventId);
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $http, API) {
    function getContent(id, title, date, address) {
        var res = "<h4>" + title + "</h4>";
        res += "<p>" + address + "</p>";
        res += "<p>" + date + "</p>";
        res += "<p><a href='#/app/events/" + id + "'>Détail</a></p>";
        return res;
    }

    var types = {
        0:{
            "icon":"clothing-store",
            "color":"#00CCBB"
        },
        1:{
            "icon":"restaurant",
            "color":"#387ef5"
        },
        2:{
            "icon":"lodging",
            "color":"#33cd5f"
        },
        3:{
            "icon":"doctor",
            "color":"#ffc900"
        },
        4:{
            "icon":"toilet",
            "color":"#ef473a"
        },
        5:{
            "icon":"insurance-agency",
            "color":"#886aea"
        },
        6:{
            "icon":"physiotherapist",
            "color":"#fc8d84"
        }
    };

    var geocoder = new google.maps.Geocoder();

    $cordovaGeolocation.getCurrentPosition(null).then(function(position){

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      var url = API.baseUrl + "/events?lat=" + position.coords.latitude + "&long=" + position.coords.longitude;
      $http.get(url)
      .success(function(data) {
          for (var i = 0; i < data.length; i++)
          {
              var ev = data[i];
              var type = ev.type;
              var marker = new Marker({
                  map: map,
                  position: results[0].geometry.location,
                  icon: {
                      path: MAP_PIN,
                      fillColor: types.type.color,
                      fillOpacity: 1,
                      strokeColor: '#000000',
                      strokeWeight: 1
                  },
                  map_icon_label: '<span class="map-icon map-icon-' + types.type.icon + '"></span>'
              });

              var infowindow = new google.maps.InfoWindow({
                  content: getContent(ev.id, ev.title, ev.date, ev.address)
              });
          }
      })
      marker.addListener('click', function() {
          infowindow.open(map, marker);
      });

    }, function(error){
      console.log("Could not get location");
    });
});
