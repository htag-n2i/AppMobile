angular.module('starter.services', [])

.factory('NewsFactory', function() {
  // Some fake testing data
  var news = [
    { title: 'Syrien en alerte', body: 'Les syriens sont dans le mal ...', id: 1 },
    { title: 'Soupe populaire', body: 'Soupe populaire distribuée par l\'association HelpDaRefugees.', id: 2 },
    { title: 'Dubstep Calais', body: 'Grosse soirée house electro dubsteb organisé par DJ Khaled au nom de tous les réfugiés dans la galère !', id: 3 },
  ];

  return {
    all: function() {
      return news;
    },
    get: function(newId) {
      for (var i = 0; i < news.length; i++) {
        if (news[i].id === parseInt(newId)) {
          return news[i];
        }
      }
      return null;
    }
  };
})

.factory('EventsFactory', function() {
  // Some fake testing data
  var events = [
    { country: 'France', address: '8 rue du Merle', icon: 'restaurant', city: 'Strasbourg', title: 'Bouffe alerte', type: 'Bouffe', description: 'Grosse boufasse chez jambon ...', id: 1 },
    { country: 'Frankreich', address: '8 rue du Koala', icon: 'restaurant', city: 'Souffel', title: 'Bouffe alerte 2', type: 'Bouffe 2', description: 'Grosse boufasse chez arno ...', id: 1 }
  ];

  return {
    all: function() {
      return events;
    },
    get: function(eventId) {
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === parseInt(eventId)) {
          return events[i];
        }
      }
      return null;
    }
  };
});