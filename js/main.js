const player = new Player();
const enemies = [];
let enemyCounter = 0;
const score = new Score();
let spaceBarPressed = false;
let keysPressed = {};

// create enemies
setInterval(() => {
    enemyCounter++;
    let enemyClass = enemyCounter % 2 == 0 ? "enemy1" : "enemy2";
    const newEnemy = new Enemy(enemyClass);
    enemies.push(newEnemy);
}, 1500);

// update game
setInterval(() => {
    updateEnemies();
}, 80);

function updateEnemies() {
    enemies.forEach((enemyShip, index) => {
        enemyShip.moveDown();
        manageShootTimer(enemyShip);

        // Remove enemies that are out of bounds
        if (enemyShip.positionY < -enemyShip.height) {
            removeEnemy(enemyShip, index);
        }

        // Detect collision
        const playerRect = player.domElem.getBoundingClientRect();
        const enemyRect = enemyShip.domElem.getBoundingClientRect();
        if (!enemyShip.collided && isColliding(playerRect, enemyRect)) {
            enemyShip.collided = true;
            player.strength--;
            player.collision();
            if (player.strength === 0) {
                console.log("game over...");
                // location.href = "gameover.html";
            }
        }
    });

    checkBulletHits();
}

function manageShootTimer(enemyShip) {
    if (enemyShip.shootTimer === undefined) {
        enemyShip.shootTimer = setInterval(() => {
            enemyShip.shoot();
        }, 2000);
    }
}

function removeEnemy(enemyShip, index) {
    if (enemyShip.domElem.parentNode) {
        enemyShip.domElem.parentNode.removeChild(enemyShip.domElem);
    }
    enemies.splice(index, 1);
    clearInterval(enemyShip.shootTimer);
    delete enemyShip.shootTimer;
}

function isColliding(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

// Key event listeners
document.addEventListener("keydown", (e) => {
    keysPressed[e.code] = true;
});

document.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
        spaceBarPressed = false;
    }
    delete keysPressed[e.code];
});

function checkPlayerInteraction() {
    if (keysPressed["Space"] && !spaceBarPressed) {
        spaceBarPressed = true;
        player.shoot();
    }

    if (keysPressed["ArrowLeft"]) {
        player.moveLeft();
    }
    if (keysPressed["ArrowRight"]) {
        player.moveRight();
    }
    if (keysPressed["ArrowUp"]) {
        if (keysPressed["ArrowLeft"]) {
            player.moveUp();
            player.moveLeft();
        } else if (keysPressed["ArrowRight"]) {
            player.moveUp();
            player.moveRight();
        } else {
            player.moveUp();
        }
    }
    if (keysPressed["ArrowDown"]) {
        if (keysPressed["ArrowLeft"]) {
            player.moveDown();
            player.moveLeft();
        } else if (keysPressed["ArrowRight"]) {
            player.moveDown();
            player.moveRight();
        } else {
            player.moveDown();
        }
    }
}

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

                score.updateScore(enemyShip.points);

                // Remove the enemy from the DOM
                if (enemyShip.domElem.parentNode) {
                    enemyShip.domElem.parentNode.removeChild(enemyShip.domElem);
                }

                enemies.splice(j, 1);
                // Clear the shoot timer when the enemy is removed
                clearInterval(enemyShip.shootTimer);
                delete enemyShip.shootTimer;

                // Remove the bullet from the DOM
                bullet.remove();

                player.bullets.splice(i, 1);
                return;
            }
        });
    }
}

// Game loop
function updateGame() {
    checkPlayerInteraction();
    requestAnimationFrame(updateGame);
}

updateGame();
