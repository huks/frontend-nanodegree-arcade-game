/* Constant variables... */
// Unit of X
const X_UNIT = function(n=1) {
    return 101 * n;
}
// Unit of Y
const Y_UNIT = function(n=1) {
    return 83 * n;
}
// Y shift parameter so the player algins center of the cell
const Y_SHIFT = 40;
// Size of the hitbox
const HITBOX = 25;

/**
 * @description Enemies our player must avoid
 * @param {number} row Default=0
 * @param {number} speed
 */
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
 * @return {number} Between min and max
 */
var randomSpeed = function() {
    var min = 1;
    var max = 10;
    return Math.floor(Math.random() * (max-min)) + min;
}

/**
 * @description Update the enemy's position, required method for game
 * @param dt - A time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Update the Enemy location
    this.x = this.x + this.speed;

    // Handles collision with the Player
    this.checkCollisons();

    // If the Enemy is out of bounday, delete then create a new one
    this.outOfBounds();
};

/**
 * @description Handles collision with the Player
 */
Enemy.prototype.checkCollisons = function() {
    if (this.x > player.x-HITBOX && this.x < player.x+HITBOX ) {
        if (this.y > player.y-HITBOX && this.y < player.y+HITBOX) {
            alert('Collison, mate');
            player.init();
        }
    }
}

/**
 * @description If the Enemy is out of bounds, delete then create a new one
 * @param {number} n - Size of bounds. Default: X_UNIT(6)
 */
Enemy.prototype.outOfBounds = function(n=X_UNIT(6)) {
    if (this.x > n) {
        var index = allEnemies.indexOf(this);
        allEnemies.splice(index, 1);
        allEnemies.push(new Enemy(this.row));
    }
}

/**
 * @description Draw the enemy on the screen, required method for game
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Player class requires an update(), render() and a handleInput() method
 */
var Player = function() {
    // constants...
    this.CHARACTERS = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png'];
    this.C_LEN = this.CHARACTERS.length-1;

    this.boolSelected = false;
    this.numSelection = -1; // if not selected default(-1) value returns error
    this.sprite = 'images/Selector.png';

    this.init();
}

/**
 * @description Left/Right to select character, Enter to confirm/start
 * @param keyCode 
 */
Player.prototype.selectCharacter = function(keyCode) {
    this.showMessage('PRESS ENTER TO START');
    switch(keyCode) {
        // Enter to finish character selection
        case 'enter':
            if (this.numSelection!=-1) {
                this.boolSelected=!this.boolSelected;
                player.showMessage('REACH THE WATER');               
            }
            break;
        case 'left':
            // handling default(-1)
            if (this.numSelection==-1) {
                this.numSelection+=this.C_LEN+1;
                this.sprite = this.CHARACTERS[this.numSelection];
            // when left ends
            } else if (this.numSelection==0) {
                this.numSelection+=this.C_LEN;
                this.sprite = this.CHARACTERS[this.numSelection];
            // otherwise continue left
            } else {
                this.sprite = this.CHARACTERS[--this.numSelection];
            }
            break;
        case 'right':
            // when right ends
            if (this.numSelection==this.C_LEN) {
                this.numSelection-=this.C_LEN;
                this.sprite = this.CHARACTERS[this.numSelection];
            // otherwise continue right
            } else {
                this.sprite = this.CHARACTERS[++this.numSelection];
            }
            break;
    }
}

/**
 * @description Setting the Player initial location
 */
Player.prototype.init = function() {
    this.x = X_UNIT(2);
    this.y = Y_UNIT(5) - Y_SHIFT;    
}

/**
 * @description If the player reaches the water, win!
 */
Player.prototype.win = function() {
    setTimeout(function(){
        alert("You win!");
        this.init();
    }.bind(this), 500); // add the bind method
    
}

/**
 * Update the player's position, required method for game
 * @param dt - A time delta between ticks
 */
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

/**
 * @description Draw the player on the screen, required method for game
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 * @description handleInput
 */
Player.prototype.handleInput = function(keyCode) {
    // If the player is not selected
    if (this.boolSelected == false) {
        this.selectCharacter(keyCode);
    }
    // Recall that the player cannot move off screen
    else {        
        switch(keyCode) {
            case 'left':
                if (this.x > 0) this.x -= X_UNIT();
                break;
            case 'up':
                // If the player reaches the water, the game should be reset
                // this.y > 0 condition added to prevent multiple win popups
                if (this.y <= Y_UNIT() - Y_SHIFT && this.y > 0) {
                    this.y -= Y_UNIT();
                    player.win();
                } else if (this.y > 0) {
                    this.y -= Y_UNIT();
                }
                break;
            case 'right':
                if (this.x < X_UNIT(4)) this.x += X_UNIT();
                break;
            case 'down':
                if (this.y < Y_UNIT(5) - Y_SHIFT) this.y += Y_UNIT();
                break;
        }
    }    
}

/**
 * @description Show game status message
 * @param {string} text 
 */
Player.prototype.showMessage = function(text) {
    msg.innerHTML = text;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(),
    new Enemy(0),
    new Enemy(1),
    new Enemy(1),
    new Enemy(2),
    new Enemy(2)
];

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// -> modifed to 'keydown' for 'professional' gameplay
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});