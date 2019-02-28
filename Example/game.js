"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path='../../Engine/dist/frixl.d.ts' />
var Example;
/// <reference path='../../Engine/dist/frixl.d.ts' />
(function (Example) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this) || this;
            _this._callbacksFired = 0;
            _this._allCallbackCount = 2;
            _this.onItemLoaded = function (response) {
                _this._callbacksFired += 1;
                Game.instance.logger.debug('Preloaded ' + _this._callbacksFired + '/' + _this._allCallbackCount + ' assets.');
                if (_this._callbacksFired >= _this._allCallbackCount) {
                    _this.activeView = new Example.Views.SpaceView();
                    _this.start();
                }
            };
            var canvas = document.getElementById('frixlCanvas');
            _this.initialize(canvas, Example.GameConstants.fps);
            _this.showCursor = false;
            _this.logger.debug('Loading game assets...');
            _this.content.loadTexture(Example.GameConstants.spriteSheet, _this.onItemLoaded);
            _this.content.loadSound(Example.GameConstants.laserSound, _this.onItemLoaded);
            return _this;
        }
        return Game;
    }(Frixl.Game));
    Example.Game = Game;
})(Example || (Example = {}));
var Example;
(function (Example) {
    var GameConstants = /** @class */ (function () {
        function GameConstants() {
        }
        GameConstants.fps = 60;
        GameConstants.spriteSheet = './content/spriteSheet.png';
        GameConstants.laserSound = './content/laser.wav';
        GameConstants.worldSize = 800;
        GameConstants.numStars = 50;
        GameConstants.numAsteroids = 10;
        GameConstants.shotVelocity = 300;
        GameConstants.shipAccel = 150;
        GameConstants.shipDrag = 0.65;
        GameConstants.shipRadius = 12;
        GameConstants.asteroidDrag = 0.3;
        GameConstants.bgColor = "rgb(50,50,50)";
        // Sprite Frames
        GameConstants.frameCursor = new Frixl.Rendering.Frame(32, 0, 32, 32);
        GameConstants.frameLaserRed = new Frixl.Rendering.Frame(352, 16, 16, 16);
        GameConstants.framesStar = new Array(new Frixl.Rendering.Frame(96, 16, 16, 16), new Frixl.Rendering.Frame(112, 0, 16, 16));
        GameConstants.framesShipScout = new Array(new Frixl.Rendering.Frame(384, 64, 32, 32), new Frixl.Rendering.Frame(384, 96, 32, 32), new Frixl.Rendering.Frame(384, 128, 32, 32), new Frixl.Rendering.Frame(384, 160, 32, 32));
        GameConstants.framesAsteroidLarge = new Array(new Frixl.Rendering.Frame(0, 64, 64, 64));
        GameConstants.framesAsteroidMedium = new Array(new Frixl.Rendering.Frame(32, 128, 32, 32), new Frixl.Rendering.Frame(32, 160, 32, 32));
        GameConstants.framesAsteroidSmall = new Array(new Frixl.Rendering.Frame(0, 128, 16, 16), new Frixl.Rendering.Frame(16, 128, 16, 16), new Frixl.Rendering.Frame(0, 144, 16, 16), new Frixl.Rendering.Frame(16, 144, 16, 16));
        return GameConstants;
    }());
    Example.GameConstants = GameConstants;
})(Example || (Example = {}));
var Example;
(function (Example) {
    var Entities;
    (function (Entities) {
        var AsteroidSize;
        (function (AsteroidSize) {
            AsteroidSize[AsteroidSize["Small"] = 0] = "Small";
            AsteroidSize[AsteroidSize["Medium"] = 1] = "Medium";
            AsteroidSize[AsteroidSize["Large"] = 2] = "Large";
        })(AsteroidSize = Entities.AsteroidSize || (Entities.AsteroidSize = {}));
        var Asteroid = /** @class */ (function (_super) {
            __extends(Asteroid, _super);
            function Asteroid() {
                var _this = _super.call(this) || this;
                // get the spritesheet name from the config file
                _this.textureName = Example.GameConstants.spriteSheet;
                // default to large
                _this.asteroidSize = AsteroidSize.Medium;
                // set some drag so we don't drift forever
                _this._drag = Example.GameConstants.asteroidDrag;
                return _this;
            }
            Object.defineProperty(Asteroid.prototype, "asteroidSize", {
                get: function () {
                    return this._asteroidSize;
                },
                set: function (s) {
                    this._asteroidSize = s;
                    var frameList;
                    // set collision and random sprite based on new size
                    switch (this._asteroidSize) {
                        case AsteroidSize.Large:
                            frameList = Example.GameConstants.framesAsteroidLarge;
                            this.radius = 30;
                            break;
                        case AsteroidSize.Medium:
                            frameList = Example.GameConstants.framesAsteroidMedium;
                            this.radius = 14;
                            break;
                        case AsteroidSize.Small:
                            frameList = Example.GameConstants.framesAsteroidSmall;
                            this.radius = 6;
                            break;
                    }
                    // set random sprite
                    this.frame = Frixl.Util.GameUtil.randomInArray(frameList);
                    // randomize rotation
                    this.rotation = Frixl.Util.GameUtil.randomInRange(-1.5, 1.5);
                    this.rotationVelocity = Frixl.Util.GameUtil.randomInRange(-0.25, 0.25);
                },
                enumerable: true,
                configurable: true
            });
            return Asteroid;
        }(Frixl.Entities.Sprite));
        Entities.Asteroid = Asteroid;
    })(Entities = Example.Entities || (Example.Entities = {}));
})(Example || (Example = {}));
var Example;
(function (Example) {
    var Entities;
    (function (Entities) {
        var GameCursor = /** @class */ (function (_super) {
            __extends(GameCursor, _super);
            function GameCursor() {
                var _this = _super.call(this) || this;
                _this.textureName = Example.GameConstants.spriteSheet;
                _this.frame = Example.GameConstants.frameCursor;
                return _this;
            }
            GameCursor.prototype.update = function (delta) {
                _super.prototype.update.call(this, delta);
                this.rotationVelocity = 0.25;
                this.x = Example.Game.instance.input.cursor.worldX;
                this.y = Example.Game.instance.input.cursor.worldY;
            };
            return GameCursor;
        }(Frixl.Entities.Sprite));
        Entities.GameCursor = GameCursor;
    })(Entities = Example.Entities || (Example.Entities = {}));
})(Example || (Example = {}));
var Example;
(function (Example) {
    var Entities;
    (function (Entities) {
        var Ship = /** @class */ (function (_super) {
            __extends(Ship, _super);
            function Ship() {
                var _this = _super.call(this) || this;
                _this.halfWorldSize = Example.GameConstants.worldSize / 2;
                // get the spritesheet name from the config file
                _this.textureName = Example.GameConstants.spriteSheet;
                // get a random sprite
                _this.frame = Frixl.Util.GameUtil.randomInArray(Example.GameConstants.framesShipScout);
                // hardcoded radius for collision
                _this.radius = Example.GameConstants.shipRadius;
                // give the ship some drag so it doesn't coast forever
                _this._drag = Example.GameConstants.shipDrag;
                return _this;
            }
            Ship.prototype.update = function (delta) {
                _super.prototype.update.call(this, delta);
                // if(this.x < -this.halfWorldSize) {
                //     this.x = this.halfWorldSize;
                // }
                // if(this.x > this.halfWorldSize) {
                //     this.x = -this.halfWorldSize;
                // }
                // if(this.y < -this.halfWorldSize) {
                //     this.y = this.halfWorldSize;
                // }
                // if(this.y > this.halfWorldSize) {
                //     this.y = -this.halfWorldSize;
                // }
            };
            return Ship;
        }(Frixl.Entities.Sprite));
        Entities.Ship = Ship;
    })(Entities = Example.Entities || (Example.Entities = {}));
})(Example || (Example = {}));
var Example;
(function (Example) {
    var Entities;
    (function (Entities) {
        var Shot = /** @class */ (function (_super) {
            __extends(Shot, _super);
            function Shot() {
                var _this = _super.call(this) || this;
                _this.textureName = Example.GameConstants.spriteSheet;
                // pick a random star texture
                _this.frame = Example.GameConstants.frameLaserRed;
                return _this;
            }
            Shot.prototype.update = function (delta) {
                _super.prototype.update.call(this, delta);
                this.velocity.x = Math.cos(this.rotation) * Example.GameConstants.shotVelocity;
                this.velocity.y = Math.sin(this.rotation) * Example.GameConstants.shotVelocity;
            };
            return Shot;
        }(Frixl.Entities.Sprite));
        Entities.Shot = Shot;
    })(Entities = Example.Entities || (Example.Entities = {}));
})(Example || (Example = {}));
var Example;
(function (Example) {
    var Entities;
    (function (Entities) {
        var Star = /** @class */ (function (_super) {
            __extends(Star, _super);
            function Star() {
                var _this = _super.call(this) || this;
                _this._parallax = 0;
                _this.textureName = Example.GameConstants.spriteSheet;
                // pick a random star texture
                _this.frame = Frixl.Util.GameUtil.randomInArray(Example.GameConstants.framesStar);
                // randomize star's appearance
                _this.alpha = Frixl.Util.GameUtil.randomInRange(0.4, 1);
                _this.rotation = Frixl.Util.GameUtil.randomInRange(-1.5, 1.5);
                _this._parallax = Frixl.Util.GameUtil.randomInRange(0.25, 0.75);
                return _this;
            }
            Star.prototype.update = function (delta) {
                _super.prototype.update.call(this, delta);
                // wrap the star on the screen
                if (this.absolutePosition.x > Example.Game.instance.camera.right) {
                    this._position.x -= Example.Game.instance.camera.width;
                }
                if (this.absolutePosition.x < Example.Game.instance.camera.left) {
                    this._position.x += Example.Game.instance.camera.width;
                }
                if (this.absolutePosition.y > Example.Game.instance.camera.top) {
                    this._position.y -= Example.Game.instance.camera.height;
                }
                if (this.absolutePosition.y < Example.Game.instance.camera.bottom) {
                    this._position.y += Example.Game.instance.camera.height;
                }
                // apply some parallax movement to fake depth
                this._position.x += Example.Game.instance.camera.positionDelta.x * this._parallax;
                this._position.y += Example.Game.instance.camera.positionDelta.y * this._parallax;
            };
            return Star;
        }(Frixl.Entities.Sprite));
        Entities.Star = Star;
    })(Entities = Example.Entities || (Example.Entities = {}));
})(Example || (Example = {}));
var Example;
(function (Example) {
    var Views;
    (function (Views) {
        var SpaceView = /** @class */ (function (_super) {
            __extends(SpaceView, _super);
            function SpaceView() {
                var _this = _super.call(this) || this;
                _this._gameCursor = new Example.Entities.GameCursor();
                _this._stars = new Array();
                _this._asteroids = new Array();
                _this._shots = new Array();
                _this._player = new Example.Entities.Ship();
                var halfWorldSize = Example.GameConstants.worldSize / 2;
                // create a camera shortcut and set some properties
                var cam = Example.Game.instance.camera;
                cam.background = Example.GameConstants.bgColor;
                // add the game cursor instance
                _this.addPositionable(_this._gameCursor);
                // add the player instance and attach camera
                _this.addPositionable(_this._player);
                cam.attachTo(_this._player);
                // create a bunch of stars with random properties
                for (var i = 0; i < Example.GameConstants.numStars; i++) {
                    var s = new Example.Entities.Star;
                    s.x = Frixl.Util.GameUtil.randomInRange(cam.left, cam.right);
                    s.y = Frixl.Util.GameUtil.randomInRange(cam.bottom, cam.top);
                    _this._stars.push(s);
                    _this.addPositionable(s);
                }
                for (var i = 0; i < Example.GameConstants.numAsteroids; i++) {
                    var a = new Example.Entities.Asteroid;
                    a.x = Frixl.Util.GameUtil.randomInRange(-halfWorldSize, halfWorldSize);
                    a.y = Frixl.Util.GameUtil.randomInRange(-halfWorldSize, halfWorldSize);
                    _this._asteroids.push(a);
                    _this.addPositionable(a);
                }
                // make sure ship draws above stars and cursor draws above everything
                _this._player.layer = 10;
                _this._gameCursor.layer = 999;
                return _this;
            }
            SpaceView.prototype.update = function (delta) {
                _super.prototype.update.call(this, delta);
                this.doPlayerInput();
                this.doPlayerVsAsteroidCollision();
                this.doAsteroidVsAsteroidCollision();
                this.doShotVsAsteroidCollision();
            };
            SpaceView.prototype.doPlayerInput = function () {
                // create some shortcut vars for readability
                var input = Example.Game.instance.input;
                var cursor = input.cursor;
                var plyr = this._player;
                // rotate toward cursor
                plyr.rotation = Math.atan2(cursor.worldY - plyr.absolutePosition.y, cursor.worldX - plyr.absolutePosition.x);
                // accelerate in rotation direction if mousebutton is down
                if (input.buttonDown(Frixl.Input.MouseButtons.Right)) {
                    plyr.acceleration.x = Math.cos(plyr.rotation) * Example.GameConstants.shipAccel;
                    plyr.acceleration.y = Math.sin(plyr.rotation) * Example.GameConstants.shipAccel;
                }
                else {
                    plyr.acceleration.x = 0;
                    plyr.acceleration.y = 0;
                }
                // fire shots
                if (input.buttonPushed(Frixl.Input.MouseButtons.Left)) {
                    var s = new Example.Entities.Shot();
                    s.x = this._player.x;
                    s.y = this._player.y;
                    s.rotation = this._player.rotation;
                    this._shots.push(s);
                    this.addPositionable(s);
                    Example.Game.instance.audio.playSound(Example.GameConstants.laserSound);
                }
            };
            SpaceView.prototype.doPlayerVsAsteroidCollision = function () {
                for (var i = this._asteroids.length - 1; i > -1; i--) {
                    var a = this._asteroids[i];
                    this._player.collideAndBounce(a, 0.25, 0.99);
                }
            };
            SpaceView.prototype.doAsteroidVsAsteroidCollision = function () {
                for (var i = this._asteroids.length - 1; i > -1; i--) {
                    var a1 = this._asteroids[i];
                    for (var j = this._asteroids.length - 1; j > -1; j--) {
                        var a2 = this._asteroids[j];
                        if (a1 != a2) {
                            a1.collideAndBounce(a2, 0.5, 0.5);
                        }
                    }
                }
            };
            SpaceView.prototype.doShotVsAsteroidCollision = function () {
                for (var i = this._asteroids.length - 1; i > -1; i--) {
                    var a = this._asteroids[i];
                    for (var j = this._shots.length - 1; j > -1; j--) {
                        var s = this._shots[j];
                        if (s.collideAndBounce(a, 0.25, 1)) {
                            this._shots.splice(j, 1);
                            this.removePositionable(s);
                        }
                    }
                }
            };
            return SpaceView;
        }(Frixl.Views.View));
        Views.SpaceView = SpaceView;
    })(Views = Example.Views || (Example.Views = {}));
})(Example || (Example = {}));
//# sourceMappingURL=game.js.map