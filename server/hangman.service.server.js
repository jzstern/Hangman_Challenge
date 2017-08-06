var app = require('express');
var hangmanModel = require('hangman.model.server');
var words = ['electric', 'window', 'interesting', 'fortunate', 'enticing', 'telephone', 'paradise', 'measure'];

app.post('/checkLetter', checkLetter);


function checkLetter(req, res){
  var letter = req.body;

  // if the letter hasn't been guessed yet...
  if (hangmanModel.prevGuesses.indexOf(hangmanModel.guess) == -1 || (hangmanModel.prevGuesses.length == 0)) {
    hangmanModel.prevGuesses += hangmanModel.guess + ', ';

    // if the guessed letter is in the word
    if (hangmanModel.theWord.indexOf(hangmanModel.guess) > -1) {
      var s = hangmanModel.currentWordState;

      for (var i = 0; i < hangmanModel.theWord.length; i++) {
        var c = hangmanModel.theWord.charAt(i);

        if (c == hangmanModel.guess) {
          s = s.substring(0, i * 2) + c + hangmanModel.currentWordState.substring(i * 2 + 1);
        }
      }

      hangmanModel.currentWordState = s;

      // check for game won
      if (hangmanModel.currentWordState.indexOf("_") == -1) {
        gameWon();
      }
    } else {
      // letter is not in the word and hasn't been guessed until now
      hangmanModel.wrongGuesses += 1;
      renderHangman();

      if (hangmanModel.wrongGuesses == 10) {
        gameLost();
      }
    }
  }

  console.log('letter checked ya bish');
  res.send('letter checked ya bish');
}