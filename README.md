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

### Building the Example
To use Frixl you extend its core objects such as Positionables, Sprites, Views and the Game itself. To build and run the example:

- Enter the Example directory: `cd Example`
- Build once: `tsc`
- Watch and build: `tsc -w`
- Open the index.html file in the Examples folder in your favorite modern browser.


## Current Features
Frixl engine is comprised of modular objects that are easy to extend and customize. At a high level, the game instance manages a scene graph that starts with a **View**. Views should be used for things like menu screens or levels and keep your game organized and scalable. Views own a collection of **Positionables**. Positionables are the base type for every game component. They define handy properties for position, velocity and acceleration and offer a simple physics implementation. Positionables can also have children that are relatively positioned, making it easy to build a recursive scene graph of logical object attachments.

The **Sprite** type extends Positionable and supports texture mapping and animation with an **Animation** class that you can populate in code or from a persistant source such as JSON. This allows your game to use spritesheets for frame animation and loading and rendering efficiency. Since Sprites inherit from Positionable, they also get basic physics and support parenting and children.

Frixl offers a default **Camera** that extends Positionable, allowing the camera itself to have physics if desired! The camera can also be attached to any positionable, making tracking of game objects such as the player very simple.

Frixl defines an **IRenderer** interface that defines a single `draw` method. Renderers are intended to be stateless so that a single renderer can render any camera to any context. Frixl comes with a **DefaultRenderer** class that works great for simple purposes, utilizing the 2D canvas renderer. However, you can easily swap out the renderer with your own implementation of IRenderer.

Frixl defines an **IContentManager** that defines methods for loading and retrieving assets. The **DefaultContentManager** is a simple implementation capable of loading and caching content.

Frixl provides an **InputHandler** and defines enums for keyboard and mouse input, making it easy to implement the most common types of input. It also translates touch input on mobile devices to mouse clicks so most implementations will work cross platform.

The Example folder demonstrates implementation of most of these features.

## Next Up
- Views should have an unload method that is called before moving to another view
- Improve audio implementation
