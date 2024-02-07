let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newGame = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg_container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX playerO
let count = 0;

const winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("box was clicked");

    if (turnO) {
      //player0
      box.innerText = "O";
      turnO = false;
    } else {
      //playerx
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    if (count == 9 && !isWinner) {
      gameDraw();
    }
  });
});
const gameDraw = () => {
  msg.innerText = `Game Draw`;
  msgcontainer.classList.remove("hide");
  disableBoxes();
};
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const resetgame = () => {
  turnO = true;
  enableBoxes();
  msgcontainer.classList.add("hide");
};
const showWinner = (winner) => {
  msg.innerText = `congratulations, Winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winpatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // console.log("winner",pos1Val);

        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGame.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
