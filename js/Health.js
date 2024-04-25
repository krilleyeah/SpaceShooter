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
        this.domElem.style.width = "20vw";
        this.domElem.style.height = "5vh";
        this.domElem.innerHTML = "<p>Damage</p>";

        this.progressBar = document.createElement("div");
        this.progressBar.className = "progressBar";
        this.domElem.appendChild(this.progressBar);
        parentElm.appendChild(this.domElem);
    }

    increaseDamage(damage) {
        if (this.health > 0) {
            let value = this.health -= damage;
            value = value >= 0 ? value : 0;
            this.updateUI();
        }
    }

    updateUI() {
        let calc = (this.health / 100) * 100;
        this.progressBar.style.width = `${calc}%`;
    }
}