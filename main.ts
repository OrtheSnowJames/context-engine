export class otherCtx {
    ctx: CanvasRenderingContext2D;
    cameraX: number = 0;
    cameraY: number = 0;
    targetCameraX: number = 0;
    targetCameraY: number = 0;
    zoom: number = 1;

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

    drawRect(x: number, y: number, width: number, height: number, color: string, cameraPos: boolean = true, cameraZoom: boolean = true) {
        this.ctx.fillStyle = color;
        const posX = cameraPos ? (x - this.cameraX) * (cameraZoom ? this.zoom : 1) : x;
        const posY = cameraPos ? (y - this.cameraY) * (cameraZoom ? this.zoom : 1) : y;
        const zoom = cameraZoom ? this.zoom : 1;
        this.ctx.fillRect(posX, posY, width * zoom, height * zoom);
    }

    drawCircle(x: number, y: number, radius: number, color: string, cameraPos: boolean = true, cameraZoom: boolean = true) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        const posX = cameraPos ? (x - this.cameraX) * (cameraZoom ? this.zoom : 1) : x;
        const posY = cameraPos ? (y - this.cameraY) * (cameraZoom ? this.zoom : 1) : y;
        const zoom = cameraZoom ? this.zoom : 1;
        this.ctx.arc(posX, posY, radius * zoom, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawText(x: number, y: number, text: string, color: string, fontSize: number, cameraPos: boolean = true, cameraZoom: boolean = true) {
        this.ctx.fillStyle = color;
        const zoom = cameraZoom ? this.zoom : 1;
        const posX = cameraPos ? (x - this.cameraX) * zoom : x;
        const posY = cameraPos ? (y - this.cameraY) * zoom : y;
        this.ctx.font = `${fontSize * zoom}px Arial`;
        this.ctx.fillText(text, posX, posY);
    }

    drawTextRotated(x: number, y: number, text: string, color: string, fontSize: number, angle: number, cameraPos: boolean = true, cameraZoom: boolean = true) {
        this.ctx.fillStyle = color;
        const zoom = cameraZoom ? this.zoom : 1;
        const posX = cameraPos ? (x - this.cameraX) * zoom : x;
        const posY = cameraPos ? (y - this.cameraY) * zoom : y;
        this.ctx.font = `${fontSize * zoom}px Arial`;
        this.ctx.save();
        this.ctx.translate(posX, posY);
        this.ctx.rotate(angle);
        this.ctx.fillText(text, 0, 0);
        this.ctx.restore();
    }

    drawTextWithBackground(x: number, y: number, text: string, color: string, bgcolor: string, fontSize: number, cameraPos: boolean = true, cameraZoom: boolean = true, padding: number = 5) {
        this.drawRect(x, y, this.ctx.measureText(text).width + padding * 2, fontSize + padding * 2, bgcolor, cameraPos, cameraZoom);
        this.drawText(x + padding, y + padding, text, color, fontSize, cameraPos, cameraZoom);
    }

    drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number, cameraPos: boolean = true, cameraZoom: boolean = true) {
        const posX = cameraPos ? (x - this.cameraX) * (cameraZoom ? this.zoom : 1) : x;
        const posY = cameraPos ? (y - this.cameraY) * (cameraZoom ? this.zoom : 1) : y;
        const zoom = cameraZoom ? this.zoom : 1;
        this.ctx.drawImage(image, posX, posY, width * zoom, height * zoom);
    }

    rawCtx(): CanvasRenderingContext2D {
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

    drawLine(x1: number, y1: number, x2: number, y2: number, color: string, cameraPos: boolean = true, cameraZoom: boolean = true) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        const startX = cameraPos ? (x1 - this.cameraX) * (cameraZoom ? this.zoom : 1) : x1;
        const startY = cameraPos ? (y1 - this.cameraY) * (cameraZoom ? this.zoom : 1) : y1;
        const endX = cameraPos ? (x2 - this.cameraX) * (cameraZoom ? this.zoom : 1) : x2;
        const endY = cameraPos ? (y2 - this.cameraY) * (cameraZoom ? this.zoom : 1) : y2;
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
    }

    drawPolygon(points: Array<{ x: number, y: number }>, color: string, cameraPos: boolean = true, cameraZoom: boolean = true) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        const zoom = cameraZoom ? this.zoom : 1;
        const startX = cameraPos ? (points[0].x - this.cameraX) * zoom : points[0].x;
        const startY = cameraPos ? (points[0].y - this.cameraY) * zoom : points[0].y;
        this.ctx.moveTo(startX, startY);
        for (let i = 1; i < points.length; i++) {
            const posX = cameraPos ? (points[i].x - this.cameraX) * zoom : points[i].x;
            const posY = cameraPos ? (points[i].y - this.cameraY) * zoom : points[i].y;
            this.ctx.lineTo(posX, posY);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawImageScaled(image: HTMLImageElement, x: number, y: number, width: number, height: number, cameraPos: boolean = true, cameraZoom: boolean = true) {
        const posX = cameraPos ? (x - this.cameraX) * (cameraZoom ? this.zoom : 1) : x;
        const posY = cameraPos ? (y - this.cameraY) * (cameraZoom ? this.zoom : 1) : y;
        const zoom = cameraZoom ? this.zoom : 1;
        this.ctx.drawImage(image, posX, posY, width * zoom, height * zoom);
    }

    drawTriangles(vertices: Vertex[], indices: number[], color: string, cameraPos: boolean = true, cameraZoom: boolean = true) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        const zoom = cameraZoom ? this.zoom : 1;
        for (let i = 0; i < indices.length; i += 3) {
            const v1 = vertices[indices[i]];
            const v2 = vertices[indices[i + 1]];
            const v3 = vertices[indices[i + 2]];
            const x1 = cameraPos ? (v1.dstX - this.cameraX) * zoom : v1.dstX;
            const y1 = cameraPos ? (v1.dstY - this.cameraY) * zoom : v1.dstY;
            const x2 = cameraPos ? (v2.dstX - this.cameraX) * zoom : v2.dstX;
            const y2 = cameraPos ? (v2.dstY - this.cameraY) * zoom : v2.dstY;
            const x3 = cameraPos ? (v3.dstX - this.cameraX) * zoom : v3.dstX;
            const y3 = cameraPos ? (v3.dstY - this.cameraY) * zoom : v3.dstY;
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.lineTo(x3, y3);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawImageRotated(image: HTMLImageElement, x: number, y: number, width: number, height: number, angle: number, cameraPos: boolean = true, cameraZoom: boolean = true) {
        this.ctx.save();
        const zoom = cameraZoom ? this.zoom : 1;
        const posX = cameraPos ? (x - this.cameraX) * zoom : x;
        const posY = cameraPos ? (y - this.cameraY) * zoom : y;
        this.ctx.translate(posX + (width * zoom) / 2, posY + (height * zoom) / 2);
        this.ctx.rotate(angle);
        this.ctx.drawImage(image, -(width * zoom) / 2, -(height * zoom) / 2, width * zoom, height * zoom);
        this.ctx.restore();
    }

    drawImageWithAlpha(image: HTMLImageElement, x: number, y: number, width: number, height: number, alpha: number, cameraPos: boolean = true, cameraZoom: boolean = true) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        const posX = cameraPos ? (x - this.cameraX) * (cameraZoom ? this.zoom : 1) : x;
        const posY = cameraPos ? (y - this.cameraY) * (cameraZoom ? this.zoom : 1) : y;
        const zoom = cameraZoom ? this.zoom : 1;
        this.ctx.drawImage(image, posX, posY, width * zoom, height * zoom);
        this.ctx.restore();
    }

    drawImageWithScale(image: HTMLImageElement, x: number, y: number, scaleX: number, scaleY: number, cameraPos: boolean = true, cameraZoom: boolean = true) {
        const zoom = cameraZoom ? this.zoom : 1;
        const posX = cameraPos ? (x - this.cameraX) * zoom : x;
        const posY = cameraPos ? (y - this.cameraY) * zoom : y;
        this.ctx.drawImage(image, posX, posY, image.width * scaleX * zoom, image.height * scaleY * zoom);
    }

    drawImageWithRotation(image: HTMLImageElement, x: number, y: number, width: number, height: number, angle: number, cameraPos: boolean = true, cameraZoom: boolean = true) {
        this.ctx.save();
        const zoom = cameraZoom ? this.zoom : 1;
        const posX = cameraPos ? (x - this.cameraX) * zoom : x;
        const posY = cameraPos ? (y - this.cameraY) * zoom : y;
        this.ctx.translate(posX + (width * zoom) / 2, posY + (height * zoom) / 2);
        this.ctx.rotate(angle);
        this.ctx.drawImage(image, -(width * zoom) / 2, -(height * zoom) / 2, width * zoom, height * zoom);
        this.ctx.restore();
    }

    drawTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: string, cameraPos: boolean = true, cameraZoom: boolean = true) {
        const points = [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
            { x: x3, y: y3 }
        ];
        this.drawPolygon(points, color, cameraPos, cameraZoom);
    }

    setTextAlign(align: CanvasTextAlign = "left" as CanvasTextAlign) {
        this.ctx.textAlign = align;
    }
}

