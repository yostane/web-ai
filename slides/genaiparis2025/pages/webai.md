## Built-in Web AI APIs

- Introduced by Chrome team and aims to become a web standard
- Provides access to AI models directly from the browser
- Model is managed by the browser vendor and used once across all origins
- Apis follow this general pattern:

```js
if (!("WebAIAPI" in window)) {
  return;
}
const options = {};
const availability = await WebAIAPI.availability(options);
if (availability === "unavailable") {
  return;
}
const aiObject = await WebAIAPI.create(options);
const output = await aiObject.performTask(input);
console.log(output);
```

---

## Example: Translator API

```js
// Check if the Translator API is available in the browser
if (!("Translator" in window)) {
  alert("Translator API is not available.");
  return;
}
// Set up the options for the Translator API
const options = {
  sourceLanguage: "en",
  targetLanguage: "fr",
};
const availability = await Translator.availability(options);
if (availability === "unavailable") {
  alert("Translator API is not available or the model is not available.");
  return;
}
// Create a Translator object with the desired options
const translator = await Translator.create(options);
// Ask the Translator object to translate a text
const result = await translator.translate("Hello, world!");
console.log(result);
// The output should be: "Bonjour, monde !"
```

---
layout: two-cols-header
srcLeft: ./pages/webai-demo.md
---

## WebAI demo: Seamless chat

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
