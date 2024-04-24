class Player {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.positionX = 50 - this.width / 2;
        this.positionY = 5;
        this.bullets = [];
        this.strength = 5; // number of hits that can be taken
        this.bulletSpeed = 15;

        this.domElem = document.getElementById("player");
        this.domElem.style.width = this.width + "vw";
        this.domElem.style.height = this.height + "vh";
        this.domElem.style.left = this.positionX + "vw";
        this.domElem.style.bottom = this.positionY + "vh";
    }
    moveLeft() {
        if (this.positionX > 0) {
            this.positionX--;
            this.domElem.style.left = this.positionX + "vw";
        }
    }
    moveUp() {
        if (this.positionY < 100 - this.height) {
            this.positionY++;
            this.domElem.style.bottom = this.positionY + "vh";

        }
    }
    moveDown() {
        if (this.positionY > 0) {
            this.positionY--;
            this.domElem.style.bottom = (this.positionY - 1) + "vh";
        }
    }
    moveRight() {
        if (this.positionX < 100 - this.width) {
            this.positionX++;
            this.domElem.style.left = this.positionX + "vw";
        }
    }

    collision() {
        this.domElem.style.height = (this.height - 5) + "vh";
        setTimeout(() => {
            this.domElem.style.height = this.height + "vh";
        }, 50);
    }

    shoot() {
        const bullet = document.createElement("div");
        bullet.className = "bullet";
        bullet.style.width = "1vw";
        bullet.style.height = "3vh";

        // Calculate the position of the bullet based on the player's position and width
        const bulletLeft = this.positionX + (this.width / 2) - 1; // Adjusted to center the bullet
        const bulletBottom = this.positionY + this.height + 0.5; // Adjusted to position slightly above the player

        bullet.style.left = bulletLeft + "vw";
        bullet.style.bottom = bulletBottom + "vh";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(bullet);
        this.bullets.push(bullet);

        const bulletInterval = setInterval(() => {
            bullet.style.bottom = (parseFloat(bullet.style.bottom) + 1) + "vh";
            if (parseFloat(bullet.style.bottom) > 100) { 
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