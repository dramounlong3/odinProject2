let roundNum = 0;
let img = document.querySelectorAll(".contest-photo img");
let round = document.querySelector("#round-var");
let playerStar = document.querySelector("#player .star-box");
let computerStar = document.querySelector("#computer .star-box");

let playerScoreNum = 0;
let computerScoreNum = 0;
let playerScore = document.querySelector(".score-player");
let computerScore = document.querySelector(".score-computer");

//handle the button of try again
let handleAgain = document.querySelector(".again");
handleAgain.addEventListener("click", (e) => {
  roundNum = 0;
  round.innerHTML = roundNum;

  playerRoundResult = [];
  computerRoundResult = [];

  playerStar.innerHTML = "";
  computerStar.innerHTML = "";

  img.forEach((element) => {
    element.style.visibility = "hidden";
  });

  playerScoreNum = 0;
  computerScoreNum = 0;
  playerScore.innerHTML = playerScoreNum;
  computerScore.innerHTML = computerScoreNum;
});

//handle the button of input name
let handleInputName = document.querySelector(".inputname");
handleInputName.addEventListener("click", async (e) => {
  //sweetalert2 => should include the script on index.html on head
  const { value: userName } = await Swal.fire({
    title: "Welcome!",
    input: "text",
    inputLabel: "Please input your name.",
    inputValue: "", //default input on the screen
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write at least 1 character!";
      }
    },
  });

  if (userName) {
    Swal.fire(
      `Hi ${userName},\nThe game will be started after you click one of the photo on bottom.`
    );
    let nameArea = document.querySelector(".name");
    nameArea.innerText = userName;
  }

  //replace the basic prompt by above part
  //   let userName = prompt("Please input your name: ");
  //   if (userName.length >= 10) {
  //     alert("Character length could be less than 10.");
  //     return;
  //   }
  //   let nameArea = document.querySelector(".name");
  //   nameArea.innerText = userName;
});

let selector = document.querySelectorAll(".selector-img img");
let playerRoundResult = [];
let computerRoundResult = [];

//handle player select the photo of this round
selector.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (playerRoundResult.length >= 5 || computerRoundResult.length >= 5)
      return;
    round.innerHTML = ++roundNum;

    //check which photo player selected
    let playerSelect = e.target.id;
    img[0].style.visibility = "visible";
    img[0].setAttribute("src", `./src/${playerSelect}.jpg`);

    //0~98 => +1後 1~99
    //computer select the photo of this round
    let random = (Math.floor(Math.random() * 99) + 1) / 3;
    let computerSelect = "";
    if (random <= 11) {
      computerSelect = "rock";
    } else if (random <= 22) {
      computerSelect = "paper";
    } else {
      computerSelect = "scissors";
    }
    img[1].style.visibility = "visible";
    img[1].setAttribute("src", `./src/${computerSelect}.jpg`);

    //check who win the game of this round
    if (playerSelect !== computerSelect) {
      let photoStar = document.createElement("img");
      photoStar.setAttribute("src", "./src/star.jpg");
      photoStar.setAttribute("alt", "star");
      photoStar.classList.add("star");

      switch (playerSelect) {
        case "rock":
          if (computerSelect === "scissors") {
            playerRoundResult.push("win");
            playerScoreNum++;
            playerScore.innerHTML = playerScoreNum;
            playerStar.appendChild(photoStar);
            //change star volume;
          } else {
            computerRoundResult.push("win");
            computerScoreNum++;
            computerScore.innerHTML = computerScoreNum;
            computerStar.appendChild(photoStar);
            //change star volume;
          }
          break;
        case "paper":
          if (computerSelect === "rock") {
            playerRoundResult.push("win");
            playerScoreNum++;
            playerScore.innerHTML = playerScoreNum;
            playerStar.appendChild(photoStar);
            //change star volume;
          } else {
            computerRoundResult.push("win");
            computerScoreNum++;
            computerScore.innerHTML = computerScoreNum;
            computerStar.appendChild(photoStar);
            //change star volume;
          }
          break;
        case "scissors":
          if (computerSelect === "paper") {
            playerRoundResult.push("win");
            playerScoreNum++;
            playerScore.innerHTML = playerScoreNum;
            playerStar.appendChild(photoStar);
            //change star volume;
          } else {
            computerRoundResult.push("win");
            computerScoreNum++;
            computerScore.innerHTML = computerScoreNum;
            computerStar.appendChild(photoStar);
            //change star volume;
          }
          break;
        default:
          break;
      }
    }

    //check game is over?
    if (playerRoundResult.length >= 5) {
      //更改彈跳視窗
      Swal.fire("Good job", "YOU WIN!!!");
    } else if (computerRoundResult.length >= 5) {
      //更改彈跳視窗
      Swal.fire("Oh!oh!", "YOU LOSE...");
    }
  });
});
