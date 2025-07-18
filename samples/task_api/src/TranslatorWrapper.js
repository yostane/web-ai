export class TranslatorHelper {
  #sourceLang = "fr";
  #destinationLang = "en";
  #translator = null;
  #logElement;
  constructor(logElement, sourceLang = "en", destinationLang = "fr") {
    this.#logElement = logElement;
    this.#sourceLang = sourceLang;
    this.#destinationLang = destinationLang;
  }

  async setup() {
    if (!("Translator" in self)) {
      return false;
    }
    const translatorCapabilities = await Translator.availability({
      sourceLanguage: "es",
      targetLanguage: "fr",
    });
    if (this.#logElement) {
      this.#logElement.innerHTML = `Capabilities : ${translatorCapabilities}`;
    }
    if (translatorCapabilities == "downloadable") {
      const downloadButton = document.querySelector("#downloadButton");
      if (downloadButton) {
        downloadButton.style.visibility = "visible";
        downloadButton.addEventListener("click", async () => {
          this.#create();
        });
        this.#logElement.innerHTML += "<br>";
      }
    }
  }

  async #create() {
    const downloadListener = (e) => {
      this.#logElement.innerHTML += `Downloaded ${e.loaded * 100}%<br>`;
    };

    this.#translator = await Translator.create({
      sourceLanguage: this.#sourceLang,
      targetLanguage: this.#destinationLang,
      monitor(m) {
        m.addEventListener("downloadprogress", downloadListener);
      },
    });
    this.#logElement.innerHTML += "Translator ready!";
    return true;
  }

  async translate(message) {
    if (!this.#translator) {
      return "Translator not initialized or not available.";
    }
    return await this.#translator.translate(message);
  }
}
