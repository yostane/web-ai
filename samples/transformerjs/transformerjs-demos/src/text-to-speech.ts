import { pipeline, TextToAudioPipeline } from "@huggingface/transformers";
import { log } from "./utils";

export class TextToSpeechHelper {
  private synthesizer?: TextToAudioPipeline | undefined;
  private speaker_embeddings =
    "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin";

  constructor() {}

  async setup() {
    if (this.synthesizer) return;
    const synthesizer = await pipeline(
      "text-to-speech",
      "Xenova/speecht5_tts",
      {
        progress_callback: (progress) => {
          log(`Progress`, progress);
        },
      }
    );
    this.synthesizer = synthesizer;
  }

  async speak(text: string): Promise<void> {
    await this.setup();
    if (!this.synthesizer) {
      throw new Error("Speech synthesis not supported");
    }

    const output = await this.synthesizer(text, {
      speaker_embeddings: this.speaker_embeddings,
    });

    const audioContext = new AudioContext();
    const source = audioContext.createBufferSource();
    const audioBuffer = audioContext.createBuffer(
      1,
      output.audio.length,
      output.sampling_rate
    );
    audioBuffer.copyToChannel(output.audio as Float32Array<ArrayBuffer>, 0);
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();

    log(output);
  }
}
