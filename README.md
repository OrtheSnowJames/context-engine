# Context Engine
This is a game engine I made for typescript and raw javascript. It has UI (textboxes, buttons), a nice canvas wrapper and scene management, things I don't get from any other low level game engine.

I used this in a game called [capture-flag-io](https://github.com/OrtheSnowJames/capture-flag-io).

Example is in [the example directory](./example).

Docs are in [the docs directory](./docs).

## Installation

There are three different ways to import the Context Engine:

1. For TypeScript ES Module projects:
    ```typescript
    import { ... } from './main.ts'
    ```

2. For vanilla JavaScript (no ES Modules):
    ```html
    <script src="compiled/context-engine.js"></script>
    ```

3. For JavaScript with ES Modules:
    ```javascript
    import { ... } from './compiled/context-engine.mjs'
    ```

Note: installing from the npm package (npm i context-engine) will download the .mjs file.