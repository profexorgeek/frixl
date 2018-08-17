namespace Frixl.Rendering {
    
    export class Animation implements IUpdateable {
        private _name: string = '';
        private _frames: Array<Frame> = new Array<Frame>();
        private _textureName: string;
        private _secLeftInFrame: number = 0;
        private _frameIndex: number = -1;
        private _playing: boolean = false;
        private _looping: boolean = true;

        get name(): string {
            return this._name;
        }
        set name(name: string) {
            this._name = name;
        }

        get frames(): Array<Frame> {
            return this._frames;
        }
        set frames(frames: Array<Frame>) {
            this._frames = frames;
        }

        get frameIndex(): number {
            while(this._frameIndex > this._frames.length) {
                this._frameIndex -= this._frames.length;
            }

            return this._frameIndex;
        }
        set frameIndex(i: number) {
            while(i > this._frames.length) {
                i -= this._frames.length;
            }
            this._frameIndex = i;
        }

        get currentFrame(): Frame {
            let f: Frame = null;
            if(this._frames) {
                f = this._frames[this._frameIndex];
            }

            return f;
        }

        get textureName(): string {
            return this._textureName;
        }
        set textureName(name: string) {
            this._textureName = name;
        }

        get looping(): boolean {
            return this._looping;
        }
        set looping(looping: boolean) {
            this._looping = looping;
        }

        start() {
            if(this._frameIndex < 0) {
                this.restart();
            }
            this._playing = true;
        }

        stop() {
            this._playing = false;
        }

        restart() {
            this._frameIndex = 0;
            this._secLeftInFrame = this.currentFrame.frameSeconds;
            this._playing = true;
        }

        update(delta: number): void {
            if(this._playing && this._frames && this._frames.length > 1) {
                this._secLeftInFrame -= delta;

                while(this._secLeftInFrame <= 0) {

                    if(this._frameIndex < this._frames.length - 1) {
                        this._frameIndex += 1;
                    }
                    else {
                        if(this._looping) {
                            this._frameIndex = 0;
                        }
                    }

                    this._secLeftInFrame += this.currentFrame.frameSeconds;

                    // if we still have zero seconds in frame at this point
                    // we will never exit this loop! Force exit
                    if(this.currentFrame.frameSeconds <= 0) {
                        break;
                    }
                }
            }
        }

    }
}