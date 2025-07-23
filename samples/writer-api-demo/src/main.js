import './style.css'
import { WriterHelper } from "./WriterHelper";

let writerHelper;

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', async () => {
  if (!writerHelper) {
    writerHelper = new WriterHelper();
    await writerHelper.init();
  }
  const prompt = document.querySelector('#input').value;
  const streaming = document.querySelector('#streaming').checked;
  const composeTextbox = document.querySelector('#result');
  composeTextbox.innerHTML = 'Loading...';
  const streamOrResult = await writerHelper.write(prompt, streaming);
  composeTextbox.innerHTML = '';
  if (streaming) {
    composeTextbox.innerHTML = '';
    for await (const chunk of streamOrResult) {
      composeTextbox.append(chunk);
    }
  } else {
    composeTextbox.innerHTML = streamOrResult;
  }
  console.log(streamOrResult);
});


