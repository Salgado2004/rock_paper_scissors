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

  if (
    (computerSelection === "rock" && playerSelection === "scissors") ||
    (computerSelection === "paper" && playerSelection === "rock") ||
    (computerSelection === "scissors" && playerSelection === "paper")
  ) {
    return `Computer Wins the round! ${computerSelection} defeats ${playerSelection}!`;
  } else if (
    (computerSelection === "rock" && playerSelection === "paper") ||
    (computerSelection === "paper" && playerSelection === "scissors") ||
    (computerSelection === "scissors" && playerSelection === "rock")
  ) {
    return `Player wins the round! ${playerSelection} defeats ${computerSelection}!`;
  } else if (computerSelection === playerSelection) {
    return `That's a tie!`;
  } else {
    return "Reload";
  }
}

function finalScore(playerScore, computerScore, scoreTable) {
    console.log("---------------------------------");
    switch (true ) { //true is just to make the switch work
        case computerScore > playerScore:
        console.log("Computer won the game. The world became mine!");
        break;
        case playerScore > computerScore:
        console.log("Player won the game! The world is safe now and Mr Branko is free!");
        break;
        default:
        console.log("The game tied! Let's play until only one be in their foots!");
    }
    console.log("Final results:");
    console.table(scoreTable);
    console.log("Reload the page to play again!");
}

async function game() {
  //the game function
  gameWindow.innerHTML = "";

  let playerScore = 0;
  let computerScore = 0;
  let i;

  const score_table = [];

  
  const roundLabel = document.createElement("h2");
  roundLabel.classList.add("round-label");
  gameWindow.appendChild(roundLabel);

  for (i = 0; i < 5; i++) {
    roundLabel.textContent = `Round: ${i + 1}`;
    
    try{    
        const computerSelection = computerPlay();
        const playerSelection = await getPlayerOption();
        const winner = playRound(playerSelection, computerSelection);

        if (winner.includes("Player")) {
        //if the winner is the player
            playerScore = playerScore + 1;
            score_table.push({ Player: 1, Computer: 0 });
        } else if (winner.includes("Computer")) {
            //if the winner is the computer
            computerScore = computerScore + 1;
            score_table.push({ Player: 0, Computer: 1 });
        } else {
        //if the round tied
            score_table.push({ Player: 0, Computer: 0 });
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
        finalScore(playerScore, computerScore, score_table);
    }
}
