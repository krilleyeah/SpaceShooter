class Score {
    constructor() {
        this.score = 0;
        this.domElem = null;
        this.createDomElem();
    }

    createDomElem() {
        let parentElm = document.getElementById("board");
        this.domElem = document.createElement("div");
        this.domElem.className = "score";
        this.domElem.style.width = "5vw";
        this.domElem.style.height = "5vh";
        parentElm.appendChild(this.domElem);
    }

    updateScore(points) {
        this.score += points;
        this.updateUI();
    }

    updateUI() {

    }
}