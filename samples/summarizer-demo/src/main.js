import './style.css'
import { SummarizerHelper } from "./SummarizerHelper";

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', async () => {

  const type = document.querySelector('#type').value;
  const length = document.querySelector('#length').value;
  const options = {
    type,
    length,
  };

  const summarizerHelper = new SummarizerHelper();
  const resultTextBox = document.querySelector('#result');
  resultTextBox.innerHTML = 'Loading...';
  await summarizerHelper.init(options);
  const prompt = document.querySelector('#message').value;
  const streaming = document.querySelector('#streaming').checked;
  try {
    const streamOrResult = await summarizerHelper.summarize(prompt, streaming);
    if (streaming) {
      resultTextBox.innerHTML = '';
      for await (const chunk of streamOrResult) {
        resultTextBox.append(chunk);
      }
    } else {
      resultTextBox.innerHTML = streamOrResult;
    }
    console.log(streamOrResult);
  } catch (error) {
    console.error('Error during summarization:', error);
    if (this.logElement) {
      this.logElement.innerHTML += `Error: ${error.message}<br>`;
    }
    return;
  }
});


