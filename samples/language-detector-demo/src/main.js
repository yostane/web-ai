import './style.css'
import { LanguageDetectorHelper } from "./LanguageDetectorHelper.js";

let languageDetectorHelper = null;

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', async () => {
  if (!languageDetectorHelper) {
    languageDetectorHelper = new LanguageDetectorHelper();
    await languageDetectorHelper.init();
  }

  const textCount = 3;
  const flags = new Map([
    ['fr', '🇫🇷'],
    ['en', '🇬🇧'],
    ['ja', '🇯🇵']
  ]);
  for (let index = 0; index < 3; index++) {
    const text = document.querySelector(`#content${index + 1}`).value;
    if (text) {
      const results = await languageDetectorHelper.detectLanguage(text);
      const resultText = results
        .filter(result => result.detectedLanguage != "und" && result.confidence > 0.1)
        .map(result => `${flags.get(result.detectedLanguage)} (${result.detectedLanguage} - ${result.confidence.toFixed(2)})`).join(', ');
      document.querySelector(`#content${index + 1}-result`).innerText = resultText;
      console.log(results);
    }
  }
});


