var inquirer = require('inquirer');
var isLetter = require('is-letter');
var Word = require('./Word.js');
var wordBank = require('./wordList.js');

var hangman = {
  bank: wordBank.newWord.wordList,
  remainingGuess: 7,
  //hold letters guessed, checks if already guessed
  guessedLetters: [],
  count: 0,
  currentWord: null,
  //starts game
  startGame: function() {
    var that = this;
    //clear letters
    if(this.guessedLetters.length > 0) {
      this.guessedLetters = [];
    }

    inquirer.prompt([{
      name: 'okplay',
      type: 'confirm',
      message: 'How\'s about a rousin\' round of HANGMAN?'
    }]).then(function(answer) {
      if(answer.okplay){
        that.beginNewGame();
      } else {
        console.log('Bummer, come back when you\'re ready to hang.');
      }
    })
  },
  //start game
  beginNewGame: function() {
    if (this.remainingGuess === 7) {
      console.log('Let\'s do this.');
      console.log('|||||||||||||');
      //random number based on bank of words
      var random = Math.floor(Math.random() * this.bank.length);
      this.currentWord = new Word(this.bank[random]);
      this.currentWord.popLetters();
      //display as blanks
      console.log(this.currentWord.wordDisplay());
      this.promptUser();
    } else {
      this.resetRemaining();
      this.beginNewGame();
    }
  },
  resetRemaining: function() {
    this.remainingGuess = 7
  },
  promptUser: function() {
    var that = this;
    inquirer.prompt([{
      name: 'letrGuessed',
      type: 'input',
      message: 'Choose your letter wisely...',
      validate: function(value) {
        if(isLetter(value)){
          return true;
        } else {
          return false;
        }
      }
    }]).then(function(letr) {
      var letrUpper = (letr.chosenLetr).toUpperCase();
      var alreadyGuessed = false;
      for (var i = 0; i < that.guessedLetters.length; i++) {
        if (letrUpper === that.guessedLetters[i]) {
          alreadyGuessed = true;
        }
      }
      if (alreadyGuessed === false) {
        that.guessedLetters.push(letrUpper);

        var correct = that.currentWord.checkLetter(letrUpper);
        //if none found, user guessed wrong, take away guess
        if(correct === 0) {
          console.log('Guess again pal!');
          console.log('（◞‸◟）');
          that.remainingGuess--;
          that.render++;
          console.log('Remaining attempts: ' + that.remainingGuess);
          console.log('\n|||||||||||||');
          console.log(that.currentWord.wordDisplay());
          console.log('\n|||||||||||||');
          console.log('Already guessed: ' + that.guessedletters);
        } else {
          console.log('BOOM! You got one my guy!');
          //did user win
          if(that.currentWord.foundWord() === true) {
            console.log(that.currentWord.wordDisplay());
            console.log('Ladies and Goims we haaaaave a winna!');
          } else {
            //start again
            console.log('Remaining attempts: ' + that.remainingGuess);
            console.log(that.currentWord.wordDisplay());
            console.log('\n|||||||||||||');
            console.log('Already guessed: ' + that.guessedLetters);
          }
        }
        if (that.remainingGuess > 0 && that.currentWord.foundWord === false) {
          that.promptUser()
        } else if (that.remainingGuess === 0) {
          console.log('Sadly, the game is over bud.');
        } else {
          console.log('Letter has already been guessed, try a different one.');
          that.promptUser();
        }
      }
    });
  }
}

hangman.startGame();
