// Constant variables...
const X_UNIT = function(n=1) {
    return 101 * n;
}
const Y_UNIT = function(n=1) {
    return 83 * n;
}
const Y_SHIFT = 25;
const HITBOX = 25;

// Enemies our player must avoid
var Enemy = function(row=0, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Enemy will be created by given row
    this.row = row;

    // Setting the Enemy initial location
    this.x = 0;
    this.y = Y_UNIT(this.row+1) - Y_SHIFT;

    // Setting the Enemy speed, random speed if undefined
    this.speed = (typeof speed !== 'undefined') ? speed : randomSpeed();
};

/**
 * @description Generate random speed
 * @return {int} range from min to max
 */
var randomSpeed = function() {
    var min = 1;
    var max = 10;
    return Math.floor(Math.random() * (max-min)) + min;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Update the Enemy location
    this.x = this.x + this.speed;

    // Handles collision with the Player
    if (this.x > player.x-HITBOX && this.x < player.x+HITBOX ) {
        if (this.y > player.y-HITBOX && this.y < player.y+HITBOX) {
            alert('Collison, mate');
            player.init();
        }
    }
    
    // If the Enemy is out of bounday, delete then create a new one
    if (this.x > X_UNIT(6)) {
        var index = allEnemies.indexOf(this);
        allEnemies.splice(index, 1);
        allEnemies.push(new Enemy(this.row));
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class requires an update(), render() and a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';

    this.init();
}

/**
 * @description Setting the Player initial location
 */
Player.prototype.init = function() {
    this.x = X_UNIT(2);
    this.y = Y_UNIT(5) - Y_SHIFT;
}

/**
 * Update the player's position, required method for game
 * @param {*} dt a time delta between ticks
 */
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 * @description handleInput
 */
Player.prototype.handleInput = function(keyCode) {
    // Recall that the player cannot move off screen
    switch(keyCode) {
        case 'left':
            if (this.x > 0) this.x -= X_UNIT();
            break;
        case 'up':
            this.y -= Y_UNIT();
            // If the player reaches the water, the game should be reset
            if (this.y < Y_UNIT() - Y_SHIFT) player.win();
            break;
        case 'right':
            if (this.x < X_UNIT(4)) this.x += X_UNIT();
            break;
        case 'down':
            if (this.y < Y_UNIT(5) - Y_SHIFT) this.y += Y_UNIT();
            break;
    }
}

Player.prototype.win = function() {
    setTimeout(function(){
        alert("You win!");
        player.init();
    }, 500);
    
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(1), new Enemy(2)];
// Place the player object in a variable called player
var player = new Player();


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
