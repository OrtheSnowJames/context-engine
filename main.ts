export class otherCtx {
    private ctx: CanvasRenderingContext2D;
    private cameraX: number = 0;
    private cameraY: number = 0;
    private targetCameraX: number = 0;
    private targetCameraY: number = 0;
    private zoom: number = 1;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    setCamera(x: number, y: number) {
        this.targetCameraX = x;
        this.targetCameraY = y;
    }

    updateCamera(deltaTime: number) {
        const lerpFactor = 5; // Adjust for smoother or faster panning
        this.cameraX += (this.targetCameraX - this.cameraX) * lerpFactor * deltaTime;
        this.cameraY += (this.targetCameraY - this.cameraY) * lerpFactor * deltaTime;
    }

    setZoom(zoom: number) {
        this.zoom = zoom;
    }

    drawRect(x: number, y: number, width: number, height: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            (x - this.cameraX) * this.zoom,
            (y - this.cameraY) * this.zoom,
            width * this.zoom,
            height * this.zoom
        );
    }

    drawCircle(x: number, y: number, radius: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(
            (x - this.cameraX) * this.zoom,
            (y - this.cameraY) * this.zoom,
            radius * this.zoom,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
    }

    drawText(x: number, y: number, text: string, color: string, fontSize: number) {
        this.ctx.fillStyle = color;
        this.ctx.font = `${fontSize * this.zoom}px Arial`;
        this.ctx.fillText(
            text,
            (x - this.cameraX) * this.zoom,
            (y - this.cameraY) * this.zoom
        );
    }

    drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
        this.ctx.drawImage(
            image,
            (x - this.cameraX) * this.zoom,
            (y - this.cameraY) * this.zoom,
            width * this.zoom,
            height * this.zoom
        );
    }

    rawCtx() {
        return this.ctx;
    }

    setCtx(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    clearBackground(color: string) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    drawLine(x1: number, y1: number, x2: number, y2: number, color: string) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(
            (x1 - this.cameraX) * this.zoom,
            (y1 - this.cameraY) * this.zoom
        );
        this.ctx.lineTo(
            (x2 - this.cameraX) * this.zoom,
            (y2 - this.cameraY) * this.zoom
        );
        this.ctx.stroke();
    }

    drawPolygon(points: Array<{ x: number, y: number }>, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(
            (points[0].x - this.cameraX) * this.zoom,
            (points[0].y - this.cameraY) * this.zoom
        );
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(
                (points[i].x - this.cameraX) * this.zoom,
                (points[i].y - this.cameraY) * this.zoom
            );
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawImageScaled(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
        this.ctx.drawImage(
            image,
            (x - this.cameraX) * this.zoom,
            (y - this.cameraY) * this.zoom,
            width * this.zoom,
            height * this.zoom
        );
    }

    drawTriangles(vertices: Vertex[], indices: number[], color: string) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();

        for (let i = 0; i < indices.length; i += 3) {
            const v1 = vertices[indices[i]];
            const v2 = vertices[indices[i + 1]];
            const v3 = vertices[indices[i + 2]];

            this.ctx.moveTo(
                (v1.dstX - this.cameraX) * this.zoom,
                (v1.dstY - this.cameraY) * this.zoom
            );
            this.ctx.lineTo(
                (v2.dstX - this.cameraX) * this.zoom,
                (v2.dstY - this.cameraY) * this.zoom
            );
            this.ctx.lineTo(
                (v3.dstX - this.cameraX) * this.zoom,
                (v3.dstY - this.cameraY) * this.zoom
            );
        }

        this.ctx.closePath();
        this.ctx.fill();
    }

    drawImageRotated(image: HTMLImageElement, x: number, y: number, width: number, height: number, angle: number) {
        this.ctx.save();
        this.ctx.translate(
            (x - this.cameraX) * this.zoom + (width * this.zoom) / 2,
            (y - this.cameraY) * this.zoom + (height * this.zoom) / 2
        );
        this.ctx.rotate(angle);
        this.ctx.drawImage(
            image,
            -(width * this.zoom) / 2,
            -(height * this.zoom) / 2,
            width * this.zoom,
            height * this.zoom
        );
        this.ctx.restore();
    }

    drawImageWithAlpha(image: HTMLImageElement, x: number, y: number, width: number, height: number, alpha: number) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.drawImage(
            image,
            (x - this.cameraX) * this.zoom,
            (y - this.cameraY) * this.zoom,
            width * this.zoom,
            height * this.zoom
        );
        this.ctx.restore();
    }

    drawImageWithScale(image: HTMLImageElement, x: number, y: number, scaleX: number, scaleY: number) {
        this.ctx.drawImage(
            image,
            (x - this.cameraX) * this.zoom,
            (y - this.cameraY) * this.zoom,
            image.width * scaleX * this.zoom,
            image.height * scaleY * this.zoom
        );
    }

    drawImageWithRotation(image: HTMLImageElement, x: number, y: number, width: number, height: number, angle: number) {
        this.ctx.save();
        this.ctx.translate(
            (x - this.cameraX) * this.zoom + (width * this.zoom) / 2,
            (y - this.cameraY) * this.zoom + (height * this.zoom) / 2
        );
        this.ctx.rotate(angle);
        this.ctx.drawImage(
            image,
            -(width * this.zoom) / 2,
            -(height * this.zoom) / 2,
            width * this.zoom,
            height * this.zoom
        );
        this.ctx.restore();
    }
}

