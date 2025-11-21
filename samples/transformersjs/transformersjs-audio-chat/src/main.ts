import { AudioChatbot } from "./AudioChatbot";
import "./style.css";

window.addEventListener("DOMContentLoaded", async () => {
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
          <div>
            <input type="checkbox" id="usebrowser-tts-stt" checked/> Use Browser TTS/STT instead of Transformers.js
          </div>
  
          <div class="status-bar">
            <span id="status">Loading AI models...</span>
          </div>
        </div>
      `;

  const chatbot = new AudioChatbot();
  await chatbot.initialize();
});
