## Transformers.js

- JS library from [Hugging Face](https://huggingface.co/)
- Developed by [Joshua Lochner](https://www.linkedin.com/in/xenova/) (alias Xenova).
- Runs pre-trained AI models directly in the browser or a runtime (Node.js, bun, Deno).
- Models are in the [ONNX format](https://onnx.ai/) (conversion tools available)
- Many models are available on [Hugging Face Model Hub](https://huggingface.co/models?library=transformers.js)

---

## Transformers.js Pipeline

- High-level API for common tasks (text generation, sentiment analysis, etc.)
- Some tasks require extra setup (for example, setup embeddings for text-to-speech)
- Model and options are optional

```ts
import { pipeline } from "@huggingface/transformers.js";

// task identifier: "text-generation", "translation", etc.
const task = "sentiment-analysis";
// (optional) model identifier from Hugging Face
const modelId = "'Xenova/bert-base-multilingual-uncased-sentiment'";
// (optional) options: logging, device, etc.
const options = { device: "webgpu" };
const model = await pipeline(task, modelId, options);
const result = (await model("I love transformers!")) as any;
console.log(result);
// # [{'label': 'POSITIVE', 'score': 0.999806941}]
```

---
layout: iframe-right
url: https://yostane.github.io/web-ai/transformersjs-audio-chat/
class: chatbot-iframe
---

## Demo: Local audio chatbot

| Task id                      | Model                    |
| ---------------------------- | ------------------------ |
| automatic-speech-recognition | `Xenova/whisper-tiny.en` |
| Text-to-Speech               | `Xenova/speecht5_tts`    |
| text-generation              | `Xenova/distilgpt2`      |

<button onclick="reloadAudioChatbotIframe()">Reload demo</button>
