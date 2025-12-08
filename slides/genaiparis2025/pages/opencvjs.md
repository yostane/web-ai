## OpenCV.js <logos-opencv style="background:white; border-radius: 5px; padding: 1px;" />

- Open source <logos-c /> and <logos-c-plusplus /> computer vision library
- Ported to <logos-javascript /> and <logos-webassembly />
- Supports image and video processing tasks: filtering, object detection, etc.

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

# Demo

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