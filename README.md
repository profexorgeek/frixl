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
Currently Frixl is not using any special build systems, it uses pure TypeScript to 
compile scripts.

- Build once: `tsc`
- To watch and build: `tsc -w`

## Current Features
- Views: containers to organize a level, menu or similar concept into self-contained components
- Positionable: base game entity that can be positioned, rotated and has properties like velocity and acceleration that automatically update the position. Supports attachment to a parent and infinitely nestable children.
- Camera: extends Positionable to provide a camera that can have position, velocity and acceleration
- Sprite: base game entity that extends positionable to represent a drawable object.
- IRenderer: Rendering interface to render Sprites. Allows game engine to accept custom renderer implementations.
- DefaultRenderer: 2D Canvas rendering implementation that can recursively render infinitely nested Sprites.
- TextureBuffer: Shared buffer for loading and unloading game textures

## Next Up
- Views should have an unload method that is called before moving to another view
- Sprites should support texture coordinates (for spritesheets)
- Sprites should support animation
- Views should handle non-sprites - array should be Positionable instead of Sprite?
- Simple collision implementation
- Polygon/Shape drawing?
- Add set of examples demonstrating how to extend and implement
- Add more sophisticated build system that concats and minifies

