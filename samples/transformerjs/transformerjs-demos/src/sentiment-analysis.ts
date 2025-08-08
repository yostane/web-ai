import {
  pipeline,
  TextClassificationPipeline,
  type PretrainedModelOptions,
} from "@huggingface/transformers";

import { log } from "./utils";

export class SentimentAnalysisHelper {
  pipelineOptions?: PretrainedModelOptions = undefined;
  classifier: TextClassificationPipeline | null = null;

  constructor(useWebGPU: boolean) {
    if (useWebGPU) {
      this.pipelineOptions = {
        device: "webgpu",
      };
    }
  }

  async analyze(message: string): Promise<string> {
    await this.setup();
    if (this.classifier == null) {
      throw new Error("Classifier is not initialized");
    }

    const output = (await this.classifier(message)) as any;
    log("Analyzing message:", message, "output:", output);
    return output[0].label;
  }

  private async setup() {
    if (this.classifier == null) {
      const classifier = await pipeline(
        "sentiment-analysis",
        undefined,
        this.pipelineOptions
      );
      this.classifier = classifier;
    }
  }
}
