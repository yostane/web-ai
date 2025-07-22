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
  const doc = await writerHelper.write(prompt);
  console.log(doc);
});


