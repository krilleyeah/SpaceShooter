class Player {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.positionX = 50 - this.width / 2;
        this.positionY = 5;
        this.bullets = [];
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
        this.domElem.style.height = (this.height - 2) + "vh";
        setTimeout(() => {
            this.domElem.style.height = this.height + "vh";
        }, 100);
    }

    shoot() {
        const bullet = document.createElement("div");
        bullet.className = "bullet1";
        bullet.style.width = "3vw";
        bullet.style.height = "7vh";

        // Calculate the position of the bullet based on the player's position and width
        const bulletLeft = this.positionX + (this.width / 2) - 1.6;
        const bulletBottom = this.positionY + this.height + 0.5;

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
                    parentElm.removeChild(bullet);
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