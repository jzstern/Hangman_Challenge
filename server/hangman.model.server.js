var ServerModel = this;

ServerModel.wordArray =
  ['enterprise', 'platform', 'interesting', 'telephone', 'paradise', 'measurement', 'interface',
    'unbelievable', 'extraordinary', 'difficult', 'resources', 'marketing', 'influence', 'controller'];
ServerModel.message = "Click New Game to begin";
ServerModel.prevGuesses = "";
ServerModel.wrongGuesses = 0;
ServerModel.gamesWon = 0;
ServerModel.gamesLost = 0;
ServerModel.currentWordState = "";
ServerModel.theWord = "";
ServerModel.picture = "";
ServerModel.guess = "";

ServerModel.pickWord = pickWord;
ServerModel.initBlanks = initBlanks;
ServerModel.updateWord = updateWord;
ServerModel.startNewGame = startNewGame;
ServerModel.renderHangman = renderHangman;
ServerModel.renderText = renderText;
ServerModel.gameWon = gameWon;
ServerModel.gameLost = gameLost;
ServerModel.gameIsOver = gameIsOver;

module.exports = ServerModel;

function pickWord() {
  var wordIndex = Math.floor(Math.random() * ServerModel.wordArray.length);
  ServerModel.theWord = ServerModel.wordArray[wordIndex];
}

function initBlanks() {
  ServerModel.currentWordState = "";
  for (var i = 0; i < ServerModel.theWord.length; i++) {
    ServerModel.currentWordState += "_ ";
  }
}

