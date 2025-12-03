---
theme: seriph
addons:
  - slidev-addon-excalidraw
  - slidev-component-pager
  - slidev-component-progress
  - slidev-addon-qrcode
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
defaults:
  hideInToc: true
---

<img border="rounded" src="./assets/webapp-01.svg" />

AI features

<v-clicks>

- Translation
- Chatbot
- Summarization

</v-clicks>

<style>
  img {
    width: 600px;
  }
</style>

---
layout: center
---

<img border="rounded" src="./assets/maes-b-lost-in-a-field.gif" />

---
layout: cover
---

# GenAI for webapps

Where we're at

GenerationAI Paris. December 9, 2025

---
src: ./pages/bio.md
---

---
layout: two-cols
---

# Agenda

<Toc minDepth="1" maxDepth="1" />

::right::

<img border="rounded" src="./assets/outdoors-camping.gif"  />

---
src: ./pages/serverai.md
---

---
hideInToc: false
---

# AI inference in the browser

<img border="rounded" src="./assets/webapp-04-browser-ai.svg" />

<br>

**Libraries**: transformers.js, openvsc.js, web AI APIs

<style>
  img {
    height: 300px;
  }
</style>

---
src: ./pages/transformersjs.md
---

---
src: ./pages/opencvjs.md
---

---
src: ./pages/webai.md
---

---
layout: center
---

<img style="height:100%" border="rounded" src="./assets/yes-no-browser-ai.png" />

---

# Browser AI vs server AI

<br>
<br>

| Criteria           | Browser AI                          | Server AI                                |
| ------------------ | ----------------------------------- | ---------------------------------------- |
| Privacy            | 🏆 Data stays in the device         | Data sent to server                      |
| Cost               | 🏆 No server costs                  | Subscription or ongoing server costs     |
| Scalability        | Limited by user device capabilities | 🏆 Easily scalable with server resources |
| Models / use-cases | Limited                             | 🏆 Wide variety of models available      |

---
src: ./pages/conclusion.md
---
