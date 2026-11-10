---
hideInToc: false
---

# Web AI

- **First-party** JavaScript APIs (no external library required)
- AI model **embedded** in, and **managed** by the browser
- Already **available** in <logos-chrome /> and <logos-opera />

<img border="rounded" src="../assets/built-in-infra.jpg" />

<style>
img {
  height: 30dvh;
  margin: auto;
}
</style>

---
layout: two-cols-header
---

# List of Web AI APIs

## Language models

::left::

- [Summarizer](https://developer.chrome.com/docs/ai/summarizer-api)
- [Language Detection](https://developer.chrome.com/docs/ai/language-detection)
- [Translator](https://developer.chrome.com/docs/ai/translator-api)
- [Prompt](https://developer.chrome.com/docs/ai/prompt-api)
- [Writer](https://developer.chrome.com/docs/ai/writer-api)
- [Rewriter](https://developer.chrome.com/docs/ai/rewriter-api)
- [Proofreader](https://developer.chrome.com/docs/ai/proofreader-api)

::right::

## Decision models

Also called System 1, live Jev.

- [Decision](https://developer.chrome.com/docs/ai/decision-api)

## <logos-opera /> only

- [Semantic Embeddings](https://next.opera.com/web-ai/)

<style>

li {
  font-size: 2em;
}
</style>

---

# How to get started in <logos-opera />

- enable WebAI in the settings and manage model from the sidebar

<img src="../assets/webai-opera-setup.gif" />

<style>
img {
  height: 40dvh;
  margin: auto;
}
</style>

---

# How to get started in <logos-chrome />

- Chrome: [Install WebAI extension](https://chromewebstore.google.com/detail/lmjgpcigjcffnphimblhcoccjfefamcp?utm_source=item-share-cb)

<img src="../assets/webai-chrome-setup.gif" />

<style>
img {
  height: 40dvh;
  margin: auto;
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
- [Semantic Embeddings](https://next.opera.com/web-ai/semantic-embedder/) and [demos](https://next.opera.com/web-ai/apps/#embeddings)
- [Experimental Opera extensions](https://blogs.opera.com/news/2026/10/webai-local-ai-for-the-web-now-in-opera/)

---
layout: center
---

# Promising, but not without caveats

- Not a W3C standard (yet)
- Status of support of other browsers unknown / not clear

![](../assets/awesome-4gb-install.png)

Source: [Awesome](https://www.youtube.com/watch?v=seKv8ZyTiOU)

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

<Tweet url="https://x.com/jaffathecake/status/2051962549545963951" />
