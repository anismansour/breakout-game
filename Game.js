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

function createBricks() {
  ctx.fillStyle = "blue";
  ctx.fillRect(20, 20, 100, 50);
  ctx.fillRect(140, 20, 100, 50);
  ctx.fillRect(260, 20, 100, 50);
  ctx.fillRect(380, 20, 100, 50);
  ctx.fillRect(20, 90, 100, 50);
  ctx.fillRect(140, 90, 100, 50);
  ctx.fillRect(260, 90, 100, 50);
  ctx.fillRect(380, 90, 100, 50);
  ctx.fillRect(20, 160, 100, 50);
  ctx.fillRect(140, 160, 100, 50);
  ctx.fillRect(260, 160, 100, 50);
  ctx.fillRect(380, 160, 100, 50);
}
// create ball  method :
// ctx.beginPath();
// ctx.arc(200, 450, 20, 0, Math.PI * 2);
//ctx.fillStyle = "black";  for color
// ctx.fill();  to fill
// ctx.stroke();

//create a ball with a variable ball

const ball = {
  x: 200,
  y: 150,
  size: 20,
  dx: 4, //to move x direction
  dy: 3 // to move y direction
};

function createBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
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
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
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
  createBricks();
  moveBall();
  BallDetectWall();
  padNewPosition();
  ballDetectPad();

  requestAnimationFrame(animate);
}

animate();
