var app = require('../express');
var HangmanModel = require('hangman.model.server');

app.post('/checkLetter', checkLetter);
app.get('/newGame', newGame);
// app.get('/foo', function (req, res) {
//   res.send("Hello World!");
// });

function checkLetter(req, res) {
  var letter = req.body;
  HangmanModel.guess = letter;
  HangmanModel.updateWord();
  var gameState = {
    message: HangmanModel.message,
    prevGuesses: HangmanModel.prevGuesses,
    wrongGuesses: HangmanModel.wrongGuesses,
    gamesWon: HangmanModel.gamesWon,
    gamesLost: HangmanModel.gamesLost,
    currentWordState: HangmanModel.currentWorldState,
    picture: HangmanModel.picture
  };

  // console.log("Letter from server = " + letter);
  res.send(gameState);
}

function newGame(req, res) {
  var wins = req.body.gamesWon;
  var losses = req.body.gamesLost;

  HangmanModel.startNewGame();

  var newGame = {
    message: HangmanModel.message,
    prevGuesses: "0",
    wrongGuesses: "0",
    gamesWon: wins,
    gamesLost: losses,
    currentWordState: "",
    theWord: "", picture: "", guess: ""};

  res.send(newGame);
}