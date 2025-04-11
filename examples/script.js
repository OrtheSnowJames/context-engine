// can set score high or low...
class theCoolScene extends Scene {
    constructor() {
        super();
        this.keys = {};
        this.score = 0;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });
        document.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });
    }

    update(deltaTime, commands) {
        if (this.keys['ArrowUp']) {
            this.score += 1;
        }
        if (this.keys['ArrowDown']) {
            this.score -= 1;
        }
        if (this.keys['r']) {
            this.score = 0;
        }
        if (this.keys['Escape']) {
            commands.switchScene(1);
        }
    }

    draw(otherCtxx) {
        otherCtxx.drawText(10, 10, `Score: ${this.score}`, 'white', 20);
        otherCtxx.drawText(10, 40, "Press Arrow Up to increase score", 'white', 20);
        otherCtxx.drawText(10, 70, "Press Arrow Down to decrease score", 'white', 20);
        otherCtxx.drawText(10, 100, "Press R to reset score", 'white', 20);
    }
}

class otherScene extends Scene {
    constructor() {
    }

    update(deltaTime, commands) {
        if (commands.keys['Escape']) { // another simple way to get keys
            commands.switchScene(0);
        }
    }

    draw(otherCtxx) {
        otherCtxx.drawText(10, 10, "Woah you found the other scene!", 'white', 20);
        otherCtxx.drawText(10, 40, "Press Escape to go back", 'white', 20);
    }
}

var otherScene = new otherScene();
var theCoolScene = new theCoolScene();

let game = [theCoolScene, otherScene];
contextEngine(game)