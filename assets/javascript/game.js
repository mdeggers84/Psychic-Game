// variables for storing data / updating html file / logging choices
var gameUpdate = document.getElementById("game");
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var guessArr = [];
var guessPool = "abcdefghijklmnopqrstuvwxyz";
var compChoice = randomLetter();

// assigns random letter to var compChoice when called
function randomLetter() {

	return guessPool.charAt(Math.floor(Math.random() * guessPool.length));

}

// resets the game after win or loss
function reset() {

	guessesLeft = 9;
	guessArr = [];
	compChoice = randomLetter();

}

// updates the html file with current results
function print() {

	var html = "<p>Wins: " + wins + "</p>" +
	"<p>Losses: "+ losses + "</p>" +
	"<p>Guesses Left: " + guessesLeft + "</p>" +
	"<p>Your Guesses: "+ guessArr.join(', ').toUpperCase() + "</p>";

	document.querySelector('#game').innerHTML = html;

}

document.onkeyup = function(event) {
	var userGuess = event.key;
	
	// initial condition that confirms user is choosing from the pool of possible winnng choices
	// also checks whether the user has already guessed that letter / prevents repeats
	if (guessPool.indexOf(userGuess) !== -1 && guessArr.indexOf(userGuess) === -1) {

		// if user is right, they get a point and game is reset
		if (userGuess === compChoice) {
			wins += 1;
			reset();
			print();

			// if user is wrong, they lose a guess and have to try again
		} else {
			guessesLeft -= 1;

			// if number of guesses runs out, a loss is logged and game is reset
			if (guessesLeft === 0) {
				losses += 1;
				reset();
				print();

				// while guesses remain above 0, guess count is reduced, no win or loss is logged
			} else {
				guessArr.push(userGuess);
				print();
				compChoice = randomLetter();
			}
		}
	}
};