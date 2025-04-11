var otherCtx = /** @class */ (function () {
    function otherCtx(ctx) {
        this.cameraX = 0;
        this.cameraY = 0;
        this.zoom = 1;
        this.ctx = ctx;
    }
    otherCtx.prototype.setCamera = function (x, y) {
        this.cameraX = x;
        this.cameraY = y;
    };
    otherCtx.prototype.setZoom = function (zoom) {
        this.zoom = zoom;
    };
    otherCtx.prototype.drawRect = function (x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect((x - this.cameraX) * this.zoom, (y - this.cameraY) * this.zoom, width * this.zoom, height * this.zoom);
    };
    otherCtx.prototype.drawCircle = function (x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc((x - this.cameraX) * this.zoom, (y - this.cameraY) * this.zoom, radius * this.zoom, 0, Math.PI * 2);
        this.ctx.fill();
    };
    otherCtx.prototype.drawText = function (x, y, text, color) {
        this.ctx.fillStyle = color;
        this.ctx.font = "".concat(20 * this.zoom, "px Arial");
        this.ctx.fillText(text, (x - this.cameraX) * this.zoom, (y - this.cameraY) * this.zoom);
    };
    otherCtx.prototype.drawImage = function (image, x, y, width, height) {
        this.ctx.drawImage(image, (x - this.cameraX) * this.zoom, (y - this.cameraY) * this.zoom, width * this.zoom, height * this.zoom);
    };
    otherCtx.prototype.rawCtx = function () {
        return this.ctx;
    };
    otherCtx.prototype.setCtx = function (ctx) {
        this.ctx = ctx;
    };
    otherCtx.prototype.clearBackground = function (color) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    };
    otherCtx.prototype.drawLine = function (x1, y1, x2, y2, color) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo((x1 - this.cameraX) * this.zoom, (y1 - this.cameraY) * this.zoom);
        this.ctx.lineTo((x2 - this.cameraX) * this.zoom, (y2 - this.cameraY) * this.zoom);
        this.ctx.stroke();
    };
    otherCtx.prototype.drawPolygon = function (points, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo((points[0].x - this.cameraX) * this.zoom, (points[0].y - this.cameraY) * this.zoom);
        for (var i = 1; i < points.length; i++) {
            this.ctx.lineTo((points[i].x - this.cameraX) * this.zoom, (points[i].y - this.cameraY) * this.zoom);
        }
        this.ctx.closePath();
        this.ctx.fill();
    };
    otherCtx.prototype.drawImageScaled = function (image, x, y, width, height) {
        this.ctx.drawImage(image, (x - this.cameraX) * this.zoom, (y - this.cameraY) * this.zoom, width * this.zoom, height * this.zoom);
    };
    otherCtx.prototype.drawImageRotated = function (image, x, y, width, height, angle) {
        this.ctx.save();
        this.ctx.translate((x - this.cameraX) * this.zoom + (width * this.zoom) / 2, (y - this.cameraY) * this.zoom + (height * this.zoom) / 2);
        this.ctx.rotate(angle);
        this.ctx.drawImage(image, -(width * this.zoom) / 2, -(height * this.zoom) / 2, width * this.zoom, height * this.zoom);
        this.ctx.restore();
    };
    otherCtx.prototype.drawImageWithAlpha = function (image, x, y, width, height, alpha) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.drawImage(image, (x - this.cameraX) * this.zoom, (y - this.cameraY) * this.zoom, width * this.zoom, height * this.zoom);
        this.ctx.restore();
    };
    otherCtx.prototype.drawImageWithScale = function (image, x, y, scaleX, scaleY) {
        this.ctx.drawImage(image, (x - this.cameraX) * this.zoom, (y - this.cameraY) * this.zoom, image.width * scaleX * this.zoom, image.height * scaleY * this.zoom);
    };
    otherCtx.prototype.drawImageWithRotation = function (image, x, y, width, height, angle) {
        this.ctx.save();
        this.ctx.translate((x - this.cameraX) * this.zoom + (width * this.zoom) / 2, (y - this.cameraY) * this.zoom + (height * this.zoom) / 2);
        this.ctx.rotate(angle);
        this.ctx.drawImage(image, -(width * this.zoom) / 2, -(height * this.zoom) / 2, width * this.zoom, height * this.zoom);
        this.ctx.restore();
    };
    return otherCtx;
}());
function ctxengnloop(game, ctx, lastTime) {
    var currentTime = performance.now();
    var deltaTime = (currentTime - lastTime) / 1000;
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(function () { return ctxengnloop(game, ctx, currentTime); });
}
function contextEngine(game) {
    var canvas = document.createElement('canvas');
    canvas.width = game.width;
    canvas.height = game.height;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Failed to get canvas context');
    }
    var other = new otherCtx(ctx);
    var startTime = performance.now();
    ctxengnloop(game, ctx, startTime);
}
