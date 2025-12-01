---
theme: seriph
addons:
  - slidev-addon-excalidraw
title: GenAI for webapps, where we're at
info: GenerationAI Paris. December 9, 2025
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
duration: 25min
---

<div class="pt-12">
  <span @click="next" class="px-2 p-1 rounded cursor-pointer hover:bg-white hover:bg-opacity-10">
    Press Space to start the presentation <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: center
---

<img border="rounded" src="./assets/webapp-01.svg" />

- Live translation
- Image processing
- Summarization

---
layout: center
---

![](./assets/money.png)

---
layout: cover
---

# GenAI for webapps

Where we're at

GenerationAI Paris. December 9, 2025

---
layout: image-right
image: ./assets/speaker.jpg
---

# Speaker

- Yassine Benabbas
- DevRel @ Worldline
- Teacher
- Lille Android User Group
- SNs: @yostane
- LinkedIn: **in/yassinebenabbas/**
- Anime, Pokémon TCG

---

# Agenda

<Toc text-sm minDepth="1" maxDepth="1" />

---

# Solution 1: AI inference on the Cloud

![](./assets/webapp-02-cloud%20AI.svg)

- Providers: OpenAI, Anthropic, Cohere, etc.
- Pros: Powerful models, easy to use
- Cons: Latency, cost, privacy

---
layout: center
zoom: 1.5
position: center
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

<style>
pre {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

---

# Solution 2: AI inference on premises

![](./assets/webapp-03-backend-onpremise-ai.svg)

- Tools: Llama.cpp, Ollama, etc.
- Pros: More control, no ongoing costs
- Cons: Infrastructure costs, maintenance

---

# Solution 3: AI inference in the browser

![](./assets/webapp-04-browser-ai.svg)

- Libraries: transformers.js, openvsc.js, web AI APIs
- Pros: Privacy, low latency, no server costs
- Cons: Limited model size, device capabilities

---

# Transformers.js

---
layout: two-cols-header
---

# Seamless chat demo

::left::

<iframe src="https://yostane.github.io/web-ai/seamless-international-chat/"></iframe>

::right::

<iframe src="https://yostane.github.io/web-ai/seamless-international-chat/"></iframe>

<style>
  iframe {
    border: none;
    border-radius: 8px;
    padding: 0;
    margin: 0;
    height: 450px;
    width: 350px;
  }
</style>

---

# Browser AI vs server AI

| Criteria                     | Browser AI                          | Server AI                                |
| ---------------------------- | ----------------------------------- | ---------------------------------------- |
| Privacy                      | 🏆 Data stays in the device         | Data sent to server                      |
| Latency                      | 🏆 No network delay                 | Network latency                          |
| Cost                         | 🏆 No server costs                  | Ongoing server costs                     |
| Scalability                  | Limited by user device capabilities | 🏆 Easily scalable with server resources |
| Supported Models / use-cases | Limited                             | 🏆 Wide variety of models available      |

---

<img border="rounded" src="./assets/yes-no-browser-ai.png" />

---

## level: 2

# Shiki Magic Move

Powered by [shiki-magic-move](https://shiki-magic-move.netlify.app/), Slidev supports animations across multiple code snippets.

Add multiple code blocks and wrap them with <code>````md magic-move</code> (four backticks) to enable the magic move. For example:

````md magic-move {lines: true}
```ts {*|2|*}
// step 1
const author = reactive({
  name: "John Doe",
  books: [
    "Vue 2 - Advanced Guide",
    "Vue 3 - Basic Guide",
    "Vue 4 - The Mystery",
  ],
});
```

```ts {*|1-2|3-4|3-4,8}
// step 2
export default {
  data() {
    return {
      author: {
        name: "John Doe",
        books: [
          "Vue 2 - Advanced Guide",
          "Vue 3 - Basic Guide",
          "Vue 4 - The Mystery",
        ],
      },
    };
  },
};
```

```ts
// step 3
export default {
  data: () => ({
    author: {
      name: "John Doe",
      books: [
        "Vue 2 - Advanced Guide",
        "Vue 3 - Basic Guide",
        "Vue 4 - The Mystery",
      ],
    },
  }),
};
```

Non-code blocks are ignored.

```vue
<!-- step 4 -->
<script setup>
const author = {
  name: "John Doe",
  books: [
    "Vue 2 - Advanced Guide",
    "Vue 3 - Basic Guide",
    "Vue 4 - The Mystery",
  ],
};
</script>
```
````

---

## class: px-20

# Themes

Slidev comes with powerful theming support. Themes can provide styles, layouts, components, or even configurations for tools. Switching between themes by just **one edit** in your frontmatter:

<div grid="~ cols-2 gap-2" m="t-2">

```yaml
---
theme: default
---
```

```yaml
---
theme: seriph
---
```

<img border="rounded" src="https://github.com/slidevjs/themes/blob/main/screenshots/theme-default/01.png?raw=true" alt="">

<img border="rounded" src="https://github.com/slidevjs/themes/blob/main/screenshots/theme-seriph/01.png?raw=true" alt="">

</div>

Read more about [How to use a theme](https://sli.dev/guide/theme-addon#use-theme) and
check out the [Awesome Themes Gallery](https://sli.dev/resources/theme-gallery).

---

layout: center
class: text-center

---

# Learn More

<PoweredBySlidev mt-10 />
