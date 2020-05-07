//init canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//write on canvas
ctx.fillStyle = "black";
ctx.font = "12px Arial";
ctx.fillText("THE GAME", 510, 20);

//create pad
// ctx.fillStyle = "red";
// ctx.fillRect(200, 500, 150, 50);

//create pad with variable
const pad = {
  x: 200,
  y: 500,
  sizeW: 150,
  sizeH: 50,
  speed: 5,
  dx: 0,
  dy: 0
};

function createPad() {
  ctx.fillStyle = "red";
  ctx.fillRect(pad.x, pad.y, pad.sizeW, pad.sizeH);
}

// function createBricks() {
//   ctx.fillStyle = "blue";
//   ctx.fillRect(20, 20, 100, 50);
//   ctx.fillRect(140, 20, 100, 50);
//   ctx.fillRect(260, 20, 100, 50);
//   ctx.fillRect(380, 20, 100, 50);
//   ctx.fillRect(20, 90, 100, 50);
//   ctx.fillRect(140, 90, 100, 50);
//   ctx.fillRect(260, 90, 100, 50);
//   ctx.fillRect(380, 90, 100, 50);
//   ctx.fillRect(20, 160, 100, 50);
//   ctx.fillRect(140, 160, 100, 50);
//   ctx.fillRect(260, 160, 100, 50);
//   ctx.fillRect(380, 160, 100, 50);
// }
// create ball  method :
// ctx.beginPath();
// ctx.arc(200, 450, 20, 0, Math.PI * 2);
//ctx.fillStyle = "black";  for color
// ctx.fill();  to fill
// ctx.stroke();

//create bricks
const brick = {
  row: 3,
  column: 5,
  width: 77,
  height: 30,
  offSetLeft: 20,
  offSetTop: 20,
  marginTop: 40,
  fillColor: "blue",
  strokeColor: "#FFF"
};
let bricks = [];

function createBricks() {
  for (let r = 0; r < brick.row; r++) {
    bricks[r] = [];
    for (let c = 0; c < brick.column; c++) {
      bricks[r][c] = {
        x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
        y:
          r * (brick.offSetTop + brick.height) +
          brick.offSetTop +
          brick.marginTop,
        status: true
      };
    }
  }
}
createBricks();

function drawBricks() {
  for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++) {
      let b = bricks[r][c];
      // if the brick isn't broken
      if (b.status) {
        ctx.fillStyle = brick.fillColor;
        ctx.fillRect(b.x, b.y, brick.width, brick.height);

        ctx.strokeStyle = brick.strokeColor;
        ctx.strokeRect(b.x, b.y, brick.width, brick.height);
      }
    }
  }
}

//ball collision with bricks

function ballBrickCollision() {
  for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++) {
      let b = bricks[r][c];
      // if the brick isn't broken
      if (b.status) {
        if (
          ball.x + ball.size > b.x &&
          ball.x - ball.size < b.x + brick.width &&
          ball.y + ball.size > b.y &&
          ball.y - ball.size < b.y + brick.height
        ) {
          ball.dy = -ball.dy;
          b.status = false; // the brick is broken
        }
      }
    }
  }
}
//create a ball with a variable ball

const ball = {
  x: 200,
  y: 480,
  size: 15,
  dx: 4, //to move x direction
  dy: 3 // to move y direction
};

function createBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.stroke();
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function BallDetectWall() {
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  if (ball.y - ball.size < 0) {
    ball.dy *= -1;
  }
}

function gameOver() {
  if (ball.y + ball.size > canvas.height) {
    location.reload();
  }
}
function padDetectWall() {
  if (pad.x < 0) {
    pad.x = 0;
  }
  if (pad.x + pad.sizeW > canvas.width) {
    pad.x = canvas.width - pad.sizeW;
  }
}

function moveRight() {
  pad.dx = 3;
  pad.x += pad.dx;
}
function moveLeft() {
  pad.dx = -3;
  pad.x += pad.dx;
}
function stopMove() {
  pad.dx = 0;
}

function keyDown(e) {
  if (e.key === "ArrowRight") {
    moveRight();
  } else if (e.key === "ArrowLeft") {
    moveLeft();
  }
}

function keyUp(e) {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    stopMove();
  }
}
function ballDetectPad() {
  ballCenter = ball.x + ball.size / 2;
  if (ball.y + ball.size >= 500) {
    if (ballCenter > pad.x && ballCenter < pad.x + pad.sizeW) {
      ball.dy *= -1;
      //location.reload();
    }
  }
}

//take the dx value to start moving
function padNewPosition() {
  pad.x += pad.dx;
  pad.y += pad.dy;
  padDetectWall();
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function animate() {
  clear();
  createBall();
  createPad();

  drawBricks();
  moveBall();
  BallDetectWall();
  padNewPosition();
  ballDetectPad();
  ballBrickCollision();
  gameOver();

  requestAnimationFrame(animate);
}

animate();
