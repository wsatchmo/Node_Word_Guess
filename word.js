// **Word.js**: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

//   * An array of `new` Letter objects representing the letters of the underlying word

//   * A function that returns a string representing the word. This should call 
//the function on each letter object (the first function defined in `Letter.js`) 
//that displays the character or an underscore and concatenate those together.

//   * A function that takes a character as an argument and calls the guess 
//function on each letter object (the second function defined in `Letter.js`)

var Letter = require('./letter.js');

function Word(wordArr){
    this.word = wordArr; 
    this.letterArr = [];
    this.createWord = function(){
        for (var i=0; i < wordArr.length; i++) {
            var letterNew = new Letter(wordArr[i]);
            this.letterArr.push(letterNew);
        }
    };
    this.charGuess = function() {
        var showWord = [];
        for (var i=0; i < this.letterArr.length; i++) {
            showWord.push(this.letterArr[i].value());
        }
        return showWord.join(" ");
    }
    this.checkGuessed = function(guess) {
        for (var i=0; i < this.letterArr.length; i++) {
            this.letterArr[i].charGuess(guess);
        }
    }
}

module.exports = Word;