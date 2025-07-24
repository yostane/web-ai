export class LanguageDetectorHelper {
  constructor() {
    this.logElement = document.querySelector('#logs');
    this.languageDetector = null;
  }

  async init() {
    if ('LanguageDetector' in self) {
      const options = {
        sharedContext: 'You are master Yoda, a wise and powerful Jedi Master. You are asked to rewrite the following text in a Yoda like manner.',
        format: 'plain-text',
      };

      const available = await LanguageDetector.availability();
      if (available === 'unavailable') {
        this.logElement.innerHTML += 'Language Detector API is not available.<br>';
        return;
      }
      if (available === 'available') {
        this.logElement.innerHTML += 'Language Detector API is available.<br>';
        this.languageDetector = await LanguageDetector.create(options);
      } else {
        this.logElement.innerHTML += 'The Language Detector can be used after the model is downloaded.<br>';
        this.languageDetector = await LanguageDetector.create({
          ...options,
          monitor(m) {
            m.addEventListener("downloadprogress", e => {
              if (this.logElement) {
                this.logElement.innerHTML += `Downloading ${e.loaded * 100}%<br>`;
              }
            });
          }
        });
      }
    }
  }

  async detectLanguage(content) {
    if (!this.languageDetector) {
      await this.init();
    }
    return this.languageDetector.detect(content);
  }
}