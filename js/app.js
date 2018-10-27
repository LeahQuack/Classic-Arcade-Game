// Soreboard
var score = 0; // define score of the game
var level = 0;// game level



// Enemies our player must avoid
let Enemy = function(x,y, speed) {
  // x and y: x is horizonal, y is vertical
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If enemy is not passed boundary
    if (this.x < this.boundary) {
      // Move forward
      this.x += this.speed * dt;
    }

    else {
      // Reset to start
      this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Hero class
class Hero {
  constructor() {
    this.sprite = 'images/char-princess-girl.png';
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 4 ) + 55;
    this.x = this.startX;
    this.y = this.startY;
    this.victory = false;
  }

  // Draw hero sprite on current x and y coord Position
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  /**
  * Update hero's x and y property according to the input
  *
  * @param {string} input - direction to travel!
  */
  handleInput(input) {
    switch(input) {
      case 'left':
        if (this.x > 0) {
          this.x -= this.step;
        }
        break;
      case 'up':
        if (this.y > 0) {
          this.y -= this.jump;
        }
        break;
      case 'right':
        if (this.x < this.step * 4) {
          this.x += this.step;
        }
        break;
      case 'down':
        if (this.y < this.jump * 4) {
          this.y += this.jump;
        };
        break;
      }
  }

  update() {
    // Check collision
    for (let enemy of allEnemies) {
      // Did player x y collide with enemy x y?
      if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)) {
        this.reset();
      }
    }
    // Check for a winner
      // Did player x and y reach final tile??
      if(this.y <= 0) {
        this.reset();
        //this.victory = true;
      }
  }
  reset () {
    this.y = this.startY;
    this.x = this.startX;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Hero();
const bug1 = new Enemy(-101, 0, 350);
const bug2 = new Enemy((-101*2.5), 83, 300);
const bug3 = new Enemy(-101, 166, 450);
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3);

//SCOREBOARD WOO!
renderScoreBoard = function() {
  ctx.fillStyle = '#c186d6'; // Purple Header Background
  ctx.fillRect(0, 0, 505, 50);
  ctx.strokeStyle = "#6d2b64"; // Letter Outline
  //ctx.fillStyle = '#c186d6';
  //ctx.font = "18px Helvetica";
  ctx.strokeText("SCORE: ", 310, 30);
  ctx.strokeText("LEVEL: ", 200, 30);
  ctx.strokeText("Princess Frogger", 20, 30);
  ctx.font = "18px Arial";
  ctx.strokeText(score, 385, 30);
  ctx.strokeText(level, 270, 30);
  ctx.save();
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
