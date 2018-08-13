namespace Frixl.Util {

    export class DefaultLogger implements ILogger {
        private _level: LogLevel = LogLevel.Debug;

        get loglevel(): LogLevel {
            return this._level;
        }
        set logLevel(level: LogLevel) {
            this._level = level;
        }

        debug(msg: string): void {
            if(this._level <= LogLevel.Debug) {
                this.log('DEBUG: ' + msg);
            }
        }

        info(msg: string): void {
            if(this._level <= LogLevel.Info) {
                this.log('INFO: ' + msg);
            }
        }

        warn(msg: string): void {
            if(this._level <= LogLevel.Warn) {
                this.log('WARN: ' + msg);
            }
        }

        error(msg: string): void {
            if(this._level <= LogLevel.Error) {
                this.log('ERROR: ' + msg);
            }
        }

        log(msg: string): void {
            console.log(msg);
        }
    }
}