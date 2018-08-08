namespace Frixl {
    
    export class GameTime {
        private _start:number;
        private _last:number;
        private _current:number;
        private _frameSeconds:number;
        private _totalSeconds:number;

        // TODO: add frame rate averaging features!

        get frameSeconds(): number {
            return this._frameSeconds;
        }

        get totalSeconds(): number {
            return this._totalSeconds;
        }


        constructor() {
            this._start = Date.now();
            this._last = this._start;
            this._current = this._start;
            Frixl.Game.instance.logger.debug('New GameTime object created.');
        }

        update() {
            this._last = this._current;
            this._current = Date.now();
            this._frameSeconds = (this._current - this._last) / 1000;
            this._totalSeconds = (this._current - this._start) / 1000;
        }
    }
}