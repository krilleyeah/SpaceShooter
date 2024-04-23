const player = new Player();
const enemies = [];
spaceBarPressed = false;

// create enemies
setInterval(() => {
    const newEnemy = new Enemy();
    enemies.push(newEnemy);
}, 2000);



// update game
setInterval(() => {
    enemies.forEach((enemyShip, index) => {

        enemyShip.moveDown();

        // Remove enemies that are out of bounds
        if (enemyShip.positionY < -enemyShip.height) {
            if (enemyShip.enemy.parentNode) {
                enemyShip.enemy.parentNode.removeChild(enemyShip.enemy);
                console.log("remove enemy");
            } // Remove enemy from the DOM
            enemies.splice(index, 1); // Remove enemy from the enemies array
        }

        // detect collision
        if (
            !enemyShip.collided &&
            player.positionX < enemyShip.positionX + enemyShip.width &&
            player.positionX + player.width > enemyShip.positionX &&
            player.positionY < enemyShip.positionY + enemyShip.height &&
            player.positionY + player.height > enemyShip.positionY
        ) {
            // subtract hit from strength
            enemyShip.collided = true;
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
        spaceBarPressed = false;
    }
    keysPressed.delete(e.code);
});

function checkBulletHits() {
    // Iterate through each bullet
    for (let i = 0; i < player.bullets.length; i++) {
        const bullet = player.bullets[i];

        // Check for collision with each enemy
        for (let j = 0; j < enemies.length; j++) {
            const enemyShip = enemies[j];

            // Get bounding rectangles for bullet and enemy
            const bulletRect = bullet.getBoundingClientRect();
            const enemyRect = enemyShip.enemy.getBoundingClientRect();

            // Check if bullet collides with enemy
            if (
                bulletRect.left < enemyRect.right &&
                bulletRect.right > enemyRect.left &&
                bulletRect.top < enemyRect.bottom &&
                bulletRect.bottom > enemyRect.top
            ) {
                // Mark the enemy as collided
                enemyShip.collided = true;

                // Remove the enemy from the DOM
                enemyShip.enemy.remove();

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

function checkPlayerInteraction() {

    if (keysPressed.has("Space") && !spaceBarPressed) {
        spaceBarPressed = true;
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
}

// game loop
function update() {

    checkBulletHits();
    checkPlayerInteraction();

    // Call the update function again to continuously update the game
    requestAnimationFrame(update);
}

// Start the game loop
update();