otherCtx.prototype.setTextAlign = function(align: string = "left") {
    this.ctx.textAlign = align as CanvasTextAlign;
};

export class Scene {
    async onLoad(commands: Commands) {
        // Override this method in scenes to handle asynchronous initialization when the scene starts
    }

    async onExit(commands: Commands) {
        // Override this method in scenes to handle asynchronous cleanup when the scene is exited
    }

    update(deltaTime: number, commands: Commands) {
        // Override this method in scenes
    }

    draw(ctx: otherCtx) {
        // Override this method in scenes
    }
}

export class OCtxButton {
    bounds: { x: number, y: number, width: number, height: number };
    label: string;
    backgroundColor: string = '#D3D3D3';  // LightGray
    hoverColor: string = '#C8C8C8';      // RGB(200,200,200)
    pressedColor: string = '#A9A9A9';    // DarkGray
    borderColor: string = '#000000';      // Black
    textColor: string = '#000000';        // Black
    fontSize: number = 20;
    isHovered: boolean = false;
    isPressed: boolean = false;
    private animationProgress: number = 0.0;
    padding: number = 5.0;
    cornerRadius: number = 5.0;
    enabled: boolean = true;
    invisible: boolean = false;
    uneditable: boolean = false;
    useRoundedCorners: boolean = true;
    private wasClicked: boolean = false; // Track if click was already processed

