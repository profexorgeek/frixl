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
            Game.instance = this;
            this._logger = new Frixl.Util.DefaultLogger();
            Game.instance.logger.debug('Frixl engine instance created.');
        }
        Object.defineProperty(Game.prototype, "camera", {
            get: function () {
                return this._camera;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game, "instance", {
            get: function () {
                return this._instance;
            },
            set: function (game) {
                this._instance = game;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game.prototype, "logger", {
            get: function () {
                return this._logger;
            },
            set: function (logger) {
                this._logger = logger;
            },
            enumerable: true,
            configurable: true
        });
        Game.prototype.initialize = function (canvas, fps, background) {
            this.logger.debug('Initializing game.');
            this._canvas = canvas;
            this._fps = fps;
            this._background = background;
            this._textures = {};
            this._camera = new Frixl.Entity.Camera(this._canvas.width, this._canvas.height);
            this._renderer = new Frixl.Rendering.DefaultRenderer();
            this._gameTime = new Frixl.GameTime();
        };
        Game.prototype.start = function () {
            this.logger.debug('Starting game.');
            var g = this;
            this._timer = setInterval(function () {
                g.update();
            }, (1000 / this._fps));
        };
        Game.prototype.stop = function () {
            this.logger.debug('Stopping game.');
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
            Frixl.Game.instance.logger.debug('New GameTime object created.');
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
                Frixl.Game.instance.logger.debug('Frixl camera created at size: ' + _this._size);
                return _this;
            }
            return Camera;
        }(Entity.Positionable));
        Entity.Camera = Camera;
    })(Entity = Frixl.Entity || (Frixl.Entity = {}));
})(Frixl || (Frixl = {}));
var Frixl;
(function (Frixl) {
    var IO;
    (function (IO) {
        var TextureBuffer = /** @class */ (function () {
            function TextureBuffer() {
                this._textures = {};
            }
            Object.defineProperty(TextureBuffer, "instance", {
                get: function () {
                    if (this._instance == null) {
                        this._instance = new TextureBuffer();
                    }
                    return this._instance;
                },
                set: function (t) {
                    this._instance = t;
                },
                enumerable: true,
                configurable: true
            });
            TextureBuffer.prototype.loadTexture = function (url, callback) {
                if (callback === void 0) { callback = null; }
                if (!(url in this._textures) || this._textures[url] === null) {
                    Frixl.Game.instance.logger.debug('Loading texture: ' + url);
                    var img_1 = new Image();
                    var me_1 = this;
                    img_1.src = url;
                    img_1.onload = function () {
                        Frixl.Game.instance.logger.debug('Texture loaded: ' + url);
                        me_1._textures[url] = img_1;
                        if (callback) {
                            callback();
                        }
                    };
                }
                else {
                    callback();
                }
            };
            TextureBuffer.prototype.getTexture = function (url, callback) {
                if (callback === void 0) { callback = null; }
                var texture = null;
                if ((url in this._textures) && this._textures[url] !== null) {
                    texture = this._textures[url];
                }
                else {
                    Frixl.Game.instance.logger.warn('Texture ' + url + ' was not found. It should be preloaded.');
                }
                return texture;
            };
            TextureBuffer._instance = null;
            return TextureBuffer;
        }());
        IO.TextureBuffer = TextureBuffer;
    })(IO = Frixl.IO || (Frixl.IO = {}));
})(Frixl || (Frixl = {}));
/// <reference path='./Positionable.ts' />
/// <reference path='../IO/TextureBuffer.ts' />
var Frixl;
/// <reference path='./Positionable.ts' />
/// <reference path='../IO/TextureBuffer.ts' />
(function (Frixl) {
    var Entity;
    (function (Entity) {
        var Drawable = /** @class */ (function (_super) {
            __extends(Drawable, _super);
            function Drawable(url) {
                var _this = _super.call(this) || this;
                _this._url = url;
                var tb = Frixl.IO.TextureBuffer;
                var texture = tb.getTexture(_this._url);
                if (texture === null) {
                    throw "ERROR: supplied texture is not loaded. Textures must be preloaded with the TextureBuffer!";
                }
                _this._size.x = texture.width;
                _this._size.y = texture.height;
                return _this;
            }
            return Drawable;
        }(Entity.Positionable));
        Entity.Drawable = Drawable;
    })(Entity = Frixl.Entity || (Frixl.Entity = {}));
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
/// <reference path='../Util/GameUtil.ts' />
var Frixl;
/// <reference path='../Util/GameUtil.ts' />
(function (Frixl) {
    var Rendering;
    (function (Rendering) {
        var DefaultRenderer = /** @class */ (function () {
            function DefaultRenderer() {
            }
            DefaultRenderer.prototype.draw = function (drawables, camera, canvas, background) {
                var context = canvas.getContext('2d');
                var camTransX = Frixl.Util.GameUtil.invert(camera.x);
                var camTransY = camera.y + (context.canvas.height / 2);
                var fill = Frixl.Util.GameUtil.empty(background) ? 'rgb(0,0,0,0)' : background;
                context.fillStyle = fill;
                context.fillRect(0, 0, canvas.width, canvas.height);
            };
            return DefaultRenderer;
        }());
        Rendering.DefaultRenderer = DefaultRenderer;
    })(Rendering = Frixl.Rendering || (Frixl.Rendering = {}));
})(Frixl || (Frixl = {}));
var Frixl;
(function (Frixl) {
    var Util;
    (function (Util) {
        var DefaultLogger = /** @class */ (function () {
            function DefaultLogger() {
                this._level = Util.LogLevel.Debug;
            }
            Object.defineProperty(DefaultLogger.prototype, "loglevel", {
                get: function () {
                    return this._level;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DefaultLogger.prototype, "logLevel", {
                set: function (level) {
                    this._level = level;
                },
                enumerable: true,
                configurable: true
            });
            DefaultLogger.prototype.debug = function (msg) {
                if (this._level <= Util.LogLevel.Debug) {
                    this.log('DEBUG: ' + msg);
                }
            };
            DefaultLogger.prototype.info = function (msg) {
                if (this._level <= Util.LogLevel.Info) {
                    this.log('INFO: ' + msg);
                }
            };
            DefaultLogger.prototype.warn = function (msg) {
                if (this._level <= Util.LogLevel.Warn) {
                    this.log('WARN: ' + msg);
                }
            };
            DefaultLogger.prototype.error = function (msg) {
                if (this._level <= Util.LogLevel.Error) {
                    this.log('ERROR: ' + msg);
                }
            };
            DefaultLogger.prototype.log = function (msg) {
                console.log(msg);
            };
            return DefaultLogger;
        }());
        Util.DefaultLogger = DefaultLogger;
    })(Util = Frixl.Util || (Frixl.Util = {}));
})(Frixl || (Frixl = {}));
var Frixl;
(function (Frixl) {
    var Util;
    (function (Util) {
        var LogLevel;
        (function (LogLevel) {
            LogLevel[LogLevel["Debug"] = 0] = "Debug";
            LogLevel[LogLevel["Info"] = 1] = "Info";
            LogLevel[LogLevel["Warn"] = 2] = "Warn";
            LogLevel[LogLevel["Error"] = 3] = "Error";
        })(LogLevel = Util.LogLevel || (Util.LogLevel = {}));
        ;
    })(Util = Frixl.Util || (Frixl.Util = {}));
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