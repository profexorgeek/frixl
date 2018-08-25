namespace Frixl.Content {

    export interface IContentManager {

        readonly audioContext: AudioContext;

        loadJson<T>(url: string, success?: Function, fail?: Function): void;
        loadTexture(url: string, success?: Function, fail?: Function): void;
        loadSound(url: string, success?: Function, fail?: Function): void;

        getAsset<T>(url: string): T;

        unloadAsset(url: string): void;
    }
}