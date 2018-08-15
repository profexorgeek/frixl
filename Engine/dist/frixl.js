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
        Object.defineProperty(Game.prototype, "camera", {
            get: function () {
                return this._camera;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game.prototype, "renderer", {
            get: function () {
                return this._renderer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game.prototype, "input", {
            get: function () {
                return this._input;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game.prototype, "canvas", {
            get: function () {
                return this._canvas;
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
        Object.defineProperty(Game.prototype, "activeView", {
            get: function () {
                return this._activeView;
            },
            set: function (view) {
                this._activeView = view;
            },
            enumerable: true,
            configurable: true
        });
        Game.prototype.initialize = function (canvas, fps) {
            this.logger.debug('Initializing game.');
            this._canvas = canvas;
            this._fps = fps;
            this._camera = new Frixl.Rendering.Camera(this._canvas.width, this._canvas.height);
            this._renderer = new Frixl.Rendering.DefaultRenderer();
            this._gameTime = new Frixl.GameTime();
            this._input = new Frixl.Input.InputHandler();
            this.activeView = new Frixl.Views.View();
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
            var delta = this._gameTime.frameSeconds;
            if (this._activeView) {
                this._activeView.update(delta);
            }
            if (this._camera) {
                this._camera.update(delta);
            }
            if (this._input) {
                this._input.update(delta);
            }
            this.draw();
        };
        Game.prototype.draw = function () {
            if (this._activeView != null) {
                this._renderer.draw(this._activeView.positionables, this._camera, this._canvas);
            }
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
    var Entities;
    (function (Entities) {
        var Positionable = /** @class */ (function () {
            function Positionable() {
                this._position = new Frixl.Util.Vector();
                this._velocity = new Frixl.Util.Vector();
                this._acceleration = new Frixl.Util.Vector();
                this._rotation = 0;
                this._rotationVelocity = 0;
                this._drag = 0;
                this._layer = 0;
                this._children = new Array();
                this._parent = null;
            }
            Object.defineProperty(Positionable.prototype, "rotation", {
                // #region Properties
                get: function () {
                    return this._rotation;
                },
                set: function (rot) {
                    this._rotation = rot;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Positionable.prototype, "velocity", {
                get: function () {
                    return this._velocity;
                },
                set: function (vel) {
                    this._velocity = vel;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Positionable.prototype, "rotationVelocity", {
                get: function () {
                    return this._rotationVelocity;
                },
                set: function (vel) {
                    this._rotationVelocity = vel;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Positionable.prototype, "children", {
                get: function () {
                    return this._children;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Positionable.prototype, "parent", {
                get: function () {
                    return this._parent;
                },
                set: function (p) {
                    this._parent = p;
                },
                enumerable: true,
                configurable: true
            });
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
            Object.defineProperty(Positionable.prototype, "layer", {
                get: function () {
                    return this._layer;
                },
                set: function (l) {
                    this._layer = l;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Positionable.prototype, "absolutePosition", {
                get: function () {
                    var abs = new Frixl.Util.Vector();
                    if (this._parent != null) {
                        abs.x = Math.cos(this._parent.absoluteRotation) * this._position.x;
                        abs.y = Math.cos(this._parent.absoluteRotation) * this._position.y;
                    }
                    else {
                        abs.x = this._position.x;
                        abs.y = this._position.y;
                    }
                    return abs;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Positionable.prototype, "absoluteRotation", {
                get: function () {
                    var rot = this._rotation;
                    if (this._parent != null) {
                        rot += this._parent.absoluteRotation;
                    }
                    return rot;
                },
                enumerable: true,
                configurable: true
            });
            // #endregion
            Positionable.prototype.addChild = function (c) {
                c.parent = this;
                this._children.push(c);
            };
            Positionable.prototype.removeChild = function (c) {
                var i = this._children.indexOf(c);
                if (i > 0) {
                    this._children.splice(i, 1);
                }
                c.parent = null;
            };
            Positionable.prototype.attachTo = function (p) {
                p.addChild(this);
            };
            Positionable.prototype.detach = function () {
                if (this._parent != null) {
                    this._parent.removeChild(this);
                }
            };
            Positionable.prototype.update = function (delta) {
                var deltaSquaredHalved = delta * delta / 2;
                var twoPi = Math.PI * 2;
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
                for (var i = 0; i < this._children.length; i += 1) {
                    this._children[i].update(delta);
                }
            };
            return Positionable;
        }());
        Entities.Positionable = Positionable;
    })(Entities = Frixl.Entities || (Frixl.Entities = {}));
})(Frixl || (Frixl = {}));
var Frixl;
(function (Frixl) {
    var Entities;
    (function (Entities) {
        var Sprite = /** @class */ (function (_super) {
            __extends(Sprite, _super);
            function Sprite(textureName) {
                var _this = _super.call(this) || this;
                _this._alpha = 1;
                _this._textureCoords = new Frixl.Util.Rectangle();
                _this.textureName = textureName;
                return _this;
            }
            Object.defineProperty(Sprite.prototype, "alpha", {
                get: function () {
                    return this._alpha;
                },
                set: function (a) {
                    this._alpha = Frixl.Util.GameUtil.clamp(a, 0, 1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "textureCoords", {
                get: function () {
                    return this._textureCoords;
                },
                set: function (rect) {
                    this._textureCoords = rect;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "textureName", {
                get: function () {
                    return this._textureName;
                },
                set: function (name) {
                    this._textureName = name;
                    var tex = Frixl.Game.instance.renderer.getTexture(this._textureName);
                    if (tex === null) {
                        throw "ERROR: supplied texture is not loaded. Textures must loaded before a Sprite can be created!";
                    }
                    this._textureCoords.setFromTextureCoords(0, 0, tex.width, tex.height);
                },
                enumerable: true,
                configurable: true
            });
            Sprite.prototype.update = function (delta) {
                _super.prototype.update.call(this, delta);
            };
            return Sprite;
        }(Entities.Positionable));
        Entities.Sprite = Sprite;
    })(Entities = Frixl.Entities || (Frixl.Entities = {}));
})(Frixl || (Frixl = {}));
var Frixl;
(function (Frixl) {
    var Input;
    (function (Input) {
        var InputHandler = /** @class */ (function () {
            function InputHandler() {
                var _this = this;
                this._keysDown = {};
                this._keysPushed = {};
                this._buttonsDown = {};
                this.onKeyDown = function (e) {
                    var keyName = Input.Keys[e.keyCode];
                    _this._keysDown[keyName] = true;
                };
                this.onKeyUp = function (e) {
                    var keyName = Input.Keys[e.keyCode];
                    // mark key as no longer down
                    _this._keysDown[keyName] = false;
                    // mark key as having been pressed and then released
                    _this._keysPushed[keyName] = true;
                };
                window.addEventListener("keydown", this.onKeyDown);
                window.addEventListener("keyup", this.onKeyUp);
            }
            InputHandler.prototype.update = function (delta) {
                // clear keys pushed every frame
                for (var key in this._keysPushed) {
                    this._keysPushed[key] = false;
                }
            };
            InputHandler.prototype.keyDown = function (charCode) {
                var keyName = Input.Keys[charCode];
                return this._keysDown[keyName] === true;
            };
            return InputHandler;
        }());
        Input.InputHandler = InputHandler;
    })(Input = Frixl.Input || (Frixl.Input = {}));
})(Frixl || (Frixl = {}));
var Frixl;
(function (Frixl) {
    var Input;
    (function (Input) {
        var Keys;
        (function (Keys) {
            Keys[Keys["Backspace"] = 8] = "Backspace";
            Keys[Keys["Tab"] = 9] = "Tab";
            Keys[Keys["Enter"] = 13] = "Enter";
            Keys[Keys["Shift"] = 16] = "Shift";
            Keys[Keys["Ctrl"] = 17] = "Ctrl";
            Keys[Keys["Alt"] = 18] = "Alt";
            Keys[Keys["PauseBreak"] = 19] = "PauseBreak";
            Keys[Keys["CapsLock"] = 20] = "CapsLock";
            Keys[Keys["Esc"] = 27] = "Esc";
            Keys[Keys["Space"] = 32] = "Space";
            Keys[Keys["PageUp"] = 33] = "PageUp";
            Keys[Keys["PageDown"] = 34] = "PageDown";
            Keys[Keys["End"] = 35] = "End";
            Keys[Keys["Home"] = 36] = "Home";
            Keys[Keys["Left"] = 37] = "Left";
            Keys[Keys["Up"] = 38] = "Up";
            Keys[Keys["Right"] = 39] = "Right";
            Keys[Keys["Down"] = 40] = "Down";
            Keys[Keys["Insert"] = 45] = "Insert";
            Keys[Keys["Delete"] = 46] = "Delete";
            Keys[Keys["Oem0"] = 48] = "Oem0";
            Keys[Keys["Oem1"] = 49] = "Oem1";
            Keys[Keys["Oem2"] = 50] = "Oem2";
            Keys[Keys["Oem3"] = 51] = "Oem3";
            Keys[Keys["Oem4"] = 52] = "Oem4";
            Keys[Keys["Oem5"] = 53] = "Oem5";
            Keys[Keys["Oem6"] = 54] = "Oem6";
            Keys[Keys["Oem7"] = 55] = "Oem7";
            Keys[Keys["Oem8"] = 56] = "Oem8";
            Keys[Keys["Oem9"] = 57] = "Oem9";
            Keys[Keys["A"] = 65] = "A";
            Keys[Keys["B"] = 66] = "B";
            Keys[Keys["C"] = 67] = "C";
            Keys[Keys["D"] = 68] = "D";
            Keys[Keys["E"] = 69] = "E";
            Keys[Keys["F"] = 70] = "F";
            Keys[Keys["G"] = 71] = "G";
            Keys[Keys["H"] = 72] = "H";
            Keys[Keys["I"] = 73] = "I";
            Keys[Keys["J"] = 74] = "J";
            Keys[Keys["K"] = 75] = "K";
            Keys[Keys["L"] = 76] = "L";
            Keys[Keys["M"] = 77] = "M";
            Keys[Keys["N"] = 78] = "N";
            Keys[Keys["O"] = 79] = "O";
            Keys[Keys["P"] = 80] = "P";
            Keys[Keys["Q"] = 81] = "Q";
            Keys[Keys["R"] = 82] = "R";
            Keys[Keys["S"] = 83] = "S";
            Keys[Keys["T"] = 84] = "T";
            Keys[Keys["U"] = 85] = "U";
            Keys[Keys["V"] = 86] = "V";
            Keys[Keys["W"] = 87] = "W";
            Keys[Keys["X"] = 88] = "X";
            Keys[Keys["Y"] = 89] = "Y";
            Keys[Keys["Z"] = 90] = "Z";
            Keys[Keys["Windows"] = 91] = "Windows";
            Keys[Keys["RightClick"] = 93] = "RightClick";
            Keys[Keys["Num0"] = 96] = "Num0";
            Keys[Keys["Num1"] = 97] = "Num1";
            Keys[Keys["Num2"] = 98] = "Num2";
            Keys[Keys["Num3"] = 99] = "Num3";
            Keys[Keys["Num4"] = 100] = "Num4";
            Keys[Keys["Num5"] = 101] = "Num5";
            Keys[Keys["Num6"] = 102] = "Num6";
            Keys[Keys["Num7"] = 103] = "Num7";
            Keys[Keys["Num8"] = 104] = "Num8";
            Keys[Keys["Num9"] = 105] = "Num9";
            Keys[Keys["NumStar"] = 106] = "NumStar";
            Keys[Keys["NumPlus"] = 107] = "NumPlus";
            Keys[Keys["NumMinus"] = 109] = "NumMinus";
            Keys[Keys["NumPeriod"] = 110] = "NumPeriod";
            Keys[Keys["NumSlash"] = 111] = "NumSlash";
            Keys[Keys["F1"] = 112] = "F1";
            Keys[Keys["F2"] = 113] = "F2";
            Keys[Keys["F3"] = 114] = "F3";
            Keys[Keys["F4"] = 115] = "F4";
            Keys[Keys["F5"] = 116] = "F5";
            Keys[Keys["F6"] = 117] = "F6";
            Keys[Keys["F7"] = 118] = "F7";
            Keys[Keys["F8"] = 119] = "F8";
            Keys[Keys["F9"] = 120] = "F9";
            Keys[Keys["F10"] = 121] = "F10";
            Keys[Keys["F11"] = 122] = "F11";
            Keys[Keys["F12"] = 123] = "F12";
            Keys[Keys["NumLock"] = 144] = "NumLock";
            Keys[Keys["ScrollLock"] = 145] = "ScrollLock";
            Keys[Keys["MyComputer"] = 182] = "MyComputer";
            Keys[Keys["MyCalculator"] = 183] = "MyCalculator";
            Keys[Keys["Semicolon"] = 186] = "Semicolon";
            Keys[Keys["Equal"] = 187] = "Equal";
            Keys[Keys["Comma"] = 188] = "Comma";
            Keys[Keys["Dash"] = 189] = "Dash";
            Keys[Keys["Period"] = 190] = "Period";
            Keys[Keys["ForwardSlash"] = 191] = "ForwardSlash";
            Keys[Keys["Tick"] = 192] = "Tick";
            Keys[Keys["LeftBracket"] = 219] = "LeftBracket";
            Keys[Keys["Backslash"] = 220] = "Backslash";
            Keys[Keys["RightBracket"] = 221] = "RightBracket";
            Keys[Keys["SingleQuote"] = 222] = "SingleQuote";
        })(Keys = Input.Keys || (Input.Keys = {}));
    })(Input = Frixl.Input || (Frixl.Input = {}));
})(Frixl || (Frixl = {}));
/// <reference path='../Entities/Positionable.ts' />
var Frixl;
/// <reference path='../Entities/Positionable.ts' />
(function (Frixl) {
    var Rendering;
    (function (Rendering) {
        var Camera = /** @class */ (function (_super) {
            __extends(Camera, _super);
            function Camera(width, height) {
                var _this = _super.call(this) || this;
                _this._size = new Frixl.Util.Vector();
                _this._background = 'CornflowerBlue';
                _this._size = new Frixl.Util.Vector(width, height);
                _this._position = new Frixl.Util.Vector();
                Frixl.Game.instance.logger.debug('Frixl camera created at size: ' + _this._size);
                return _this;
            }
            Object.defineProperty(Camera.prototype, "background", {
                get: function () {
                    return this._background;
                },
                set: function (color) {
                    this._background = color;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "left", {
                get: function () {
                    return this._position.x - (this._size.x / 2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "right", {
                get: function () {
                    return this._position.x + (this._size.x / 2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "top", {
                get: function () {
                    return this._position.y + (this._size.y / 2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "bottom", {
                get: function () {
                    return this._position.y - (this._size.y / 2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "randomVectorInView", {
                get: function () {
                    return new Frixl.Util.Vector(Frixl.Util.GameUtil.randomInRange(this.left, this.right), Frixl.Util.GameUtil.randomInRange(this.bottom, this.top));
                },
                enumerable: true,
                configurable: true
            });
            return Camera;
        }(Frixl.Entities.Positionable));
        Rendering.Camera = Camera;
    })(Rendering = Frixl.Rendering || (Frixl.Rendering = {}));
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
            GameUtil.clamp = function (val, min, max) {
                var ret = val;
                if (val > max) {
                    ret = max;
                }
                if (val < min) {
                    ret = min;
                }
                return ret;
            };
            GameUtil.randomInRange = function (min, max) {
                var range = max - min;
                var val = Math.random() * range;
                return val + min;
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
                this._textures = {};
            }
            DefaultRenderer.prototype.loadTexture = function (url, callback) {
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
            DefaultRenderer.prototype.getTexture = function (url) {
                var texture = null;
                if ((url in this._textures) && this._textures[url] !== null) {
                    texture = this._textures[url];
                }
                else {
                    Frixl.Game.instance.logger.warn('Texture ' + url + ' was not found. It should be preloaded.');
                }
                return texture;
            };
            DefaultRenderer.prototype.draw = function (positionables, camera, canvas) {
                var context = canvas.getContext('2d');
                var camTransX = Frixl.Util.GameUtil.invert(camera.x) + context.canvas.width / 2;
                var camTransY = camera.y + (context.canvas.height / 2);
                context.fillStyle = camera.background;
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.save();
                context.translate(camTransX, camTransY);
                for (var i = 0; i < positionables.length; i++) {
                    this.drawPositionable(positionables[i], context);
                }
                context.restore();
            };
            DefaultRenderer.prototype.drawPositionable = function (positionable, context) {
                var transX = positionable.x;
                var transY = Frixl.Util.GameUtil.invert(positionable.y);
                var rot = Frixl.Util.GameUtil.invert(positionable.rotation);
                context.save();
                context.translate(transX, transY);
                context.rotate(rot);
                // choose draw method based on type
                if (positionable instanceof Frixl.Entities.Sprite) {
                    this.drawSprite(positionable, context);
                }
                for (var i = 0; i < positionable.children.length; i += 1) {
                    if (positionable.children[i] instanceof Frixl.Entities.Sprite) {
                        this.drawPositionable(positionable.children[i], context);
                    }
                }
                context.restore();
            };
            DefaultRenderer.prototype.drawSprite = function (sprite, context) {
                var texture = null;
                if (!Frixl.Util.GameUtil.empty(sprite.textureName)) {
                    texture = this.getTexture(sprite.textureName);
                }
                var alpha = sprite.alpha;
                context.globalAlpha = alpha;
                if (texture) {
                    var coords = sprite.textureCoords;
                    context.drawImage(texture, coords.left, coords.top, coords.width, coords.height, coords.width / -2, coords.height / -2, coords.width, coords.height);
                }
                context.globalAlpha = 1;
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
        var Rectangle = /** @class */ (function () {
            function Rectangle(x, y, width, height) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                this._left = 0;
                this._top = 0;
                this._right = 0;
                this._bottom = 0;
                this._position = new Util.Vector();
                this._size = new Util.Vector();
                this._position = new Util.Vector(x, y);
                this._size = new Util.Vector(width, height);
            }
            Object.defineProperty(Rectangle.prototype, "position", {
                get: function () {
                    return this._position;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "size", {
                get: function () {
                    return this._size;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "x", {
                get: function () {
                    return this._position.x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "y", {
                get: function () {
                    return this._position.y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "width", {
                get: function () {
                    return this._size.x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "height", {
                get: function () {
                    return this._size.y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "left", {
                get: function () {
                    return this._left;
                },
                set: function (left) {
                    this._left = left;
                    this.updateSizeAndPosition();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "top", {
                get: function () {
                    return this._top;
                },
                set: function (top) {
                    this._top = top;
                    this.updateSizeAndPosition();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "right", {
                get: function () {
                    return this._right;
                },
                set: function (right) {
                    this._right = right;
                    this.updateSizeAndPosition();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "bottom", {
                get: function () {
                    return this._bottom;
                },
                set: function (bottom) {
                    this._bottom = bottom;
                    this.updateSizeAndPosition();
                },
                enumerable: true,
                configurable: true
            });
            Rectangle.prototype.updateSizeAndPosition = function () {
                this._size.x = Math.abs(this.right - this.left);
                this._size.y = Math.abs(this.top - this.bottom);
                this._position.x = this.left + this.size.x / 2;
                this._position.y = this.bottom + this.size.y / 2;
            };
            Rectangle.prototype.setEdges = function (left, top, right, bottom) {
                this._left = left;
                this._top = top;
                this._right = right;
                this._bottom = bottom;
                this.updateSizeAndPosition();
            };
            Rectangle.prototype.setFromTextureCoords = function (left, top, width, height) {
                // texture coords count from the top so we invert them for the renderer
                this.setEdges(left, top, left + width, top - height);
            };
            return Rectangle;
        }());
        Util.Rectangle = Rectangle;
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
var Frixl;
(function (Frixl) {
    var Views;
    (function (Views) {
        var View = /** @class */ (function () {
            function View() {
                this._positionables = new Array();
            }
            Object.defineProperty(View.prototype, "positionables", {
                get: function () {
                    return this._positionables;
                },
                enumerable: true,
                configurable: true
            });
            View.prototype.update = function (delta) {
                for (var i = this._positionables.length - 1; i > -1; i -= 1) {
                    this._positionables[i].update(delta);
                }
            };
            View.prototype.addPositionable = function (positionable) {
                var drawLayer = this._positionables.length - 1;
                for (var i = 0; i < this._positionables.length; i += 1) {
                    if (positionable.layer < this._positionables[i].layer) {
                        drawLayer = i;
                        break;
                    }
                }
                this._positionables.splice(drawLayer, 0, positionable);
            };
            View.prototype.addSprites = function (sprites) {
                for (var i = 0; i < sprites.length; i += 1) {
                    this.addPositionable(sprites[i]);
                }
            };
            View.prototype.removePositionable = function (positionable) {
                var index = this._positionables.indexOf(positionable);
                if (index >= 0) {
                    this._positionables.splice(index, 1);
                }
            };
            View.prototype.removeSprites = function (sprites) {
                for (var i = 0; i < sprites.length; i++) {
                    this.removePositionable(sprites[i]);
                }
            };
            View.prototype.clearSprites = function () {
                this._positionables = new Array();
            };
            return View;
        }());
        Views.View = View;
    })(Views = Frixl.Views || (Frixl.Views = {}));
})(Frixl || (Frixl = {}));
//# sourceMappingURL=frixl.js.map