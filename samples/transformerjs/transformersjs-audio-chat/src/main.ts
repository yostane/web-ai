import "./style.css";
import {
  pipeline,
  env,
  TextToAudioPipeline,
  AutomaticSpeechRecognitionPipeline,
  type ProgressInfo,
} from "@huggingface/transformers";

// Configure environment for Transformers.js
env.allowLocalModels = false;
env.allowRemoteModels = true;

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

class AudioChatbot {
  private messages: Message[] = [];
  private isListening = false;
  private isProcessing = false;
  private messagesContainer: HTMLElement;
  private asr?: AutomaticSpeechRecognitionPipeline;
  private tts?: TextToAudioPipeline;
  private textGen: any = null;
  private mediaRecorder?: MediaRecorder;

  constructor() {
    this.messagesContainer = document.createElement("div");
    this.setupUI();
    this.initializePipelines();
    this.attachEventListeners();
  }

  private setupUI(): void {
    const appContainer = document.querySelector<HTMLDivElement>("#app")!;
    appContainer.innerHTML = `
      <div class="chatbot-container">
        <header class="chatbot-header">
          <h1>🎤 Audio Chatbot with Transformers.js</h1>
          <p>Speak to chat with the AI assistant</p>
        </header>

        <div class="messages-container" id="messages"></div>

        <div class="input-area">
          <button id="recordBtn" class="record-btn" title="Click to start recording">
            <span class="mic-icon">🎤</span>
            <span class="btn-text">Click to Record</span>
          </button>
          <button id="clearBtn" class="clear-btn">Clear Chat</button>
        </div>

        <div class="status-bar">
          <span id="status">Loading AI models...</span>
        </div>
      </div>
    `;

    this.messagesContainer = document.querySelector("#messages")!;
  }

  private initializePipelines(): void {
    // Load AI pipelines asynchronously
    this.loadPipelines();
  }

  private async loadPipelines(): Promise<void> {
    const logProgress = (info: ProgressInfo) => {
      console.log(info);
      switch (info.status) {
        case "initiate":
          this.updateStatus(`Starting download for ${info.file}...`);
          break;
        case "download":
          this.updateStatus(`Downloading ${info.name}: (${info.file})...`);
          break;
        case "progress":
          this.updateStatus(
            `Progress for ${info.file}: <progress value="${info.progress}" max="100"></progress>`
          );
          break;
        case "ready":
          this.updateStatus(`${info.task} with ${info.model} is ready.`);
          break;
        case "done":
          this.updateStatus(`${info.file} download completed.`);
          break;
      }
    };
    try {
      this.updateStatus("Loading Speech-to-Text model...");
      // Load Automatic Speech Recognition pipeline (Whisper)
      const asr = await pipeline(
        "automatic-speech-recognition",
        "Xenova/whisper-tiny.en",
        {
          progress_callback: logProgress,
        }
      );
      this.asr = asr;

      this.updateStatus("Loading Text-to-Speech model...");
      // Load Text-to-Speech pipeline
      const synthesizer = await pipeline(
        "text-to-speech",
        "Xenova/speecht5_tts",
        {
          progress_callback: logProgress,
        }
      );
      this.tts = synthesizer;

      this.updateStatus("Loading Text Generation model...");
      // Load Text Generation pipeline
      this.textGen = await pipeline("text-generation", "Xenova/distilgpt2", {
        progress_callback: logProgress,
      });

      this.updateStatus("Ready");
      this.addMessage(
        "AI models loaded successfully! Click the microphone to start speaking.",
        "bot"
      );
    } catch (error) {
      console.error("Error loading pipelines:", error);
      this.addMessage(
        "Error loading AI models: " + (error as Error).message,
        "bot"
      );
      this.updateStatus("Error loading models");
    }
  }

  private attachEventListeners(): void {
    const recordBtn = document.querySelector("#recordBtn")!;
    const clearBtn = document.querySelector("#clearBtn")!;

    recordBtn.addEventListener("click", () => this.startRecording());
    clearBtn.addEventListener("click", () => this.clearChat());
  }

  private async startRecording(): Promise<void> {
    if (!this.asr) {
      this.addMessage("Speech Recognition model not loaded yet", "bot");
      return;
    }

    if (this.isListening || this.isProcessing) {
      this.mediaRecorder?.stop();
      return;
    }

    try {
      this.isListening = true;
      this.updateRecordButton();
      this.updateStatus("Recording...");

      // Get audio stream from microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create audio context and recorder
      this.mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      this.mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      this.mediaRecorder.onstop = async () => {
        this.isListening = false;
        this.updateRecordButton();
        this.updateStatus("Processing audio...");

        // Create blob from chunks
        const audioBlob = new Blob(chunks, { type: "audio/wav" });

        // Convert blob to ArrayBuffer
        const arrayBuffer = await audioBlob.arrayBuffer();

        // Process audio with ASR pipeline
        await this.processAudio(arrayBuffer);

        // Stop audio stream
        stream.getTracks().forEach((track) => track.stop());
      };
      this.mediaRecorder.start();
      console.log(this.mediaRecorder.state);
    } catch (error) {
      console.error("Microphone error:", error);
      this.addMessage("Microphone access denied or unavailable", "bot");
      this.isListening = false;
      this.updateRecordButton();
      this.updateStatus("Ready");
    }
  }

