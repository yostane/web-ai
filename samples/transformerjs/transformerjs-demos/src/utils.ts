import type { ProgressInfo } from "@huggingface/transformers";

export function log(...args: any[]) {
  console.log(...args);
}

export function logProgress(info: ProgressInfo) {
  const logOutput = document.getElementById("logElement");
  console.log(info)
  if (logOutput) {
    switch (info.status) {
      case "initiate":
        logOutput.innerHTML = `Starting download for ${info.file}...`;
        break;
      case "download":
        logOutput.innerHTML = `Downloading ${info.name}: (${info.file})...`
        break;
      case "progress":
        logOutput.innerHTML = `Progress for ${info.file}: <progress value="${info.progress}" max="100"></progress>`;
        break;
      case "ready":
        logOutput.innerHTML = `${info.task} with ${info.model} is ready.`;
        break;
      case "done":
        logOutput.innerHTML = `${info.file} download completed.`;
        break;
    }
  }
}
