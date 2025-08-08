import { SentimentAnalysisHelper } from "./sentiment-analysis";
import "./style.css";

function shouldUseWebGpu() {
  const useWebGPUInput = document.getElementById(
    "use-webgpu"
  ) as HTMLInputElement;
  return useWebGPUInput.checked;
}

export async function analyzeSentiment() {
  const input = document.getElementById(
    "sentiment-input"
  ) as HTMLTextAreaElement;
  const output = document.getElementById(
    "sentiment-output"
  ) as HTMLTextAreaElement;

  const text = input.value;
  const sentimentAnalysisHelper = new SentimentAnalysisHelper(
    shouldUseWebGpu()
  );
  const sentiment = await sentimentAnalysisHelper.analyze(text);

  output.innerText = `Sentiment: ${sentiment}`;
}

const sentimentAnalysisButton = document.getElementById(
  "sentiment-analysis-button"
) as HTMLButtonElement;

sentimentAnalysisButton?.addEventListener("click", async () => {
  sentimentAnalysisButton.disabled = true;
  sentimentAnalysisButton.innerHTML = "Analyzing...";
  await analyzeSentiment();
  sentimentAnalysisButton.disabled = false;
  sentimentAnalysisButton.innerHTML = "Analyze";
});
