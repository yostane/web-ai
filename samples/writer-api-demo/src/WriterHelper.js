export class WriterHelper {
  constructor() {
    this.logElement = window.document.querySelector('#logs');
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
        this.writer = await Writer.create(options);
      } else {
        // The Writer can be used after the model is downloaded.
        this.writer = await Writer.create({
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

  async write(content, streaming = false) {
    if (!this.writer) {
      await this.init();
    }
    const options = {
      context: "I'm a customer asking a question"
    };
    if (streaming) {
      return this.writer.write(content, options);
    } else {
      for await (const chunk of stream) {
        composeTextbox.append(chunk);
      }
    }
  }
}