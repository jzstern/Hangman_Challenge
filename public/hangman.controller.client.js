(function () {
  angular
  .module("HangmanApp", [])
  .controller('HangmanController', HangmanController);

  function HangmanController($http) {
    var model = this;

    model.message = "Click New Game to begin";
    model.prevGuesses = "";
    model.gamesWon = 0;
    model.gamesLost = 0;
    model.currentWordState = "";
    model.picture = "";

    model.startNewGame = startNewGame;
    model.renderText = renderText;

    function startNewGame() {
      model.prevGuesses = "";
      model.wrongGuesses = 0;

      return $http
      .get('/newGame')
      .then(function (response) {
        // console.log(response.data);
        model.message = response.data.message;
        model.currentWordState = response.data.currentWordState;
        model.picture = response.data.picture;
      });

      renderText();
    }

    function renderText() {
      $('#heading').html(model.message);
      $('#picture').html(model.picture);
      $('#current-word-state').html(model.currentWordState);
      $('#prev-guesses').html(model.prevGuesses);
      $('#wrong-guesses').html(model.wrongGuesses);
      $('#games-won').html("Games won: " + model.gamesWon);
      $('#games-lost').html("Games lost: " + model.gamesLost);
    }

    document.onkeydown = function getLetter(evt) {
      var code = evt.keyCode;
      var letter = {};
      // console.log("keycode: " + code);

      if (code == 65) {
        letter.key = "a";
      } else if (code == 66) {
        letter.key = "b";
      } else if (code == 67) {
        letter.key = "c";
      } else if (code == 68) {
        letter.key = "d";
      } else if (code == 69) {
        letter.key = "e";
      } else if (code == 70) {
        letter.key = "f";
      } else if (code == 71) {
        letter.key = "g";
      } else if (code == 72) {
        letter.key = "h";
      } else if (code == 73) {
        letter.key = "i";
      } else if (code == 74) {
        letter.key = "j";
      } else if (code == 75) {
        letter.key = "k";
      } else if (code == 76) {
        letter.key = "l";
      } else if (code == 77) {
        letter.key = "m";
      } else if (code == 78) {
        letter.key = "n";
      } else if (code == 79) {
        letter.key = "o";
      } else if (code == 80) {
        letter.key = "p";
      } else if (code == 81) {
        letter.key = "q";
      } else if (code == 82) {
        letter.key = "r";
      } else if (code == 83) {
        letter.key = "s";
      } else if (code == 84) {
        letter.key = "t";
      } else if (code == 85) {
        letter.key = "u";
      } else if (code == 86) {
        letter.key = "v";
      } else if (code == 87) {
        letter.key = "w";
      } else if (code == 88) {
        letter.key = "x";
      } else if (code == 89) {
        letter.key = "y";
      } else if (code == 90) {
        letter.key = "z";
      } else {
        letter.key = "";
      }
      // console.log("letter is: " + letter.key);

      return $http
      .post('/checkLetter', letter)
      .then(function (response) {
        // console.log(response.data);

        model.message = response.data.message;
        model.prevGuesses = response.data.prevGuesses;
        model.gamesWon = response.data.gamesWon;
        model.gamesLost = response.data.gamesLost;
        model.currentWordState = response.data.currentWordState;
        model.picture = response.data.picture;

        return response.data;
      });
    }
  }
})();