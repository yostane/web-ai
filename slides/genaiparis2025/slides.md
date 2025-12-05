---
theme: seriph
addons:
  - slidev-addon-excalidraw
  - slidev-component-pager
  - slidev-component-progress
  - slidev-addon-qrcode
fonts:
  sans: Roboto
  serif: Roboto Slab
  mono: Fira Code
title: GenAI for webapps, where we're at
info: GenerationAI Paris. December 9, 2025
drawings:
  persist: false
transition: slide-left
mdc: true
duration: 25min
layout: default
defaults:
  hideInToc: true
---

<div class="grid grid-rows-2">

  <div class="flex justify-center mb-10">
    <img v-click.hide border="rounded" src="./assets/happy-customer-01.svg" />
    <img v-click="['1', '5']" border="rounded" src="./assets/happy-customer-02.svg" />
    <img v-click="5" border="rounded" src="./assets/happy-customer-03.svg" />
  </div>

  <div class="grid grid-cols-3 gap-10 text-center">
    <div v-click="2" class="flex flex-col items-center myblock">
      <twemoji-writing-hand class="text-3xl"/>
      <ul style="list-style: none;" class="mt-4">
        <li>Chatbots</li>
        <li>Content generation</li>
      </ul>
    </div>
    <div v-click="3" class="flex flex-col items-center myblock">
      <twemoji-framed-picture class="text-3xl"/>
      <ul style="list-style: none;" class="mt-4">
        <li>Image segmentation</li>
        <li>Image generation</li>
      </ul>
    </div>
    <div v-click="4" class="flex flex-col items-center myblock">
      <twemoji-studio-microphone class="text-3xl"/>
      <ul style="list-style: none;" class="mt-4">
        <li>Text to speech</li>
        <li>Speech recognition</li>
      </ul>
    </div>
  </div>
</div>

<style>

.myblock {
  padding-top: 5px;
  background: black;
  border-radius: 15px;
  border: 4px solid var(--slidev-theme-primary);
  height: 150px;
  list-style: none;
}

li {
  margin: 0;
  padding: 0;
}

li::before {
  margin: 0;
  padding: 0;
  content: "";
}

img {
  height: 300px;
  width: 600px;
  object-fit: contain;
  display: inline-block;
  border-radius: 15px;
  border: 4px solid var(--slidev-theme-primary);
  background: white;
}

.slidev-vclick-hidden {
  display: none;
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

**Libraries**: transformers.js, openvsc.js, web AI APIs.

<style>
  img {
  height: 300px;
  object-fit: contain;
  display: inline-block;
  border-radius: 15px;
  border: 4px solid var(--slidev-theme-primary);
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
