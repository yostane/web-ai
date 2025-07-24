export class WriterHelper {
  constructor() {
    this.logElement = document.querySelector('#logs');
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
        this.logElement.innerHTML += 'Writer API is not available.<br>';
        return;
      }
      if (available === 'available') {
        this.logElement.innerHTML += 'Writer API is available.<br>';
        this.writer = await Writer.create(options);
      } else {
        this.logElement.innerHTML += '// The Writer can be used after the model is downloaded.<br>';
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
      return this.writer.writeStreaming(content, options);
    } else {
      return this.writer.write(content, options);
    }
  }
}