  private async processAudio(audioBuffer: ArrayBuffer): Promise<void> {
    try {
      if (this.asr == undefined) {
        throw new Error("No ASR");
      }
      this.isProcessing = true;

      // Decode audio buffer
      const audioContext = new AudioContext();
      const audioData = await audioContext.decodeAudioData(audioBuffer);

      // Get audio samples
      const samples = audioData.getChannelData(0);

      // Run ASR pipeline
      this.updateStatus("Recognizing speech...");
      const asrResult = await this.asr(samples);
      const result = typeof asrResult === AutomaticSpeechRecognitionOutput : asrResult[0] ? asrResult;
      const transcript = result.text;

      if (transcript) {
        this.addMessage(transcript, "user");
        await this.generateBotResponse(transcript);
      }
    } catch (error) {
      console.error("Audio processing error:", error);
      this.addMessage(
        "Error processing audio: " + (error as Error).message,
        "bot"
      );
    } finally {
      this.isProcessing = false;
      this.updateStatus("Ready");
    }
  }

  private addMessage(text: string, sender: "user" | "bot"): void {
    const message: Message = {
      id: `msg-${Date.now()}`,
      text,
      sender,
      timestamp: new Date(),
    };

    this.messages.push(message);
    this.renderMessage(message);
    this.scrollToBottom();
  }

  private renderMessage(message: Message): void {
    const messageEl = document.createElement("div");
    messageEl.className = `message message-${message.sender}`;
    messageEl.id = message.id;

    const content = document.createElement("div");
    content.className = "message-content";
    content.textContent = message.text;

    messageEl.appendChild(content);
    this.messagesContainer.appendChild(messageEl);

    if (message.sender === "bot") {
      this.speak(message.text);
    }
  }

  private async generateBotResponse(userInput: string): Promise<void> {
    this.updateStatus("Generating response...");

    let response = "";

    try {
      if (this.textGen) {
        // Use Transformers.js for text generation
        const result = await this.textGen(userInput, {
          max_new_tokens: 50,
          do_sample: true,
          temperature: 0.7,
        });
        response = result[0].generated_text;
      } else {
        response = this.getBasicResponse(userInput);
      }
    } catch (error) {
      console.error("Error generating response:", error);
      response = this.getBasicResponse(userInput);
    }

    this.addMessage(response, "bot");
  }

  private getBasicResponse(userInput: string): string {
    const input = userInput.toLowerCase();

    if (input.includes("hello") || input.includes("hi")) {
      return "Hello! How can I help you today?";
    } else if (input.includes("how are you")) {
      return "I am doing great! Thanks for asking. How about you?";
    } else if (input.includes("what is your name")) {
      return "I am an Audio Chatbot powered by Transformers.js";
    } else if (input.includes("help")) {
      return "I can help you with various tasks. Try saying hello, asking how I am, or asking questions!";
    } else if (input.includes("time")) {
      return `The current time is ${new Date().toLocaleTimeString()}`;
    } else if (input.includes("date")) {
      return `Today is ${new Date().toLocaleDateString()}`;
    } else {
      return `You said: "${userInput}". That is interesting! Tell me more.`;
    }
  }

  private async speak(text: string): Promise<void> {
    if (!this.tts) {
      console.warn("TTS model not loaded");
      return;
    }

    try {
      this.updateStatus("Synthesizing speech...");

      // Generate speech audio
      const output = await this.tts(text, {
        speaker_embeddings:
          "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin",
      });

      // Play the audio
      const audioContext = new AudioContext();
      const source = audioContext.createBufferSource();
      const audioBuffer = audioContext.createBuffer(
        1,
        output.audio.length,
        output.sampling_rate
      );
      audioBuffer.copyToChannel(output.audio as Float32Array<ArrayBuffer>, 0);
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
      // Clean when the audio context ends
      source.onended = (ev) => {
        this.updateStatus("Ready");
      };
    } catch (error) {
      console.error("Text-to-speech error:", error);
      this.updateStatus("Ready");
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }, 0);
  }

  private updateRecordButton(): void {
    const recordBtn = document.querySelector("#recordBtn") as HTMLButtonElement;
    if (recordBtn) {
      if (this.isListening) {
        recordBtn.classList.add("recording");
        recordBtn.querySelector(".btn-text")!.textContent = "Recording...";
      } else {
        recordBtn.classList.remove("recording");
        recordBtn.querySelector(".btn-text")!.textContent = "Click to Record";
      }
    }
  }

  private updateStatus(status: string): void {
    const statusEl = document.querySelector("#status");
    if (statusEl) {
      statusEl.innerHTML = status;
    }
  }

  private clearChat(): void {
    this.messages = [];
    this.messagesContainer.innerHTML = "";
    this.updateStatus("Ready");
  }
}

// Initialize the chatbot when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new AudioChatbot();
});