class Scene {
    update(deltaTime: number, commands: Commands) {
        // Override this method in scenes
    }

    draw(ctx: otherCtx) {
        // Override this method in scenes
    }
}

export class Vertex {
    dstX: number;
    dstY: number;
    srcX: number;
    srcY: number;
    colorR: number;
    colorG: number;
    colorB: number;
    colorA: number;

    constructor(
        dstX: number,
        dstY: number,
        srcX: number,
        srcY: number,
        colorR: number,
        colorG: number,
        colorB: number,
        colorA: number
    ) {
        this.dstX = dstX;
        this.dstY = dstY;
        this.srcX = srcX;
        this.srcY = srcY;
        this.colorR = colorR;
        this.colorG = colorG;
        this.colorB = colorB;
        this.colorA = colorA;
    }
}


export class Commands {
    private scenes: Scene[];
    private currentSceneIndex: number;
    public keys: { [key: string]: boolean } = {}; // Track pressed keys

    constructor(scenes: Scene[], initialSceneIndex: number = 0) {
        this.scenes = scenes;
        this.currentSceneIndex = initialSceneIndex;

        // Add event listeners for key tracking
        document.addEventListener('keydown', (event) => {
            if (!this.keys[event.key]) { // Trigger only if not already pressed
                this.keys[event.key] = true;
            }
        });

        document.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });
    }

    switchScene(index: number) {
        if (index >= 0 && index < this.scenes.length) {
            this.currentSceneIndex = index;
        } else {
            console.error(`Invalid scene index: ${index}`);
        }
    }

    getCurrentSceneIndex() {
        return this.currentSceneIndex;
    }
}

export function ctxengnloop(scenes: Scene[], commands: Commands, ctx: CanvasRenderingContext2D, lastTime: number, other: otherCtx) {
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastTime) / 1000;

    other.updateCamera(deltaTime); // Smoothly update the camera position

    const currentScene = scenes[commands.getCurrentSceneIndex()];
    currentScene.update(deltaTime, commands); // Pass the Commands instance
    currentScene.draw(other); // Pass the otherCtx instance

    requestAnimationFrame(() => ctxengnloop(scenes, commands, ctx, currentTime, other));
}

export function contextEngine(scenes: Scene[], initialSceneIndex: number = 0) {
    const canvas = document.createElement('canvas');
    canvas.width = 800; // Default width, can be adjusted
    canvas.height = 600; // Default height, can be adjusted

    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Failed to get canvas context');
    }

    const other = new otherCtx(ctx);
    const commands = new Commands(scenes, initialSceneIndex);

    const startTime = performance.now();
    ctxengnloop(scenes, commands, ctx, startTime, other);
}