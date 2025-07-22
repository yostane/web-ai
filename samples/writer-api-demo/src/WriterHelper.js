export class WriterHelper {
  constructor() {
    this.logElement = document.querySelector('#log');
    this.writer = null;
  }

  async init() {
    if ('Writer' in self) {
      const options = {
        sharedContext: 'This is an email to request information about an order.',
        tone: 'casual',
        format: 'plain-text',
        length: 'medium',
      };

      const available = await Writer.availability();
      let writer;
      if (available === 'unavailable') {
        // The Writer API isn't usable.
        return;
      }
      if (available === 'available') {
        // The Writer API can be used immediately .
        writer = await Writer.create(options);
      } else {
        // The Writer can be used after the model is downloaded.
        const writer = await Writer.create({
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

  async createDocument(content) {
    if (!this.writer) {
      this.writer = await this.init();
    }
    const writer = await this.init();
    return writer.createDocument(content);
  }

  async getSuggestions(documentId) {
    if (!this.writer) {
      this.writer = await this.init();
    }
    return this.writer.getSuggestions(documentId);
  }
}