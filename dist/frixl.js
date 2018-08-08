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
var Frixl;
(function (Frixl) {
    var Game = /** @class */ (function () {
        function Game() {
            console.log('Frixl engine instance created.');
        }
        Object.defineProperty(Game.prototype, "camera", {
            get: function () {
                return this._camera;
            },
            enumerable: true,
            configurable: true
        });
        Game.prototype.initialize = function (canvas, fps, background) {
            this._canvas = canvas;
            this._fps = fps;
            this._background = background;
            this._textures = {};
            this._camera = new Frixl.Entity.Camera(this._canvas.width, this._canvas.height);
            this._renderer = new Frixl.Renderer();
            this._gameTime = new Frixl.GameTime();
        };
        Game.prototype.start = function () {
            var g = this;
            this._timer = setInterval(function () {
                g.update();
            }, (1000 / this._fps));
        };
        Game.prototype.stop = function () {
            clearInterval(this._timer);
        };
        Game.prototype.update = function () {
            this._gameTime.update();
            this.draw();
        };
        Game.prototype.draw = function () {
            this._renderer.draw(null, this._camera, this._canvas, this._background);
        };
        Game.prototype.toString = function () {
            return 'Instance of the Frixl game engine.';
        };
        return Game;
    }());
    Frixl.Game = Game;
})(Frixl || (Frixl = {}));
var Frixl;
(function (Frixl) {
    var GameTime = /** @class */ (function () {
        function GameTime() {
            this._start = Date.now();
            this._last = this._start;
            this._current = this._start;
            console.log('New GameTime object created.');
        }
        Object.defineProperty(GameTime.prototype, "frameSeconds", {
            // TODO: add frame rate averaging features!
            get: function () {
                return this._frameSeconds;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameTime.prototype, "totalSeconds", {
            get: function () {
                return this._totalSeconds;
            },
            enumerable: true,
            configurable: true
        });
        GameTime.prototype.update = function () {
            this._last = this._current;
            this._current = Date.now();
            this._frameSeconds = (this._current - this._last) / 1000;
            this._totalSeconds = (this._current - this._start) / 1000;
        };
        return GameTime;
    }());
    Frixl.GameTime = GameTime;
})(Frixl || (Frixl = {}));
var Frixl;
(function (Frixl) {
    var Util;
    (function (Util) {
        var GameUtil = /** @class */ (function () {
            function GameUtil() {
            }
            GameUtil.empty = function (str) {
                return (!str || /^\s*$/.test(str));
            };
            GameUtil.invert = function (num) {
                return 0 - num;
            };
            return GameUtil;
        }());
        Util.GameUtil = GameUtil;
    })(Util = Frixl.Util || (Frixl.Util = {}));
})(Frixl || (Frixl = {}));
/// <reference path='./Util/GameUtil.ts' />
var Frixl;
/// <reference path='./Util/GameUtil.ts' />
(function (Frixl) {
    var Renderer = /** @class */ (function () {
        function Renderer() {
        }
        Renderer.prototype.draw = function (sprites, camera, canvas, background) {
            var context = canvas.getContext('2d');
            var camTransX = Frixl.Util.GameUtil.invert(camera.x);
            var camTransY = camera.y + (context.canvas.height / 2);
            var fill = Frixl.Util.GameUtil.empty(background) ? 'rgb(0,0,0,0)' : background;
            context.fillStyle = fill;
            context.fillRect(0, 0, canvas.width, canvas.height);
            var img = null;
            var url = 'https://wallpapertag.com/wallpaper/full/d/3/d/267129-large-4k-wallpaper-3840x2160-retina.jpg';
            try {
                img = Frixl.IO.TextureBuffer.getTexture(url);
            }
            catch (e) {
                console.log('Texture not found: ' + e.message);
                Frixl.IO.TextureBuffer.loadTexture(url);
            }
            context.save();
            context.drawImage(img, 0, 0);
            context.restore();
        };
        return Renderer;
    }());
    Frixl.Renderer = Renderer;
})(Frixl || (Frixl = {}));
var Frixl;
(function (Frixl) {
    var Entity;
    (function (Entity) {
        var Positionable = /** @class */ (function () {
            function Positionable() {
                this._position = new Frixl.Util.Vector();
                this._velocity = new Frixl.Util.Vector();
                this._acceleration = new Frixl.Util.Vector();
                this._rotation = 0;
                this._rotationVelocity = 0;
                this._drag = 0;
            }
            Object.defineProperty(Positionable.prototype, "x", {
                get: function () {
                    return this._position.x;
                },
                set: function (x) {
                    this._position.x = x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Positionable.prototype, "y", {
                get: function () {
                    return this._position.y;
                },
                set: function (y) {
                    this._position.y = y;
                },
                enumerable: true,
                configurable: true
            });
            Positionable.prototype.update = function (delta) {
                var deltaSquaredHalved = delta * delta / 2;
                var twoPi = Math.PI / 2;
                this._position.x += (this._velocity.x * delta) + (this._acceleration.x * deltaSquaredHalved);
                this._position.y += (this._velocity.y * delta) + (this._acceleration.y * deltaSquaredHalved);
                this._velocity.x += (this._acceleration.x * delta) - (this._drag * this._velocity.x * delta);
                this._velocity.y += (this._acceleration.y * delta) - (this._drag * this._velocity.y * delta);
                this._rotation += this._rotationVelocity * delta;
                while (this._rotation >= twoPi) {
                    this._rotation -= twoPi;
                }
                while (this._rotation < 0) {
                    this._rotation += twoPi;
                }
            };
            return Positionable;
        }());
        Entity.Positionable = Positionable;
    })(Entity = Frixl.Entity || (Frixl.Entity = {}));
})(Frixl || (Frixl = {}));
/// <reference path='./Positionable.ts' />
var Frixl;
/// <reference path='./Positionable.ts' />
(function (Frixl) {
    var Entity;
    (function (Entity) {
        var Camera = /** @class */ (function (_super) {
            __extends(Camera, _super);
            function Camera(width, height) {
                var _this = _super.call(this) || this;
                _this._size = new Frixl.Util.Vector();
                _this._size = new Frixl.Util.Vector(width, height);
                _this._position = new Frixl.Util.Vector();
                console.log('Frixl camera created at size: ' + _this._size);
                return _this;
            }
            return Camera;
        }(Entity.Positionable));
        Entity.Camera = Camera;
    })(Entity = Frixl.Entity || (Frixl.Entity = {}));
})(Frixl || (Frixl = {}));
/// <reference path='./Positionable.ts' />
var Frixl;
/// <reference path='./Positionable.ts' />
(function (Frixl) {
    var Entity;
    (function (Entity) {
        var Sprite = /** @class */ (function (_super) {
            __extends(Sprite, _super);
            function Sprite(_url) {
                var _this = _super.call(this) || this;
                _this._url = _url;
                return _this;
            }
            return Sprite;
        }(Entity.Positionable));
        Entity.Sprite = Sprite;
    })(Entity = Frixl.Entity || (Frixl.Entity = {}));
})(Frixl || (Frixl = {}));
var Frixl;
(function (Frixl) {
    var IO;
    (function (IO) {
        var TextureBuffer = /** @class */ (function () {
            function TextureBuffer() {
            }
            TextureBuffer.loadTexture = function (url, callback) {
                if (callback === void 0) { callback = null; }
                try {
                    var img = TextureBuffer.getTexture(url);
                }
                catch (e) {
                    var img_1 = new Image();
                    var me = this;
                    me._textures[url] = img_1;
                    img_1.src = url;
                    img_1.onload = function () {
                        console.log('Loaded texture: ' + url);
                        if (callback) {
                            callback();
                        }
                    };
                }
            };
            TextureBuffer.getTexture = function (url) {
                if (!(url in TextureBuffer._textures)) {
                    throw url + ' was not found in textures. You must load a texture before you can use it.';
                }
                return TextureBuffer._textures[url];
            };
            TextureBuffer._textures = {};
            return TextureBuffer;
        }());
        IO.TextureBuffer = TextureBuffer;
    })(IO = Frixl.IO || (Frixl.IO = {}));
})(Frixl || (Frixl = {}));
var Frixl;
(function (Frixl) {
    var Util;
    (function (Util) {
        var Vector = /** @class */ (function () {
            function Vector(x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                this.x = x;
                this.y = y;
            }
            Vector.prototype.toString = function () {
                return '[x:' + this.x + ', y:' + this.y + ']';
            };
            return Vector;
        }());
        Util.Vector = Vector;
    })(Util = Frixl.Util || (Frixl.Util = {}));
})(Frixl || (Frixl = {}));
//# sourceMappingURL=frixl.js.map