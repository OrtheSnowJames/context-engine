// can set score high or low...
class theCoolScene extends Scene {
    score = 0;
    textfield = new OCtxTextField(0, 100, 200, 50, 20);
    button = new OCtxButton(0, 300, 200, 50, "submit");

    constructor() {
        super();
        this.init();
    }

    init() {
        this.textfield.setPlaceholder("enter something");
    }

    update(deltaTime: number, commands: Commands) {
        this.textfield.update(commands, deltaTime);
        this.button.update(commands);

        if (commands.keys['ArrowUp']) {
            this.score += 1;
            commands.keys['ArrowUp'] = false; // Event happens only once
        }
        if (commands.keys['ArrowDown']) {
            this.score -= 1;
            commands.keys['ArrowDown'] = false; // Event happens only once
        }
        if (commands.keys['r']) {
            this.score = 0;
            commands.keys['r'] = false; // Event happens only once
        }
        if (commands.keys['Escape']) {
            commands.switchScene(1);
            commands.keys['Escape'] = false; // Event happens only once
        }

        if (this.button.isPressed) {
            if (!(this.textfield.getText() === "")) {
                try {
                    eval(this.textfield.getText());
                } catch (e) {
                    this.textfield.deactivate();
                    this.textfield.text = "";
                    this.textfield.setPlaceholder("Invalid input, I only accept js code");
                }
            }
        }
    }

    draw(otherCtxx: otherCtx) {
        otherCtxx.drawText(10, 10, `Score: ${this.score}`, 'white', 20);
        otherCtxx.drawText(10, 40, "Press Arrow Up to increase score", 'white', 20);
        otherCtxx.drawText(10, 70, "Press Arrow Down to decrease score", 'white', 20);
        otherCtxx.drawText(10, 100, "Press R to reset score", 'white', 20);
        this.textfield.draw(otherCtxx);
        this.button.draw(otherCtxx);
    }
}

class otherScene extends Scene {
    constructor() {
        super();
    }

    update(deltaTime: number, commands: Commands) {
        if (commands.keys['Escape']) { // another simple way to get keys
            commands.switchScene(0);
            commands.keys['Escape'] = false; // Event happens only once
        }
    }

    draw(otherCtxx: otherCtx) {
        otherCtxx.clearBackground('black');
        otherCtxx.drawText(10, 10, "Woah you found the other scene!", 'white', 20);
        otherCtxx.drawText(10, 40, "Press Escape to go back", 'white', 20);
    }
}

const otherSceneInstance = new otherScene();
const theCoolSceneInstance = new theCoolScene();

const game = [theCoolSceneInstance, otherSceneInstance];
contextEngine(game);