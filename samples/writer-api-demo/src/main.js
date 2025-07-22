import './style.css'

import { WriterHelper } from "./WriterHelper";

const writerHelper = new WriterHelper();
console.log(await writerHelper.createDocument("Hello, world!"));