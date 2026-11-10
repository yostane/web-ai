---
mdc: true
hideInToc: false
---

# Transformers.js

<div style="display: flex; flex-direction: column; justify-content: center; height: 80%;">

- Developed by [Joshua Lochner (@Xenova)](https://www.linkedin.com/in/xenova/)
- Provided and hosted by <logos-hugging-face-icon /> [Hugging Face](https://huggingface.co/docs/transformers.js)
- Runs models in the browser or a JS runtime (Node.js, Bun, Deno)
- Models use the [ONNX format](https://onnx.ai/)
  - Other formats can be converted [to ONNX](https://github.com/huggingface/optimum#onnx--onnx-runtime)
  - Many ONNX models can be found in the <logos-hugging-face-icon /> [model hub](https://huggingface.co/models?library=transformers.js)

</div>

---

# Transformers.js Pipeline

- High-level API for common tasks (text generation, sentiment analysis, etc.)
- Some tasks require additional configuration

```ts
import { pipeline } from "@huggingface/transformers.js";
// task identifier: "text-generation", "translation", etc.
const task = "sentiment-analysis";
// (optional) model identifier from Hugging Face
const modelId = "Xenova/bert-base-multilingual-uncased-sentiment";
// (optional) options: logging, device, etc.
const options = { device: "webgpu" };
const model = await pipeline(task, modelId, options);
const result = await model("I love transformers!");
console.log(result);
// # [{'label': 'POSITIVE', 'score': 0.999806941}]
```

---

# Demos

## From Xenova

- [AI Code Playground](https://huggingface.co/spaces/Xenova/ai-code-playground)
- [Doodle Dash sketch recognition](https://huggingface.co/spaces/Xenova/doodle-dash)
- [MusicGen Web](https://huggingface.co/spaces/Xenova/musicgen-web)

[And many more!](https://huggingface.co/collections/Xenova/transformersjs-demos)

## Audio chat

| Task identifier              | Model                    |
| ---------------------------- | ------------------------ |
| automatic-speech-recognition | `Xenova/whisper-tiny.en` |
| Text-to-Speech               | `Xenova/speecht5_tts`    |
| text-generation              | `Xenova/distilgpt2`      |

- [Launch the demo](https://yostane.github.io/web-ai/transformersjs-audio-chat/)
