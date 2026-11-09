---
hideInToc: false
---

# Introduction

Server-side AI inference

<img class="svgimg" border="rounded" src="../assets/webapp-02b-serverai-question.svg" />

1. The web application sends a **request** to the backend server.
1. If AI inference is needed, it is delegated to a separate **AI service**.
1. The server responds back to the web application.

<style>

.svgimg {
  width: 100%;
  height: 250px;
}
</style>

---

# AI inference through a third-party provider

<img class="svgimg" border="rounded" src="../assets/webapp-02-01-cloudai.svg" />

<br>
<br>
<br>

- **Pricing**: pay-as-you-go. Some offer free plans.
- **Providers**: <logos-google-cloud /> , <logos-aws />, <logos-openai style="background:white; border-radius: 5px; padding: 2px;" />, <logos-microsoft-azure />, etc.

List of free LLM API resources provided by [cheahjs/free-llm-api-resources](https://github.com/cheahjs/free-llm-api-resources)

<style>
img {
  width: 100%;
  height: 200px;
}
</style>

---

# On-premises AI inference

<img class="svgimg" border="rounded" src="../assets/webapp-03-backend-onpremise-ai.svg" />

<br>
<br>

- **Tools** : Ollama, Jan AI, LM Studio, etc.

<style>
img {
  height: 300px;
  width: auto;
}
</style>

---

# Demo: Ollama

Start the Ollama server locally with the gemma3 model:

```bash
ollama serve
ollama pull gemma3
```

<logos-javascript /> backend server code that queries the local Ollama server:

```ts
const ollama = new Ollama({ host: "http://localhost:11434" });
app.post("/chat", async (req, res) => {
  const question = req.body.question;
  const response = await ollama.chat({
    model: "gemma3",
    messages: [{ role: "user", content: question }],
  });
  res.json({ answer: response.message.content });
});
```

---
layout: center
---

# Challenges of server-side AI

- Privacy
- No offline support
- Cost: maintenance or subscription fees

<style>

li {
  font-size: 1.5em;
  margin: 20px 0;
}

</style>

---

# Unpredictable subscription costs

Phenomena: LLMflation, the LLM cost paradox

![](../assets/price-graph-gemini.webp)

<style>
img {
  height: 400px;
  width: auto;
}
</style>

---

![](../assets/price-graph-openai.webp)

---

![](../assets/price-graph-anthropic.webp)

---
layout: center
hideInToc: true
---

![](../assets/money.png)

---
layout: fact
---

# Is a server required?

---
layout: fact
---

# Is a server required? (Spoilers) No*

*In some use cases.
