export class SummarizerHelper {
  constructor() {
    this.logElement = document.querySelector('#logs');
    this.summarizer = null;
  }

  async init(options = {}) {
    if (!('Summarizer' in self)) {
      this.log('Summarizer API is not supported in this browser.');
      return;
    }
    options.sharedContext = 'This a blog technical blog post and you are a specialist in summarizing technical content';
    const available = await Summarizer.availability();
    if (available === 'unavailable') {
      this.log('Summarizer API is not available.');
      return;
    }
    if (available === 'available') {
      this.log('Summarizer API is available.');
      this.summarizer = await Summarizer.create(options);
    } else {
      const logFn = this.log;
      logFn('Downloading summarizer model.');
      options.monitor = m => {
        m.addEventListener("downloadprogress", e => {
          logFn(`Downloading ${e.loaded * 100}%`);
        });
      };
      this.summarizer = await Summarizer.create(options);
    }
  }

  log(message) {
    if (this.logElement) {
      this.logElement.innerHTML += `${message}<br>`;
    }
  }

  async summarize(content, streaming = false) {
    if (!this.summarizer) {
      throw new Error('SummarizerHelper is not initialized. Call init() first.');
    }
    const options = {
      context: 'This is a tech blog post',
    };
    if (streaming) {
      return this.summarizer.summarizeStreaming(content, options);
    } else {
      return this.summarizer.summarize(content, options);
    }
  }
}