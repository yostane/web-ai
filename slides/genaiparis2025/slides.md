---
theme: seriph
addons:
  - slidev-addon-excalidraw
fonts:
  sans: Robot
  serif: Robot Slab
  mono: Fira Code
title: GenAI for webapps, where we're at
info: GenerationAI Paris. December 9, 2025
drawings:
  persist: false
transition: slide-left
mdc: true
duration: 25min
layout: center
zoom: 1.5
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

# OpenCV.js

- Open source computer vision library ported to WASM
- Supports image and video processing tasks
- Can be used for tasks like object detection, image filtering, etc.

```js
let faceCascade = new cv.CascadeClassifier();
let eyeCascade = new cv.CascadeClassifier();
faceCascade.load("haarcascade_frontalface_default.xml");
eyeCascade.load("haarcascade_eye.xml");
faceCascade.detectMultiScale(srcImage, faces);
for (let i = 0; i < faces.size(); ++i) {
  draw(faces[i]);
  eyeCascade.detectMultiScale(faces[i], eyes);
  for (let j = 0; j < eyes.size(); ++j) {
    cv.rectangle(eyes[j]);
  }
}
```

[Demo](https://docs.opencv.org/3.4/d2/d99/tutorial_js_face_detection.html)

---

# Built-in Web AI APIs

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

# Example: Translator API

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

# Learn More

<PoweredBySlidev mt-10 />
