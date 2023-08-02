console.log("Rock Paper Scissors Game!");

function computerPlay() {

    const options = ['rock', 'paper', 'scissors'];
    const randomValue = Math.floor(Math.random() * options.length);

    return options[randomValue];

};

function getPlayerOption() {

    let playerChoice = prompt('Choose between: Rock, Paper or Scissors!');
    playerChoice = playerChoice.toLowerCase();

    while (playerChoice !== 'rock' && playerChoice !== 'paper' && playerChoice !== 'scissors') {
        alert('Your choice must be one of the tree options: Rock, Paper or Scissors!');
        playerChoice = prompt('Choose between: Rock, Paper or Scissor');
        playerChoice = playerChoice.toLowerCase();
    };

    return playerChoice;

};

function playRound(playerSelection, computerSelection) {

    console.log(`Player choice: ${playerSelection} VS computer choice: ${computerSelection}.`);

    if ((computerSelection === 'rock' && playerSelection === 'scissors') || (computerSelection === 'paper' && playerSelection === 'rock') || (computerSelection === 'scissors' && playerSelection === "paper")) {
        return `Computer Wins the round! ${computerSelection} defeats ${playerSelection}!`;
    } else if ((computerSelection === 'rock' && playerSelection === 'paper') || (computerSelection === 'paper' && playerSelection === 'scissors') || (computerSelection === 'scissors' && playerSelection === 'rock')) {
        return `Player wins the round! ${playerSelection} defeats ${computerSelection}! Congratulations!`;
    } else if (computerSelection === playerSelection) {
        return `That's a tie!`;
    } else {
        return 'Reload';
    };

};

function game() {

    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
        const computerSelection = computerPlay();
        const playerSelection = getPlayerOption();
        const winner = playRound(playerSelection, computerSelection);
        console.log(winner);

        if (winner.includes('Player')) {
            playerScore = playerScore + 1;
        } else if (winner.includes('Computer')) {
            computerScore = computerScore + 1;
        };

        console.log(`Score: Player = ${playerScore} | Computer: ${computerScore}`);
    };

    switch (true) {
        case computerScore > playerScore:
            console.log('Computer won the game. Try again!');
            break;
        case playerScore > computerScore:
            console.log('Player won the game! Congratulations!');
            break;
        default:
            console.log('The game tied! Let\'s play again!');
    };

};

game();
