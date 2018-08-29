"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Example;
(function (Example) {
    var Config = /** @class */ (function () {
        function Config() {
        }
        Config.spriteSheet = './content/spriteSheet.png';
        Config.laserSound = './content/laser.wav';
        Config.worldSize = 5000;
        Config.numStars = 100;
        Config.shipAccel = 150;
        Config.shipDrag = 0.65;
        Config.shipRadius = 12;
        return Config;
    }());
    Example.Config = Config;
})(Example || (Example = {}));
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
            _this.initialize(canvas, 60);
            _this.showCursor = false;
            _this.logger.debug('Loading game assets...');
            _this.content.loadTexture(Example.Config.spriteSheet, _this.onItemLoaded);
            _this.content.loadSound(Example.Config.laserSound, _this.onItemLoaded);
            return _this;
        }
        return Game;
    }(Frixl.Game));
    Example.Game = Game;
})(Example || (Example = {}));
var Example;
(function (Example) {
    var Entities;
    (function (Entities) {
        var GameCursor = /** @class */ (function (_super) {
            __extends(GameCursor, _super);
            function GameCursor() {
                var _this = _super.call(this) || this;
                _this.textureName = Example.Config.spriteSheet;
                _this.frame = new Frixl.Rendering.Frame(32, 0, 32, 32);
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
                // get the spritesheet name from the config file
                _this.textureName = Example.Config.spriteSheet;
                // hardcoded frame for the ship in the spritesheet
                _this.frame = new Frixl.Rendering.Frame(352, 0, 32, 32);
                // hardcoded radius for collision
                _this.radius = Example.Config.shipRadius;
                // give the ship some drag so it doesn't coast forever
                _this._drag = Example.Config.shipDrag;
                return _this;
            }
            return Ship;
        }(Frixl.Entities.Sprite));
        Entities.Ship = Ship;
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
                // hardcoded frames on the spritesheet
                _this._starFrames = new Array(new Frixl.Rendering.Frame(96, 16, 16, 16), new Frixl.Rendering.Frame(112, 0, 16, 16));
                _this.textureName = Example.Config.spriteSheet;
                // pick a random star texture
                if (Math.random() < 0.1) {
                    _this.frame = _this._starFrames[1];
                }
                else {
                    _this.frame = _this._starFrames[0];
                }
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
                _this._player = new Example.Entities.Ship();
                _this._staticShip = new Example.Entities.Ship();
                // shortcut to camera
                var cam = Example.Game.instance.camera;
                // add the game cursor instance
                _this.addPositionable(_this._gameCursor);
                // add the static ship
                _this._staticShip.x = 100;
                _this._staticShip.y = 100;
                _this.addPositionable(_this._staticShip);
                // add the player instance
                _this.addPositionable(_this._player);
                // attach the camera to the player
                cam.attachTo(_this._player);
                // set a custom background color
                cam.background = "rgb(50, 50, 50)";
                // create a bunch of stars with random properties
                for (var i = 0; i < Example.Config.numStars; i++) {
                    var s = new Example.Entities.Star;
                    s.x = Frixl.Util.GameUtil.randomInRange(cam.left, cam.right);
                    s.y = Frixl.Util.GameUtil.randomInRange(cam.bottom, cam.top);
                    _this._stars.push(s);
                    _this.addPositionable(s);
                }
                // make sure ship draws above stars and cursor draws above everything
                _this._player.layer = 10;
                _this._gameCursor.layer = 999;
                return _this;
            }
            SpaceView.prototype.update = function (delta) {
                _super.prototype.update.call(this, delta);
                this.doPlayerInput();
                // collide
                this._player.collideAndBounce(this._staticShip, 0.5, 0.25);
            };
            SpaceView.prototype.doPlayerInput = function () {
                // create some shortcut vars for readability
                var input = Example.Game.instance.input;
                var cursor = input.cursor;
                var plyr = this._player;
                // rotate toward cursor
                plyr.rotation = Math.atan2(cursor.worldY - plyr.absolutePosition.y, cursor.worldX - plyr.absolutePosition.x);
                // accelerate in rotation direction if mousebutton is down
                if (input.buttonDown(Frixl.Input.MouseButtons.Left)) {
                    plyr.acceleration.x = Math.cos(plyr.rotation) * Example.Config.shipAccel;
                    plyr.acceleration.y = Math.sin(plyr.rotation) * Example.Config.shipAccel;
                }
                else {
                    plyr.acceleration.x = 0;
                    plyr.acceleration.y = 0;
                }
                // test audio
                if (input.keyPushed(Frixl.Input.Keys.Space)) {
                    Example.Game.instance.audio.playSound(Example.Config.laserSound);
                }
            };
            return SpaceView;
        }(Frixl.Views.View));
        Views.SpaceView = SpaceView;
    })(Views = Example.Views || (Example.Views = {}));
})(Example || (Example = {}));
//# sourceMappingURL=game.js.map