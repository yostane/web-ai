import "./style.css";
import { TranslatorHelper } from "./TranslatorHelper";

const translateButton = document.querySelector("#translateButton");
translateButton?.addEventListener("click", async () => {
  const translator = new TranslatorHelper(
    document.querySelector("#logElement")!
  );
  await translator.setup();
  const sourceText = document.querySelector("#sourceText") as HTMLInputElement;
  const targetText = document.querySelector("#targetText") as HTMLInputElement;
  targetText.value = await translator.translate(sourceText.value);
});
