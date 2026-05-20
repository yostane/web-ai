---
mdc: true
hideInToc: false
---

# Transformers.js

<div style="display: flex; flex-direction: column; justify-content: center; height: 80%;">

- Développé par [Joshua Lochner](https://www.linkedin.com/in/xenova/) (alias Xenova) de <logos-hugging-face-icon /> [Hugging Face](https://huggingface.co/).
- Exécution de modèles IA dans le navigateur ou un runtime JS (Node.js, bun, Deno).
- Les modèles sont au format [ONNX](https://onnx.ai/) (outils de conversion disponibles)
- De nombreux modèles sont disponibles sur le [Hub de modèles Hugging Face](https://huggingface.co/models?library=transformers.js)

</div>


---

# Transformers.js Pipeline

- API de haut niveau pour les tâches courantes (génération de texte, analyse de sentiment, etc.)
- Certaines tâches nécessitent une configuration supplémentaire (par exemple, les embeddings pour la synthèse vocale)

```ts
import { pipeline } from "@huggingface/transformers.js";
// task identifier: "text-generation", "translation", etc.
const task = "sentiment-analysis";
// (optional) model identifier from Hugging Face
const modelId = "Xenova/bert-base-multilingual-uncased-sentiment";
// (optional) options: logging, device, etc.
const options = { device: "webgpu" };
const model = await pipeline(task, modelId, options);
const result = (await model("I love transformers!")) as any;
console.log(result);
// # [{'label': 'POSITIVE', 'score': 0.999806941}]
```

---
layout: center
---

# Démo : chatbot audio local

| Identifiant de tâche         | Modèle                   |
| ---------------------------- | ------------------------ |
| automatic-speech-recognition | `Xenova/whisper-tiny.en` |
| Text-to-Speech               | `Xenova/speecht5_tts`    |
| text-generation              | `Xenova/distilgpt2`      |

- [Lancer la démo](https://yostane.github.io/web-ai/transformersjs-audio-chat/)


---
layout: center
---

# Démos proposées par Xenova

- [AI Code Playground](https://huggingface.co/spaces/Xenova/ai-code-playground)
- [Doodle Dash Sketch recognition](https://huggingface.co/spaces/Xenova/doodle-dash)
- [MusicGen Web](https://huggingface.co/spaces/Xenova/musicgen-web)

[Et plein d'autres !](https://huggingface.co/collections/Xenova/transformersjs-demos)