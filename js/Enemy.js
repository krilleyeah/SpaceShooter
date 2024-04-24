
class Enemy {
    constructor(enemyClass) {
        this.enemyClass = enemyClass;
        this.width = 7;
        this.height = 15;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and (100-width)
        this.positionY = 100;
        this.domElem = null;
        this.collided = false;
        this.points = 100;
        this.bulletSpeed = 10;
        this.bullets = [];
        this.shootTimer = undefined;

        this.createEnemy();
    }
    createEnemy() {
        this.domElem = document.createElement("div");
        this.domElem.className = this.enemyClass;
        this.domElem.style.width = this.width + "vw";
        this.domElem.style.height = this.height + "vh";
        this.domElem.style.left = this.positionX + "vw";
        this.domElem.style.bottom = this.positionY + "vh";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.domElem);
    }
    moveDown() {
        this.positionY--;
        this.domElem.style.bottom = this.positionY + "vh";
    }

    shoot() {
        const bullet = document.createElement("div");
        bullet.className = "bullet2";
        bullet.style.width = "3vw";
        bullet.style.height = "6vh";

        // Calculate the position of the bullet based on the player's position and width
        const bulletLeft = this.positionX + (this.width / 2) - 2; // Adjusted to center the bullet
        const bulletBottom = this.positionY + this.height + 0.5; // Adjusted to position slightly above the player

        bullet.style.left = bulletLeft + "vw";
        bullet.style.bottom = bulletBottom + "vh";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(bullet);
        this.bullets.push(bullet);

        const bulletInterval = setInterval(() => {

            //console.log("enemy bullet " + bullet.style.bottom);
            bullet.style.bottom = (parseFloat(bullet.style.bottom) - 1) + "vh";
           // if (parseFloat(bullet.style.bottom) > 100) { 
            
           if (parseFloat(bullet.style.bottom) <= 0) { 
                clearInterval(bulletInterval); // Stop the animation
                if (parentElm.contains(bullet)) {
                    parentElm.removeChild(bullet); // Remove the bullet from the DOM
                }
                // Remove the bullet from the player's bullets array
                const index = this.bullets.indexOf(bullet);
                if (index !== -1) {
                    this.bullets.splice(index, 1);
                }
            }
        }, this.bulletSpeed);

    }
}

