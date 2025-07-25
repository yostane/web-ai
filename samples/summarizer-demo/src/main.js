import './style.css'
import { SummarizerHelper } from "./SummarizerHelper";
import { log } from "./Utils";

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
  log('Initializing SummarizerHelper with options:', options);
  await summarizerHelper.init(options);
  const prompt = document.querySelector('#message').value;
  const streaming = document.querySelector('#streaming').checked;
  try {
    log('Starting summarization');
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
    log('Summarization completed successfully.');
  } catch (error) {
    console.error('Error during summarization:', error);
    log(`Error: ${error.message}`);
    return;
  }
});


