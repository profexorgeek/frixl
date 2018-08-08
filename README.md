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

## TODOs

- Finish basic engine features
- Add more sophisticated build system that concats and minifies
- Add set of examples demonstrating how to extend and implement
