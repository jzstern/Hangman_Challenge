(function () {
  angular
  .module('HangmanApp')
  .factory('HangmanService', HangmanService);

  function HangmanService($http) {

    var api = {
      updateGuess: updateGuess,
    };

    return api;

    function updateGuess(letter) {
      var url = "/checkLetter";
      return $http
        .post(url, letter)
        .then(function (response) {
         return response.data;
      });
    }
  }
})();