import { log } from "./Utils";

export class PromptHelper {
  logElement = document.querySelector("#logs");
  languageModel: LanguageModel | null = null;
  session: LanguageModel | null = null;
  apiName = "LanguageModel";

  constructor() {
    if (!("LanguageModel" in self)) {
      log("Prompt (LanguageModel) API is not supported in this browser.");
      return;
    }
    log(`Prompt (LanguageModel) API is available.`);
  }

  async init(options: LanguageModelCreateOptions = {}) {
    if (!("LanguageModel" in self)) {
      throw new Error("LanguageModel API is not supported in this browser.");
    }
    log(`Model capabilities are ${await LanguageModel.params()}`);
    const available = await LanguageModel.availability();
    if (available === "unavailable") {
      log("LanguageModel API is not available.");
      return;
    }
    if (available === "available") {
      log("LanguageModel API is available.");
    } else {
      log("Downloading language model.");
      options.monitor = (m) => {
        m.addEventListener("downloadprogress", (e) => {
          log(`Downloading ${e.loaded * 100}%`);
        });
      };
      this.languageModel = await LanguageModel.create(options);
    }
    const session = await LanguageModel.create({
      initialPrompts: [
        {
          role: "system",
          content:
            "You are an expert at telling stories. Write a story based on the topic provided by the user. Each story must be different from the previous ones. Just tell a story and don't ask the user for more information",
        },
      ],
      expectedInputs: [{ type: "text" }],
    });
    this.session = session;
  }

  async prompt(
    topic: string,
    streaming: boolean = false
  ): Promise<string | ReadableStream<string>> {
    if (!this.session) {
      throw new Error("LanguageModel is not initialized. Call init() first.");
    }
    const lmPrompt: LanguageModelPrompt = [
      {
        role: "user",
        content: `Tell me a story about this topic: ${topic}.`,
      },
    ];
    if (streaming) {
      return this.session.promptStreaming(lmPrompt);
    } else {
      return this.session.prompt(lmPrompt);
    }
  }
}
