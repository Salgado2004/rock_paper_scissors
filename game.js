console.log(
  "Mr Branko was hacked and now you must fight against the bad AI who did it.\nDefeat the evil in this Rock, Paper Scissors game to save the world!"
);
console.log(
  "Press Ctrl+Shift+I to open the console and start the game!\n\n Good luck! The world needs you!"
);

function computerPlay() {
  const options = ["rock", "paper", "scissors"];
  const randomValue = Math.floor(Math.random() * options.length);
  //get a random value from the array

  return options[randomValue];
}

function getPlayerOption() {
  let playerChoice;
  let key = false;
  while (!key) {
    let choice = prompt("Choose between: Rock, Paper or Scissors!");
    if (choice !== null) {
      //if the user press cancel the prompt returns null
      playerChoice = choice.toLowerCase();
      if (
        playerChoice.trim() === "rock" ||
        playerChoice.trim() === "paper" ||
        playerChoice.trim() === "scissors"
      ) {
        //
        key = true;
      } else {
        //if the user enter something different from the options
        alert(
          "You have to enter one of the three options: Rock, Paper or Scissors!"
        );
      }
    } else {
      let answer = confirm("You have input 'null'. Are you sure you want to cancel the game?");
      if (answer) {
        throw new Error("Game canceled!");
      }
    }
  }

  return playerChoice;
}

function playRound(playerSelection, computerSelection) {
  console.log(
    `Player choice: ${playerSelection} VS computer choice: ${computerSelection}.`
  );

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
    switch (
        true //true is just to make the switch work
    ) {
        case computerScore > playerScore:
        console.log("Computer won the game. The world became mine!");
        break;
        case playerScore > computerScore:
        console.log(
            "Player won the game! The world is safe now and Mr Branko is free!"
        );
        break;
        default:
        console.log(
            "The game tied! Let's play until only one be in their foots!"
        );
    }
    console.log("Final results:");
    console.table(scoreTable);
    console.log("Reload the page to play again!");
}

async function game() {
  //the game function

  let playerScore = 0;
  let computerScore = 0;
  let i;

  const score_table = [];

  for (i = 0; i < 5; i++) {
    console.log("---------------------------------");
    console.log(`Round: ${i + 1}`);

    try{    
        const computerSelection = await computerPlay();
        const playerSelection = await getPlayerOption();

        const winner = playRound(playerSelection, computerSelection);
        console.log(winner);

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

game();
