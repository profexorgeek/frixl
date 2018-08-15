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
/// <reference path='../../Engine/dist/frixl.d.ts' />
var Example;
/// <reference path='../../Engine/dist/frixl.d.ts' />
(function (Example) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this) || this;
            var canvas = document.getElementById('frixlCanvas');
            _this.initialize(canvas, 60);
            _this.activeView = new Example.Views.ExampleView();
            _this.start();
            return _this;
        }
        return Game;
    }(Frixl.Game));
    Example.Game = Game;
})(Example || (Example = {}));
var Example;
(function (Example) {
    var Views;
    (function (Views) {
        var ExampleView = /** @class */ (function (_super) {
            __extends(ExampleView, _super);
            function ExampleView() {
                var _this = _super.call(this) || this;
                _this._textureUrl = './content/frostFlake.png';
                _this.onTextureLoaded = function () {
                    Example.Game.instance.logger.debug('Sprite texture loaded, adding to view.');
                    _this._parentSprite = new Frixl.Entities.Sprite(_this._textureUrl);
                    _this._cursorSprite = new Frixl.Entities.Sprite(_this._textureUrl);
                    for (var i = 0; i < 500; i += 1) {
                        var s = new Frixl.Entities.Sprite(_this._textureUrl);
                        var pos = Example.Game.instance.camera.randomVectorInView;
                        s.x = pos.x;
                        s.y = pos.y;
                        s.alpha = Frixl.Util.GameUtil.randomInRange(0.25, 1);
                        s.rotationVelocity = Frixl.Util.GameUtil.randomInRange(-Math.PI, Math.PI);
                        s.attachTo(_this._parentSprite);
                    }
                    _this.addPositionable(_this._parentSprite);
                    _this.addPositionable(_this._cursorSprite);
                };
                Example.Game.instance.logger.debug('ExampleView instantiated.');
                Example.Game.instance.renderer.loadTexture(_this._textureUrl, _this.onTextureLoaded);
                return _this;
            }
            ExampleView.prototype.update = function (delta) {
                _super.prototype.update.call(this, delta);
                var input = Example.Game.instance.input;
                var camera = Example.Game.instance.camera;
                if (this._parentSprite) {
                    if (input.keyDown(Frixl.Input.Keys.Space)) {
                        this._parentSprite.rotationVelocity = 0.25;
                    }
                    else {
                        this._parentSprite.rotationVelocity = 0;
                    }
                }
                if (input.keyDown(Frixl.Input.Keys.Right)) {
                    camera.velocity.x = 100;
                }
                else if (input.keyDown(Frixl.Input.Keys.Left)) {
                    camera.velocity.x = -100;
                }
                else {
                    camera.velocity.x = 0;
                }
                if (input.keyDown(Frixl.Input.Keys.Up)) {
                    camera.velocity.y = 100;
                }
                else if (input.keyDown(Frixl.Input.Keys.Down)) {
                    camera.velocity.y = -100;
                }
                else {
                    camera.velocity.y = 0;
                }
                if (input.buttonPushed(Frixl.Input.MouseButtons.Left)) {
                    camera.background = "Black";
                }
                if (input.keyPushed(Frixl.Input.Keys.C)) {
                    var r = Math.round(Frixl.Util.GameUtil.randomInRange(0, 255));
                    var g = Math.round(Frixl.Util.GameUtil.randomInRange(0, 255));
                    var b = Math.round(Frixl.Util.GameUtil.randomInRange(0, 255));
                    camera.background = "rgb(" + r + "," + g + "," + b + ")";
                }
                if (this._cursorSprite) {
                    this._cursorSprite.x = input.cursor.worldX;
                    this._cursorSprite.y = input.cursor.worldY;
                }
            };
            return ExampleView;
        }(Frixl.Views.View));
        Views.ExampleView = ExampleView;
    })(Views = Example.Views || (Example.Views = {}));
})(Example || (Example = {}));
//# sourceMappingURL=game.js.map