
class Player {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.positionX = 50 - this.width / 2;
        this.positionY = 5;
        this.bullets = [];
        this.strength = 5; // number of hits that can be taken
        this.bulletSpeed = 5;

        this.playerElm = document.getElementById("player");
        this.playerElm.style.width = this.width + "vw";
        this.playerElm.style.height = this.height + "vh";
        this.playerElm.style.left = this.positionX + "vw";
        this.playerElm.style.bottom = this.positionY + "vh";

        this.spaceBarPressed = false;
    }
    moveLeft() {
        if (this.positionX > 0) {
            this.positionX--;
            this.playerElm.style.left = this.positionX + "vw";
        }
    }
    moveUp() {
        if (this.positionY < 100 - this.height) {
            this.positionY++;
            this.playerElm.style.bottom = this.positionY + "vh";

        }
    }
    moveDown() {
        if (this.positionY > 0) {
            this.positionY--;
            this.playerElm.style.bottom = (this.positionY - 1) + "vh";
        }
    }
    moveRight() {
        if (this.positionX < 100 - this.width) {
            this.positionX++;
            this.playerElm.style.left = this.positionX + "vw";
        }
    }
    shoot() {
        const bullet = document.createElement("div");
        bullet.className = "bullet";
        bullet.style.width = "3vw";
        bullet.style.height = "3vh";

        // Calculate the position of the bullet based on the player's position and width
        const bulletLeft = this.positionX + (this.width / 2) - 1.5; // Adjusted to center the bullet
        const bulletBottom = this.positionY + this.height + 0.5; // Adjusted to position slightly above the player

        bullet.style.left = bulletLeft + "vw";
        bullet.style.bottom = bulletBottom + "vh";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(bullet);
        this.bullets.push(bullet); // Store bullet position and element
        // Animate the bullet

        const bulletInterval = setInterval(() => {
            bullet.style.bottom = (parseFloat(bullet.style.bottom) + 1) + "vh"; // Increment bottom position
            if (parseFloat(bullet.style.bottom) > 100) { // Check if bullet is out of bounds
                clearInterval(bulletInterval); // Stop the animation
                parentElm.removeChild(bullet); // Remove the bullet from the DOM

                // Remove the bullet from the player's bullets array
                const index = this.bullets.indexOf(bullet);
                if (index !== -1) {
                    this.bullets.splice(index, 1);
                }
            }
        }, 30);

    }
}

const player = new Player();
const enemies = [];

// create enemies
setInterval(() => {
    const newEnemy = new Enemy();
    enemies.push(newEnemy);
}, 2000);



// update game
setInterval(() => {
    enemies.forEach((enemy, index) => {

        enemy.moveDown();

        // Remove enemies that are out of bounds
        if (enemy.positionY < -enemy.height) {
            console.log("remove enemy");
            enemy.enemy.remove(); // Remove enemy from the DOM
            enemies.splice(index, 1); // Remove enemy from the enemies array
        }

        // detect collision
        if (
            !enemy.collided &&
            player.positionX < enemy.positionX + enemy.width &&
            player.positionX + player.width > enemy.positionX &&
            player.positionY < enemy.positionY + enemy.height &&
            player.positionY + player.height > enemy.positionY
        ) {
            // subtract hit from strength
            enemy.collided = true;
            player.strength--;
            if (player.strength == 0) {
                console.log("game over...");
                // location.href = "gameover.html";
            } else {
                console.log("player strength left " + player.strength);
            }
        }
    });


}, 60);



// detect multiple key events
// Initialize a set to store the keys that are currently pressed
const keysPressed = new Set();

// Add event listeners for keydown and keyup events
document.addEventListener("keydown", (e) => {
    keysPressed.add(e.code);
});

document.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
        player.spaceBarPressed = false;
    }
    keysPressed.delete(e.code);
});

// Update function or game loop
function update() {

    checkBulletHits();

    if (keysPressed.has("Space") && !player.spaceBarPressed) {
        player.spaceBarPressed = true;
        player.shoot();
    }

    if (keysPressed.has("ArrowLeft")) {
        player.moveLeft();
    }
    if (keysPressed.has("ArrowRight")) {
        player.moveRight();
    }


    // Check if ArrowUp key is pressed
    if (keysPressed.has("ArrowUp")) {
        // Check if ArrowLeft key is also pressed
        if (keysPressed.has("ArrowLeft")) {
            player.moveUp();
            player.moveLeft(); // Move diagonally up and left
        }
        // Check if ArrowRight key is also pressed
        else if (keysPressed.has("ArrowRight")) {
            player.moveUp()
            player.moveRight(); // Move diagonally up and right
        } else {
            player.moveUp(); // Move up
        }
    }

    // Check if ArrowDown key is pressed
    if (keysPressed.has("ArrowDown")) {
        // Check if ArrowLeft key is also pressed
        if (keysPressed.has("ArrowLeft")) {
            player.moveDown();
            player.moveLeft(); // Move diagonally down and left
        }
        // Check if ArrowRight key is also pressed
        else if (keysPressed.has("ArrowRight")) {
            player.moveDown();
            player.moveRight(); // Move diagonally down and right
        } else {
            player.moveDown(); // Move down
        }
    }

    // Call the update function again to continuously update the game
    requestAnimationFrame(update);
}


function checkBulletHits() {
    // Iterate through each bullet
    for (let i = 0; i < player.bullets.length; i++) {
        const bullet = player.bullets[i];

        // Check for collision with each enemy
        for (let j = 0; j < enemies.length; j++) {
            const enemy = enemies[j];

            // Get bounding rectangles for bullet and enemy
            const bulletRect = bullet.getBoundingClientRect();
            const enemyRect = enemy.enemy.getBoundingClientRect();

            // Check if bullet collides with enemy
            if (
                bulletRect.left < enemyRect.right &&
                bulletRect.right > enemyRect.left &&
                bulletRect.top < enemyRect.bottom &&
                bulletRect.bottom > enemyRect.top
            ) {
                // Mark the enemy as collided
                enemy.collided = true;

                // Remove the enemy from the DOM
                enemy.enemy.remove();

                // Remove the enemy from the enemies array
                enemies.splice(j, 1);

                // Remove the bullet from the DOM
                bullet.remove();

                // Remove the bullet from the player's bullets array
                player.bullets.splice(i, 1);

                // Exit the loop since the bullet can hit only one enemy
                break;
            }
        }
    }
}


// Start the game loop
update();

