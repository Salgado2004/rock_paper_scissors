const gameWindow = document.querySelector(".game");

function computerPlay() {
  const options = ["rock", "paper", "scissors"];
  const randomValue = Math.floor(Math.random() * options.length);
  //get a random value from the array

  return options[randomValue];
}

function getPlayerOption() {
  let playerChoice;

  const optionsFrame = document.createElement("div");
  optionsFrame.classList.add("options");
  gameWindow.appendChild(optionsFrame);

  const rock = document.createElement("button");
  rock.classList.add("rock", "option");
  rock.textContent = "Rock";
  optionsFrame.appendChild(rock);

  const paper = document.createElement("button");
  paper.classList.add("paper", "option");
  paper.textContent = "Paper";
  optionsFrame.appendChild(paper);

  const scissors = document.createElement("button");
  scissors.classList.add("scissors", "option");
  scissors.textContent = "Scissors";
  optionsFrame.appendChild(scissors);

  optionsFrame.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", () => {
      playerChoice = option.classList[0];
    });
  });

  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (playerChoice) {
        clearInterval(interval);
        optionsFrame.remove();
        resolve(playerChoice);
      }
    }, 100);
  });

}

function playRound(playerSelection, computerSelection) {
  const roundResult = document.createElement("div");
  roundResult.classList.add("round-result");
  gameWindow.appendChild(roundResult);

  const choices = document.createElement("p");
  choices.classList.add("choices");
  choices.textContent = `Player: ${playerSelection} VS Computer: ${computerSelection}`;
  roundResult.appendChild(choices);

  const result = document.createElement("p");
  result.classList.add("result");
  roundResult.appendChild(result);

  let winner;

  if (computerSelection === "rock" && playerSelection === "scissors" || computerSelection === "paper" && playerSelection === "rock" || computerSelection === "scissors" && playerSelection === "paper"){
    result.textContent = `Computer Wins the round! ${computerSelection} defeats ${playerSelection}!`;
    winner = "Computer";
  } else if ( computerSelection === "rock" && playerSelection === "paper" || computerSelection === "paper" && playerSelection === "scissors" || computerSelection === "scissors" && playerSelection === "rock"){
    result.textContent = `Player wins the round! ${playerSelection} defeats ${computerSelection}!`;
    winner = "Player";
  } else if (computerSelection === playerSelection) {
    result.textContent = `That's a tie! Both chose ${playerSelection}!`;
    winner = "Tie";
  } else {
    winner = "Reload";
  }

  const nextRound = document.createElement("button");
  nextRound.classList.add("next-round");
  nextRound.textContent = "Next";
  roundResult.appendChild(nextRound);

  const cancelGame = document.createElement("button");
  cancelGame.classList.add("cancel-game");
  cancelGame.textContent = "Cancel Game";
  roundResult.appendChild(cancelGame);

  return new Promise((resolve, reject) => {
    nextRound.addEventListener("click", () => {
      roundResult.remove();
      resolve(winner);
    });

    cancelGame.addEventListener("click", () => {
      roundResult.remove();
      reject("Game Canceled");
    });
  });
}

function finalScore(playerScore, computerScore) {
    const finalScore = document.createElement("p");
    finalScore.classList.add("final-score");
    gameWindow.appendChild(finalScore);
    finalScore.textContent = `Final Score: Player = ${playerScore} | Computer: ${computerScore}`;

    const finalResult = document.createElement("p");
    finalResult.classList.add("final-result");
    gameWindow.appendChild(finalResult);

    switch (true ) { //true is just to make the switch work
        case computerScore > playerScore:
        finalResult.textContent = "Computer won the game. The world became mine!";
        break;
        case playerScore > computerScore:
        finalResult.textContent = "Player won the game! The world is safe now and Mr Branko is free!";
        break;
        default:
        finalResult.textContent = "The game tied! Let's play until only one be in their foots!";
    }
}

async function game() {
  //the game function
  gameWindow.innerHTML = "";

  let playerScore = 0;
  let computerScore = 0;
  let i;
  
  const roundLabel = document.createElement("h2");
  roundLabel.classList.add("round-label");
  gameWindow.appendChild(roundLabel);

  const scoreLabel = document.createElement("p");
  scoreLabel.classList.add("score-label");
  gameWindow.appendChild(scoreLabel);

  for (i = 0; i < 5; i++) {
    roundLabel.textContent = `Round: ${i + 1}`;
    scoreLabel.textContent = `Score: Player = ${playerScore} | Computer: ${computerScore}`;
    
    try{    
        const computerSelection = computerPlay();
        const playerSelection = await getPlayerOption();
        const winner = await playRound(playerSelection, computerSelection);

        if (winner.includes("Player")) {
        //if the winner is the player
            playerScore++;
        } else if (winner.includes("Computer")) {
            //if the winner is the computer
            computerScore++;
        } else {
        //if the round tied
            playerScore++;
            computerScore++;
        }

        console.log(
        `Score: Player = ${playerScore} | Computer: ${computerScore}\n`
        );
    }catch(error) {
        console.log(error);
        console.log("Reload the page to play again!");
        break;
    }
  }
    if (i === 5){
        scoreLabel.remove();
        finalScore(playerScore, computerScore);
    } 

    const playAgain = document.createElement("button");
    playAgain.classList.add("play-again");
    playAgain.textContent = "Play Again";
    gameWindow.appendChild(playAgain);

    playAgain.addEventListener("click", () => {
        game();
    });
}
