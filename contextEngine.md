# Context Engine

This is a 2D TypeScript engine based on `CanvasRenderingContext2D`, aka a canvas. It provides a wrapper around a canvas and manages gameplay with scenes and a camera system.

## Features

- **Scene Management**: Easily manage multiple scenes with `update` and `draw` methods.
- **Camera System**: Smooth camera panning and zooming.
- **Drawing Utilities**: Simplified drawing methods for shapes, images, and text.
- **Commands System**: Allows scenes to interact with the engine, such as switching scenes.

---

## Getting Started

### Importing the Engine

You can import the engine directly from the following URL:

#### Compiled JavaScript Version
```html
<script src="https://github.com/OrtheSnowJames/context-engine/raw/main/dist/compiled/context-engine.js"></script>
```

#### TypeScript Source Version
```typescript
import { contextEngine, Scene, otherCtx, Commands } from "https://github.com/OrtheSnowJames/context-engine/raw/main/src/main.ts";
```

Ensure your TypeScript configuration allows importing from external URLs by enabling `esModuleInterop` and `moduleResolution` in your `tsconfig.json`.

---

### Using the Engine with JavaScript (Raw HTML)

If you prefer to use the engine with plain JavaScript in a browser, you can include the compiled JavaScript file and define your scenes directly in a `<script>` tag.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Context Engine Example</title>
    <script src="https://github.com/OrtheSnowJames/context-engine/raw/main/dist/compiled/context-engine.js"></script>
</head>
<body>
    <script>
        class MyScene extends Scene {
            update(deltaTime, commands) {
                // Update game logic here
                if (deltaTime > 1) {
                    commands.switchScene(1); // Example of switching scenes
                }
            }

            draw(ctx) {
                ctx.clearBackground("black");
                ctx.drawRect(50, 50, 100, 100, "red");
                ctx.drawText(200, 200, "Hello, World!", "white");
            }
        }

        const scene1 = new MyScene();
        const scene2 = new MyScene();

        contextEngine([scene1, scene2]);
    </script>
</body>
</html>
```

---

### Setting Up the Engine with TypeScript

To use the engine with TypeScript, you need to define your scenes and pass them to the `contextEngine` function.

```typescript
class MyScene extends Scene {
    update(deltaTime: number, commands: Commands) {
        // Update game logic here
        if (deltaTime > 1) {
            commands.switchScene(1); // Example of switching scenes
        }
    }

    draw(ctx: otherCtx) {
        ctx.clearBackground("black");
        ctx.drawRect(50, 50, 100, 100, "red");
        ctx.drawText(200, 200, "Hello, World!", "white");
    }
}

const scene1 = new MyScene();
const scene2 = new MyScene();

contextEngine([scene1, scene2]);
```

---

### Switching Between Scenes

The `Commands` class allows you to switch between scenes programmatically. You can use the `switchScene` method to change the current scene.

```typescript
commands.switchScene(index: number);
```

- **index**: The index of the scene to switch to. Must be within the bounds of the scene array.

Example:

```typescript
class MyScene extends Scene {
    update(deltaTime: number, commands: Commands) {
        if (someCondition) {
            commands.switchScene(1); // Switch to scene at index 1
        }
    }

    draw(ctx: otherCtx) {
        ctx.clearBackground("blue");
    }
}
```

---

## `Scene` Class

The `Scene` class is the base class for all scenes. You can override the `update` and `draw` methods to define your scene's behavior.

### Methods

#### `update(deltaTime: number, commands: Commands)`
Called every frame to update the scene's logic.

- **deltaTime**: The time elapsed since the last frame, in seconds.
- **commands**: An instance of the `Commands` class, allowing interaction with the engine (e.g., switching scenes).

#### `draw(ctx: otherCtx)`
Called every frame to render the scene.

- **ctx**: An instance of the `otherCtx` class, providing drawing utilities.

---

## `Commands` Class

The `Commands` class allows scenes to interact with the engine, such as switching scenes.

### Methods

#### `switchScene(index: number)`
Switches to the scene at the specified index.

- **index**: The index of the scene to switch to. Must be within the bounds of the scene array.

#### `getCurrentSceneIndex()`
Returns the index of the current scene.

---

## Example Usage with TypeScript

```typescript
import { contextEngine, Scene, otherCtx, Commands } from "https://github.com/OrtheSnowJames/context-engine/raw/main/src/main.ts";

class MyScene extends Scene {
    update(deltaTime: number, commands: Commands) {
        // Update game logic here
        if (deltaTime > 1) {
            commands.switchScene(1); // Switch to the second scene
        }
    }

    draw(ctx: otherCtx) {
        ctx.clearBackground("black");
        ctx.drawRect(50, 50, 100, 100, "red");
        ctx.drawText(200, 200, "Hello, World!", "white");
    }
}

const scene1 = new MyScene();
const scene2 = new MyScene();

contextEngine([scene1, scene2]);
```