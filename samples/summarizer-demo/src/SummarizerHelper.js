export class SummarizerHelper {
  constructor() {
    this.logElement = document.querySelector('#logs');
    this.summarizer = null;
  }

  async init(options = {}) {
    if ('Summarizer' in self) {
      options.sharedContext = 'This a blog technical blog post and you are a specialist in summarizing technical content';
      const available = await Summarizer.availability();
      let writer;
      if (available === 'unavailable') {
        this.logElement.innerHTML += 'Summarizer API is not available.<br>';
        return;
      }
      if (available === 'available') {
        this.logElement.innerHTML += 'Summarizer API is available.<br>';
        this.summarizer = await Summarizer.create(options);
      } else {
        this.logElement.innerHTML += '// The Rewriter can be used after the model is downloaded.<br>';
        this.summarizer = await Summarizer.create({
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