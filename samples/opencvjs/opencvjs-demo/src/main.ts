import "./style.css";
import { loadOpenCV, type OpenCV } from "@opencvjs/web";

let currentProcess: "Stop" | "Grayscale" | "BackgroundSubtraction" = "Stop";

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

async function setupCv(video: HTMLVideoElement): Promise<CvSetup> {
  const cv = await loadOpenCV();
  let canvasFrame = document.getElementById(
    "video-output",
  ) as HTMLCanvasElement;
  const context = canvasFrame.getContext("2d");
  const width = video.width;
  const height = video.height;
  let src = new cv.Mat(height, width, cv.CV_8UC4);
  let dst = new cv.Mat(height, width, cv.CV_8UC1);
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
  const FPS = 30;
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
  const FPS = 30;
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
document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-grayscale");
  const backgroundButton = document.getElementById(
    "start-background-subtraction",
  );
  startButton?.addEventListener("click", startGrayscale);
  backgroundButton?.addEventListener("click", startBackgroundRemoval);
});
