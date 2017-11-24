// Enemies our player must avoid
var Enemy = function(speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Setting the Enemy initial location
    this.x = 0;
    this.y = 0;

    // Setting the Enemy speed, random speed if undefined
    this.speed = (typeof speed !== 'undefined') ? speed : randomSpeed();
    console.log("speed:" + this.speed);
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
    // console.log("player", player.x, player.y);
    var hitbox = 50;
    if (this.x > player.x-hitbox && this.x < player.x+hitbox ) {
        if (this.y > player.y-hitbox && this.y < player.y+hitbox) {
            console.log('collison, mate');
        }
    }
    
    // If the Enemy is out of bounday, delete then create a new one
    if (this.x > 606) {
        var index = allEnemies.indexOf(this);
        allEnemies.splice(index, 1);
        allEnemies.push(new Enemy());
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 101;
    this.y = 83;
}

/**
 * Update the player's position, required method for game
 * @param {*} dt a time delta between ticks
 */
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Updates the Player location
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    // console.log("Player.render", this.x, this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 * @description handleInput
 */
Player.prototype.handleInput = function(keyCode) {
    switch(keyCode) {
        case 'left':
            this.x -= 101;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'down':
            this.y += 83;
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(1)];
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
