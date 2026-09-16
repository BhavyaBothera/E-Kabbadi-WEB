import React, { StrictMode, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// --- 1. Global Error Boundary ---
// Prevents complete app crashes during a live hackathon demo
interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught runtime error in E-Kabbadi:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-emerald-400 p-6 font-mono text-center selection:bg-emerald-900">
          <div className="max-w-md bg-zinc-900 p-8 rounded-2xl border border-emerald-500/20 shadow-2xl glass-panel-dark">
            <h1 className="text-2xl font-bold mb-4 text-red-400">⚠️ UI Exception Handled</h1>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              A frontend sub-routine encountered an unexpected state. The error has been captured and safely isolated to prevent system failure.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-6 py-2.5 bg-emerald-600/20 border border-emerald-500/50 text-emerald-300 rounded-full hover:bg-emerald-600/40 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              Reboot App State
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- 2. Offline Mode Readiness ---
// Prepares the app to run offline for scrap collectors in low-network areas
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    // Requires vite-plugin-pwa to generate sw.js
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.log('Offline mode standby: ', err);
    });
  });
}

// --- 3. Developer Console Easter Egg ---
console.log(
  "%c ♻️ E-Kabbadi Core Engine Online \n%c System initialized for hackathon presentation. AI vision modules standing by.",
  "color: #10b981; font-size: 18px; font-weight: bold; text-shadow: 0 0 5px rgba(16,185,129,0.5);",
  "color: #a1a1aa; font-size: 13px;"
);

// --- 4. Application Mount ---
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root DOM element');

createRoot(rootElement).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </StrictMode>
);