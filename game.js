console.log("Rock Paper Scissors Game!");

function computerPlay(){
    const options = ['rock', 'paper', 'scissors'];
    const randomValue = Math.floor(Math.random() * options.length);

    return options[randomValue];

};

const computerSelection = computerPlay();
const playerSelection = 'Rock';


function playRound(playerSelection = 'Select a valid value: (Rock, Paper or Scissors)', computerSelection = 'Computer error'){
    playerSelection = playerSelection.toLowerCase();

    console.log(`Player choice: ${playerSelection}.
computer choice: ${computerSelection}.`)

    if((computerSelection === 'rock' && playerSelection === 'scissors') || (computerSelection === 'paper' && playerSelection ==='rock') || (computerSelection === 'scissors' && playerSelection === "paper")){
        return `Computer Wins! ${computerSelection} defeats ${playerSelection}! Try again!`
      } else if((computerSelection === 'rock' && playerSelection === 'paper') || (computerSelection === 'paper' && playerSelection === 'scissors') || (computerSelection === 'scissors' && playerSelection === 'rock')){
        return `Player wins ${playerSelection} defeats ${computerSelection}! Congratulations!`
      } else if (computerSelection === playerSelection){
        return `That's a tie!`;
      }

};

console.log(playRound(playerSelection, computerSelection))