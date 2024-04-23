class Bullet {
    constructor(bulletSpeed, bulletDamage, bulletSize, positionX, positionY, parentElm, bulletsArray) {
        this.bulletSpeed = bulletSpeed;
        this.bulletDamage = bulletDamage;
        this.bulletSize = bulletSize;
        this.positionX = positionX;
        this.positionY = positionY;
        this.parentElm = parentElm;
        this.bulletsArray = bulletsArray;

        this.createBullet();
        this.animate();
    }

    createBullet() {
        this.bullet = document.createElement("div");
        this.bullet.className = "bullet";
        this.bullet.style.width = this.bulletSize + "vw";
        this.bullet.style.height = this.bulletSize + "vh";
        this.bullet.style.position = "absolute";
        this.bullet.style.left = this.positionX + "vw";
        this.bullet.style.bottom = this.positionY + "vh";

        this.parentElm.appendChild(this.bullet);
    }

    animate() {
        const bulletElement = this.bullet;
        const parentElm = this.parentElm;
        const bulletsArray = this.bulletsArray;
        const bulletInterval = setInterval(() => {
            const currentBottom = parseFloat(bulletElement.style.bottom) || 0;
            bulletElement.style.bottom = (currentBottom + 1) + "vh"; // Increment bottom position
            if (currentBottom > 100) { // Check if bullet is out of bounds
                clearInterval(bulletInterval); // Stop the animation
                parentElm.removeChild(bulletElement); // Remove the bullet from the DOM

                // Remove the bullet from the player's bullets array
                const index = bulletsArray.indexOf(this);
                if (index !== -1) {
                    bulletsArray.splice(index, 1);
                }
            }
        }, 30);
    }
}
