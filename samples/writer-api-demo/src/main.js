import './style.css'
import { WriterHelper } from "./WriterHelper";

let writerHelper;

window.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector('#submit');
  submitButton.addEventListener('click', async () => {
    if (!writerHelper) {
      writerHelper = new WriterHelper();
    }
    await writerHelper.init();
    const prompt = document.querySelector('#input').value;
    const document = await writerHelper.createDocument(prompt);
    console.log(document);
  });
});


