# GenAI Paris 2025 Slides

To start the slide show:

- `bun install`
- `bun run dev`

## Prepare the demos before the talk

- Signaling server for the live chat demo

  ```bash
  cd ../samples/seamless-international-chat/seamless-intl-chat-signaling-server
  bun install
  bun run dev
  ```

- Local Ollama server for the on-premise AI demo

  ```bash
  cd
  ollama serve
  cd ../samples/ollama/ollama-express-demo
  bun install
  bun run dev
  ```

- Streamlit AI chat demo [aistudio.google.com](https://aistudio.google.com), Check that your [proxy does not block this page](https://generativelanguage.googleapis.com/)

  ```bash
  cd ../samples/streamlit/streamlit-ai-chat-demo
  pip install -r requirements.txt
  stre>amlit run app.py
  ```
