namespace Frixl.Audio {

    export class AudioHandler {

        public playSound(url: string): void {
            let buffer = Game.instance.content.getAsset<AudioBuffer>(url);
            let ctx = Game.instance.content.audioContext;
            if(buffer && ctx) {
                let src = ctx.createBufferSource();
                src.buffer = buffer;
                src.connect(ctx.destination);
                src.start(0);
            }
        }
    }
}