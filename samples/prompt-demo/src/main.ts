import "./style.css";
import { PromptHelper } from "./PromptHelper";
import { log } from "./Utils";

const submitButton = document.querySelector("#submit") as HTMLButtonElement;
submitButton.addEventListener("click", async () => {
  const promptHelper = new PromptHelper();
  const resultTextBox = document.querySelector(
    "#result"
  ) as HTMLTextAreaElement;
  resultTextBox.innerHTML = "Loading...";
  await promptHelper.init();
  const prompt = (document.querySelector("#topic") as HTMLInputElement).value;
  const streaming = (document.querySelector("#streaming") as HTMLInputElement)
    .checked;
  try {
    log("Starting prompt");
    const streamOrResult = await promptHelper.prompt(prompt, streaming);
    resultTextBox.innerHTML = "";
    if (streamOrResult instanceof ReadableStream) {
      for await (const chunk of streamOrResult) {
        resultTextBox.append(chunk);
      }
    } else {
      resultTextBox.value = streamOrResult;
    }
    console.log(streamOrResult);
    log("Prompt completed successfully.");
  } catch (error) {
    console.error("Error during prompt:", error);
    log(`Error: ${error.message}`);
    return;
  }
});
