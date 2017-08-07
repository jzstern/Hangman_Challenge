(function () {
  angular
  .module("HangmanApp", [])
  .controller('HangmanController', HangmanController);

  function HangmanController(HangmanService) {
    var model = this;

    model.message = "Click New Game to begin";
    model.wordArray =
      ['enterprise', 'platform', 'interesting', 'telephone', 'paradise', 'measurement', 'interface',
      'unbelievable', 'extraordinary', 'difficult', 'resources', 'marketing', 'influence', 'controller'];
    model.prevGuesses = "";
    model.wrongGuesses = 0;
    model.gamesWon = 0;
    model.gamesLost = 0;
    model.currentWordState = "";
    model.theWord = "";
    model.picture = "";
    model.guess = "";

    model.pickWord = pickWord;
    model.initBlanks = initBlanks;
    model.updateWord = updateWord;
    model.startNewGame = startNewGame;
    model.renderHangman = renderHangman;
    model.renderText = renderText;
    model.gameWon = gameWon;
    model.gameLost = gameLost;
    model.gameIsOver = gameIsOver;

    function pickWord() {
      var wordIndex = Math.floor(Math.random() * model.wordArray.length);
      model.theWord = model.wordArray[wordIndex];
    }

    function initBlanks() {
      model.currentWordState = "";
      for (var i = 0; i < model.theWord.length; i++) {
        model.currentWordState += "_ ";
      }
    }

    function updateWord() {
      if (!gameIsOver()) {
        // if the letter hasn't been guessed yet...
        if (model.prevGuesses.indexOf(model.guess) == -1 || (model.prevGuesses.length == 0)) {
          if (model.guess != "") {
            model.prevGuesses += model.guess + ', ';
          }
          // console.log(model.prevGuesses);

          // if the guessed letter is in the word
          if (model.theWord.indexOf(model.guess) > -1) {
            var s = model.currentWordState;

            for (var i = 0; i < model.theWord.length; i++) {
              var c = model.theWord.charAt(i);

              if (c == model.guess) {
                s = s.substring(0, i * 2) + c + model.currentWordState.substring(i * 2 + 1);
              }
            }

            model.currentWordState = s;
            // console.log("currentWordState: " + model.currentWordState);

            // check for game won
            if (gameIsOver()) {
              gameWon();
            }
          } else {
            // letter is not in the word and hasn't been guessed until now
            model.wrongGuesses += 1;
            renderHangman();

            // check for game lost
            if (gameIsOver()) {
              gameLost();
            }
          }
        }
      }

      // update w/ jquery
      renderText();
    }

    function renderHangman() {
      if (model.wrongGuesses == 0) {
        model.picture =
          "\n" +
          "\n" +
          "\n" +
          "\n" +
          "\n" +
          "\n" +
          "\n" +
          "\n" +
          ""
      } else if (model.wrongGuesses == 1) {
        model.picture =
          "\n" +
          "\n" +
          "\n" +
          "\n" +
          "\n" +
          "\n" +
          "\n" +
          "\n" +
          "________"
      } else if (model.wrongGuesses == 2) {
        model.picture =
          "\n" +
          "|\n" +
          "|\n" +
          "|\n" +
          "|\n" +
          "|\n" +
          "|\n" +
          "|" +
          "_________"
      } else if (model.wrongGuesses == 3) {
        model.picture =
          "______\n" +
          "|/        |\n" +
          "|\n" +
          "|\n" +
          "|\n" +
          "|\n" +
          "|\n" +
          "|" +
          "______"
      } else if (model.wrongGuesses == 4) {
        model.picture =
          "______\n" +
          "|/        |\n" +
          "|        (_)\n" +
          "|\n" +
          "|\n" +
          "|\n" +
          "|\n" +
          "|" +
          "_________"
      } else if (model.wrongGuesses == 5) {
        model.picture =
          "______\n" +
          "|/        |\n" +
          "|        (_)\n" +
          "|         |\n" +
          "|         |\n" +
          "|\n" +
          "|\n" +
          "|" +
          "_________"
      } else if (model.wrongGuesses == 6) {
        model.picture =
          "______\n" +
          "|/        |\n" +
          "|        (_)\n" +
          "|         |\n" +
          "|         |\n" +
          "|        /\n" +
          "|\n" +
          "|" +
          "_________"
      } else if (model.wrongGuesses == 7) {
        model.picture =
          "______\n" +
          "|/        |\n" +
          "|        (_)\n" +
          "|         |\n" +
          "|         |\n" +
          "|        /\\ \n" +
          "|\n" +
          "|" +
          "_________"
      } else if (model.wrongGuesses == 8) {
        model.picture =
          "______\n" +
          "|/        |\n" +
          "|        (_)\n" +
          "|         |/\n" +
          "|         |\n" +
          "|        /\\ \n" +
          "|\n" +
          "|" +
          "_________"
      } else if (model.wrongGuesses == 9) {
        model.picture =
          "______\n" +
          "|/        |\n" +
          "|        (_)\n" +
          "|        \\|/\n" +
          "|         |\n" +
          "|        /\\ \n" +
          "|\n" +
          "|" +
          "_________"
      } else if (model.wrongGuesses == 10) {
        model.picture =
          "______\n" +
          "|/        |\n" +
          "|       (xx)\n" +
          "|        \\|/\n" +
          "|         |\n" +
          "|        /\\ \n" +
          "|\n" +
          "|" +
          "_________"
      }
    }

    function startNewGame() {
      model.prevGuesses = "";
      model.wrongGuesses = 0;
      renderHangman();
      pickWord();
      initBlanks();
      model.message = "New Game Started (" + model.theWord + ")";

      renderText();
    }

    function gameWon() {
      model.message = "Congratulations, you survived!";
      model.gamesWon += 1;
    }

    function gameLost() {
      model.message = "Ouch, you've been hanged!";
      model.gamesLost += 1;
    }

    function gameIsOver() {
      return (model.wrongGuesses == 10 || model.currentWordState.indexOf("_") < 0) ? true : false;
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
      // console.log("keycode: " + code);

      if (code == 65) {
        model.guess = "a";
      } else if (code == 66) {
        model.guess = "b";
      } else if (code == 67) {
        model.guess = "c";
      } else if (code == 68) {
        model.guess = "d";
      } else if (code == 69) {
        model.guess = "e";
      } else if (code == 70) {
        model.guess = "f";
      } else if (code == 71) {
        model.guess = "g";
      } else if (code == 72) {
        model.guess = "h";
      } else if (code == 73) {
        model.guess = "i";
      } else if (code == 74) {
        model.guess = "j";
      } else if (code == 75) {
        model.guess = "k";
      } else if (code == 76) {
        model.guess = "l";
      } else if (code == 77) {
        model.guess = "m";
      } else if (code == 78) {
        model.guess = "n";
      } else if (code == 79) {
        model.guess = "o";
      } else if (code == 80) {
        model.guess = "p";
      } else if (code == 81) {
        model.guess = "q";
      } else if (code == 82) {
        model.guess = "r";
      } else if (code == 83) {
        model.guess = "s";
      } else if (code == 84) {
        model.guess = "t";
      } else if (code == 85) {
        model.guess = "u";
      } else if (code == 86) {
        model.guess = "v";
      } else if (code == 87) {
        model.guess = "w";
      } else if (code == 88) {
        model.guess = "x";
      } else if (code == 89) {
        model.guess = "y";
      } else if (code == 90) {
        model.guess = "z";
      }

      HangmanService.updateGuess(model.guess);
      // console.log("model.guess is: " + model.guess);
      updateWord();
    }
  }
})();