console.log("Mr Branko was hacked and now you must to fight against the bad IA who done it. Defeat the evil in this rock, paper scissors game to save the world!");
console.log("Click in the white area of the browser window then press space in the keyboard to start the game! Good luck! The world needs you!");

function computerPlay() {

    const options = ['rock', 'paper', 'scissors'];
    const randomValue = Math.floor(Math.random() * options.length);

    return options[randomValue];

};

function getPlayerOption() {

    let playerChoice
    let key = false
    while (!key){
        let choice = prompt('Choose between: Rock, Paper or Scissors!');
        if (choice !== null){
            playerChoice = choice.toLowerCase()
            if (playerChoice === 'rock' || playerChoice === 'paper' || playerChoice === 'scissors'){
                key = true
            } else {
                alert('You have to enter one of the tree options: Rock, Paper or Scissors!');
            }
        } else {
            alert('You have to enter one of the tree options: Rock, Paper or Scissors!');
        }
    };

    return playerChoice;
};

function playRound(playerSelection, computerSelection) {

    console.log(`Player choice: ${playerSelection} VS computer choice: ${computerSelection}.`);

    if ((computerSelection === 'rock' && playerSelection === 'scissors') || (computerSelection === 'paper' && playerSelection === 'rock') || (computerSelection === 'scissors' && playerSelection === "paper")) {
        return `Computer Wins the round! ${computerSelection} defeats ${playerSelection}!`;
    } else if ((computerSelection === 'rock' && playerSelection === 'paper') || (computerSelection === 'paper' && playerSelection === 'scissors') || (computerSelection === 'scissors' && playerSelection === 'rock')) {
        return `Player wins the round! ${playerSelection} defeats ${computerSelection}!`;
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
        
        console.log(`Round: ${i + 1}`);

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
            console.log('Computer won the game. The world became mine!');
            break;
        case playerScore > computerScore:
            console.log('Player won the game! The world is safe now and Mr Branko is free!');
            break;
        default:
            console.log('The game tied! Let\'s play until only one be in their foots!');
            console.log('Press space again! Don\'t be a coward!');
    };

};


function gameInicialization(event){
    if(event.key === ' '){
        game();
        console.log('To play again reload the page!');
        document.removeEventListener('keypress', gameInicialization);
    };
};

document.addEventListener('keypress', gameInicialization);