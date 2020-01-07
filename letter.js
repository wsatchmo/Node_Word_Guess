// Contains a constructor, Letter. This constructor should be able to either display an underlying character or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. That means the constructor should define:

function Letter(letter){
    this.letter = letter; // A string value to store the underlying character for the letter
    this.isGuessed = false; // A boolean value that stores whether that letter has been guessed yet
    this.value = function(){ // A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed
        if (this.letter === " "){
            return " ";
        } else if (this.isGuessed) {
            return this.letter;
        } else {
            return "_";
        }
    }
    this.charGuess = function(guess){ // A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly
        if (guess === this.letter){
            this.isGuessed = true;
        } 
    }
}

module.exports = Letter;