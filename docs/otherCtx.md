# otherCtx

`otherCtx` is a class I made, just a wrapper around a `CanvasRenderingContext2D`. It is pretty useful, and as someone coming from Ebiten and Raylib, I really like it.

## Fields

- **private ctx**: This is just the `CanvasRenderingContext2D` from a canvas to wrap around.
- **private cameraX**: The x-coordinate of the camera's position. Defaults to `0`.
- **private cameraY**: The y-coordinate of the camera's position. Defaults to `0`.
- **private zoom**: The zoom level of the camera. Defaults to `1`.

## Methods

### `setCamera(x: number, y: number)`
Sets the camera's position.

- **x**: The x-coordinate of the camera.
- **y**: The y-coordinate of the camera.

### `setZoom(zoom: number)`
Sets the zoom level of the camera.

- **zoom**: The zoom level. A value greater than `1` zooms in, while a value less than `1` zooms out.

### `drawRect(x: number, y: number, width: number, height: number, color: string)`
Draws a rectangle, adjusted for the camera's position and zoom.

- **x, y**: The top-left corner of the rectangle.
- **width, height**: The dimensions of the rectangle.
- **color**: The fill color of the rectangle.

### `drawCircle(x: number, y: number, radius: number, color: string)`
Draws a circle, adjusted for the camera's position and zoom.

- **x, y**: The center of the circle.
- **radius**: The radius of the circle.
- **color**: The fill color of the circle.

### `drawText(x: number, y: number, text: string, color: string, fontSize: number)`
Draws text, adjusted for the camera's position and zoom.

- **x, y**: The position of the text.
- **text**: The string to draw.
- **color**: The color of the text.
- **fontSize**: The size of the text.

### `drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number)`
Draws an image, adjusted for the camera's position and zoom.

- **image**: The image to draw.
- **x, y**: The top-left corner of the image.
- **width, height**: The dimensions of the image.

### `clearBackground(color: string)`
Clears the canvas and fills it with a solid color.

- **color**: The fill color for the background.

### `drawLine(x1: number, y1: number, x2: number, y2: number, color: string)`
Draws a line, adjusted for the camera's position and zoom.

- **x1, y1**: The starting point of the line.
- **x2, y2**: The ending point of the line.
- **color**: The color of the line.

### `drawPolygon(points: Array<{x: number, y: number}>, color: string)`
Draws a polygon, adjusted for the camera's position and zoom.

- **points**: An array of points defining the polygon.
- **color**: The fill color of the polygon.

### `drawImageScaled(image: HTMLImageElement, x: number, y: number, width: number, height: number)`
Draws a scaled image, adjusted for the camera's position and zoom.

- **image**: The image to draw.
- **x, y**: The top-left corner of the image.
- **width, height**: The dimensions of the image.

### `drawImageRotated(image: HTMLImageElement, x: number, y: number, width: number, height: number, angle: number)`
Draws a rotated image, adjusted for the camera's position and zoom.

- **image**: The image to draw.
- **x, y**: The top-left corner of the image.
- **width, height**: The dimensions of the image.
- **angle**: The rotation angle in radians.

### `drawImageWithAlpha(image: HTMLImageElement, x: number, y: number, width: number, height: number, alpha: number)`
Draws an image with transparency, adjusted for the camera's position and zoom.

- **image**: The image to draw.
- **x, y**: The top-left corner of the image.
- **width, height**: The dimensions of the image.
- **alpha**: The transparency level (0 to 1).

### `drawImageWithScale(image: HTMLImageElement, x: number, y: number, scaleX: number, scaleY: number)`
Draws an image with scaling, adjusted for the camera's position and zoom.

- **image**: The image to draw.
- **x, y**: The top-left corner of the image.
- **scaleX, scaleY**: The scaling factors for the image.

### `drawImageWithRotation(image: HTMLImageElement, x: number, y: number, width: number, height: number, angle: number)`
Draws a rotated image, adjusted for the camera's position and zoom.

- **image**: The image to draw.
- **x, y**: The top-left corner of the image.
- **width, height**: The dimensions of the image.
- **angle**: The rotation angle in radians.
