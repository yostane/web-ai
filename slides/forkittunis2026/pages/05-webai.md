# Web AI: W3C WebML Working Group

<div class="grid grid-cols-[1fr_600px] gap-2">
  <div style="align-self: center; justify-self: center;">
    <ul>
      <li>Standard web</li>
      <li>APIs spécialisées</li>
      <li>Génération de texte</li>
      <li>Exp. sur Chrome</li>
    </ul>
  </div>
  <div>
    <img style="width: 600px;" border="rounded" src="../assets/built-in-infra.jpg" />
  </div>
</div>

---

# Exemple : API Traducteur

```js
// Vérifier si l'API Traducteur est disponible dans le navigateur
if (!('Translator' in window)) return;
// Configurer les options de l'API Traducteur
const options = {
  sourceLanguage: 'en',
  targetLanguage: 'fr',
};
// Vérifier la disponibilité de l'API Traducteur avec les options données
const availability = await Translator.availability(options);
if (availability === 'unavailable') return;
// Créer un objet Traducteur avec les options souhaitées
const translator = await Translator.create(options);
// Demander à l'objet Traducteur de traduire un texte
const result = await translator.translate('Hello, world!');
console.log(result);
// La sortie devrait être : "Bonjour, monde !"
```

---
layout: two-cols-header
srcLeft: ./pages/webai-demo.md
---

# Démo WebAI : chat multilingue

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
