## OpenCV.js <logos-opencv style="background:white; border-radius: 5px; padding: 1px;" />

- Bibliothèque de vision par ordinateur open source
- Codée en <logos-c /> et <logos-c-plusplus />
- Portée en <logos-javascript /> et <logos-webassembly />
- Traitement d'images et de vidéos : filtrage, détection d'objets, etc.

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

---

# Démo

<br>
<br>

<iframe
  src="https://yostane.github.io/web-ai/opencvjs-demo/index.html" />

<style>
iframe {
  width: 100%;
  height: 300px;
  border: none;
  border-radius: 8px;
}
</style>