    constructor(x: number, y: number, width: number, height: number, label: string) {
        this.bounds = { x, y, width, height };
        this.label = label;
    }

    setColors(background: string, hover: string, pressed: string, border: string, text: string) {
        this.backgroundColor = background;
        this.hoverColor = hover;
        this.pressedColor = pressed;
        this.borderColor = border;
        this.textColor = text;
    }

    deactivate() {
        this.enabled = false;
        this.invisible = true;
    }

    activate() {
        this.enabled = true;
        this.invisible = false;
    }

    update(commands: Commands) {
        if (this.uneditable) return;
        if (!this.enabled) {
            this.isHovered = false;
            this.isPressed = false;
            return;
        }

        const mouseX = commands.mouseX;
        const mouseY = commands.mouseY;
        this.isHovered = this.pointInRect(mouseX, mouseY);
        this.isPressed = this.isHovered && commands.mouseDown;

        // Reset wasClicked flag when mouse is pressed down
        if (commands.mouseDown) {
            this.wasClicked = false;
        }

        let targetProgress = 0.0;
        if (this.isPressed) targetProgress = 1.0;
        else if (this.isHovered) targetProgress = 0.5;

        const animationSpeed = 8.0;
        const frameTime = 1 / 60; // Approximate frame time
        if (this.animationProgress < targetProgress) {
            this.animationProgress += frameTime * animationSpeed;
            if (this.animationProgress > targetProgress) this.animationProgress = targetProgress;
        } else if (this.animationProgress > targetProgress) {
            this.animationProgress -= frameTime * animationSpeed;
            if (this.animationProgress < targetProgress) this.animationProgress = targetProgress;
        }
    }

