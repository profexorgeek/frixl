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
                _this.spriteLoaded = function () {
                    Example.Game.instance.logger.debug('Sprite texture loaded, adding to view.');
                    var sprite = new Frixl.Entities.Sprite(_this._textureUrl);
                    sprite.rotation = 0.15;
                    sprite.x = 0;
                    sprite.y = 0;
                    sprite.rotationVelocity = 0.125;
                    for (var i = 0; i < 500; i += 1) {
                        var s = new Frixl.Entities.Sprite(_this._textureUrl);
                        var pos = Example.Game.instance.camera.randomVectorInView;
                        s.x = pos.x;
                        s.y = pos.y;
                        s.alpha = Frixl.Util.GameUtil.randomInRange(0.25, 1);
                        s.rotationVelocity = Frixl.Util.GameUtil.randomInRange(-Math.PI, Math.PI);
                        s.attachTo(sprite);
                    }
                    _this.addSprite(sprite);
                };
                Example.Game.instance.logger.debug('ExampleView instantiated.');
                // preload a texture
                Frixl.Rendering.TextureBuffer.instance.loadTexture(_this._textureUrl, _this.spriteLoaded);
                return _this;
            }
            return ExampleView;
        }(Frixl.Views.View));
        Views.ExampleView = ExampleView;
    })(Views = Example.Views || (Example.Views = {}));
})(Example || (Example = {}));
//# sourceMappingURL=game.js.map