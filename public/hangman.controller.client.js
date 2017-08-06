(function () {
  angular
  .module("HangmanApp", [])
  .controller("HangmanController", HangmanController);

  function HangmanController(HangmanService) {

    var model = this;
    model.message = "Click New Game to begin";
    model.wordArray = ['electric', 'window', 'interesting', 'fortunate', 'enticing', 'telephone', 'paradise', 'measure'];
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
    model.getKeyPressed = getKeyPressed;
    model.renderHangman = renderHangman;
    model.gameWon = gameWon;
    model.gameLost = gameLost;

    function pickWord() {
      var wordIndex = Math.floor(Math.random() * model.wordArray.length);
      model.theWord = model.wordArray[wordIndex];
    };

    function initBlanks() {
      model.currentWordState = "";
      for (var i = 0; i < model.theWord.length; i++) {
        model.currentWordState += "_ ";
      }
    };

    function updateWord() {
      // if the letter hasn't been guessed yet...
      if (model.prevGuesses.indexOf(model.guess) == -1 || (model.prevGuesses.length == 0)) {
        model.prevGuesses += model.guess + ', ';

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

          // check for game won
          if (model.currentWordState.indexOf("_") == -1) {
            gameWon();
          }
        } else {
          // letter is not in the word and hasn't been guessed until now
          model.wrongGuesses += 1;
          renderHangman();

          if (model.wrongGuesses == 10) {
            gameLost();
          }
        }
      }
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
      // TODO ; add unhide upon game start------------------------------------------------------------------------
      model.message = "New Game Started (" + model.theWord + ")";
    }

    function gameWon() {
      model.message = "Congratulations, you survived!";
      model.gamesWon += 1;
      // TODO ; suspend additional guesses ------------------------------------------------------------------------
    }

    function gameLost() {
      model.message = "Ouch, you've been hanged!";
      model.gamesLost += 1;
      // TODO ; suspend additional guesses ------------------------------------------------------------------------
    }

    function getKeyPressed() {
      var key = event.keyCode;
      // console.log(key);

      if (key == 97) {
        model.guess = "a";
      } else if (key == 98) {
        model.guess = "b";
      } else if (key == 99) {
        model.guess = "c";
      } else if (key == 100) {
        model.guess = "d";
      } else if (key == 101) {
        model.guess = "e";
      } else if (key == 102) {
        model.guess = "f";
      } else if (key == 103) {
        model.guess = "g";
      } else if (key == 104) {
        model.guess = "h";
      } else if (key == 105) {
        model.guess = "i";
      } else if (key == 106) {
        model.guess = "j";
      } else if (key == 107) {
        model.guess = "k";
      } else if (key == 108) {
        model.guess = "l";
      } else if (key == 109) {
        model.guess = "m";
      } else if (key == 110) {
        model.guess = "n";
      } else if (key == 111) {
        model.guess = "o";
      } else if (key == 112) {
        model.guess = "p";
      } else if (key == 113) {
        model.guess = "q";
      } else if (key == 114) {
        model.guess = "r";
      } else if (key == 115) {
        model.guess = "s";
      } else if (key == 116) {
        model.guess = "t";
      } else if (key == 117) {
        model.guess = "u";
      } else if (key == 118) {
        model.guess = "v";
      } else if (key == 119) {
        model.guess = "w";
      } else if (key == 120) {
        model.guess = "x";
      } else if (key == 121) {
        model.guess = "y";
      } else if (key == 122) {
        model.guess = "z";
      } else {
        alert("Please enter a valid letter");
      }

      updateWord();
    }
  }
})();