function Letter(char) {
  //store letter
  this.character = char;
  this.guessed = false

  this.ifGuessed = function() {
    if (this.character === '  ') {
      this.guessed = true;
      return '  ';
    }
    if (this.guessed === false) {
      return ' _ '
    } else {
      return this.character;
    }
  };
};

module.exports = Letter;
