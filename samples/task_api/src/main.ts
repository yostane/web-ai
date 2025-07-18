import "./style.css";
import { TranslatorHelper } from "./TranslatorWrapper";

const translator = new TranslatorHelper(document.querySelector("#logElement")!);
await translator.setup();

document.querySelectorAll("#app p").forEach((element) => {
  element.addEventListener("click", async () => {
    element.innerHTML += `<p>${await translator.translate(
      element.textContent ?? ""
    )}</p>`;
  });
});
