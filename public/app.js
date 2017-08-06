(function () {
  angular
  .module('HangmanApp', []);
})();

document.onkeydown = function getKeyPressed(evt) {
  var code = evt.keyCode;
  var key;

  // var HangmanService = document.createElement('script');
  // HangmanService.src = 'hangman.service.server';
  // document.head.appendChild(imported);
  
  console.log("keycode: " + code);

  if (code == 97) {
    key = "a";
  } else if (code == 98) {
    key = "b";
  } else if (code == 99) {
    key = "c";
  } else if (code == 100) {
    key = "d";
  } else if (code == 101) {
    key = "e";
  } else if (code == 102) {
    key = "f";
  } else if (code == 103) {
    key = "g";
  } else if (code == 104) {
    key = "h";
  } else if (code == 105) {
    key = "i";
  } else if (code == 106) {
    key = "j";
  } else if (code == 107) {
    key = "k";
  } else if (code == 108) {
    key = "l";
  } else if (code == 109) {
    key = "m";
  } else if (code == 110) {
    key = "n";
  } else if (code == 111) {
    key = "o";
  } else if (code == 112) {
    key = "p";
  } else if (code == 113) {
    key = "q";
  } else if (code == 114) {
    key = "r";
  } else if (code == 115) {
    key = "s";
  } else if (code == 116) {
    key = "t";
  } else if (code == 117) {
    key = "u";
  } else if (code == 118) {
    key = "v";
  } else if (code == 119) {
    key = "w";
  } else if (code == 120) {
    key = "x";
  } else if (code == 121) {
    key = "y";
  } else if (code == 122) {
    key = "z";
  }

  model.updateWord(key);

  // // POST the letter to key
  // $http.post('/checkLetter', key, config)
  //   .success(function (data, status, headers, config) {
  //     console.log('made POST request');
  // });

  // GET the current state of the game

  // model.updateWord();
}