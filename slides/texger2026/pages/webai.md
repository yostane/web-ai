---
hideInToc: false
layout: center
---

# Web AI

- Web standards
- W3C WebML Working Group
- APIs spécialisées
- En expérimentation sur Chrome: Gemini Nano

---
layout: center
---

<img style="width: 600px;" border="rounded" src="../assets/built-in-infra.jpg" />

---
layout: two-cols-header
---

# Web AI APIs

::left::

- [Summarizer](https://developer.chrome.com/docs/ai/summarizer-api)
- [Language Detection](https://developer.chrome.com/docs/ai/language-detection)
- [Translator](https://developer.chrome.com/docs/ai/translator-api)
- [Prompt](https://developer.chrome.com/docs/ai/prompt-api)

::right::

- [Writer](https://developer.chrome.com/docs/ai/writer-api) <game-icons-vial />
- [Rewriter](https://developer.chrome.com/docs/ai/rewriter-api) <game-icons-vial />
- [Proofreader](https://developer.chrome.com/docs/ai/proofreader-api) <game-icons-vial />

<style>

li {
  font-size: 2em;
}
</style>

---

# Example: Translator API

```js
// Check whether the Translator API is available in the browser
if (!("Translator" in window)) return;
// Configure the Translator API options
const options = {
  sourceLanguage: "fr",
  targetLanguage: "en",
};
// Check the Translator API's availability with the specified options
const availability = await Translator.availability(options);
if (availability === "unavailable") return;
// Create a Translator object with the desired options
const translator = await Translator.create(options);
// Ask the Translator object to translate text
const result = await translator.translate("Bonjour, monde !");
console.log(result);
// Expected output: "Hello, world!"
```

---
layout: two-cols-header
srcLeft: ./pages/webai-demo.md
---

# Web AI demo: multilingual chat

::left::

<iframe src="/web-ai/seamless-international-chat/"></iframe>

::right::

<iframe src="/web-ai/seamless-international-chat/"></iframe>

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
layout: center
---

# Other demos

- [My demos](https://yostane.github.io/web-ai/)
- [Chrome demos](https://chrome.dev/web-ai-demos/)
- [Model information in chrome://on-device-internals/](chrome://on-device-internals/)

---

# The downside

Source: [Awesome](https://www.youtube.com/watch?v=seKv8ZyTiOU)

![](../assets/awesome-4gb-install.png)

---
layout: full
---

![](../assets/awesome-oppose-webai.png)

<style>
  img{
    height: 500px;
  }
</style>

---
layout: center
---

![](../assets/awesome-requirements.png)

<style>
  img{
    height: 500px;
  }
</style>

---

<Youtube id="seKv8ZyTiOU" style="width:100%;height:100%;" />
