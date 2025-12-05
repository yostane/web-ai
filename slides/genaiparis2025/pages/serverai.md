---
hideInToc: false
---

# AI inference on the server

<img class="svgimg" v-click.hide border="rounded" src="../assets/webapp-02-serverai.svg" />
<img class="svgimg" v-after border="rounded" src="../assets/webapp-02b-serverai-question.svg" />

1. The web app sends a request to the backend server.
1. If AI inference is needed, it is delegated to a separate AI service.
1. AI output is processed by the server and the final response is sent back to the web app.

<p v-after style="color:lightblue"><b>Where is the AI service hosted?</b></p>

<style>
.slidev-vclick-hidden {
display: none;
}

img {
  height: 250px;
}
</style>

---

# AI inference by a 3rd party provider

<img class="svgimg" border="rounded" src="../assets/webapp-02-01-cloudai.svg" />

<br>
<br>
<br>

<v-click>

- **Pricing**: pay-as-you-go. Some provide free tiers.
- **Providers**: GoogleAI, OpenAI, Anthropic, etc

</v-click>

<style>
img {
  width: 900px;
  height: 200px;
}
</style>

---

# Example with Google Cloud AI

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

- **Tools**: Ollama, Jan AI, LM Studio, etc.

<style>
img {
  height: 300px;
}
</style>

---

# Ollama demo

Run Ollama server locally with the gemma3 model:

```bash
ollama serve
ollama pull gemma3
```

My JS backend server code to query the local Ollama server:

```ts
const ollama = new Ollama({ host: 'http://localhost:11434' })
app.post("/chat", async (req, res) => {
  const question = req.body.question
  const response = await ollama.chat({
      model: 'gemma3',
      messages: [{ role: 'user', content: question }],
  })
  res.json({ answer: response.message.content })
})
```

---

# Third party vs on-premise AI service

<v-clicks>

| Criteria            | 3rd party AI service          | On-premise AI service                                |
| ------------------- | ----------------------------- | ---------------------------------------------------- |
| **Short term cost** | 🏆 Only cost of usage         | Initial investment required                          |
| **Long term cost**  | Costs may accumulate          | 🏆 Nearly constant costs                             |
| **Privacy**         | Data sent to external servers | 🏆 Data stays within the organization                |
| **Maintenance**     | 🏆 Delegated to the provider  | Organization responsible for updates and maintenance |
| **Sovereignty**     | Potentially lower sovereignty | 🏆 Full control over data and models                 |

</v-clicks>

[Reference: Lenovo 2025 study](https://lenovopress.lenovo.com/lp2225-on-premise-vs-cloud-generative-ai-total-cost-of-ownership)

---
layout: center
hideInToc: true
---

![](../assets/money.png)