    draw(ctx: otherCtx, cameraPos: boolean = true, cameraZoom: boolean = true) {
        if (this.invisible) return;

        let currentColor = this.backgroundColor;
        if (!this.enabled) {
            currentColor = this.adjustAlpha(this.backgroundColor, 0.5);
        } else {
            if (this.animationProgress <= 0.5) {
                const t = this.animationProgress * 2.0;
                currentColor = this.lerpColor(this.backgroundColor, this.hoverColor, t);
            } else {
                const t = (this.animationProgress - 0.5) * 2.0;
                currentColor = this.lerpColor(this.hoverColor, this.pressedColor, t);
            }
        }

        const borderThickness = this.isPressed ? 3 : 2;
        const offsetX = this.isPressed ? 1 : 0;
        const offsetY = this.isPressed ? 1 : 0;

        if (this.useRoundedCorners) {
            ctx.drawPolygon(this.getRoundedRectPoints(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, this.cornerRadius), currentColor, cameraPos, cameraZoom);
            this.drawRoundedRectBorder(ctx, this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, this.cornerRadius, this.borderColor, borderThickness, cameraPos, cameraZoom);
        } else {
            ctx.drawRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, currentColor, cameraPos, cameraZoom);
            this.drawRectBorder(ctx, this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, this.borderColor, borderThickness, cameraPos, cameraZoom);
        }

        const textColor = this.enabled ? this.textColor : this.adjustAlpha(this.textColor, 0.5);
        ctx.setTextAlign("center");
        ctx.drawText(
            this.bounds.x + this.bounds.width / 2,
            this.bounds.y + this.bounds.height / 2 + this.fontSize / 3,
            this.label,
            textColor,
            this.fontSize,
            cameraPos,
            cameraZoom
        );
        ctx.setTextAlign("left");
    }

    isClicked(commands: Commands): boolean {
        // Only return true if enabled, hovered, released, and not already processed
        if (this.enabled && this.isHovered && commands.mouseReleased && !this.wasClicked) {
            this.wasClicked = true; // Mark as processed
            return true;
        }
        return false;
    }

    private pointInRect(x: number, y: number): boolean {
        return x >= this.bounds.x && x <= this.bounds.x + this.bounds.width &&
            y >= this.bounds.y && y <= this.bounds.y + this.bounds.height;
    }

    private drawRoundedRect(ctx: otherCtx, x: number, y: number, w: number, h: number, r: number, color: string, cameraPos: boolean = true, cameraZoom: boolean = true) {
        const zoom = cameraZoom ? ctx.zoom : 1;
        const points = this.getRoundedRectPoints(
            cameraPos ? (x - ctx.cameraX) * zoom : x,
            cameraPos ? (y - ctx.cameraY) * zoom : y,
            w * zoom,
            h * zoom,
            r * zoom
        );
        ctx.drawPolygon(points, color, cameraPos, cameraZoom);
    }

    private drawRoundedRectBorder(ctx: otherCtx, x: number, y: number, w: number, h: number, r: number, color: string, thickness: number, cameraPos: boolean = true, cameraZoom: boolean = true) {
        const zoom = cameraZoom ? ctx.zoom : 1;
        const points = this.getRoundedRectPoints(
            cameraPos ? (x - ctx.cameraX) * zoom : x,
            cameraPos ? (y - ctx.cameraY) * zoom : y,
            w * zoom,
            h * zoom,
            r * zoom
        );
        for (let i = 0; i < points.length; i++) {
            const p1 = points[i];
            const p2 = points[(i + 1) % points.length];
            ctx.drawLine(p1.x, p1.y, p2.x, p2.y, color, cameraPos, cameraZoom);
        }
    }

    private drawRectBorder(ctx: otherCtx, x: number, y: number, w: number, h: number, color: string, thickness: number, cameraPos: boolean = true, cameraZoom: boolean = true) {
        const zoom = cameraZoom ? ctx.zoom : 1;
        const posX = cameraPos ? (x - ctx.cameraX) * zoom : x;
        const posY = cameraPos ? (y - ctx.cameraY) * zoom : y;
        for (let i = 0; i < thickness; i++) {
            ctx.drawLine(posX + i, posY + i, posX + w - i, posY + i, color, cameraPos, cameraZoom);
            ctx.drawLine(posX + w - i, posY + i, posX + w - i, posY + h - i, color, cameraPos, cameraZoom);
            ctx.drawLine(posX + w - i, posY + h - i, posX + i, posY + h - i, color, cameraPos, cameraZoom);
            ctx.drawLine(posX + i, posY + h - i, posX + i, posY + i, color, cameraPos, cameraZoom);
        }
    }

    private getRoundedRectPoints(x: number, y: number, w: number, h: number, r: number): Array<{x: number, y: number}> {
        const points: Array<{x: number, y: number}> = [];
        const steps = 8;
        
        // Top-left corner
        for (let i = 0; i <= steps; i++) {
            const angle = Math.PI * 1.5 + (Math.PI / 2) * (i / steps);
            points.push({
                x: x + r + r * Math.cos(angle),
                y: y + r + r * Math.sin(angle)
            });
        }
        
        // Add remaining corners
        points.push({x: x + w - r, y: y});
        points.push({x: x + w, y: y + r});
        points.push({x: x + w, y: y + h - r});
        points.push({x: x + w - r, y: y + h});
        points.push({x: x + r, y: y + h});
        points.push({x: x, y: y + h - r});
        points.push({x: x, y: y + r});
        
        return points;
    }

    private lerpColor(color1: string, color2: string, t: number): string {
        const c1 = this.hexToRgb(color1);
        const c2 = this.hexToRgb(color2);
        
        return `rgb(${
            Math.round(c1.r + (c2.r - c1.r) * t)},${
            Math.round(c1.g + (c2.g - c1.g) * t)},${
            Math.round(c1.b + (c2.b - c1.b) * t)})`;
    }

    private hexToRgb(hex: string): {r: number, g: number, b: number} {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : {r: 0, g: 0, b: 0};
    }

    private adjustAlpha(color: string, alpha: number): string {
        const rgb = this.hexToRgb(color);
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
    }
}

