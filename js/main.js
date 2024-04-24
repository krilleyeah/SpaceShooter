const player = new Player();
const enemies = [];
let enemyCounter = 0;
spaceBarPressed = false;

// create enemies
setInterval(() => {
    enemyCounter++;
    let enemyClass = enemyCounter %2 == 0 ? "enemy1" : "enemy2";
    const newEnemy = new Enemy(enemyClass);
    enemies.push(newEnemy);
}, 1500);

// update game
setInterval(() => {
    enemies.forEach((enemyShip, index) => {

        enemyShip.moveDown();

        // Remove enemies that are out of bounds
        if (enemyShip.positionY < -enemyShip.height) {
            if (enemyShip.domElem.parentNode) {
                enemyShip.domElem.parentNode.removeChild(enemyShip.domElem);
            } // Remove enemy from the DOM
            enemies.splice(index, 1); // Remove enemy from the enemies array
        }

        // Get bounding rectangles for player and enemy
        const playerRect = player.domElem.getBoundingClientRect();
        const enemyRect = enemyShip.domElem.getBoundingClientRect();

        // Detect collision using bounding rectangles
        if (
            !enemyShip.collided &&
            playerRect.left < enemyRect.right &&
            playerRect.right > enemyRect.left &&
            playerRect.top < enemyRect.bottom &&
            playerRect.bottom > enemyRect.top
        ) {
            // Subtract hit from strength
            enemyShip.collided = true;
            player.strength--;
            if (player.strength == 0) {
                console.log("game over...");
                // location.href = "gameover.html";
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
        enemies.forEach((enemyShip, j) => {
            const enemyRect = enemyShip.domElem.getBoundingClientRect();
            const bulletRect = bullet.getBoundingClientRect();

            if (
                bulletRect.left < enemyRect.right &&
                bulletRect.right > enemyRect.left &&
                bulletRect.top < enemyRect.bottom &&
                bulletRect.bottom > enemyRect.top
            ) {
                // Mark the enemy as collided
                enemyShip.collided = true;

                // Remove the enemy from the DOM
                if (enemyShip.domElem.parentNode) {
                    enemyShip.domElem.parentNode.removeChild(enemyShip.domElem);
                }

                enemies.splice(j, 1);

                // Remove the bullet from the DOM
                bullet.remove();

                player.bullets.splice(i, 1);
                return;
            }
        });
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

    if (keysPressed.has("ArrowUp")) {
        if (keysPressed.has("ArrowLeft")) {
            player.moveUp();
            player.moveLeft();
        } else if (keysPressed.has("ArrowRight")) {
            player.moveUp()
            player.moveRight();
        } else {
            player.moveUp();
        }
    }

    if (keysPressed.has("ArrowDown")) {
        if (keysPressed.has("ArrowLeft")) {
            player.moveDown();
            player.moveLeft();
        } else if (keysPressed.has("ArrowRight")) {
            player.moveDown();
            player.moveRight();
        } else {
            player.moveDown();
        }
    }
}

// game loop
function updateGame() {
    checkBulletHits();
    checkPlayerInteraction();
    requestAnimationFrame(updateGame);
}

updateGame();

