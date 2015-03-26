var express = require('express');
var bodyParser = require('body-parser');
var app = express.createServer();
app.use(express.static('public'));
var outcomeOfGame = '{"outcome":"result","wins":0,"losses":0,"ties":0}';
var choices = ["rock", "paper", "scissors", "lizard", "spock"];
var winJSON = JSON.parse(outcomeOfGame);

app.use(bodyParser.urlencoded({
extended: false
}));

function gamePlay(userChoice, winJSON, choices) {
var serverChoice = choices[Math.floor(Math.random() * choices.length)];
console.log("Server Played:" +serverChoice);
if (userChoice === "rock") {
console.log("You Played:" +userChoice);
if (serverChoice === "paper" || serverChoice === "spock") {
winJSON.outcome = "losses";
winJSON.losses += 1;
} else if (serverChoice === "rock") {
winJSON.outcome = "ties";
winJSON.ties += 1;
} else {
winJSON.outcome = "win";
winJSON.wins += 1;
}
} else if (userChoice === "paper") {
console.log("You Played:" +userChoice); 
if (serverChoice === "lizard" || serverChoice === "scissors") {
winJSON.outcome = "losses";
winJSON.losses += 1;
} else if (serverChoice === "paper") {
winJSON.outcome = "ties";
winJSON.ties += 1;
} else {
winJSON.outcome = "win";
winJSON.wins += 1;
}
} else if (userChoice === "scissors") {
console.log("You Played:" +userChoice)
if (serverChoice === "spock" || serverChoice === "rock") {
winJSON.outcome = "losses";
winJSON.losses += 1;
} else if (serverChoice === "scissors") {
winJSON.outcome = "ties";
winJSON.ties += 1;
} else {
winJSON.outcome = "win";
winJSON.wins += 1;
}
} else if (userChoice === "lizard") {
console.log("You Played:" +userChoice)
if (serverChoice === "rock" || serverChoice === "scissors") {
winJSON.outcome = "losses";
winJSON.losses += 1;
} else if (serverChoice === "lizard") {
winJSON.outcome = "ties";
winJSON.ties += 1;
} else {
winJSON.outcome = "win";
winJSON.wins += 1;
}
} else if (userChoice === "spock") {
console.log("You Played:" +userChoice)
if (serverChoice === "paper" || serverChoice === "lizard") {
winJSON.outcome = "losses";
winJSON.losses += 1;
} else if (serverChoice === "spock") {
winJSON.outcome = "ties";
winJSON.ties += 1;
} else {
winJSON.outcome = "win";
winJSON.wins += 1;
}
} else {
winJSON = {};
}
return winJSON;
}


app.get('/result', function(res) {
res.json(winJSON);
console.log(winJSON);
})

app.post('/play/:element', function(req, res) {
var userChoice = req.params.element;
winJSON = gamePlay(userChoice, winJSON, choices);
res.json(winJSON);
console.log(winJSON);
})
app.listen(8080);
console.log("Server is listening on port http://localhost:8080")