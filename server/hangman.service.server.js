var app = require('express');
var hangmanModel = require('hangman.model.server');
var words = ['electric', 'window', 'interesting', 'fortunate', 'enticing', 'telephone', 'paradise', 'measure'];

app.post('/checkLetter', checkLetter);

function checkLetter() {

}