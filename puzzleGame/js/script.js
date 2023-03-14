const puzzleContainer = document.querySelector("#puzzleContainer");
const CounterMoves = document.querySelector("#CounterMoves");
let puzzleArray = [];
let size = 3;
let imageArr = [
  "image_part_001",
  "image_part_002",
  "image_part_003",
  "image_part_004",
  "image_part_005",
  "image_part_006",
  "image_part_007",
  "image_part_008",
  "image_part_009",
];
let NumberOfMoves = 0;

// generatePuzzle();
// randomizePuzzle();
// renderPuzzle();

const getRow = (pos) => {
  return Math.ceil(pos / size);
};
const getColumn = (pos) => {
  const col = pos % 3;
  if (col === 0) {
    return size;
  }
  return col;
};

const generatePuzzle = () => {
  for (i = 1; i <= size * size; i++) {
    puzzleArray.push({
      value: i,
      position: i,
      src: imageArr[i],

      x: (getColumn(i) - 1) * 200,
      y: (getRow(i) - 1) * 200,
    });
  }
  console.log(
    "🤔 ~ file: script.js:25 ~ generatePuzzle ~ puzzleArray:",
    puzzleArray
  );
};
// generatePuzzle();

const renderPuzzle = () => {
  puzzleContainer.innerHTML = "";
  for (let puzzleItem of puzzleArray) {
    if (!puzzleItem.hidden) {
      puzzleContainer.innerHTML += `<div id='${
        puzzleItem.value
      }' class='puzzleItem' style='left:${puzzleItem.x}px;top:${
        puzzleItem.y
      }px'>
     
      <img src=./images/${imageArr[puzzleItem.value - 1]}.jpg />
      </div>`;
    }
  }
  CounterMoves.innerHTML = NumberOfMoves;
};

function randomizePuzzle() {
  const randomValues = getRandomValues();
  console.log(
    "🤔 ~ file: script.js:41 ~ randomizePuzzle ~ randomValues:",
    randomValues
  );
  let i = 0;
  for (let puzzleItem of puzzleArray) {
    puzzleItem.value = randomValues[i];
    i++;
  }
  // removing last box

  const removeLastBox = puzzleArray.find((item) => item.value === size * size);
  console.log(removeLastBox, "removeLastBox");
  removeLastBox.hidden = true;
}

// randomizePuzzle();

const getRandomValues = () => {
  const values = [];
  for (let i = 1; i <= size * size; i++) {
    values.push(i);
  }
  const randomValues = values.sort(() => Math.random() - 0.5);
  return randomValues;
};

const handleInput = () => {
  document.addEventListener("keydown", handleKeyDown);
};

const handleKeyDown = (e) => {
  console.log(e.key, "key code");
  switch (e.key) {
    case "ArrowLeft":
    case "a":
      console.log("moveLeftmoveLeftmoveLeft");
      moveLeft();
      break;
    case "ArrowRight":
    case "d":
      moveRight();
      break;
    case "ArrowUp":
    case "w":
      moveUp();
      break;

    case "ArrowDown":
    case "s":
      moveDown();
      break;
  }
  renderPuzzle();
};
const getRightPuzzle = () => {
  const emptyPuzzle = getEmptyPuzzle();
  const isRightEdge = getColumn(emptyPuzzle.position) === size;
  if (isRightEdge) {
    return null;
  }
  const puzzle = getPuzzleById(emptyPuzzle.position + 1);
  return puzzle;
};

const getLeftPuzzle = () => {
  const emptyPuzzle = getEmptyPuzzle();
  const isLeftEdge = getColumn(emptyPuzzle.position) === 1;
  if (isLeftEdge) {
    return null;
  }
  const puzzle = getPuzzleById(emptyPuzzle.position - 1);
  return puzzle;
};

const getAbovePuzzle = () => {
  const emptyPuzzle = getEmptyPuzzle();
  const isTopEdge = getRow(emptyPuzzle.position) === 1;
  if (isTopEdge) {
    return null;
  }
  const puzzle = getPuzzleById(emptyPuzzle.position - size);
  return puzzle;
};

const getDownPuzzle = () => {
  const emptyPuzzle = getEmptyPuzzle();
  const isBottomEdge = getRow(emptyPuzzle.position) === size;
  if (isBottomEdge) {
    return null;
  }
  const puzzle = getPuzzleById(emptyPuzzle.position + size);
  return puzzle;
};

function moveLeft() {
  const emptyPuzzle = getEmptyPuzzle();
  const rightPuzzle = getRightPuzzle();
  if (rightPuzzle) {
    swapPositions(emptyPuzzle, rightPuzzle, true);
    // NumberOfMoves++
  }
}
function moveRight() {
  console.log("move to right");
  const emptyPuzzle = getEmptyPuzzle();
  const leftPuzzle = getLeftPuzzle();
  if (leftPuzzle) {
    swapPositions(emptyPuzzle, leftPuzzle, true);
    // NumberOfMoves++
  }
}
function moveUp() {
  const emptyPuzzle = getEmptyPuzzle();
  const DownPuzzle = getDownPuzzle();
  if (DownPuzzle) {
    swapPositions(emptyPuzzle, DownPuzzle, false);
    // NumberOfMoves++
  }
}
function moveDown() {
  const emptyPuzzle = getEmptyPuzzle();
  const abovePuzzle = getAbovePuzzle();
  if (abovePuzzle) {
    swapPositions(emptyPuzzle, abovePuzzle, false);
    // NumberOfMoves++
  }
}

function swapPositions(firstPuzzle, secondPuzzle, isX = false) {
  let temp = firstPuzzle.position;
  firstPuzzle.position = secondPuzzle.position;
  secondPuzzle.position = temp;
  if (isX) {
    temp = firstPuzzle.x;
    firstPuzzle.x = secondPuzzle.x;
    secondPuzzle.x = temp;
  } else {
    temp = firstPuzzle.y;
    firstPuzzle.y = secondPuzzle.y;
    secondPuzzle.y = temp;
  }
  NumberOfMoves++;
}

const getEmptyPuzzle = () => {
  return puzzleArray.find((item) => item?.hidden);
};

const getPuzzleById = (pos) => {
  return puzzleArray.find((item) => item.position === pos);
};

generatePuzzle();
randomizePuzzle();
renderPuzzle();
handleInput();
