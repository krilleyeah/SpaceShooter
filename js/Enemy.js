
class Enemy {
    constructor() {
        this.width = 5;
        this.height = 12;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and (100-width)
        this.positionY = 100;
        this.enemy = null;
        this.collided = false;

        this.createEnemy();
    }
    createEnemy() {
        this.enemy = document.createElement("div");
        this.enemy.className = "enemy";
        this.enemy.style.width = this.width + "vw";
        this.enemy.style.height = this.height + "vh";
        this.enemy.style.left = this.positionX + "vw";
        this.enemy.style.bottom = this.positionY + "vh";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.enemy);
    }
    moveDown() {
        this.positionY--;
        this.enemy.style.bottom = this.positionY + "vh";
    }
}

