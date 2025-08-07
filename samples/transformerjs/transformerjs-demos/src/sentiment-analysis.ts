import {
  Pipeline,
  pipeline,
  TextClassificationPipeline,
  type AllTasks,
  type PipelineType,
} from "@huggingface/transformers";

class SentimentAnalysisHelper {
  classifier: TextClassificationPipeline | null = null;
  constructor() {}

  async analyze(message: string): Promise<string> {
    if (this.classifier == null) {
      const classifier = await pipeline("sentiment-analysis");
      this.classifier = classifier;
    }

    const output = await this.classifier(message);
    return "test";
  }
}
