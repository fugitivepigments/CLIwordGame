var Letter = require('./Letter.js');

function Word(wrdup) {
  var that = this;
  this.word = wrdup;
  this.letters = [];
  this.wordGuessed = false;

  this.popLetters = function() {
    //gets  letters with new Letter objects
    for (var i = 0; i < that.word.length; i++) {
      var newLetter = new Letter(that.word[i]);
      this.letters.push(newLetter);
    }
  };
  //found current word?
  this.foundWord = function() {
    if(this.letters.every(function(letr) {
      return letr.guessed === true;
    })){
      this.wordFound = true;
      return true;
    }
  };
  //goes through and checks each letter against guessed letter
  this.checkLetter = function(guessedLetr) {
    var count = 0;
    this.letters.forEach(function(letr) {
      if(letr.letter === guessedLetr) {
        letr.guessed = true;
        count++;
      }
    })
    //if match, show letter object
    return count;
  };

  this.wordDisplay = function() {
    var render = '';
    //displays word based on letters found
    that.letters.forEach(function(letr) {
      var letterCurrent = letr.ifGuessed();
      render+= letterCurrent;
    });

    return render;
  };
}

module.exports = Word;
