
class Enemy {
    constructor(enemyClass) {
        this.enemyClass = enemyClass;
        this.width = 7;
        this.height = 15;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1)); // random number between 0 and (100-width)
        this.positionY = 100;
        this.domElem = null;
        this.collided = false;

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
}

