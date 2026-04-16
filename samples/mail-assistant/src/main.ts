import "./style.css";
import { setupWriter } from "./utils";

async function setupSuggestions() {
  const writer = await setupWriter();
  console.log("Setup completed");

  document.getElementById("loading")?.remove();
  document.getElementById("mail-form")!.style.display = "block";
  const titleInput =
    document.querySelector<HTMLInputElement>("input[name=title]")!;
  const contentInput = document.querySelector<HTMLTextAreaElement>(
    "textarea[name=content]",
  )!;
  //const nextWordSuggestion = document.getElementById("next-word-suggestion")!;

  let stream: ReadableStream<string> | null = null;
  contentInput.addEventListener("input", async () => {
    stream?.cancel();
    const title = titleInput.value;
    const content = contentInput.value;
    stream = writer.writeStreaming(
      `Title: ${title}.\n\n Current content: ${content}`,
    );
    for await (const chunk of stream) {
      console.log("Received chunk:", chunk);
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