export class OCtxTextField {
    bounds: { x: number, y: number, width: number, height: number };
    text: string = "";
    maxLength: number;
    backgroundColor: string = "#FFFFFF";  // White
    borderColor: string = "#000000";      // Black
    textColor: string = "#000000";        // Black
    placeholderColor: string = "#808080"; // Gray
    placeholder: string = "";
    fontSize: number = 20;
    isActive: boolean = false;
    cursorPosition: number = 0;
    private cursorBlinkTimer: number = 0;
    private backspaceHoldTimer: number = 0;
    invisible: boolean = false;
    uneditable: boolean = false;
    paddingLeft: number = 5;

    constructor(x: number, y: number, width: number, height: number, maxLength: number) {
        this.bounds = { x, y, width, height };
        this.maxLength = maxLength;
    }

    setColors(background: string, border: string, text: string) {
        this.backgroundColor = background;
        this.borderColor = border;
        this.textColor = text;
    }

    setPlaceholder(text: string) {
        this.placeholder = text;
    }

    getPlaceholder(): string {
        return this.placeholder;
    }

    setPlaceholderColor(color: string) {
        this.placeholderColor = color;
    }

    setFontSize(fontSize: number) {
        this.fontSize = fontSize;
    }

    setInvisible(invisible: boolean) {
        this.invisible = invisible;
    }

    isInvisible(): boolean {
        return this.invisible;
    }

    setUneditable(uneditable: boolean) {
        this.uneditable = uneditable;
    }

    isUneditable(): boolean {
        return this.uneditable;
    }

    async handlePaste() {
        try {
            // Get text from clipboard
            const clipboardText = await navigator.clipboard.readText();
            
            if (clipboardText && this.text.length + clipboardText.length <= this.maxLength) {
                // Insert clipboard text at cursor position
                this.text = this.text.slice(0, this.cursorPosition) + 
                            clipboardText + 
                            this.text.slice(this.cursorPosition);
                            
                // Update cursor position
                this.cursorPosition += clipboardText.length;
            } else if (clipboardText) {
                // If text would exceed max length, insert as much as possible.
                const availableSpace = this.maxLength - this.text.length;
                if (availableSpace > 0) {
                    const truncatedPaste = clipboardText.substring(0, availableSpace);
                    this.text = this.text.slice(0, this.cursorPosition) + 
                                truncatedPaste + 
                                this.text.slice(this.cursorPosition);
                    this.cursorPosition += truncatedPaste.length;
                }
            }
        } catch (error) {
            console.error("Failed to read clipboard contents:", error);
        }
    }

