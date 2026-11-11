---
theme: seriph
addons:
  - slidev-addon-excalidraw
  - slidev-component-pager
  - slidev-addon-qrcode
fonts:
  sans: Roboto
  serif: Roboto Slab
  mono: Fira Code
title: The future of AI (is) in the browser
info: TechForum Germany. November 11, 2026
drawings:
  persist: false
transition: slide-left
mdc: true
duration: 20min
layout: default
defaults:
  hideInToc: true
routerMode: hash
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
        <li>Summarization</li>
        <li>Translation</li>
      </ul>
    </div>
    <div v-click="3" class="flex flex-col items-center myblock">
      <twemoji-framed-picture class="text-3xl"/>
      <ul style="list-style: none;" class="mt-4">
        <li>Background removal</li>
        <li>Face detection</li>
      </ul>
    </div>
    <div v-click="4" class="flex flex-col items-center myblock">
      <twemoji-studio-microphone class="text-3xl"/>
      <ul style="list-style: none;" class="mt-4">
        <li>Text-to-speech</li>
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

<img border="rounded" src="./assets/server.jpg" />

---
layout: cover
---

# The future of AI (is) in the browser

<img id="tf-logo" src="./assets/tex-2026-germany-white.svg" /> / 📅 November 11

<img src="./assets/sponsors-2026.svg" />

<style>
img {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}

#tf-logo {
  width: 20%;
}
</style>

---
src: ./pages/bio.md
---

---
layout: two-cols
---

# Agenda <twemoji-spiral-calendar />

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

- The Browser **downloads** the AI model
- Inference is done **locally** in the browser

<style>
img {
  height: 70%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  border: 4px solid var(--slidev-theme-primary);
  background: white;
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
src: ./pages/conclusion.md
---

---
layout: center
---

<img style="height:100%" border="rounded" src="./assets/yes-no-browser-ai.png" />

---
layout: end
---

# Thank you 😊

Any questions?

<div class="flex flex-col items-center">

<QRCode
    :width="270"
    :height="270"
    type="svg"
    data="https://yostane.github.io/web-ai/slides-fblille2026"
    :imageOptions="{ margin: 5 }"
    :dotsOptions="{ type: 'extra-rounded', color: 'white' }"
/>

</div>

Source code: [yostane/web-ai](https://github.com/yostane/web-ai/tree/main/samples) <logos-github-icon style="background:white; border-radius: 5px; padding:1px" />
<br>
Credits: Tenor, Chrome for Developers, <PoweredBySlidev mt-5 />
