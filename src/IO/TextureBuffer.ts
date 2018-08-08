namespace Frixl.IO {

    export class TextureBuffer {
        private static _instance: TextureBuffer = null;
        private _textures: any = {};

        static get instance(): TextureBuffer {
            if(this._instance == null) {
                this._instance = new TextureBuffer();
            }
            return this._instance;
        }
        static set instance(t: TextureBuffer) {
            this._instance = t;
        }

        private constructor() {}

        public loadTexture(url: string, callback: Function = null): void {

            if(!(url in this._textures) || this._textures[url] === null)
            {
                Frixl.Game.instance.logger.debug('Loading texture: ' + url);
                let img = new Image();
                let me = this;
                img.src = url;
                img.onload = function () {
                    Frixl.Game.instance.logger.debug('Texture loaded: ' + url);
                    me._textures[url] = img;
                    if(callback) {
                        callback();
                    }
                }
            }
            else {
                callback();
            }
        }

        public getTexture(url: string, callback: Function = null) : HTMLImageElement {
            let texture = null;

            if((url in this._textures) && this._textures[url] !== null) {
                texture = this._textures[url];
            }
            else {
                Frixl.Game.instance.logger.warn('Texture ' + url + ' was not found. It should be preloaded.');
            }

            return texture;
        }
    }
}