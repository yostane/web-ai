import "./style.css";
import { setupWriter } from "./utils";

async function setupSuggestions() {
  const writer = await setupWriter();
  document.getElementById("loading")?.remove();
  document.getElementById("mail-form")!.style.display = "block";
  console.log("Setup completed");

  const titleInput =
    document.querySelector<HTMLInputElement>("input[name=title]")!;
  const contentInput = document.querySelector<HTMLTextAreaElement>(
    "textarea[name=content]",
  )!;
  const nextWordSuggestion = document.getElementById("next-word-suggestion")!;

  let stream: ReadableStream<string> | null = null;
  let currrentSuggestion = "";
  contentInput.addEventListener("input", async () => {
    stream?.cancel();
    currrentSuggestion = "";
    nextWordSuggestion.textContent = "";
    const title = titleInput.value;
    const content = contentInput.value;
    const context = document.querySelector<HTMLInputElement>(
      "input[name=context]",
    )!.value;
    stream = writer.writeStreaming(
      `Output only one word.\nContext: ${context}.\nTitle: ${title}.\n\nCurrent content: ${content}`,
      {
        context,
      },
    );
    for await (const chunk of stream) {
      console.log("Received chunk:", chunk);
      currrentSuggestion += chunk;
      nextWordSuggestion.textContent = currrentSuggestion;
    }
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  const startButton = document.getElementById("start-button")!;
  startButton.addEventListener("click", async () => {
    startButton.style.display = "none";
    document.getElementById("loading")!.style.display = "block";
    try {
      await setupSuggestions();
    } catch (error) {
      console.error("Error setting up writer:", error);
    }
  });
});