    update(commands: Commands, deltaTime: number) {
        if (this.uneditable) return;

        this.cursorBlinkTimer += deltaTime;
        if (this.cursorBlinkTimer >= 1.0) {
            this.cursorBlinkTimer = 0.0;
        }

        if (commands.mouseReleased) {
            this.isActive = this.pointInRect(commands.mouseX, commands.mouseY);
        }

        if (this.isActive) {
            // Handle Ctrl+V for paste
            if (commands.keys['v'] && (commands.keys['Control'] || commands.keys['Meta'])) {
                (async () => {this.handlePaste();})();
                commands.keys['v'] = false; // Consume the key
            }

            // Handle character input
            for (const key in commands.keys) {
                if (commands.keys[key] && key.length === 1) {
                    if (this.text.length < this.maxLength) {
                        this.text = this.text.slice(0, this.cursorPosition) + key + this.text.slice(this.cursorPosition);
                        this.cursorPosition++;
                    }
                    commands.keys[key] = false; // Consume the key
                }
            }

            // Handle special keys
            if (commands.keys["Backspace"]) {
                this.backspaceHoldTimer += deltaTime;
                const firstPress = this.backspaceHoldTimer === deltaTime;
                const repeating = this.backspaceHoldTimer > 0.5 &&            // start repeat
                                 (this.backspaceHoldTimer % 0.05) < deltaTime; // 20 Hz
                if ((firstPress || repeating) && this.cursorPosition > 0) {
                    this.text = this.text.slice(0, this.cursorPosition - 1) + this.text.slice(this.cursorPosition);
                    this.cursorPosition--;
                }
            } else {
                this.backspaceHoldTimer = 0;
            }

            if (commands.keys["ArrowLeft"]) {
                if (this.cursorPosition > 0) {
                    this.cursorPosition--;
                }
                commands.keys["ArrowLeft"] = false;
            }

            if (commands.keys["ArrowRight"]) {
                if (this.cursorPosition < this.text.length) {
                    this.cursorPosition++;
                }
                commands.keys["ArrowRight"] = false;
            }

            if (commands.keys["Home"]) {
                this.cursorPosition = 0;
                commands.keys["Home"] = false;
            }

            if (commands.keys["End"]) {
                this.cursorPosition = this.text.length;
                commands.keys["End"] = false;
            }
        }
    }

    draw(ctx: otherCtx, cameraPos: boolean = true, cameraZoom: boolean = true) {
        if (this.invisible) return;

        // Draw background
        ctx.drawRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, this.backgroundColor, cameraPos, cameraZoom);

        // Draw border
        const borderColor = this.isActive ? "#FF0000" : this.borderColor;
        const thickness = 2;
        for (let i = 0; i < thickness; i++) {
            ctx.drawLine(this.bounds.x + i, this.bounds.y + i, this.bounds.x + this.bounds.width - i, this.bounds.y + i, borderColor, cameraPos, cameraZoom);
            ctx.drawLine(this.bounds.x + this.bounds.width - i, this.bounds.y + i, this.bounds.x + this.bounds.width - i, this.bounds.y + this.bounds.height - i, borderColor, cameraPos, cameraZoom);
            ctx.drawLine(this.bounds.x + this.bounds.width - i, this.bounds.y + this.bounds.height - i, this.bounds.x + i, this.bounds.y + this.bounds.height - i, borderColor, cameraPos, cameraZoom);
            ctx.drawLine(this.bounds.x + i, this.bounds.y + this.bounds.height - i, this.bounds.x + i, this.bounds.y + i, borderColor, cameraPos, cameraZoom);
        }

        // Draw text or placeholder with corrected vertical position
        const textY = this.bounds.y + (this.bounds.height + this.fontSize) / 2;
        if (this.text.length > 0) {
            ctx.drawText(this.bounds.x + this.paddingLeft, textY, this.text, this.textColor, this.fontSize, cameraPos, cameraZoom);
        } else if (this.placeholder) {
            ctx.drawText(this.bounds.x + this.paddingLeft, textY, this.placeholder, this.placeholderColor, this.fontSize, cameraPos, cameraZoom);
        }

