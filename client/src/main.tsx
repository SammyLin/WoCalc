import { createRoot } from "react-dom/client";
import { registerSW } from 'virtual:pwa-register';
import App from "./App";
import "./index.css";
import { initAmplitude } from "./lib/amplitude";

// Initialize Amplitude Analytics
initAmplitude();

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('有新版本可用，是否立即更新？')) {
      updateSW(true);
    }
  },
});

createRoot(document.getElementById("root")!).render(<App />);
