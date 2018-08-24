namespace Frixl.Audio {

    export class AudioHandler {
        private _context: AudioContext;
        private _audioBuffer: any = {};

        constructor() {
            try {
                this._context = new AudioContext();
            }
            catch(e) {
                Frixl.Game.instance.logger.error('Web Audio is not supported by this browser.');
                this._context = null;
            }
        }
    
        public loadSound(url: string, success: Function = null, fail: Function = null): void {
            Frixl.Game.instance.logger.debug("Loading audio: " + url);

            if(this._context) {
                let xhr: XMLHttpRequest = new XMLHttpRequest();
                let me = this;
                xhr.addEventListener('readystatechange', function (e: Event) {

                    if(xhr.readyState === 4) {
                        if(xhr.status === 200) {

                            Frixl.Game.instance.logger.debug('Audio loaded: ' + url);

                            me._context.decodeAudioData(xhr.response, 
                                function (buffer: AudioBuffer) {
                                    Frixl.Game.instance.logger.debug('Audio decoded: ' + url);
                                    me._audioBuffer[url] = buffer;
                                    if(success) {
                                        success();
                                    }
                                },
                                function () {
                                    Frixl.Game.instance.logger.debug('Audio decode failure: ' + url);
                                    if(fail) {
                                        fail();
                                    }
                                }
                            );

                        }
                        else {
                            Frixl.Game.instance.logger.debug('Audio decode failure: ' + url);
                            if(fail) {
                                fail();
                            }
                        }
                    }
                });

                xhr.open('GET', url, true);
                xhr.responseType = 'arraybuffer';
                xhr.send();
            }
            else {
                if(fail) {
                    fail();
                }
            }
        }

        public playSound(url: string): void {
            if(this._context) {
                if(url in this._audioBuffer) {
                    let src = this._context.createBufferSource();
                    src.buffer = this._audioBuffer[url];
                    src.connect(this._context.destination);
                    src.start(0);
                }
            }
        }
    }
}