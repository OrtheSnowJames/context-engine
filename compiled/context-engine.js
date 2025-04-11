class otherCtx {
    constructor(ctx) {
        this.cameraX = 0;
        this.cameraY = 0;
        this.targetCameraX = 0;
        this.targetCameraY = 0;
        this.zoom = 1;
        this.ctx = ctx;
    }
    setCamera(x, y) {
        this.targetCameraX = x;
        this.targetCameraY = y;
    }
    updateCamera(deltaTime) {
        const lerpFactor = 5; // Adjust for smoother or faster panning
        this.cameraX += (this.targetCameraX - this.cameraX) * lerpFactor * deltaTime;
        this.cameraY += (this.targetCameraY - this.cameraY) * lerpFactor * deltaTime;
    }
    setZoom(zoom) {
        this.zoom = zoom;
    }
    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect((x - this.cameraX) * this.zoom, (y - this.cameraY) * this.zoom, width * this.zoom, height * this.zoom);
    }
    drawCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc((x - this.cameraX) * this.zoom, (y - this.cameraY) * this.zoom, radius * this.zoom, 0, Math.PI * 2);
        this.ctx.fill();
    }
    drawText(x, y, text, color, fontSize) {
        this.ctx.fillStyle = color;
        this.ctx.font = `${fontSize * this.zoom}px Arial`;
        this.ctx.fillText(text, (x - this.cameraX) * this.zoom, (y - this.cameraY) * this.zoom);
    }
    drawImage(image, x, y, width, height) {
        this.ctx.drawImage(image, (x - this.cameraX) * this.zoom, (y - this.cameraY) * this.zoom, width * this.zoom, height * this.zoom);
    }
    rawCtx() {
        return this.ctx;
    }
    setCtx(ctx) {
        this.ctx = ctx;
    }
    clearBackground(color) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    drawLine(x1, y1, x2, y2, color) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo((x1 - this.cameraX) * this.zoom, (y1 - this.cameraY) * this.zoom);
        this.ctx.lineTo((x2 - this.cameraX) * this.zoom, (y2 - this.cameraY) * this.zoom);
        this.ctx.stroke();
    }
    drawPolygon(points, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo((points[0].x - this.cameraX) * this.zoom, (points[0].y - this.cameraY) * this.zoom);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo((points[i].x - this.cameraX) * this.zoom, (points[i].y - this.cameraY) * this.zoom);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
    drawImageScaled(image, x, y, width, height) {
        this.ctx.drawImage(image, (x - this.cameraX) * this.zoom, (y - this.cameraY) * this.zoom, width * this.zoom, height * this.zoom);
    }
    drawImageRotated(image, x, y, width, height, angle) {
        this.ctx.save();
        this.ctx.translate((x - this.cameraX) * this.zoom + (width * this.zoom) / 2, (y - this.cameraY) * this.zoom + (height * this.zoom) / 2);
        this.ctx.rotate(angle);
        this.ctx.drawImage(image, -(width * this.zoom) / 2, -(height * this.zoom) / 2, width * this.zoom, height * this.zoom);
        this.ctx.restore();
    }
    drawImageWithAlpha(image, x, y, width, height, alpha) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.drawImage(image, (x - this.cameraX) * this.zoom, (y - this.cameraY) * this.zoom, width * this.zoom, height * this.zoom);
        this.ctx.restore();
    }
    drawImageWithScale(image, x, y, scaleX, scaleY) {
        this.ctx.drawImage(image, (x - this.cameraX) * this.zoom, (y - this.cameraY) * this.zoom, image.width * scaleX * this.zoom, image.height * scaleY * this.zoom);
    }
    drawImageWithRotation(image, x, y, width, height, angle) {
        this.ctx.save();
        this.ctx.translate((x - this.cameraX) * this.zoom + (width * this.zoom) / 2, (y - this.cameraY) * this.zoom + (height * this.zoom) / 2);
        this.ctx.rotate(angle);
        this.ctx.drawImage(image, -(width * this.zoom) / 2, -(height * this.zoom) / 2, width * this.zoom, height * this.zoom);
        this.ctx.restore();
    }
}

class Scene {
    constructor() {}
    update(deltaTime, commands) {
        // Override this method in scenes
    }
    draw(ctx) {
        // Override this method in scenes
    }
}

class Commands {
    constructor(scenes, initialSceneIndex = 0) {
        this.keys = {}; // Track pressed keys
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
    switchScene(index) {
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

function ctxengnloop(scenes, commands, ctx, lastTime, other) {
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastTime) / 1000;
    other.updateCamera(deltaTime); // Smoothly update the camera position
    const currentScene = scenes[commands.getCurrentSceneIndex()];
    currentScene.update(deltaTime, commands); // Pass the Commands instance
    currentScene.draw(other); // Pass the otherCtx instance
    requestAnimationFrame(() => ctxengnloop(scenes, commands, ctx, currentTime, other));
}

function contextEngine(scenes, initialSceneIndex = 0) {
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
