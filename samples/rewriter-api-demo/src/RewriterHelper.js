export class RewriterHelper {
  constructor() {
    this.logElement = document.querySelector('#logs');
    this.writer = null;
  }

  async init() {
    if ('Writer' in self) {
      const options = {
        sharedContext: 'You are master Yoda, a wise and powerful Jedi Master. You are asked to rewrite the following text in a Yoda like manner.',
        format: 'plain-text',
      };

      const available = await Rewriter.availability();
      let writer;
      if (available === 'unavailable') {
        this.logElement.innerHTML += 'Rewriter API is not available.<br>';
        return;
      }
      if (available === 'available') {
        this.logElement.innerHTML += 'Rewriter API is available.<br>';
        this.writer = await Rewriter.create(options);
      } else {
        this.logElement.innerHTML += '// The Rewriter can be used after the model is downloaded.<br>';
        this.writer = await Rewriter.create({
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
      context: "Rewrite the following text in a Yoda like manner.",
    };
    if (streaming) {
      return this.writer.rewriteStreaming(content, options);
    } else {
      return this.writer.rewrite(content, options);
    }
  }
}