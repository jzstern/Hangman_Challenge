var app = require('../../express');
var HangmanModel = require('./hangman.model.server');

app.post('/checkLetter', checkLetter);
app.get('/newGame', newGame);

app.get('/foo', function (req, res) {
  res.send("Hello World!");
});

function checkLetter(req, res) {
  var letter = req.body.key;

  HangmanModel.guess = letter;
  HangmanModel.updateWord();

  var gameState = {
    message: HangmanModel.message,
    prevGuesses: HangmanModel.prevGuesses,
    gamesWon: HangmanModel.gamesWon,
    gamesLost: HangmanModel.gamesLost,
    currentWordState: HangmanModel.currentWordState,
    picture: HangmanModel.picture
  };

  res.send(gameState);
}

function newGame(req, res) {
  HangmanModel.startNewGame();

  var newGameState = {
    message: HangmanModel.message,
    currentWordState: HangmanModel.currentWordState,
    picture: HangmanModel.picture
  };

  res.send(newGameState);
}