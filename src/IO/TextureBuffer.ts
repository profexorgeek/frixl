namespace Frixl.IO {

    export class TextureBuffer {
        private static _textures: any = {};

        public static loadTexture(url: string, callback: Function = null): void {

            try {
                var img = TextureBuffer.getTexture(url);
            }
            catch (e) {
                let img = new Image();
                let me = this;

                me._textures[url] = img;

                img.src = url;
                img.onload = function () {
                    console.log('Loaded texture: ' + url);

                    if(callback) {
                        callback();
                    }
                }
            }
        }

        public static getTexture(url: string) : HTMLImageElement {
            if(!(url in TextureBuffer._textures)) {
                throw url + ' was not found in textures. You must load a texture before you can use it.';
            }

            return TextureBuffer._textures[url];
        }
    }
}