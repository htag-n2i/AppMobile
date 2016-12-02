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
});