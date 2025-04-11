// can set score high or low...
class theCoolScene extends Scene {
    keys = {};
    score = 0;
    constructor() {
        super();
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
            this.keys['ArrowUp'] = false; // Event happens only once
        }
        if (this.keys['ArrowDown']) {
            this.score -= 1;
            this.keys['ArrowDown'] = false; // Event happens only once
        }
        if (this.keys['r']) {
            this.score = 0;
            this.keys['r'] = false; // Event happens only once
        }
        if (this.keys['Escape']) {
            commands.switchScene(1);
            this.keys['Escape'] = false; // Event happens only once
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
        super();
    }
    update(deltaTime, commands) {
        if (commands.keys['Escape']) { // another simple way to get keys
            commands.switchScene(0);
            commands.keys['Escape'] = false; // Event happens only once
        }
    }
    draw(otherCtxx) {
        otherCtxx.clearBackground('black');
        otherCtxx.drawText(10, 10, "Woah you found the other scene!", 'white', 20);
        otherCtxx.drawText(10, 40, "Press Escape to go back", 'white', 20);
    }
}
const otherSceneInstance = new otherScene();
const theCoolSceneInstance = new theCoolScene();
const game = [theCoolSceneInstance, otherSceneInstance];
contextEngine(game);
