# Audio chatbot with transformers.js

This is a simple audio chatbot application built using [Transformers.js](https://github.com/huggingface/transformers.js). It allows users to interact with a chatbot using voice input and receive voice responses.

In this PoC, Transformers.js is used for:

- [Speech to Text (STT)](https://huggingface.co/docs/transformers.js/api/pipelines#module_pipelines.AutomaticSpeechRecognitionPipeline) using the `'automatic-speech-recognition'` task and the `'Xenova/whisper-tiny.en'` model.
- [Text to Speech (TTS)](https://huggingface.co/docs/transformers.js/api/pipelines#module_pipelines.TextToAudioPipeline) using the `'text-to-speech'` task and the `'Xenova/speecht5_tts'` model.
- [Text Generation](https://huggingface.co/docs/transformers.js/api/pipelines#module_pipelines.TextGenerationPipeline) using the `'text-generation'` task and the `'Xenova/distilgpt2'` model.