import './style.css'
import { RewriterHelper } from "./RewriterHelper";

let rewriterHelper;

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', async () => {
  if (!rewriterHelper) {
    rewriterHelper = new RewriterHelper();
    await rewriterHelper.init();
  }
  const prompt = document.querySelector('#message').value;
  const streaming = document.querySelector('#streaming').checked;
  const composeTextbox = document.querySelector('#result');
  composeTextbox.innerHTML = 'Loading...';
  const streamOrResult = await rewriterHelper.write(prompt, streaming);
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


