// The file containing the logic for the course of the game, which depends on `Word.js` and:

//   * Randomly selects a word and uses the `Word` constructor to store it

//   * Prompts the user for each guess and keeps track of the user's remaining guesses

// 3. `Letter.js` *should not* `require` any other files.

// 4. `Word.js` *should only* require `Letter.js`

// 5. **HINT:** Write `Letter.js` first and test it on its own before moving on, then do the same thing with `Word.js`

// 6. **HINT:** If you name your letter's display function `toString`, JavaScript will call that function automatically whenever casting that object to a string (check out this example: <https://jsbin.com/facawetume/edit?js,console>)
 
var Word = require("./word.js");
var inquirer = require('inquirer');
// const chalkAnimation = require('chalk-animation');  DOESNN'T ORK FOR SOME REASON
const chalk = require('chalk');

var possibleWords = ["decorate", "back", "support", "borrow", "judge", "sloppy", "string", "raspy", "watery", "enter", "serious", "wings", "conscious", "momentous", "lip", "desire", "valuable", "hook", "tooth", "annoy", "second", "buzz", "fake", "belief", "enlarge", "basin", "thoughts", "crabby", "brash", "remember", "comparison", "hollow", "welcome", "hang", "worry", "price", "argument", "heap", "place", "omniscient", "playground", "busy", "subsequent", "shelter", "little", "wanting", "huge", "tap", "games"];

var randWord;
var tempWord;
var counter = 0;
var score = 0;
var roundcount = 1;

function start(){
    randWord  = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    tempWord = new Word(randWord);
    tempWord.createWord();
    console.log(chalk.bgBlue("-----ROUND " + roundcount + "-----"));
    console.log(chalk.blue("Find the word in 10 guesses or less"));
    inquire();
}

function inquire(){
    if (counter<10){
        console.log(tempWord.charGuess());
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "Choose a letter: "
            }
        ]).then(function(res){
            checkResponse(res);
        });
    } else {
        console.log(chalk.bgRedBright("You are out of guesses."));
        console.log(chalk.redBright("The word was: " + randWord + "\n"));
        randWord = "";
        tempWord = "";
        counter = 0;
        roundcount++;
        start();
    }
}

//checks letter format and compares to tempWord
function checkResponse(res) {
    if ((res.letter.length === 1) && /^[a-zA-Z]+$/.test(res.letter)) {
        var checkGood = res.letter.toLowerCase();
        var temp = tempWord.charGuess();
        tempWord.checkGuessed(checkGood);
        if (temp === tempWord.charGuess()) {
            console.log(chalk.yellow("Sorry, incorrect"));
            counter++;
            console.log(chalk.bgGrey((10 - counter) + " guesses remaining"));
            inquire();
        }
        else {
            correct();
        }
    }
    else {
        console.log(chalk.bgMagenta("Please enter only one character, letters only"));
        inquire();
    }
}

function correct() {
    console.log(chalk.bgGreen("Correct!"));
    if (randWord.replace(/ /g,"") == (tempWord.charGuess()).replace(/ /g,"")) {
        console.log("\n" + chalk.cyan(tempWord.charGuess().toUpperCase()));
        console.log(chalk.green('\nWINNER!!'));
        score++;
        console.log(chalk.bgCyan("Score: " + score + "\n"))
        chosenWord = "";
        gameWord = "";
        counter = 0;
        roundcount++;
        start();
    }
    else {
        inquire();
    }
}

start();