function updateWord() {
  if (!gameIsOver()) {
    // if the letter hasn't been guessed yet...
    if (ServerModel.prevGuesses.indexOf(ServerModel.guess) == -1 || (ServerModel.prevGuesses.length == 0)) {
      if (ServerModel.guess != "") {
        ServerModel.prevGuesses += ServerModel.guess + ', ';
      }
      // console.log(model.prevGuesses);

      // if the guessed letter is in the word
      if (ServerModel.theWord.indexOf(ServerModel.guess) > -1) {
        var s = ServerModel.currentWordState;

        // update the currentWordState filling in the letter where appropriate
        for (var i = 0; i < ServerModel.theWord.length; i++) {
          var c = ServerModel.theWord.charAt(i);

          if (c == ServerModel.guess) {
            s = s.substring(0, i * 2) + c + ServerModel.currentWordState.substring(i * 2 + 1);
          }
        }

        ServerModel.currentWordState = s;
        // console.log("currentWordState: " + ServerModel.currentWordState);

        // check for game won
        if (gameIsOver()) {
          gameWon();
        }
      } else {
        // letter is not in the word and hasn't been guessed until now
        ServerModel.wrongGuesses += 1;
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
  if (ServerModel.wrongGuesses == 0) {
    ServerModel.picture =
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      ""
  } else if (ServerModel.wrongGuesses == 1) {
    ServerModel.picture =
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "________"
  } else if (ServerModel.wrongGuesses == 2) {
    ServerModel.picture =
      "\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|" +
      "_________"
  } else if (ServerModel.wrongGuesses == 3) {
    ServerModel.picture =
      "______\n" +
      "|/        |\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|" +
      "______"
  } else if (ServerModel.wrongGuesses == 4) {
    ServerModel.picture =
      "______\n" +
      "|/        |\n" +
      "|        (_)\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|" +
      "_________"
  } else if (ServerModel.wrongGuesses == 5) {
    ServerModel.picture =
      "______\n" +
      "|/        |\n" +
      "|        (_)\n" +
      "|         |\n" +
      "|         |\n" +
      "|\n" +
      "|\n" +
      "|" +
      "_________"
  } else if (ServerModel.wrongGuesses == 6) {
    ServerModel.picture =
      "______\n" +
      "|/        |\n" +
      "|        (_)\n" +
      "|         |\n" +
      "|         |\n" +
      "|        /\n" +
      "|\n" +
      "|" +
      "_________"
  } else if (ServerModel.wrongGuesses == 7) {
    ServerModel.picture =
      "______\n" +
      "|/        |\n" +
      "|        (_)\n" +
      "|         |\n" +
      "|         |\n" +
      "|        /\\ \n" +
      "|\n" +
      "|" +
      "_________"
  } else if (ServerModel.wrongGuesses == 8) {
    ServerModel.picture =
      "______\n" +
      "|/        |\n" +
      "|        (_)\n" +
      "|         |/\n" +
      "|         |\n" +
      "|        /\\ \n" +
      "|\n" +
      "|" +
      "_________"
  } else if (ServerModel.wrongGuesses == 9) {
    ServerModel.picture =
      "______\n" +
      "|/        |\n" +
      "|        (_)\n" +
      "|        \\|/\n" +
      "|         |\n" +
      "|        /\\ \n" +
      "|\n" +
      "|" +
      "_________"
  } else if (ServerModel.wrongGuesses == 10) {
    ServerModel.picture =
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
  ServerModel.prevGuesses = "";
  ServerModel.wrongGuesses = 0;
  renderHangman();
  pickWord();
  initBlanks();
  // ServerModel.message = "New Game Started (" + ServerModel.theWord + ")";
  ServerModel.message = "New Game Started";

  renderText();
}

function gameWon() {
  ServerModel.message = "Congratulations, you survived!";
  ServerModel.gamesWon += 1;
}

function gameLost() {
  ServerModel.message = "Ouch, you've been hanged!";
  ServerModel.gamesLost += 1;
}

function gameIsOver() {
  return (ServerModel.wrongGuesses == 10 || ServerModel.currentWordState.indexOf("_") < 0) ? true : false;
}

function renderText() {
  $('#heading').html(ServerModel.message);
  $('#picture').html(ServerModel.picture);
  $('#current-word-state').html(ServerModel.currentWordState);
  $('#prev-guesses').html(ServerModel.prevGuesses);
  $('#wrong-guesses').html(ServerModel.wrongGuesses);
  $('#games-won').html("Games won: " + ServerModel.gamesWon);
  $('#games-lost').html("Games lost: " + ServerModel.gamesLost);
}

document.onkeydown = function getLetter(evt) {
  var code = evt.keyCode;
  // console.log("keycode: " + code);

  // TODO; implement as hashmap
  if (code == 65) {
    ServerModel.guess = "a";
  } else if (code == 66) {
    ServerModel.guess = "b";
  } else if (code == 67) {
    ServerModel.guess = "c";
  } else if (code == 68) {
    ServerModel.guess = "d";
  } else if (code == 69) {
    ServerModel.guess = "e";
  } else if (code == 70) {
    ServerModel.guess = "f";
  } else if (code == 71) {
    ServerModel.guess = "g";
  } else if (code == 72) {
    ServerModel.guess = "h";
  } else if (code == 73) {
    ServerModel.guess = "i";
  } else if (code == 74) {
    ServerModel.guess = "j";
  } else if (code == 75) {
    ServerModel.guess = "k";
  } else if (code == 76) {
    ServerModel.guess = "l";
  } else if (code == 77) {
    ServerModel.guess = "m";
  } else if (code == 78) {
    ServerModel.guess = "n";
  } else if (code == 79) {
    ServerModel.guess = "o";
  } else if (code == 80) {
    ServerModel.guess = "p";
  } else if (code == 81) {
    ServerModel.guess = "q";
  } else if (code == 82) {
    ServerModel.guess = "r";
  } else if (code == 83) {
    ServerModel.guess = "s";
  } else if (code == 84) {
    ServerModel.guess = "t";
  } else if (code == 85) {
    ServerModel.guess = "u";
  } else if (code == 86) {
    ServerModel.guess = "v";
  } else if (code == 87) {
    ServerModel.guess = "w";
  } else if (code == 88) {
    ServerModel.guess = "x";
  } else if (code == 89) {
    ServerModel.guess = "y";
  } else if (code == 90) {
    ServerModel.guess = "z";
  }

  // console.log("ServerModel.guess is: " + ServerModel.guess);

  updateWord();
}