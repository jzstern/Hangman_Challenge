var HangmanModel = this;

HangmanModel.wordArray =
  ['enterprise', 'platform', 'interesting', 'telephone', 'paradise', 'measurement', 'interface',
    'unbelievable', 'extraordinary', 'difficult', 'resources', 'marketing', 'influence', 'controller'];
HangmanModel.message = "Click New Game to begin";
HangmanModel.prevGuesses = "";
HangmanModel.wrongGuesses = 0;
HangmanModel.gamesWon = 0;
HangmanModel.gamesLost = 0;
HangmanModel.currentWordState = "";
HangmanModel.theWord = "";
HangmanModel.picture = "";
HangmanModel.guess = "";

HangmanModel.pickWord = pickWord;
HangmanModel.initBlanks = initBlanks;
HangmanModel.updateWord = updateWord;
HangmanModel.startNewGame = startNewGame;
HangmanModel.renderHangman = renderHangman;
HangmanModel.gameWon = gameWon;
HangmanModel.gameLost = gameLost;
HangmanModel.gameIsOver = gameIsOver;

module.exports = HangmanModel;

function pickWord() {
  var wordIndex = Math.floor(Math.random() * HangmanModel.wordArray.length);
  HangmanModel.theWord = HangmanModel.wordArray[wordIndex];
}

function initBlanks() {
  HangmanModel.currentWordState = "";
  for (var i = 0; i < HangmanModel.theWord.length; i++) {
    HangmanModel.currentWordState += "_ ";
  }
}

function updateWord() {
  if (!gameIsOver()) {
    // if the letter hasn't been guessed yet...
    if (HangmanModel.prevGuesses.indexOf(HangmanModel.guess) == -1 || (HangmanModel.prevGuesses.length == 0)) {
      if (HangmanModel.guess != "") {
        HangmanModel.prevGuesses += HangmanModel.guess + ', ';
      }
      // if the guessed letter is in the word
      if (HangmanModel.theWord.indexOf(HangmanModel.guess) > -1) {
        var s = HangmanModel.currentWordState;

        // update the currentWordState filling in the letter where appropriate
        for (var i = 0; i < HangmanModel.theWord.length; i++) {
          var c = HangmanModel.theWord.charAt(i);

          if (c == HangmanModel.guess) {
            s = s.substring(0, i * 2) + c + HangmanModel.currentWordState.substring(i * 2 + 1);
          }
        }

        HangmanModel.currentWordState = s;

        // check for game won
        if (gameIsOver()) {
          gameWon();
        }

      } else {
        // letter is not in the word and hasn't been guessed until now
        HangmanModel.wrongGuesses += 1;
        renderHangman();

        // check for game lost
        if (gameIsOver()) {
          gameLost();
        }
      }
    }
  }
}

function renderHangman() {
  if (HangmanModel.wrongGuesses == 0) {
    HangmanModel.picture =
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      ""
  } else if (HangmanModel.wrongGuesses == 1) {
    HangmanModel.picture =
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "\n" +
      "________"
  } else if (HangmanModel.wrongGuesses == 2) {
    HangmanModel.picture =
      "\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|" +
      "_________"
  } else if (HangmanModel.wrongGuesses == 3) {
    HangmanModel.picture =
      "______\n" +
      "|/        |\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|" +
      "______"
  } else if (HangmanModel.wrongGuesses == 4) {
    HangmanModel.picture =
      "______\n" +
      "|/        |\n" +
      "|        (_)\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|\n" +
      "|" +
      "_________"
  } else if (HangmanModel.wrongGuesses == 5) {
    HangmanModel.picture =
      "______\n" +
      "|/        |\n" +
      "|        (_)\n" +
      "|         |\n" +
      "|         |\n" +
      "|\n" +
      "|\n" +
      "|" +
      "_________"
  } else if (HangmanModel.wrongGuesses == 6) {
    HangmanModel.picture =
      "______\n" +
      "|/        |\n" +
      "|        (_)\n" +
      "|         |\n" +
      "|         |\n" +
      "|        /\n" +
      "|\n" +
      "|" +
      "_________"
  } else if (HangmanModel.wrongGuesses == 7) {
    HangmanModel.picture =
      "______\n" +
      "|/        |\n" +
      "|        (_)\n" +
      "|         |\n" +
      "|         |\n" +
      "|        /\\ \n" +
      "|\n" +
      "|" +
      "_________"
  } else if (HangmanModel.wrongGuesses == 8) {
    HangmanModel.picture =
      "______\n" +
      "|/        |\n" +
      "|        (_)\n" +
      "|         |/\n" +
      "|         |\n" +
      "|        /\\ \n" +
      "|\n" +
      "|" +
      "_________"
  } else if (HangmanModel.wrongGuesses == 9) {
    HangmanModel.picture =
      "______\n" +
      "|/        |\n" +
      "|        (_)\n" +
      "|        \\|/\n" +
      "|         |\n" +
      "|        /\\ \n" +
      "|\n" +
      "|" +
      "_________"
  } else if (HangmanModel.wrongGuesses == 10) {
    HangmanModel.picture =
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
  HangmanModel.prevGuesses = "";
  HangmanModel.wrongGuesses = 0;
  renderHangman();
  pickWord();
  initBlanks();
  HangmanModel.message = "New Game Started";
}

function gameWon() {
  HangmanModel.message = "Congratulations, you survived!";
  HangmanModel.gamesWon += 1;
}

function gameLost() {
  HangmanModel.message = "Ouch, you've been hanged!";
  HangmanModel.gamesLost += 1;
}

function gameIsOver() {
  return (HangmanModel.wrongGuesses == 10 || HangmanModel.currentWordState.indexOf("_") < 0) ? true : false;
}