# frixl
Frixl is a mashup of "Frosted Pixel" because it's a reworking of an older ES5
game engine I wrote called FrostFlake. Frixl also borrows concepts from the open
source, C# game engine FlatRedBall.

Frixl is written in TypeScript and renders, by default, to a 2D canvas. This 
engine is not intended for 3D use. It is intended for animated data visualization,
simple video games and similar interactive media.

## Setup
Setup assumes you have installed Node and NPM are are familiar with basic Node/NPM usage.

- Install TypeScript: `npm install -g TypeScript`
- Fetch dependencies: `npm install`

## Build

### Building the Engine
Frixl uses pure TypeScript to compile (no third-party build tools such as Webpack). A built version of the Frixl Engine is part of this repository. However, if you want to build it yourself:

- Enter the Engine directory `cd Engine`
- Build once: `tsc`
- To watch and build: `tsc -w`

### Building the Examples
To use Frixl you extend its core objects such as Positionables, Sprites, Views and the Game itself. To build and run the example:

- Enter the Example directory: `cd Example`
- Build once: `tsc`
- Watch and build: `tsc -w`
- Open the index.html file in the Examples folder in your favorite modern browser.


## Current Features
- Views: containers to organize a level, menu or similar concept into self-contained components
- Positionable: base game entity that can be positioned, rotated and has properties like velocity and acceleration that automatically update the position. Supports attachment to a parent and infinitely nestable children.
- Camera: extends Positionable to provide a camera that can have position, velocity and acceleration
- Sprite: base game entity that extends positionable to represent a drawable object.
- Texture Coordinates: Sprites can be mapped to a portion of a spritesheet by specifying the texture coordinates for the sprite
- IRenderer: Rendering interface to render Sprites and provide a buffer for loaded textures. Allows game engine to accept custom renderer implementations.
- DefaultRenderer: 2D Canvas rendering implementation that can recursively render infinitely nested Sprites.
- Input: Enums for easy translation of human-readable names into character codes and methods to check input states in the game loop.

## Next Up
- Views should have an unload method that is called before moving to another view
- Sprites should support animation
- Views should track non-sprites: array should be Positionable instead of Sprite?
- Simple collision implementation
- Implement audio