        // Draw cursor with matching alignment
        if (this.isActive && this.cursorBlinkTimer < 0.5) {
            const textWidth = ctx.rawCtx().measureText(this.text.slice(0, this.cursorPosition)).width;
            ctx.drawLine(
                this.bounds.x + this.paddingLeft + textWidth,
                this.bounds.y + (this.bounds.height - this.fontSize) / 2,
                this.bounds.x + this.paddingLeft + textWidth,
                this.bounds.y + (this.bounds.height + this.fontSize) / 2,
                this.textColor,
                cameraPos,
                cameraZoom
            );
        }
    }

    getText(): string {
        return this.text;
    }

    setValue(value: string) {
        this.text = value.slice(0, Math.min(value.length, this.maxLength));
        this.cursorPosition = this.text.length;
    }

    activate() {
        this.isActive = true;
        this.cursorPosition = this.text.length;
    }

    deactivate() {
        this.isActive = false;
        this.cursorPosition = 0;
    }

    private pointInRect(x: number, y: number): boolean {
        return x >= this.bounds.x && x <= this.bounds.x + this.bounds.width &&
            y >= this.bounds.y && y <= this.bounds.y + this.bounds.height;
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
    scenes: Scene[];
    globals: { [key: string]: any } = {}; // global variables across all scenes, ex {"playerSocket": client}
    currentSceneIndex: number;
    keys: { [key: string]: boolean } = {};
    mouseX: number = 0;
    mouseY: number = 0;
    mouseDown: boolean = false;
    mouseReleased: boolean = false;

    constructor(scenes: Scene[], initialSceneIndex: number = 0) {
        this.scenes = scenes;
        this.currentSceneIndex = initialSceneIndex;

        document.addEventListener('keydown', (event) => {
            if (!this.keys[event.key]) {
                this.keys[event.key] = true;
            }
        });

        document.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });
    }

    bindMouseEvents(canvas: HTMLCanvasElement) {
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });

        canvas.addEventListener('mousedown', () => {
            this.mouseDown = true;
            this.mouseReleased = false;
        });

        canvas.addEventListener('mouseup', () => {
            this.mouseReleased = true;
            this.mouseDown = false;

            setTimeout(() => {
                this.mouseReleased = false;
            }, 50);
        });
    }

    switchScene(index: number) {
        if (index >= 0 && index < this.scenes.length) {
            const currentScene = this.scenes[this.currentSceneIndex];
            (async () => {
                if (currentScene) {
                    await currentScene.onExit(this); // Call onExit for the current scene
                }
                this.currentSceneIndex = index;
                await this.scenes[index].onLoad(this); // Call onLoad for the new scene
            })();
        } else {
            console.error(`Invalid scene index: ${index}`);
        }
    }

    getCurrentSceneIndex(): number {
        return this.currentSceneIndex;
    }
}

// New ContextEngine class
export class ContextEngine {
    private scenes: Scene[];
    private initialSceneIndex: number;
    private canvasWidth: number;
    private canvasHeight: number;
    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private other: otherCtx | null = null;
    private commands: Commands | null = null;
    private isRunning: boolean = false;

    constructor(scenes: Scene[], initialSceneIndex: number = 0, canvasWidth: number = 800, canvasHeight: number = 600) {
        // Validation
        if (!scenes || scenes.length === 0) {
            throw new Error('No scenes provided');
        }
        if (initialSceneIndex < 0 || initialSceneIndex >= scenes.length) {
            throw new Error('Invalid initial scene index');
        }
        if (typeof canvasWidth !== 'number' || typeof canvasHeight !== 'number') {
            throw new Error('Canvas width and height must be numbers');
        }

        this.scenes = scenes;
        this.initialSceneIndex = initialSceneIndex;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    initialize(): ContextEngine {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            throw new Error('Failed to get canvas context');
        }
        
        this.other = new otherCtx(this.ctx);
        this.commands = new Commands(this.scenes, this.initialSceneIndex);
        this.commands.bindMouseEvents(this.canvas);
        this.other.setCamera(0, 0);
        return this;
    }

    start(): void {
        if (this.isRunning) return;
        this.isRunning = true;
        const startTime = performance.now();
        this.loop(startTime);
    }

    private loop(lastTime: number): void {
        if (!this.isRunning || !this.other || !this.commands) return;
        
        const currentTime = performance.now();
        const deltaTime = (currentTime - lastTime) / 1000;
        
        this.other.updateCamera(deltaTime);
        
        const currentScene = this.scenes[this.commands.getCurrentSceneIndex()];
        currentScene.update(deltaTime, this.commands);
        currentScene.draw(this.other);
        
        requestAnimationFrame(() => this.loop(currentTime));
    }

    stop(): void {
        this.isRunning = false;
    }
}

// Keep the original function for legacy support, but use the new class internally
export function contextEngine(scenes: Scene[], initialSceneIndex: number = 0, canvasWidth: number = 800, canvasHeight: number = 600): ContextEngine {
    const engine = new ContextEngine(scenes, initialSceneIndex, canvasWidth, canvasHeight);
    engine.initialize().start();
    return engine; // Return the engine instance for advanced usage
}