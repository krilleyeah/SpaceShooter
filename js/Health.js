class Health {
    constructor() {
        this.health = 100;
        this.domElem = null;
        this.progressBar = null;
        this.createDomElem();
    }

    createDomElem() {
        let parentElm = document.getElementById("board");
        this.domElem = document.createElement("div");
        this.domElem.className = "health";
        this.domElem.style.width = "15vw";
        this.domElem.style.height = "3vh";
        this.domElem.innerHTML = "<p>Energy</p>";

        this.progressBar = document.createElement("div");
        this.progressBar.className = "progressBar";
        this.domElem.appendChild(this.progressBar);
        parentElm.appendChild(this.domElem);
    }

    increaseDamage(damage) {
        if (this.health > 0) {
            let value = this.health -= damage;
            value = value >= 0 ? value : 0;
            this.health = value;
            this.updateUI();
        }
    }

    updateUI() {
        this.progressBar.style.width = `${this.health}%`;
    }
}