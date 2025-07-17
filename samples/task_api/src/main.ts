import "./style.css";
import { TranslatorHelper } from "./TranslatorWrapper";

const translator = new TranslatorHelper(document.querySelector("#logElement")!);
translator.setup();

document.querySelectorAll("#app > p").forEach((element) => {
  element.addEventListener("mouseover", (event) => {
    element;
  });
});
