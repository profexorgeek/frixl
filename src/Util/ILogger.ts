namespace Frixl.Util {

    export enum LogLevel {
        Debug = 0,
        Info = 1,
        Warn = 2,
        Error = 3
    };

    export interface ILogger {
        loglevel: LogLevel;
        debug(msg: string): void;
        info(msg: string): void;
        warn(msg: string): void;
        error(msg: string): void;
        log(msg: string): void;
    }
}