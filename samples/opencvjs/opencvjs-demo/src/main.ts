import "./style.css";
import { loadOpenCV, type OpenCV } from "@opencvjs/web";

let currentProcess:
  | "Stop"
  | "Grayscale"
  | "BackgroundSubtraction"
  | "FaceDetection" = "Stop";

const FPS = 60;

async function startVideoCapture(): Promise<HTMLVideoElement> {
  const video = document.getElementById("video-input") as HTMLVideoElement;
  const media = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  video.srcObject = media;
  video.play();
  return video;
}

type CvSetup = {
  cv: typeof OpenCV;
  canvasFrame: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  src: OpenCV.Mat;
  dst: OpenCV.Mat;
};

async function setupCv(
  video: HTMLVideoElement,
  isDst8UC4: boolean = false,
): Promise<CvSetup> {
  const cv = await loadOpenCV();
  let canvasFrame = document.getElementById(
    "video-output",
  ) as HTMLCanvasElement;
  const context = canvasFrame.getContext("2d");
  const width = video.width;
  const height = video.height;
  let src = new cv.Mat(height, width, cv.CV_8UC4);
  let dst = new cv.Mat(height, width, isDst8UC4 ? cv.CV_8UC4 : cv.CV_8UC1);
  return { cv, canvasFrame, context, src, dst };
}

export async function startBackgroundRemoval() {
  currentProcess = "BackgroundSubtraction";
  const video = await startVideoCapture();
  const { cv, canvasFrame, context, src, dst } = await setupCv(video);
  const frame = src;
  const fgmask = dst;
  const cap = new cv.VideoCapture(video);
  const fgbg = new cv.BackgroundSubtractorMOG2(500, 16, true);
  let lastFrameTime = Date.now();
  function processVideo() {
    if (!context || currentProcess !== "BackgroundSubtraction") {
      frame.delete();
      fgmask.delete();
      fgbg.delete();
      return;
    }
    try {
      const begin = Date.now();
      if (begin - lastFrameTime < 1000 / FPS) {
        requestAnimationFrame(processVideo);
        return;
      }
      lastFrameTime = begin;
      cap.read(frame);
      fgbg.apply(frame, fgmask);
      cv.imshow(canvasFrame.id, fgmask);
      requestAnimationFrame(processVideo);
    } catch (error) {
      console.error(error);
    }
  }
  requestAnimationFrame(processVideo);
}

export async function startGrayscale() {
  currentProcess = "Grayscale";
  const video = await startVideoCapture();
  const { cv, canvasFrame, context, src, dst } = await setupCv(video);
  let lastFrameTime = Date.now();
  function processVideo() {
    if (!context || currentProcess !== "Grayscale") {
      src.delete();
      dst.delete();
      return;
    }
    const begin = Date.now();
    if (begin - lastFrameTime < 1000 / FPS) {
      requestAnimationFrame(processVideo);
      return;
    }
    lastFrameTime = begin;
    context.drawImage(video, 0, 0, video.width, video.height);
    src.data.set(context.getImageData(0, 0, video.width, video.height).data);
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
    cv.imshow(canvasFrame.id, dst);
    requestAnimationFrame(processVideo);
  }
  requestAnimationFrame(processVideo);
}

async function startFaceDetection() {
  currentProcess = "FaceDetection";
  const video = await startVideoCapture();
  const { cv, canvasFrame, context, src, dst } = await setupCv(video, true);
  const cap = new cv.VideoCapture(video);
  let faces = new cv.RectVector();
  let gray = new cv.Mat();
  let classifier = new cv.CascadeClassifier();
  // Load the pre-trained classifier XML file from a URL into openCV FS
  const response = await fetch("haarcascade_frontalface_default.xml");
  const data = new Uint8Array(await response.arrayBuffer());
  cv.FS_createDataFile(
    "/",
    "haarcascade_frontalface_default.xml",
    data,
    true,
    false,
    false,
  );
  classifier.load("haarcascade_frontalface_default.xml");

  let lastFrameTime = Date.now();
  function processVideo() {
    if (!context || currentProcess !== "FaceDetection") {
      src.delete();
      dst.delete();
      gray.delete();
      faces.delete();
      classifier.delete();
      return;
    }
    try {
      const begin = Date.now();
      if (begin - lastFrameTime < 1000 / FPS) {
        requestAnimationFrame(processVideo);
        return;
      }
      lastFrameTime = begin;
      cap.read(src);
      src.copyTo(dst);
      cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
      // detect faces.
      classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
      // draw faces.
      for (let i = 0; i < faces.size(); ++i) {
        let face = faces.get(i);
        let point1 = new cv.Point(face.x, face.y);
        let point2 = new cv.Point(face.x + face.width, face.y + face.height);
        cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
      }
      cv.imshow(canvasFrame.id, dst);
      requestAnimationFrame(processVideo);
    } catch (error) {
      console.error(error);
    }
  }
  requestAnimationFrame(processVideo);
}

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-grayscale");
  const backgroundButton = document.getElementById(
    "start-background-subtraction",
  );
  const faceDetectButton = document.getElementById("start-face-detection");
  startButton?.addEventListener("click", startGrayscale);
  backgroundButton?.addEventListener("click", startBackgroundRemoval);
  faceDetectButton?.addEventListener("click", startFaceDetection);
});
