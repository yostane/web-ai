## OpenCV.js

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
