namespace Frixl.Content {

    export class DefaultContentManager implements IContentManager {

        private _audioContext: AudioContext;
        private _assets: any = {};

        get audioContext(): AudioContext {
            return this._audioContext;
        }

        constructor() {
            try {
                this._audioContext = new AudioContext();
            }
            catch(e) {
                Game.instance.logger.error('Web Audio API is not supported by this browser.');
                this._audioContext = null;
            }
        }

        private loadAsset(url: string, responseType: XMLHttpRequestResponseType = 'json', success: Function = null, fail: Function = null): void {
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            let me = this;
            let log = Game.instance.logger;

            xhr.addEventListener('readystatechange', () => {
                if(xhr.readyState === XMLHttpRequest.DONE) {
                    if(xhr.status === 200) {
                        log.debug('Loaded asset: ' + url);

                        me._assets[url] = xhr.response;

                        if(success) {
                            success(xhr.response);
                        }
                    }
                    else {
                        log.debug('Bad response for ' + url + ' - ' + xhr.status);

                        if(fail) {
                            fail(xhr.response);
                        }
                    }
                }
            });

            xhr.responseType = responseType;
            xhr.open('GET', url, true);
            xhr.send();
        }

        loadJson<T>(url: string, success?: Function, fail?: Function): void {
            let me = this;
            let log = Game.instance.logger;
            this.loadAsset(url, 'json',
                function(response: any) {
                    try {
                        let obj:T = JSON.parse(response);
                        me._assets[url] = obj;
                        if(success) {
                            success(response);
                        }
                    }
                    catch {
                        log.error('Failed to load or parse json: ' + url);
                        if(fail) {
                            fail(response);
                        }
                    }
                },
                fail
            );
        }

        loadTexture(url: string, success?: Function, fail?: Function): void {
            let me = this;
            let log = Game.instance.logger;
            this.loadAsset(url, 'blob',
                function (response: any) {

                    let img = document.createElement('img');
                    img.src = URL.createObjectURL(response);
                    me._assets[url] = img;
                    if(success) {
                        success(response);
                    }
                },
                fail
            );
        }

        loadSound(url: string, success?: Function, fail?: Function): void {
            let me = this;
            let log = Game.instance.logger;
            this.loadAsset(url, 'arraybuffer', 
                function(response: any) {
                    if(response instanceof ArrayBuffer && me._audioContext) {
                        me._audioContext.decodeAudioData(response,
                            function(buffer: AudioBuffer) {
                                me._assets[url] = buffer;
                                log.debug('Decoded audio file: ' + url);
                                if(success) {
                                    success(buffer);
                                }
                            },
                            function() {
                                log.error('Failed to decode audio: ' + url);
                                if(fail) {
                                    fail();
                                }
                            }
                        );
                    }
                    else {
                        log.error('Failed to load data: ' + url);
                        if(fail) {
                            fail(response);
                        }
                    }
                },
                fail
            );
        }

        getAsset<T>(url: string): T {
            let asset: T = null;

            if(url in this._assets) {
                asset = this._assets[url];
            }

            return asset;
        }

        unloadAsset(url: string): void {

            if(url in this._assets) {
                delete(this._assets[url]);
            }

        }

    }
}