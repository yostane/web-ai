import {
  Pipeline,
  pipeline,
  TextClassificationPipeline,
} from "@huggingface/transformers";

class SentimentAnalysisHelper {
  classifier: TextClassificationPipeline;
  constructor() {}

  async analyze() {
    if (!this.classifier) {
      this.classifier = (await pipeline(
        "sentiment-analysis"
      )) as TextClassificationPipeline;
    }
    return this.classifier("I love transformers!");
  }
}
