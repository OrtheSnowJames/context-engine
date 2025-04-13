export declare class otherCtx {
    ctx: CanvasRenderingContext2D;
    cameraX: number;
    cameraY: number;
    targetCameraX: number;
    targetCameraY: number;
    zoom: number;
    constructor(ctx: CanvasRenderingContext2D);
    setCamera(x: number, y: number): void;
    updateCamera(deltaTime: number): void;
    setZoom(zoom: number): void;
    drawRect(x: number, y: number, width: number, height: number, color: string): void;
    drawCircle(x: number, y: number, radius: number, color: string): void;
    drawText(x: number, y: number, text: string, color: string, fontSize: number): void;
    drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number): void;
    rawCtx(): CanvasRenderingContext2D;
    setCtx(ctx: CanvasRenderingContext2D): void;
    clearBackground(color: string): void;
    drawLine(x1: number, y1: number, x2: number, y2: number, color: string): void;
    drawPolygon(points: Array<{
        x: number;
        y: number;
    }>, color: string): void;
    drawImageScaled(image: HTMLImageElement, x: number, y: number, width: number, height: number): void;
    drawTriangles(vertices: Vertex[], indices: number[], color: string): void;
    drawImageRotated(image: HTMLImageElement, x: number, y: number, width: number, height: number, angle: number): void;
    drawImageWithAlpha(image: HTMLImageElement, x: number, y: number, width: number, height: number, alpha: number): void;
    drawImageWithScale(image: HTMLImageElement, x: number, y: number, scaleX: number, scaleY: number): void;
    drawImageWithRotation(image: HTMLImageElement, x: number, y: number, width: number, height: number, angle: number): void;
}
export declare class Scene {
    update(deltaTime: number, commands: Commands): void;
    draw(ctx: otherCtx): void;
}
export declare class OCtxButton {
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    label: string;
    backgroundColor: string;
    hoverColor: string;
    pressedColor: string;
    borderColor: string;
    textColor: string;
    fontSize: number;
    isHovered: boolean;
    isPressed: boolean;
    private animationProgress;
    padding: number;
    cornerRadius: number;
    enabled: boolean;
    invisible: boolean;
    uneditable: boolean;
    useRoundedCorners: boolean;
    constructor(x: number, y: number, width: number, height: number, label: string);
    setColors(background: string, hover: string, pressed: string, border: string, text: string): void;
    update(commands: Commands): void;
    draw(ctx: otherCtx): void;
    isClicked(commands: Commands): boolean;
    private pointInRect;
    private drawRoundedRect;
    private drawRoundedRectBorder;
    private drawRectBorder;
    private getRoundedRectPoints;
    private lerpColor;
    private hexToRgb;
    private adjustAlpha;
}
export declare class OCtxTextField {
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    text: string;
    maxLength: number;
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    placeholderColor: string;
    placeholder: string;
    fontSize: number;
    isActive: boolean;
    cursorPosition: number;
    private cursorBlinkTimer;
    private backspaceHoldTimer;
    invisible: boolean;
    uneditable: boolean;
    paddingLeft: number;
    constructor(x: number, y: number, width: number, height: number, maxLength: number);
    setColors(background: string, border: string, text: string): void;
    setPlaceholder(text: string): void;
    getPlaceholder(): string;
    setPlaceholderColor(color: string): void;
    setFontSize(fontSize: number): void;
    setInvisible(invisible: boolean): void;
    isInvisible(): boolean;
    setUneditable(uneditable: boolean): void;
    isUneditable(): boolean;
    update(commands: Commands, deltaTime: number): void;
    draw(ctx: otherCtx): void;
    getText(): string;
    setValue(value: string): void;
    activate(): void;
    deactivate(): void;
    private pointInRect;
}
export declare class Vertex {
    dstX: number;
    dstY: number;
    srcX: number;
    srcY: number;
    colorR: number;
    colorG: number;
    colorB: number;
    colorA: number;
    constructor(dstX: number, dstY: number, srcX: number, srcY: number, colorR: number, colorG: number, colorB: number, colorA: number);
}
export declare class Commands {
    scenes: Scene[];
    currentSceneIndex: number;
    keys: {
        [key: string]: boolean;
    };
    mouseX: number;
    mouseY: number;
    mouseDown: boolean;
    mouseReleased: boolean;
    constructor(scenes: Scene[], initialSceneIndex?: number);
    bindMouseEvents(canvas: HTMLCanvasElement): void;
    switchScene(index: number): void;
    getCurrentSceneIndex(): number;
}
export declare function ctxengnloop(scenes: Scene[], commands: Commands, ctx: CanvasRenderingContext2D, lastTime: number, other: otherCtx): void;
export declare function contextEngine(scenes: Scene[], initialSceneIndex?: number, canvasWidth?: number, canvasHeight?: number): void;
