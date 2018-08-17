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
        Config.worldSize = 5000;
        Config.numStars = 100;
        Config.shipAccel = 150;
        Config.shipDrag = 0.65;
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
            _this.onTexturesLoaded = function () {
                _this.logger.debug('Game textures loaded.');
                _this.activeView = new Example.Views.SpaceView();
                _this.start();
            };
            var canvas = document.getElementById('frixlCanvas');
            _this.initialize(canvas, 60);
            _this.showCursor = false;
            _this.renderer.loadTexture(Example.Config.spriteSheet, _this.onTexturesLoaded);
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
                _this.textureName = Example.Config.spriteSheet;
                _this.frame = new Frixl.Rendering.Frame(352, 0, 32, 32);
                _this._drag = Example.Config.shipDrag;
                return _this;
            }
            Ship.prototype.update = function (delta) {
                _super.prototype.update.call(this, delta);
                var input = Example.Game.instance.input;
                var cursor = input.cursor;
                this.rotation = Math.atan2(cursor.worldY - this.y, cursor.worldX - this.x);
                if (input.buttonDown(Frixl.Input.MouseButtons.Left)) {
                    this.acceleration.x = Math.cos(this.rotation) * Example.Config.shipAccel;
                    this.acceleration.y = Math.sin(this.rotation) * Example.Config.shipAccel;
                }
                else {
                    this.acceleration.x = 0;
                    this.acceleration.y = 0;
                }
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
        var Star = /** @class */ (function (_super) {
            __extends(Star, _super);
            function Star() {
                var _this = _super.call(this) || this;
                _this._parallax = 0;
                _this._starFrames = new Array(new Frixl.Rendering.Frame(96, 16, 16, 16), new Frixl.Rendering.Frame(112, 0, 16, 16));
                _this.textureName = Example.Config.spriteSheet;
                if (Math.random() < 0.1) {
                    _this.frame = _this._starFrames[1];
                }
                else {
                    _this.frame = _this._starFrames[0];
                }
                _this.alpha = Frixl.Util.GameUtil.randomInRange(0.2, 1);
                _this.rotation = Frixl.Util.GameUtil.randomInRange(-1.5, 1.5);
                _this._parallax = Frixl.Util.GameUtil.randomInRange(0, 0.75);
                return _this;
            }
            Star.prototype.update = function (delta) {
                _super.prototype.update.call(this, delta);
                var absPos = this.absolutePosition;
                var cam = Example.Game.instance.camera;
                if (absPos.x > cam.right) {
                    this.x -= cam.width;
                }
                if (absPos.x < cam.left) {
                    this.x += cam.width;
                }
                if (absPos.y > cam.top) {
                    this.y -= cam.height;
                }
                if (absPos.y < cam.bottom) {
                    this.y += cam.height;
                }
                var camD = cam.deltaPosition;
                this._position.x += camD.x * this._parallax;
                this._position.y += camD.y * this._parallax;
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
                var cam = Example.Game.instance.camera;
                _this.addPositionable(_this._gameCursor);
                _this.addPositionable(_this._player);
                cam.attachTo(_this._player);
                cam.background = "rgb(50, 50, 50)";
                for (var i = 0; i < Example.Config.numStars; i++) {
                    var s = new Example.Entities.Star;
                    s.x = Frixl.Util.GameUtil.randomInRange(cam.left, cam.right);
                    s.y = Frixl.Util.GameUtil.randomInRange(cam.bottom, cam.top);
                    _this._stars.push(s);
                    _this.addPositionable(s);
                }
                return _this;
            }
            return SpaceView;
        }(Frixl.Views.View));
        Views.SpaceView = SpaceView;
    })(Views = Example.Views || (Example.Views = {}));
})(Example || (Example = {}));
//# sourceMappingURL=game.js.map