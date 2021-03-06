var inquirer = require('inquirer');
var isLetter = require('is-letter');
var Word = require('./Word.js');
var wordBank = require('./wordList.js');

var hangman = {
  bank: wordBank.newWord.wordList,
  remainingGuess: 13,
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
    if (this.remainingGuess === 13) {
      console.log('Let\'s do this.');
      console.log('|||||||||||||');
      //random number based on bank of words
      var random = Math.floor(Math.random() * this.bank.length);

      // console.log('TESTING ======> random', random);
      // console.log('TESTING ======> this.bank', this.bank);
      // console.log('TESTING ======> this.bank[random]', this.bank[random]);

      this.currentWord = new Word(this.bank[random]);
      this.currentWord.popLetters();

      console.log('TESTING ======> ', this.currentWord);

      //display as blanks
      console.log(this.currentWord.wordDisplay());
      this.promptUser();
    } else {
      this.resetRemaining();
      this.beginNewGame();
    }
  },
  resetRemaining: function() {
    this.remainingGuess = 13
  },
  promptUser: function() {
    var that = this;

    // console.log('TESTING ======> this.currentWord UP TOP', this.currentWord);

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
    }]).then((letr) => {

      // console.log('TESTING ======> letr.letrGuessed', letr.letrGuessed);

      var letrUpper = (letr.letrGuessed).toUpperCase();
      var alreadyGuessed = false;

      console.log('TESTING ======> that.guessedLetters', that.guessedLetters);

      // Check to see if letter was already guessed
      for (var i = 0; i < that.guessedLetters.length; i++) {

        console.log('TESTING ======> letrUpper', letrUpper);
        console.log('TESTING ======> that.guessedLetters[i]', that.guessedLetters[i]);

        if (letrUpper === that.guessedLetters[i]) {
          alreadyGuessed = true;
        }
      }


      if (alreadyGuessed === false) {
        that.guessedLetters.push(letrUpper);

        // console.log('TESTING ======> this.currentWord', this.currentWord);

        var correct = that.currentWord.checkLetter(letrUpper);

        console.log('TESTING ======> correct', correct);

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
          console.log('Already guessed: ' + that.guessedletters);
          //did user win
          if(that.currentWord.foundWord() === true) {
            console.log(that.currentWord.wordDisplay());
            console.log('Ladies and Goims we haaaaave a winna!');
            that.startGame();
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
        } else (alreadyGuessed === true)
          console.log('Letter has already been guessed, try a different one.');


      }
      that.promptUser();
    });
  }
}

hangman.startGame();
