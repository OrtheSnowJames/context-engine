declare class theCoolScene extends Scene {
    score: number;
    textfield: any;
    button: any;
    constructor();
    init(): void;
    update(deltaTime: number, commands: Commands): void;
    draw(otherCtxx: otherCtx): void;
}
declare class otherScene extends Scene {
    constructor();
    update(deltaTime: number, commands: Commands): void;
    draw(otherCtxx: otherCtx): void;
}
declare const otherSceneInstance: otherScene;
declare const theCoolSceneInstance: theCoolScene;
declare const game: (theCoolScene | otherScene)[];
