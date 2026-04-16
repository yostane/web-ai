import "./style.css";
import { setupWriter } from "./writer-utils";

async function setupSuggestions() {
  const writer = await setupWriter();
  document.getElementById("loading")?.remove();
  document.getElementById("mail-form")!.style.display = "block";
  console.log("Setup completed");

  const generateBtn = document.getElementById("generate-btn")!;
  let stream: ReadableStream<string> | null = null;
  generateBtn.addEventListener("click", async () => {
    const titleInput =
      document.querySelector<HTMLInputElement>("input[name=title]")!;
    const contentInput = document.querySelector<HTMLTextAreaElement>(
      "textarea[name=content]",
    )!;
    const orderIdInput = document.querySelector<HTMLInputElement>(
      "input[name=order-id]",
    )!;
    const usernameInput = document.querySelector<HTMLInputElement>(
      "input[name=username]",
    )!;

    contentInput.value = "";
    const title = titleInput.value;
    const orderId = orderIdInput.value;
    const username = usernameInput.value;
    stream = await writer.writeStreaming(
      `Title: "${title}" Order id: "${orderId}" User name: "${username}".`,
    );
    for await (const chunk of stream) {
      contentInput.value += chunk;
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
