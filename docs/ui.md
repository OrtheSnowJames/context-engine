# UI Components Documentation

## OCtxButton

A customizable button component that provides visual feedback through hover and click states.

### Features

- Smooth hover and click animations
- Customizable colors and styles
- Rounded or square corners
- Disabled state support
- Mouse interaction handling

### Constructor

```typescript
new OCtxButton(x: number, y: number, width: number, height: number, label: string)
```

- **x**: X position of the button
- **y**: Y position of the button
- **width**: Button width
- **height**: Button height
- **label**: Text to display on the button

### Methods

#### `setColors(background: string, hover: string, pressed: string, border: string, text: string)`
Set custom colors for different button states.

```typescript
button.setColors(
    "#D3D3D3",  // background
    "#C8C8C8",  // hover
    "#A9A9A9",  // pressed
    "#000000",  // border
    "#000000"   // text
);
```

#### `update(commands: Commands)`
Update button state based on mouse interaction. Must be called in scene's update method.

#### `draw(ctx: otherCtx)`
Render the button. Must be called in scene's draw method.

#### `isClicked(commands: Commands): boolean`
Check if the button was clicked. Returns true on the frame when the button is released.

### Properties

The button includes several properties that can be modified:

- **enabled**: Enable/disable button interaction
- **invisible**: Hide/show the button
- **uneditable**: Prevent state changes
- **useRoundedCorners**: Toggle between rounded and square corners
- **fontSize**: Text size
- **padding**: Space between content and border
- **cornerRadius**: Radius of rounded corners

### Example Usage

```typescript
class MenuScene extends Scene {
    private startButton: OCtxButton;

    constructor() {
        super();
        this.startButton = new OCtxButton(300, 200, 200, 50, "Start Game");
        
        // Customize appearance
        this.startButton.setColors(
            "#4CAF50",  // Green background
            "#45A049",  // Darker green for hover
            "#3D8B40",  // Even darker for pressed
            "#2D692F",  // Dark border
            "#FFFFFF"   // White text
        );
    }

    update(deltaTime: number, commands: Commands) {
        this.startButton.update(commands);
        
        if (this.startButton.isClicked(commands)) {
            commands.switchScene(1); // Switch to game scene
        }
    }

    draw(ctx: otherCtx) {
        ctx.clearBackground("#333333");
        this.startButton.draw(ctx);
    }
}
```

### Styling Tips

1. Use contrasting colors for text and background
2. Keep padding consistent across buttons
3. Use slightly darker colors for hover and pressed states
4. Consider disabling buttons when actions are unavailable
5. Use rounded corners for a modern look

### Best Practices

1. Always call update before checking isClicked
2. Place buttons in easily accessible locations
3. Use clear, concise labels
4. Provide visual feedback through color changes
5. Keep button sizes consistent throughout your application

## OCtxTextField

A text input component that supports keyboard input, cursor navigation, and text editing.

### Features

- Text input with cursor support
- Maximum length limitation
- Customizable colors and styles
- Cursor blinking animation
- Keyboard navigation (arrow keys, home, end)
- Copy/paste support

### Constructor

```typescript
new OCtxTextField(x: number, y: number, width: number, height: number, maxLength: number)
```

- **x**: X position of the text field
- **y**: Y position of the text field
- **width**: Text field width
- **height**: Text field height
- **maxLength**: Maximum number of characters allowed

### Methods

#### `setColors(background: string, border: string, text: string)`
Set custom colors for the text field.

```typescript
textField.setColors(
    "#FFFFFF",  // background
    "#000000",  // border
    "#000000"   // text
);
```

#### `update(commands: Commands, deltaTime: number)`
Update text field state and handle input. Must be called in scene's update method.

#### `draw(ctx: otherCtx)`
Render the text field. Must be called in scene's draw method.

#### `getText(): string`
Get the current text content.

#### `setValue(value: string)`
Set the text content programmatically.

#### `activate()`
Make the text field active for input. Do not call this unless you are 100% sure that no other textfields are activated.

#### `deactivate()`
Deactivate the text field.

#### `setPlaceholder(text: string)`
Set the placeholder text that appears when the field is empty.

#### `setPlaceholderColor(color: string)`
Set the color of the placeholder text.

### Example Usage

```typescript
class LoginScene extends Scene {
    private usernameField: OCtxTextField;

    constructor() {
        super();
        this.usernameField = new OCtxTextField(300, 200, 200, 40, 20);
        this.usernameField.setColors("#FFFFFF", "#333333", "#000000");
        this.usernameField.setPlaceholder("Enter username...");
        this.usernameField.setPlaceholderColor("#808080");
    }

    update(deltaTime: number, commands: Commands) {
        this.usernameField.update(commands, deltaTime);
    }

    draw(ctx: otherCtx) {
        ctx.clearBackground("#F0F0F0");
        this.usernameField.draw(ctx);
    }
}
```

### Best Practices

1. Always update before drawing
2. Clear input when processed
3. Validate input as needed
4. Provide clear visual feedback for focus state
5. Consider mobile input requirements
