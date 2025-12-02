# Server-side AI inference

<img v-click.hide border="rounded" src="../assets/webapp-02-serverai.svg" />
<img v-after border="rounded" src="../assets/webapp-02b-serverai-question.svg" />

1. The web app send a request to the backend server
1. If the query requires AI inference, the backend server delegates it to a separate AI service
1. The backend server processes the AI output and sends the final response back to the web app

<div v-after><b>What is the AI service?</b></div>

<style>
.slidev-vclick-hidden {
display: none;
}
</style>

---

## AI inference on the Cloud

<img border="rounded" src="../assets/webapp-02-01-cloudai.svg" />

- Providers: OpenAI, Anthropic, Cohere, etc.
- Pros: Powerful models, easy to use
- Cons: Latency, cost, privacy

---
layout: center
zoom: 1.5
---

### Example with Google Cloud AI

```py
from langchain_google_genai import ChatGoogleGenerativeAI
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-lite", api_key=api_key)
system_message = (
    "system", "You are an expert at explaining programming languages' concepts.")
response = llm.invoke([system_message, human_message])
print(response.content)
```

A free API key can be obtained from [aistudio.google.com](https://aistudio.google.com/api-keys)

<style>
pre {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

---

# AI inference on-premise

<img border="rounded" src="../assets/webapp-03-backend-onpremise-ai.svg" />

- Tools: Llama.cpp, Ollama, etc.
- Pros: More control, no ongoing costs
- Cons: Infrastructure costs, maintenance
