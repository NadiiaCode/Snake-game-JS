
let container = document.getElementById("container");
const honeycomb = 35;
const displaySize = honeycomb * honeycomb;
let playing = false;
let dead = false;
let speed = 100;
let playButton = document.getElementById("play");
const direction = ["up", "down", "left", "right"];
let currentDirection = "right";
let grid = document.getElementsByClassName("box");
let foodBox; 

let snake = [
  {
    position: Math.floor(Math.random() * displaySize) - 1,
    direction: "right",
  },
];

function initGrid() {
  let container = document.getElementById("container");
  let gridTemplateColumns = "repeat(" + honeycomb + ", 15px)";
  container.style.gridTemplateColumns = gridTemplateColumns;
  if (playing) {
    playButton.innerHTML = "STOP";
  } else {
    playButton.innerHTML = "START";
  }

  if (dead) {
    playButton.innerHTML = "Restart Game";
  }

  for (let i = 0; i < displaySize; i++) {
    let box = document.createElement("div");

    box.id = i;
    box.className = "box";
    box.id = i;
    box.style.border = "1px solid  #5e4c52";
    box.style.borderRadius = "100px";
    box.style.margin = "-1px";
    box.style.height = "15px";
    box.style.width = "15px";
    container.appendChild(box);
  }
}
initGrid();

function startGame() {
  if (playing && !dead) {
    setTimeout(() => {
      snake[0].position;
      if (currentDirection === direction[0]) {
        snake[0].position = snake[0].position - honeycomb;
        if (snake[0].position <= -1) {
          snake[0].position = snake[0].position + displaySize;
        }
      } else if (currentDirection === direction[1]) {
        snake[0].position = snake[0].position + honeycomb;
        if (snake[0].position >= displaySize) {
          snake[0].position = snake[0].position - displaySize;
        }
      } else if (currentDirection === direction[2]) {
        snake[0].position = --snake[0].position;
        if ((snake[0].position + 1) % honeycomb === 0) {
          snake[0].position = snake[0].position + honeycomb;
        }
      } else if (currentDirection === direction[3]) {
        snake[0].position = ++snake[0].position;
        if (snake[0].position % honeycomb === 0) {
          snake[0].position = snake[0].position - honeycomb;
        }
      }
      isKill(); 
      let ant = snake[0].direction;
      for (let i = 1; i < snake.length; i++) {
        let previous = snake[i - 1].direction;
        let current = snake[i].direction;

        if (current === direction[0]) {
          snake[i].position = snake[i].position - honeycomb;
          if (snake[i].position <= -1) {
            snake[i].position = snake[i].position + displaySize;
          }
        } else if (current === direction[1]) {
          snake[i].position = snake[i].position + honeycomb;
          if (snake[i].position >= displaySize) {
            snake[i].position = snake[i].position - displaySize;
          }
        } else if (current === direction[2]) {
          snake[i].position = --snake[i].position;
          if ((snake[i].position + 1) % honeycomb === 0) {
            snake[i].position = snake[i].position + honeycomb;
          }
        } else if (current === direction[3]) {
          snake[i].position = ++snake[i].position;

          if (snake[i].position % honeycomb === 0) {
            snake[i].position = snake[i].position - honeycomb;
          }
        }
        snake[i].direction = ant;
        ant = current;
      }
      food();
      checkFood();
      makeSnake();
      startGame();
    }, speed);
  }
}

function makeSnake() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].style.background = "";
  }
  document.getElementsByClassName("box")[snake[0].position].style.background =
    "#09ff00";
  for (let i = 1; i < snake.length; i++) {
    let piece = document.getElementsByClassName("box")[snake[i].position];
    piece.style.background = "#d9ff00";
  }
}
makeSnake();

function stop() {
  playing = !playing;
  if (playing) {
    playButton.innerHTML = "STOP";
    startGame();
  } else {
    playButton.innerHTML = "START";
  }

  if (dead) {
    snake = [
      {
        position: Math.floor(Math.random() * displaySize) - 1,
        direction: "right",
      },
    ];
    playing = true;
    dead = false;
    document.getElementById(foodBox).classList.toggle("food");
    foodBox = "";
    startGame();
  }
}

function setSpeed() {
  speed = document.getElementById("speed").value;
}

function changeDirection(event) {
  switch (event.code) {
    case "ArrowUp":
      currentDirection = direction[0];
      break;
    case "ArrowDown":
      currentDirection = direction[1];
      break;
    case "ArrowLeft":
      currentDirection = direction[2];
      break;
    case "ArrowRight":
      currentDirection = direction[3];
      break;
  }
  snake[0].direction = currentDirection;
}

function food() {
  if (!foodBox) {
    const rand = Math.floor(Math.random() * (displaySize - 1));
    let appleBox = document.getElementById(rand);
    appleBox.classList.toggle("food");
    appleAvailable = true;
    foodBox = rand;
  }
}

function checkFood() {
  if (snake[0].position === foodBox) {
    document.getElementById(foodBox).classList.toggle("food");
    foodBox = "";

    let previous = snake[snake.length - 1].direction;

    if (previous === direction[0]) {
      snake.push({
        position: snake[snake.length - 1].position + honeycomb,
        direction: previous,
      });
      if (snake[snake.length - 1].position >= displaySize) {
        snake[snake.length - 1].position =
          snake[snake.length - 1].position - displaySize;
      }
    } else if (previous === direction[1]) {
      snake.push({
        position: snake[snake.length - 1].position - honeycomb,
        direction: previous,
      });
      if (snake[snake.length - 1].position < 0) {
        snake[snake.length - 1].position =
          snake[snake.length - 1].position + displaySize;
      }
    } else if (previous === direction[2]) {
      snake.push({
        position: snake[snake.length - 1].position + 1,
        direction: previous,
      });
      if (snake[snake.length - 1].position % honeycomb === 0) {
        snake[snake.length - 1].position =
          snake[snake.length - 1].position + honeycomb;
      }
    } else if (previous === direction[3]) {
      snake.push({
        position: snake[snake.length - 1].position - 1,
        direction: previous,
      });
      if (snake[snake.length - 1].position % honeycomb === 0) {
        snake[snake.length - 1].position =
          snake[snake.length - 1].position - honeycomb;
      }
    }
  }
}

function isKill() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].position === snake[i].position) {
      playing = false;
      alert("Unfortunately Snake is dead. Please restart the game.");
      dead = true;
      playButton.innerHTML = "Restart Game";
    }
  }
}

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return (
    evt.touches || 
    evt.originalEvent.touches
  );
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      console.log("left");
      currentDirection = direction[2];
    } else {
      console.log("right");
      currentDirection = direction[3];
    }
  } else {
    if (yDiff > 0) {
      console.log("up");
      currentDirection = direction[0];
    } else {
      console.log("down");
      currentDirection = direction[1];
    }
  }
  xDown = null;
  yDown = null;
  snake[0].direction = currentDirection;
}
