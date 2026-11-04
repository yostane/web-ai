# AI on the Web: demos and presentations

This repository collects presentation slides and small, mostly independent demos exploring how AI can be used in web applications. Topics include browser-provided AI APIs, running models in the browser, and connecting web apps to AI services.

Everything can be explored through [this page](https://yostane.github.io/web-ai/).

## Repository structure

- [`slides/`](./slides/) contains Slidev presentations for talks and events. Each subfolder is a separate presentation, with its own `slides.md`, assets, and project configuration.
- [`samples/`](./samples/) contains standalone demos and supporting services. Most web demos have their own `package.json` and can be run independently.
- [`public/`](./public/) contains static assets for the project website.

There is no single root app or install command. Install and run each demo or presentation from its own directory.

## Demos

### Browser AI APIs

Small demos of built-in browser AI capabilities:

- [`prompt-demo/`](./samples/prompt-demo/) — Prompt API
- [`writer-api-demo/`](./samples/writer-api-demo/) — Writer API
- [`rewriter-api-demo/`](./samples/rewriter-api-demo/) — Rewriter API
- [`summarizer-demo/`](./samples/summarizer-demo/) — Summarizer API
- [`translator_api/`](./samples/translator_api/) — Translator API
- [`language-detector-demo/`](./samples/language-detector-demo/) — Language Detector API

Browser support and availability of these APIs can vary. Check the relevant browser documentation and each demo's notes before trying it.

### Models and AI services

- [`transformersjs/transformersjs-demos/`](./samples/transformersjs/transformersjs-demos/) — demos using Transformers.js
- [`transformersjs/transformersjs-audio-chat/`](./samples/transformersjs/transformersjs-audio-chat/) — a local audio chatbot
- [`ollama/ollama-express-demo/`](./samples/ollama/ollama-express-demo/) — a web demo backed by Ollama
- [`streamlit/streamlit-ai-chat-demo/`](./samples/streamlit/streamlit-ai-chat-demo/) — a Streamlit and LangChain chat demo

### Other web AI experiments

- [`seamless-international-chat/`](./samples/seamless-international-chat/) — international chat web app and its signaling server
- [`mail-assistant/`](./samples/mail-assistant/) — mail assistant demo
- [`opencvjs/opencvjs-demo/`](./samples/opencvjs/opencvjs-demo/) — OpenCV.js demo
- [`misc/`](./samples/misc/) — miscellaneous experiments

## Running a demo

Most browser-based samples use Vite and Bun. For example:

```bash
cd samples/writer-api-demo
bun install
bun run dev
```

Use the corresponding sample directory and check its README for any extra setup. Some demos need a separately running service, a model download, or an API key. For example, the Ollama demo requires Ollama, while the chat sample has a separate signaling server. The Streamlit sample uses Python rather than the Vite workflow.
