import fs from 'fs';
import path from 'path';

const fontBase64 = fs.readFileSync('public/fonts/Archistico_Simple.ttf').toString('base64');
const iconBase64 = fs.readFileSync('public/CalcIcon.png').toString('base64');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="ArchiCalc">
  <meta name="theme-color" content="#f97316" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)">
  <title>ArchiCalc Beta 1.3.1</title>
  
  <link rel="icon" type="image/png" href="data:image/png;base64,\${iconBase64}">
  <link rel="icon" type="image/png" href="CalcIcon.png">
  <link rel="apple-touch-icon" href="data:image/png;base64,\${iconBase64}">
  <link rel="apple-touch-icon" href="CalcIcon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            architect: ['Archistico', 'Architects Daughter', 'cursive', 'sans-serif']
          }
        }
      }
    };
  </script>

  <style>
    @font-face {
      font-family: 'Archistico';
      src: url('data:font/truetype;charset=utf-8;base64,${fontBase64}') format('truetype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    :root {
      --bg-body: #f1f5f9;
      --bg-calc: #ffffff;
      --calc-border: #e2e8f0;
      --tape-text: #64748b;
      --tape-border: #e2e8f0;
      --display-text: #0f172a;
      --display-dim: #64748b;
      --keypad-bg: #f1f5f9;
      
      --btn-bg: #ffffff;
      --btn-text: #334155;
      --btn-border: #e2e8f0;
      --btn-hover: #f8fafc;
      
      --btn-op-bg: #cffafe;
      --btn-op-text: #0e7490;
      --btn-unit-bg: #e0f2fe;
      --btn-unit-text: #0369a1;
      --btn-conv-bg: #e0e7ff;
      --btn-conv-text: #4338ca;
      --btn-ctrl-bg: #e2e8f0;
      --btn-ctrl-text: #475569;
      --btn-back-bg: #fef3c7;
      --btn-back-text: #b45309;
      --btn-equal-bg: #0ea5e9;
    }

    .dark {
      --bg-body: #020617;
      --bg-calc: #0f172a;
      --calc-border: #1e293b;
      --tape-text: #94a3b8;
      --tape-border: #1e293b;
      --display-text: #f8fafc;
      --display-dim: #94a3b8;
      --keypad-bg: #0f172a;
      
      --btn-bg: #1e293b;
      --btn-text: #f1f5f9;
      --btn-border: #334155;
      --btn-hover: #334155;
      
      --btn-op-bg: #164e63;
      --btn-op-text: #67e8f9;
      --btn-unit-bg: #0c4a6e;
      --btn-unit-text: #7dd3fc;
      --btn-conv-bg: #312e81;
      --btn-conv-text: #a5b4fc;
      --btn-ctrl-bg: #334155;
      --btn-ctrl-text: #cbd5e1;
      --btn-back-bg: #78350f;
      --btn-back-text: #fde68a;
      --btn-equal-bg: #0284c7;
    }

    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: var(--bg-body);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
    }

    .font-architect {
      font-family: 'Archistico', 'Architects Daughter', cursive, sans-serif;
    }

    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(148, 163, 184, 0.4);
      border-radius: 4px;
    }

    .calc-btn {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      height: 100%;
      min-height: 2.4rem;
      transition: all 0.1s ease;
      user-select: none;
      -webkit-user-select: none;
    }
    .calc-btn:active {
      transform: scale(0.93);
    }
    .shortcut {
      font-size: 9px;
      opacity: 0.6;
      font-weight: 400;
      line-height: 1;
      margin-top: 2px;
    }
  </style>
</head>
<body class="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased select-none overflow-hidden flex items-center justify-center h-screen h-[100dvh] max-h-screen max-h-[100dvh]">

  <!-- Calculator Shell Container (Snaps to full height) -->
  <main class="w-full max-w-[460px] h-full h-[100dvh] max-h-screen max-h-[100dvh] bg-white dark:bg-slate-900 sm:rounded-none sm:shadow-2xl border-0 sm:border-x border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-hidden relative">

    <!-- Header Section -->
    <header class="relative w-full bg-gradient-to-r from-orange-500 to-amber-600 dark:from-slate-900 dark:to-slate-950 text-white px-3 sm:px-4 py-2.5 flex items-center justify-between border-b border-orange-600/30 dark:border-slate-800 select-none shadow-md z-20 min-h-[50px] flex-shrink-0">
      <!-- Left Controls: Volume & Install -->
      <div class="flex items-center gap-1.5 z-10">
        <!-- Volume Toggle (Default Muted) -->
        <button id="volumeBtn" class="p-1.5 rounded-lg hover:bg-white/15 active:bg-white/25 transition text-white/90 hover:text-white" title="Click to Unmute Audio" aria-label="Toggle sound">
          <svg id="volumeIconMuted" class="w-4 h-4 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="22" y1="9" x2="16" y2="15"></line>
            <line x1="16" y1="9" x2="22" y2="15"></line>
          </svg>
          <svg id="volumeIconActive" class="w-4 h-4 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        </button>

        <!-- Install Icon Button (Icon Only) -->
        <button id="installBtn" class="p-1.5 rounded-lg hover:bg-white/15 active:bg-white/25 transition text-white/90 hover:text-white" title="Install App on Phone / Desktop" aria-label="Install App">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </button>
      </div>

      <!-- Centered Title in Archistico font -->
      <div id="titleContainer" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-baseline justify-center gap-1.5 cursor-pointer pointer-events-auto select-none" title="About ArchiCalc">
        <span class="font-architect text-2xl sm:text-[1.75rem] font-medium tracking-[2.5px] drop-shadow-xs leading-none">ArchiCalc</span>
        <span class="text-[10px] font-semibold bg-white/20 text-white/95 px-1.5 py-0.5 rounded tracking-wide uppercase">Beta</span>
      </div>

      <!-- Right Controls: Info Button -->
      <div class="flex items-center gap-1.5 z-10">
        <button id="infoBtn" class="p-1.5 rounded-lg hover:bg-white/15 active:bg-white/25 transition text-white/90 hover:text-white" title="About ArchiCalc & User Guide" aria-label="Information">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>
      </div>
    </header>

    <!-- Display Section (Tape + Main Readout) -->
    <div class="flex flex-col flex-1 min-h-[110px] max-h-[35%] bg-slate-50 dark:bg-slate-950 px-3 sm:px-4 py-2 border-b border-slate-200 dark:border-slate-800 justify-between select-none overflow-hidden">
      <!-- Calculation Tape (Scrollable & Click-to-Copy) -->
      <div class="relative group flex-1 overflow-hidden flex flex-col">
        <div id="historyTape" class="flex-1 overflow-y-auto text-right text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 custom-scrollbar pr-1 space-y-1 cursor-pointer transition-colors" title="Click to copy tape history">
          <div class="italic text-[11px] opacity-60">Ready • Enter feet, inches, fractions or metric</div>
        </div>
        <div id="copiedToast" class="absolute top-0 left-0 hidden bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded shadow transition-opacity">
          Tape Copied!
        </div>
      </div>

      <!-- Readouts & Active Buffer -->
      <div class="flex flex-col items-end mt-1.5 flex-shrink-0">
        <div id="secondaryDisplay" class="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 min-h-[1.2rem] text-right font-mono tracking-tight"></div>
        <div class="flex items-baseline justify-between w-full mt-1">
          <div class="flex items-center gap-1.5">
            <span id="modeTag" class="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-950/80 dark:text-orange-300">ARCHI</span>
            <span id="memTag" class="hidden text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300">M</span>
          </div>
          <div id="mainDisplay" class="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-slate-900 dark:text-slate-50 font-mono select-all text-right overflow-x-hidden text-ellipsis max-w-[320px]">
            0
          </div>
        </div>
      </div>
    </div>

    <!-- Keypad Section -->
    <div id="keypadContainer" class="grid grid-cols-5 grid-rows-7 gap-1.5 sm:gap-2 p-2 sm:p-2.5 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex-1 min-h-0 select-none">
      <!-- Keys rendered dynamically by JS -->
    </div>

  </main>

  <!-- Notice & Information Modal with Restored Disclaimers -->
  <div id="infoModal" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs hidden animate-in fade-in duration-200">
    <div class="relative w-full max-w-xl max-h-[90vh] bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden" onclick="event.stopPropagation()">
      
      <!-- Modal Header -->
      <div class="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
        <div class="flex items-center gap-2.5">
          <img src="data:image/png;base64,\${iconBase64}" alt="ArchiCalc Icon" class="w-8 h-8 rounded-lg shadow-xs object-cover border border-orange-500/20">
          <div>
            <h2 class="text-lg font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
              ArchiCalc
              <span class="text-[11px] font-semibold bg-orange-100 text-orange-700 dark:bg-orange-950/70 dark:text-orange-300 px-2 py-0.5 rounded-full">
                Beta 1.3.1
              </span>
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400">Architectural & Standard Precision Calculator</p>
          </div>
        </div>
        <button id="closeInfoBtn" class="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-5 overflow-y-auto space-y-5 text-sm custom-scrollbar leading-relaxed">
        
        <!-- Beta Warning Notice -->
        <div class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <span class="text-base select-none">⚠️</span>
          <div>
            <strong class="font-semibold">Note:</strong> This is a <strong>beta release</strong> currently in the testing stage. Functionality and accuracy are still being evaluated. Feedback and bug reports are welcome.
          </div>
        </div>

        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>ArchiCalc</strong> is designed specifically for architects, builders, and planners to perform precise dimensional calculations. It supports entry and manipulation of measurements in feet, inches, and fractions — and seamlessly converts between imperial and metric units.
        </p>

        <!-- Mode Switch Callout -->
        <div class="p-3.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/60 flex items-start gap-3">
          <div class="p-2 rounded-lg bg-orange-500 text-white shrink-0 mt-0.5">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line></svg>
          </div>
          <div class="text-xs">
            <strong class="text-orange-900 dark:text-orange-200 block text-sm font-semibold mb-0.5">Dual Architectural & Regular Modes</strong>
            Tap the <strong>toggle switch in the bottom right corner</strong> to switch instantly between the Architectural Calculator and a Standard Calculator.
          </div>
        </div>

        <!-- Installation Instructions -->
        <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
          <h3 class="font-semibold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">Install on Apple & Android Phones</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            <div class="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <div class="font-semibold text-slate-900 dark:text-slate-100">Apple iPhone & iPad</div>
              <ol class="list-decimal list-inside space-y-0.5 text-slate-600 dark:text-slate-400 text-[11px]">
                <li>Open in <strong>Safari</strong>.</li>
                <li>Tap <strong>Share</strong> (box with arrow).</li>
                <li>Tap <strong>Add to Home Screen</strong>.</li>
              </ol>
            </div>
            <div class="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <div class="font-semibold text-slate-900 dark:text-slate-100">Android Phones</div>
              <ol class="list-decimal list-inside space-y-0.5 text-slate-600 dark:text-slate-400 text-[11px]">
                <li>Tap browser menu (⋮).</li>
                <li>Tap <strong>Install App</strong> or <strong>Add to Home screen</strong>.</li>
              </ol>
            </div>
          </div>
        </div>

        <!-- Key Features -->
        <div>
          <h3 class="font-semibold text-slate-900 dark:text-slate-100 mb-2 text-xs sm:text-sm">Key Features</h3>
          <ul class="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <li><strong>Dimensional Input:</strong> Work directly in feet, inches, and fractions (e.g., <code>5 ft 6 3/8 in</code>).</li>
            <li><strong>Measurement Modes:</strong> Compute linear, area (sq ft / sq in), and volume (cu ft / cu in).</li>
            <li><strong>SQ-CU Mode:</strong> Toggle to enter direct area (SQ) or volume (CU) measurements.</li>
            <li><strong>Metric Conversion:</strong> Seamless conversion between imperial and metric (meters, cm, mm).</li>
            <li><strong>Fraction Rounding:</strong> Press <code>round (\)</code> repeatedly on results to cycle to nearest fraction (1/32, 1/16, 1/8, 1/4, 1/2, 1").</li>
            <li><strong>Calculation Tape:</strong> Scrollable tape keeps full history. Tap any tape entry to copy.</li>
          </ul>
        </div>

        <!-- License & Disclaimers -->
        <div class="border-t border-slate-200 dark:border-slate-800 pt-4 text-xs text-slate-600 dark:text-slate-400 space-y-3">
          <div>
            <h3 class="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-1">License</h3>
            <p>Copyright © 2026 Alen Moghaddam<br>This software is provided for personal, non-commercial use only.</p>
          </div>

          <div>
            <p class="font-medium text-slate-700 dark:text-slate-300">Permission is granted to:</p>
            <ul class="list-disc list-inside space-y-0.5 ml-1 text-[11.5px]">
              <li>Use the calculator for private or educational architectural purposes.</li>
              <li>Modify the code for your own local use.</li>
            </ul>
          </div>

          <div>
            <p class="font-medium text-slate-700 dark:text-slate-300">You are not permitted to:</p>
            <ul class="list-disc list-inside space-y-0.5 ml-1 text-[11.5px]">
              <li>Redistribute or sell this software or derivative works.</li>
              <li>Use it in any commercial, public-facing, or client-serving application.</li>
              <li>Host the calculator publicly without prior written permission from the author.</li>
            </ul>
          </div>

          <p class="text-[11px] leading-relaxed italic bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800">
            This software is provided "AS IS", without warranty of any kind, express or implied. This includes but is not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>

          <div class="p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-[11.5px] text-amber-950 dark:text-amber-200 leading-relaxed space-y-1">
            <strong class="text-amber-700 dark:text-amber-300 font-bold block flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <svg class="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              Disclaimer
            </strong>
            <p>
              The author shall not be held liable for any damages or consequences arising from the use or misuse of this calculator. All calculations should be independently verified before use in professional or regulatory contexts. This tool is not certified for use in code-compliant design, engineering, or life-safety-critical applications.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-slate-900 dark:text-slate-100 mb-0.5">Contributions</h3>
            <p class="text-[11px]">
              This is a closed project made available for individual use. Bug reports or enhancement suggestions are welcome via GitHub issues, but this project does not currently accept public contributions or pull requests.
            </p>
          </div>

          <div class="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div class="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
              <span class="text-amber-500 text-sm">★</span>
              <span>Created by Alen Moghaddam</span>
            </div>
            <a href="mailto:alm360@yahoo.com" class="text-orange-600 dark:text-orange-400 underline font-medium">alm360@yahoo.com</a>
          </div>
        </div>

      </div>

      <!-- Modal Footer -->
      <div class="px-5 py-3 border-t border-slate-200 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-950/50">
        <button id="modalDoneBtn" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 rounded-lg text-xs font-semibold transition">
          Done
        </button>
      </div>
    </div>
  </div>

  <!-- Pure Standalone Calculator Engine JavaScript -->
  <script>
    (function() {
      // --- Constants & Config ---
      const conversionFactors = { 'in': 1, 'dec-in': 1, 'ft': 12, 'dec-ft': 12, 'yd': 36, 'm': 39.3701, 'cm': 0.393701, 'mm': 0.0393701 };
      const areaFactors = { 'in': 1, 'dec-in': 1, 'ft': 144, 'dec-ft': 144, 'yd': 1296, 'm': 1550.0031, 'cm': 0.15500031, 'mm': 0.0015500031 };
      const volFactors = { 'in': 1, 'dec-in': 1, 'ft': 1728, 'dec-ft': 1728, 'yd': 46656, 'm': 61023.744, 'cm': 0.061023744, 'mm': 0.000061023744 };
      const roundDenominators = [32, 16, 8, 4, 2, 1];
      const MAX_HISTORY = 30;

      // --- Application State ---
      let darkMode = false;
      let soundEnabled = false; // Muted by default
      let mode = 'architectural'; // 'architectural' | 'regular'

      let currentInputStr = "0";
      let isResultState = false;
      let currentDisplayUnit = null;

      let firstOperand = null;
      let firstOperandType = 'linear';
      let operator = null;
      let pendingConversion = false;

      let lastOperator = null;
      let lastSecondOperand = null;
      let lastSecondOperandType = 'scalar';

      let currentResultType = 'scalar';
      let currentResultBaseValue = 0;
      let currentDimensionMode = 'linear';
      let sqcuPressCount = 0;
      let currentRoundDenomIndex = 0;

      let history = [];
      let activeTapeStr = "";

      let archMemory = { value: 0, type: 'linear', display: "0" };
      let regMemory = 0;

      // --- Audio Synthesizer Context ---
      let audioCtx = null;
      function playFeedback(type = 'standard') {
        if (!soundEnabled) return;
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (!audioCtx && AudioContextClass) audioCtx = new AudioContextClass();
          if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
          if (!audioCtx) return;

          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          const now = audioCtx.currentTime;

          let freq = 800;
          let duration = 0.018;
          if (type === 'operator') freq = 1100;
          else if (type === 'equals') { freq = 1400; duration = 0.035; }
          else if (type === 'error') { freq = 240; duration = 0.08; }

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + duration);
        } catch(e) {}
      }

      // --- DOM Elements ---
      const historyTapeEl = document.getElementById('historyTape');
      const secondaryDisplayEl = document.getElementById('secondaryDisplay');
      const mainDisplayEl = document.getElementById('mainDisplay');
      const modeTagEl = document.getElementById('modeTag');
      const memTagEl = document.getElementById('memTag');
      const keypadEl = document.getElementById('keypadContainer');
      const volumeBtnEl = document.getElementById('volumeBtn');
      const volumeMutedIcon = document.getElementById('volumeIconMuted');
      const volumeActiveIcon = document.getElementById('volumeIconActive');
      const installBtnEl = document.getElementById('installBtn');
      const infoBtnEl = document.getElementById('infoBtn');
      const infoModalEl = document.getElementById('infoModal');
      const closeInfoBtnEl = document.getElementById('closeInfoBtn');
      const modalDoneBtnEl = document.getElementById('modalDoneBtn');
      const copiedToastEl = document.getElementById('copiedToast');

      // --- Persistence Load ---
      try {
        const savedDark = localStorage.getItem('archicalc_dark_mode');
        if (savedDark !== null) darkMode = savedDark === 'true';
        else darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const savedMode = localStorage.getItem('archicalc_mode');
        if (savedMode === 'regular') mode = 'regular';

        const savedSound = localStorage.getItem('archicalc_sound');
        if (savedSound === 'true') soundEnabled = true; // default false
      } catch(e) {}

      function applyTheme() {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        try { localStorage.setItem('archicalc_dark_mode', darkMode); } catch(e) {}
      }
      applyTheme();

      function updateVolumeUI() {
        if (soundEnabled) {
          volumeMutedIcon.classList.add('hidden');
          volumeActiveIcon.classList.remove('hidden');
          volumeBtnEl.title = 'Click to Mute Audio';
        } else {
          volumeMutedIcon.classList.remove('hidden');
          volumeActiveIcon.classList.add('hidden');
          volumeBtnEl.title = 'Click to Unmute Audio';
        }
        try { localStorage.setItem('archicalc_sound', soundEnabled); } catch(e) {}
      }
      updateVolumeUI();

      volumeBtnEl.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        updateVolumeUI();
        if (soundEnabled) playFeedback('standard');
      });

      // --- Parsing & Math ---
      function cleanFloat(num) {
        return parseFloat(num.toFixed(10));
      }
      function displayFloat(num) {
        return parseFloat(num.toFixed(5));
      }
      function formatWithCommas(str) {
        if (!str) return str;
        return str.toString().replace(/\\b\\d+(?:\\.\\d+)?\\b/g, match => {
          const parts = match.split('.');
          parts[0] = parts[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
          return parts.length > 1 ? parts[0] + '.' + parts[1] : parts[0];
        });
      }

      function parseInputString(str) {
        str = str.toString().trim().toLowerCase().replace(/,/g, '');
        if (!str || str === '0') return { value: 0, type: 'scalar', isDimensional: false };
        if (/^-?\\d*\\.?\\d+$/.test(str)) return { value: parseFloat(str), type: 'scalar', isDimensional: false };

        let totalInches = 0;
        let isDim = false;
        let isNegative = str.startsWith('-');
        if (isNegative) str = str.substring(1).trim();

        let s = str
          .replace(/'/g, ' ft ')
          .replace(/"/g, ' in ')
          .replace(/(\\d+)-(\\d+\\/\\d+)/g, '$1 $2')
          .replace(/ft/g, ' ft ')
          .replace(/in/g, ' in ')
          .replace(/\\//g, ' / ')
          .replace(/\\s+/g, ' ')
          .trim();
        let tokens = s.split(' ');

        for (let i = 0; i < tokens.length; i++) {
          let token = tokens[i];
          if (!isNaN(parseFloat(token)) && token !== '/') {
            let val = Math.abs(parseFloat(token));
            if (tokens[i + 1] === 'ft') {
              totalInches += val * 12; isDim = true; i++;
            } else if (tokens[i + 1] === 'in') {
              totalInches += val; isDim = true; i++;
            } else if (tokens[i + 1] === '/') {
              if (tokens[i + 2] && !isNaN(parseFloat(tokens[i + 2]))) {
                totalInches += val / Math.abs(parseFloat(tokens[i + 2]));
                isDim = true; i += 2;
              }
            } else {
              totalInches += val; isDim = true;
            }
          }
        }
        if (isNegative) totalInches *= -1;
        return { value: totalInches, type: 'linear', isDimensional: isDim };
      }

      function gcd(a, b) {
        return b ? gcd(b, a % b) : a;
      }

      function formatDimensional(totalInches, denomLimit = 16) {
        const isNegative = totalInches < 0;
        let inches = Math.abs(totalInches);
        let feet = Math.floor(inches / 12);
        inches = inches % 12;

        let wholeInches = Math.floor(inches);
        let fractionalPart = inches - wholeInches;
        let num = Math.round(fractionalPart * denomLimit);

        if (num === denomLimit) {
          wholeInches += 1;
          num = 0;
          if (wholeInches === 12) {
            feet += 1;
            wholeInches = 0;
          }
        }

        let fractionStr = '';
        if (num > 0 && denomLimit > 1) {
          let divisor = gcd(num, denomLimit);
          fractionStr = (num / divisor) + '/' + (denomLimit / divisor);
        }

        let result = '';
        if (feet > 0) result += feet + ' ft ';
        if (wholeInches > 0) {
          result += wholeInches + (fractionStr ? ' ' + fractionStr : '') + ' in';
        } else if (fractionStr) {
          result += fractionStr + ' in';
        } else if (feet === 0) {
          result = '0 in';
        }
        return (isNegative ? '-' : '') + result.trim();
      }

      function formatValueDisplay(baseInches, type, unit = null, denomIndex = 0) {
        if (type === 'scalar') return String(displayFloat(baseInches));
        const denom = roundDenominators[denomIndex] || 16;

        if (unit) {
          if (unit === 'dec-ft') return displayFloat(baseInches / 12) + ' ft';
          if (unit === 'dec-in') return displayFloat(baseInches) + ' in';

          if (type === 'area') {
            return displayFloat(baseInches / (areaFactors[unit] || 1)) + ' sq ' + unit;
          }
          if (type === 'volume') {
            return displayFloat(baseInches / (volFactors[unit] || 1)) + ' cu ' + unit;
          }
          return displayFloat(baseInches / (conversionFactors[unit] || 1)) + ' ' + unit;
        }

        if (type === 'linear') return formatDimensional(baseInches, denom);
        if (type === 'area') return displayFloat(baseInches / 144) + ' sq ft';
        if (type === 'volume') return displayFloat(baseInches / 1728) + ' cu ft';
        return String(displayFloat(baseInches));
      }

      function calculate(op1, op1Type, op2, op2Type, op) {
        let resultVal = 0;
        let resultType = 'linear';

        if (op === 'multiply') {
          if (op1Type === 'linear' && op2Type === 'linear') resultType = 'area';
          else if ((op1Type === 'area' && op2Type === 'linear') || (op1Type === 'linear' && op2Type === 'area')) resultType = 'volume';
          else if (op1Type === 'scalar') resultType = op2Type;
          else if (op2Type === 'scalar') resultType = op1Type;
          else return { error: "Invalid Multiplication" };
        } else if (op === 'divide') {
          if (op2 === 0) return { error: "Div by Zero" };
          if (op1Type === 'area' && op2Type === 'linear') resultType = 'linear';
          else if (op1Type === 'volume' && op2Type === 'area') resultType = 'linear';
          else if (op1Type === 'volume' && op2Type === 'linear') resultType = 'area';
          else if (op1Type === op2Type) resultType = 'scalar';
          else if (op2Type === 'scalar') resultType = op1Type;
          else return { error: "Invalid Division" };
        } else if (op === 'add' || op === 'subtract') {
          if (op1Type !== op2Type && op1Type !== 'scalar' && op2Type !== 'scalar') return { error: "Unit Mismatch" };
          resultType = op1Type !== 'scalar' ? op1Type : op2Type;
        } else if (op === 'power') {
          resultType = 'scalar';
        }

        switch (op) {
          case 'add': resultVal = op1 + op2; break;
          case 'subtract': resultVal = op1 - op2; break;
          case 'multiply': resultVal = op1 * op2; break;
          case 'divide': resultVal = op1 / op2; break;
          case 'power': resultVal = Math.pow(op1, op2); break;
        }

        return { value: cleanFloat(resultVal), type: resultType };
      }

      function evaluateMathExpression(rawExpr) {
        const expr = rawExpr
          .replace(/×/g, '*')
          .replace(/[−–]/g, '-')
          .replace(/÷/g, '/')
          .replace(/\s+/g, '')
          .trim();
        if (!expr) return { value: 0 };

        const tokens = [];
        let i = 0;
        while (i < expr.length) {
          const ch = expr[i];
          if ('0123456789.'.includes(ch)) {
            let numStr = ch; i++;
            while (i < expr.length && '0123456789.'.includes(expr[i])) { numStr += expr[i]; i++; }
            tokens.push(numStr);
          } else if ('+-*/^()'.includes(ch)) {
            if (ch === '-' && (tokens.length === 0 || '+-*/^('.includes(tokens[tokens.length - 1]))) {
              if (i + 1 < expr.length && '0123456789.'.includes(expr[i + 1])) {
                let numStr = '-'; i++;
                while (i < expr.length && '0123456789.'.includes(expr[i])) { numStr += expr[i]; i++; }
                tokens.push(numStr);
              } else {
                tokens.push('-1'); tokens.push('*'); i++;
              }
            } else {
              if (ch === '(' && tokens.length > 0 && !'+-*/^('.includes(tokens[tokens.length - 1])) {
                tokens.push('*');
              }
              tokens.push(ch); i++;
            }
          } else if (ch === '%') {
            tokens.push('%'); i++;
          } else {
            i++;
          }
        }
        if (tokens.length === 0) return { value: 0 };

        const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
        const outputQueue = [];
        const operatorStack = [];

        for (let j = 0; j < tokens.length; j++) {
          const token = tokens[j];
          if (token === '%') {
            outputQueue.push('%');
          } else if (!isNaN(Number(token))) {
            outputQueue.push(token);
          } else if ('+-*/^'.includes(token)) {
            while (
              operatorStack.length > 0 &&
              operatorStack[operatorStack.length - 1] !== '(' &&
              ((token !== '^' && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) ||
                (token === '^' && precedence[operatorStack[operatorStack.length - 1]] > precedence[token]))
            ) {
              outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
          } else if (token === '(') {
            operatorStack.push(token);
          } else if (token === ')') {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
              outputQueue.push(operatorStack.pop());
            }
            if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] === '(') {
              operatorStack.pop();
            }
          }
        }

        while (operatorStack.length > 0) {
          const op = operatorStack.pop();
          if (op !== '(' && op !== ')') outputQueue.push(op);
        }

        const evalStack = [];
        for (const token of outputQueue) {
          if (token === '%') {
            if (evalStack.length === 0) return { value: 0, error: 'Invalid Expression' };
            evalStack.push(evalStack.pop() / 100);
          } else if (!isNaN(Number(token))) {
            evalStack.push(Number(token));
          } else {
            if (evalStack.length < 2) return { value: 0, error: 'Invalid Expression' };
            const b = evalStack.pop();
            const a = evalStack.pop();
            let res = 0;
            switch (token) {
              case '+': res = a + b; break;
              case '-': res = a - b; break;
              case '*': res = a * b; break;
              case '/':
                if (b === 0) return { value: 0, error: 'Div by Zero' };
                res = a / b;
                break;
              case '^': res = Math.pow(a, b); break;
            }
            evalStack.push(res);
          }
        }

        if (evalStack.length !== 1 || isNaN(evalStack[0])) return { value: 0, error: 'Invalid Expression' };
        return { value: cleanFloat(evalStack[0]) };
      }

      function addHistory(entry) {
        history.push(entry);
        if (history.length > MAX_HISTORY) history.shift();
        renderTape();
      }

      function renderTape() {
        if (history.length === 0) {
          historyTapeEl.innerHTML = '<div class="italic text-[11px] opacity-60">Ready • Enter feet, inches, fractions or metric</div>';
        } else {
          historyTapeEl.innerHTML = history.map(item => '<div>' + item + '</div>').join('');
          historyTapeEl.scrollTop = historyTapeEl.scrollHeight;
        }
      }

      // Copy Tape
      historyTapeEl.addEventListener('click', () => {
        const text = history.map(h => h.replace(/<[^>]*>/g, '')).join('\\n');
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
          copiedToastEl.classList.remove('hidden');
          setTimeout(() => copiedToastEl.classList.add('hidden'), 1500);
        });
      });

      // --- Update Displays ---
      function updateDisplay() {
        // Mode tag
        if (mode === 'architectural') {
          modeTagEl.textContent = 'ARCHI';
          modeTagEl.className = 'text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-950/80 dark:text-orange-300';
        } else {
          modeTagEl.textContent = 'REGULAR';
          modeTagEl.className = 'text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300';
        }

        // Memory tag
        const hasMem = mode === 'regular' ? regMemory !== 0 : archMemory.display !== '0';
        if (hasMem) memTagEl.classList.remove('hidden');
        else memTagEl.classList.add('hidden');

        // Main Readout
        if (currentInputStr === 'Error') {
          mainDisplayEl.textContent = 'Error';
          secondaryDisplayEl.textContent = '';
          return;
        }

        if (isResultState) {
          if (mode === 'regular') {
            mainDisplayEl.textContent = formatWithCommas(String(displayFloat(currentResultBaseValue)));
          } else {
            mainDisplayEl.textContent = formatValueDisplay(currentResultBaseValue, currentResultType, currentDisplayUnit, currentRoundDenomIndex);
          }
        } else {
          mainDisplayEl.textContent = formatWithCommas(currentInputStr);
        }

        // Secondary Text
        if (pendingConversion) {
          secondaryDisplayEl.textContent = 'Select Unit to Convert';
        } else if (mode === 'regular') {
          secondaryDisplayEl.textContent = activeTapeStr;
        } else if (isResultState) {
          let alt = '';
          const displayVal = displayFloat(currentResultBaseValue);
          if (currentResultType === 'area') alt = displayVal + ' sq in';
          else if (currentResultType === 'volume') alt = displayVal + ' cu in';
          else alt = displayVal + ' in';

          const denom = roundDenominators[currentRoundDenomIndex];
          const roundLbl = currentRoundDenomIndex > 0 ? ' (Rnd 1/' + (denom === 1 ? '1' : denom) + ')' : '';
          secondaryDisplayEl.textContent = formatWithCommas(alt + roundLbl);
        } else if (currentDimensionMode === 'area') {
          secondaryDisplayEl.textContent = 'SQ Mode Active';
        } else if (currentDimensionMode === 'volume') {
          secondaryDisplayEl.textContent = 'CU Mode Active';
        } else {
          const parsed = parseInputString(currentInputStr);
          if (parsed.isDimensional) {
            secondaryDisplayEl.textContent = formatWithCommas(displayFloat(parsed.value) + ' in');
          } else {
            secondaryDisplayEl.textContent = '';
          }
        }
      }

      // --- Actions ---
      function handleDigit(digit) {
        currentRoundDenomIndex = 0;
        if (isResultState) {
          currentInputStr = digit;
          isResultState = false;
        } else {
          currentInputStr = currentInputStr === '0' ? digit : currentInputStr + digit;
        }
        updateDisplay();
      }

      function handleDecimal() {
        if (isResultState) {
          currentInputStr = '0.';
          isResultState = false;
        } else {
          const parts = currentInputStr.split(/\\s+/);
          const lastPart = parts[parts.length - 1];
          if (!lastPart.includes('.')) {
            currentInputStr += '.';
          }
        }
        updateDisplay();
      }

      function handleSign() {
        if (isResultState) {
          currentResultBaseValue = -currentResultBaseValue;
          updateDisplay();
          return;
        }
        if (currentInputStr === '0') return;
        if (currentInputStr.startsWith('-')) currentInputStr = currentInputStr.substring(1);
        else currentInputStr = '-' + currentInputStr;
        updateDisplay();
      }

      function handleBackspace() {
        if (isResultState) {
          currentInputStr = '0';
          isResultState = false;
        } else {
          let s = currentInputStr.trimEnd();
          if (s.endsWith('ft') || s.endsWith('in')) s = s.slice(0, -2);
          else s = s.slice(0, -1);
          currentInputStr = s.trim() || '0';
        }
        updateDisplay();
      }

      function handleClear() {
        currentInputStr = '0';
        isResultState = false;
        firstOperand = null;
        firstOperandType = 'linear';
        operator = null;
        currentResultBaseValue = 0;
        currentResultType = 'linear';
        pendingConversion = false;
        activeTapeStr = '';
        currentRoundDenomIndex = 0;
        currentDimensionMode = 'linear';
        sqcuPressCount = 0;
        updateDisplay();
      }

      function handleClearTape() {
        history = [];
        activeTapeStr = '';
        renderTape();
        updateDisplay();
      }

      function handleOperator(op) {
        currentRoundDenomIndex = 0;

        if (mode === 'regular' && !isResultState) {
          const openParens = (currentInputStr.match(/\\(/g) || []).length;
          const closeParens = (currentInputStr.match(/\\)/g) || []).length;
          if (openParens > closeParens) {
            const symMap = { add: '+', subtract: '−', multiply: '×', divide: '÷', power: '^' };
            currentInputStr += ' ' + symMap[op] + ' ';
            updateDisplay();
            return;
          }
        }

        let parsed;
        if (isResultState) {
          parsed = { value: currentResultBaseValue, type: mode === 'regular' ? 'scalar' : currentResultType };
        } else if (mode === 'regular') {
          const ev = evaluateMathExpression(currentInputStr);
          parsed = { value: !ev.error ? ev.value : (parseFloat(currentInputStr) || 0), type: 'scalar' };
        } else {
          parsed = parseInputString(currentInputStr);
        }

        const symMap = { add: '+', subtract: '−', multiply: '×', divide: '÷', power: '^' };
        const sym = symMap[op];
        const displayStr = mode === 'regular' ? String(displayFloat(parsed.value)) : formatValueDisplay(parsed.value, parsed.type, currentDisplayUnit);

        if (!activeTapeStr) activeTapeStr = displayStr + ' ' + sym;
        else if (!isResultState) activeTapeStr += ' ' + displayStr + ' ' + sym;
        else activeTapeStr = activeTapeStr.replace(/ [+\\-−×÷^]$/, ' ' + sym);

        let curVal = parsed.value;
        let curType = parsed.type;
        if (operator && !isResultState && firstOperand !== null) {
          const res = calculate(firstOperand, firstOperandType, parsed.value, parsed.type, operator);
          if (!res.error) {
            curVal = res.value; curType = res.type;
            currentResultBaseValue = res.value; currentResultType = res.type;
          }
        } else {
          currentResultBaseValue = parsed.value;
          currentResultType = parsed.type;
        }

        firstOperand = curVal;
        firstOperandType = curType;
        operator = op;
        isResultState = true;
        pendingConversion = false;
        updateDisplay();
      }

      function handleEquals() {
        currentRoundDenomIndex = 0;
        let secondOp;
        let isRepeated = false;

        if (operator && firstOperand !== null) {
          if (isResultState) {
            secondOp = { value: currentResultBaseValue, type: mode === 'regular' ? 'scalar' : currentResultType };
          } else if (mode === 'regular') {
            const ev = evaluateMathExpression(currentInputStr);
            secondOp = { value: !ev.error ? ev.value : (parseFloat(currentInputStr) || 0), type: 'scalar' };
          } else {
            secondOp = parseInputString(currentInputStr);
          }
          lastOperator = operator;
          lastSecondOperand = secondOp.value;
          lastSecondOperandType = secondOp.type;
        } else if (lastOperator && lastSecondOperand !== null) {
          secondOp = { value: lastSecondOperand, type: lastSecondOperandType };
          operator = lastOperator;
          firstOperand = currentResultBaseValue;
          firstOperandType = mode === 'regular' ? 'scalar' : currentResultType;
          isRepeated = true;
        } else {
          let evaluatedVal = 0;
          let evaluatedType = 'linear';

          if (mode === 'regular') {
            const ev = evaluateMathExpression(currentInputStr);
            if (ev.error) {
              currentInputStr = 'Error';
              isResultState = true;
              playFeedback('error');
              updateDisplay();
              return;
            }
            evaluatedVal = ev.value;
            evaluatedType = 'scalar';
            addHistory(currentInputStr + ' = <strong>' + formatWithCommas(String(displayFloat(evaluatedVal))) + '</strong>');
          } else {
            const parsed = parseInputString(currentInputStr);
            evaluatedVal = parsed.value;
            evaluatedType = parsed.type;
          }

          currentResultBaseValue = evaluatedVal;
          currentResultType = evaluatedType;
          isResultState = true;
          updateDisplay();
          return;
        }

        const opToRun = isRepeated ? lastOperator : operator;
        const op1Val = isRepeated ? currentResultBaseValue : firstOperand;
        const op1Typ = isRepeated ? (mode === 'regular' ? 'scalar' : currentResultType) : firstOperandType;
        const res = calculate(op1Val, op1Typ, secondOp.value, secondOp.type, opToRun);

        if (res.error) {
          currentInputStr = 'Error';
          isResultState = true;
          playFeedback('error');
          updateDisplay();
          return;
        }

        const symMap = { add: '+', subtract: '−', multiply: '×', divide: '÷', power: '^' };
        const sym = symMap[opToRun];
        const secDisp = mode === 'regular' ? String(displayFloat(secondOp.value)) : formatValueDisplay(secondOp.value, secondOp.type, currentDisplayUnit);
        const resDisp = mode === 'regular' ? formatWithCommas(String(displayFloat(res.value))) : formatValueDisplay(res.value, res.type, currentDisplayUnit);

        if (isRepeated || !activeTapeStr) {
          const fDisp = mode === 'regular' ? String(displayFloat(op1Val)) : formatValueDisplay(op1Val, op1Typ, currentDisplayUnit);
          addHistory(fDisp + ' ' + sym + ' ' + secDisp + ' = <strong>' + resDisp + '</strong>');
        } else {
          addHistory(activeTapeStr + ' ' + secDisp + ' = <strong>' + resDisp + '</strong>');
          activeTapeStr = '';
        }

        currentResultBaseValue = res.value;
        currentResultType = res.type;
        isResultState = true;
        operator = null;
        updateDisplay();
      }

      // Architectural Functions
      function handleUnit(unit) {
        currentRoundDenomIndex = 0;
        if (pendingConversion) {
          let val = isResultState ? currentResultBaseValue : parseInputString(currentInputStr).value;
          let targetType = currentResultType === 'scalar' ? 'linear' : currentResultType;
          let nextUnit = unit;
          if (unit === 'ft') nextUnit = currentDisplayUnit === 'dec-ft' ? null : 'dec-ft';
          else if (unit === 'in') nextUnit = currentDisplayUnit === 'dec-in' ? null : 'dec-in';

          currentDisplayUnit = nextUnit;
          currentResultType = targetType;
          addHistory('Conv → <strong>' + formatValueDisplay(val, targetType, nextUnit) + '</strong>');
          isResultState = true;
          pendingConversion = false;
          updateDisplay();
          return;
        }

        if (currentDimensionMode !== 'linear') {
          const val = isResultState ? currentResultBaseValue : parseInputString(currentInputStr).value;
          if (isNaN(val)) return;
          let baseIn = 0;
          let rType = 'linear';
          if (currentDimensionMode === 'area') {
            baseIn = val * (areaFactors[unit] || 1); rType = 'area';
          } else {
            baseIn = val * (volFactors[unit] || 1); rType = 'volume';
          }
          currentResultBaseValue = baseIn;
          currentResultType = rType;
          currentDisplayUnit = unit;
          addHistory('Entered: ' + formatValueDisplay(baseIn, rType, unit));
          isResultState = true;
          sqcuPressCount = 0;
          currentDimensionMode = 'linear';
        } else {
          if (unit === 'ft' || unit === 'in') {
            if (isResultState) {
              const targetUnit = unit === 'ft'
                ? (currentDisplayUnit === 'dec-ft' ? null : 'dec-ft')
                : (currentDisplayUnit === 'dec-in' ? null : 'dec-in');
              currentDisplayUnit = targetUnit;
              addHistory('Conv → <strong>' + formatValueDisplay(currentResultBaseValue, currentResultType, targetUnit) + '</strong>');
            } else {
              currentDisplayUnit = null;
              currentInputStr = currentInputStr.endsWith(unit + ' ') ? currentInputStr : currentInputStr + ' ' + unit + ' ';
            }
          } else {
            if (isResultState) {
              currentDisplayUnit = unit;
              addHistory('Conv → <strong>' + formatValueDisplay(currentResultBaseValue, currentResultType, unit) + '</strong>');
            } else {
              const val = parseFloat(currentInputStr);
              if (!isNaN(val)) {
                const baseIn = val * (conversionFactors[unit] || 1);
                currentResultBaseValue = baseIn;
                currentResultType = 'linear';
                currentDisplayUnit = unit;
                isResultState = true;
                addHistory('Entered: ' + formatValueDisplay(baseIn, 'linear', unit));
              }
            }
          }
        }
        updateDisplay();
      }

      function handleFraction() {
        if (isResultState) {
          if (currentResultType === 'linear' || currentResultType === 'scalar') {
            currentRoundDenomIndex = (currentRoundDenomIndex + 1) % roundDenominators.length;
            const denom = roundDenominators[currentRoundDenomIndex];
            const formatted = formatDimensional(currentResultBaseValue, denom);
            addHistory('Round (' + (denom === 1 ? '1"' : '1/' + denom) + ') → <strong>' + formatted + '</strong>');
          }
        } else {
          if (!currentInputStr.endsWith('/')) currentInputStr += '/';
        }
        updateDisplay();
      }

      function handleConvert() {
        pendingConversion = true;
        updateDisplay();
      }

      function handleToggleSqCu() {
        sqcuPressCount = (sqcuPressCount + 1) % 3;
        currentDimensionMode = ['linear', 'area', 'volume'][sqcuPressCount];
        updateDisplay();
      }

      function handleMemoryStore() {
        const mVal = isResultState ? currentResultBaseValue : parseInputString(currentInputStr).value;
        const mType = isResultState ? currentResultType : parseInputString(currentInputStr).type;
        const display = formatValueDisplay(mVal, mType);
        archMemory = { value: mVal, type: mType, display: display };
        addHistory('Stored: ' + display);
        isResultState = true;
        updateDisplay();
      }

      function handleMemoryRecall() {
        if (mode === 'regular') {
          currentResultBaseValue = regMemory;
          currentResultType = 'scalar';
          isResultState = true;
          addHistory('Recalled: ' + displayFloat(regMemory));
        } else if (archMemory.display !== '0') {
          currentResultBaseValue = archMemory.value;
          currentResultType = archMemory.type;
          currentDisplayUnit = null;
          isResultState = true;
          addHistory('Recalled: ' + archMemory.display);
        }
        updateDisplay();
      }

      // Regular Mode Functions
      function handlePercent() {
        const val = isResultState ? currentResultBaseValue : (parseFloat(currentInputStr) || 0);
        let res = val * 0.01;
        if (firstOperand !== null && operator) {
          if (operator === 'add' || operator === 'subtract') res = firstOperand * (val / 100);
        }
        currentResultBaseValue = cleanFloat(res);
        currentResultType = 'scalar';
        isResultState = true;
        addHistory(val + '% = <strong>' + cleanFloat(res) + '</strong>');
        updateDisplay();
      }

      function handleSqrt() {
        const val = isResultState ? currentResultBaseValue : (parseFloat(currentInputStr) || 0);
        if (val < 0) {
          currentInputStr = 'Error';
          isResultState = true;
          playFeedback('error');
        } else {
          const res = cleanFloat(Math.sqrt(val));
          currentResultBaseValue = res;
          currentResultType = 'scalar';
          isResultState = true;
          addHistory('√(' + val + ') = <strong>' + res + '</strong>');
        }
        updateDisplay();
      }

      function handleSquare() {
        const val = isResultState ? currentResultBaseValue : (parseFloat(currentInputStr) || 0);
        const res = cleanFloat(val * val);
        currentResultBaseValue = res;
        currentResultType = 'scalar';
        isResultState = true;
        addHistory('(' + val + ')² = <strong>' + res + '</strong>');
        updateDisplay();
      }

      function handleReciprocal() {
        const val = isResultState ? currentResultBaseValue : (parseFloat(currentInputStr) || 0);
        if (val === 0) {
          currentInputStr = 'Error';
          isResultState = true;
          playFeedback('error');
        } else {
          const res = cleanFloat(1 / val);
          currentResultBaseValue = res;
          currentResultType = 'scalar';
          isResultState = true;
          addHistory('1/(' + val + ') = <strong>' + res + '</strong>');
        }
        updateDisplay();
      }

      function handlePi() {
        const res = cleanFloat(Math.PI);
        currentResultBaseValue = res;
        currentResultType = 'scalar';
        currentInputStr = String(res);
        isResultState = true;
        updateDisplay();
      }

      function handleMemoryAdd() {
        const val = isResultState ? currentResultBaseValue : (parseFloat(currentInputStr) || 0);
        regMemory = cleanFloat(regMemory + val);
        addHistory('M+ ' + val + ' → [' + regMemory + ']');
        isResultState = true;
        updateDisplay();
      }

      function handleMemorySub() {
        const val = isResultState ? currentResultBaseValue : (parseFloat(currentInputStr) || 0);
        regMemory = cleanFloat(regMemory - val);
        addHistory('M− ' + val + ' → [' + regMemory + ']');
        isResultState = true;
        updateDisplay();
      }

      function handleMemoryClear() {
        regMemory = 0;
        addHistory('Memory Cleared (MC)');
        updateDisplay();
      }

      function toggleMode(target) {
        mode = target || (mode === 'architectural' ? 'regular' : 'architectural');
        try { localStorage.setItem('archicalc_mode', mode); } catch(e) {}
        addHistory(mode === 'architectural' ? '--- Switched to Architectural Mode ---' : '--- Switched to Standard Calculator ---');
        renderKeypad();
        updateDisplay();
      }

      // --- Keypad Builder ---
      function renderKeypad() {
        const isArch = mode === 'architectural';
        let html = '';

        // Base styles
        const baseBtn = 'calc-btn text-sm sm:text-base';
        const unitBtn = 'bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:hover:bg-sky-900';
        const regFuncBtn = 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:text-indigo-300';
        const numBtn = 'bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 text-lg sm:text-xl font-semibold';
        const opBtn = 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 text-xl font-semibold';
        const ctrlBtn = 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700';

        // Row 1
        if (isArch) {
          html += '<button class="' + baseBtn + ' ' + unitBtn + '" data-action="unit-yd"><span>Yards</span></button>';
          html += '<button class="' + baseBtn + ' ' + unitBtn + '" data-action="unit-ft"><span>Feet</span><span class="shortcut">(&apos;)</span></button>';
          html += '<button class="' + baseBtn + ' ' + unitBtn + '" data-action="unit-in"><span>Inch</span><span class="shortcut">(;)</span></button>';
          html += '<button class="' + baseBtn + ' ' + unitBtn + '" data-action="fraction"><span class="leading-none text-base"><sup>x</sup>&frasl;<sub>x</sub></span><span class="shortcut">round (&#92;)</span></button>';
        } else {
          html += '<button class="' + baseBtn + ' ' + regFuncBtn + ' font-semibold" data-action="percent"><span>%</span></button>';
          html += '<button class="' + baseBtn + ' ' + regFuncBtn + '" data-action="paren-open"><span>(</span></button>';
          html += '<button class="' + baseBtn + ' ' + regFuncBtn + '" data-action="paren-close"><span>)</span></button>';
          html += '<button class="' + baseBtn + ' ' + regFuncBtn + ' font-semibold" data-action="reciprocal"><span>1/x</span></button>';
        }
        html += '<button class="' + baseBtn + ' bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-950/80 dark:text-amber-200 text-lg" data-action="backspace"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>';

        // Row 2
        if (isArch) {
          html += '<button class="' + baseBtn + ' ' + unitBtn + '" data-action="unit-cm"><span>cm</span></button>';
          html += '<button class="' + baseBtn + ' ' + unitBtn + '" data-action="unit-mm"><span>mm</span></button>';
          html += '<button class="' + baseBtn + ' ' + unitBtn + '" data-action="unit-m"><span>m</span></button>';
        } else {
          html += '<button class="' + baseBtn + ' ' + regFuncBtn + '" data-action="sqrt"><span>√x</span></button>';
          html += '<button class="' + baseBtn + ' ' + regFuncBtn + '" data-action="square"><span>x²</span></button>';
          html += '<button class="' + baseBtn + ' ' + regFuncBtn + '" data-action="pi"><span>π</span></button>';
        }
        html += '<button class="' + baseBtn + ' ' + opBtn + '" data-action="divide"><span>÷</span></button>';
        if (isArch) {
          html += '<button class="' + baseBtn + ' bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 font-medium" data-action="convert"><span>Conv</span><span class="shortcut">(v)</span></button>';
        } else {
          html += '<button class="' + baseBtn + ' ' + regFuncBtn + ' font-semibold" data-action="power"><span>xʸ</span></button>';
        }

        // Row 3
        html += '<button class="' + baseBtn + ' ' + numBtn + '" data-num="7">7</button>';
        html += '<button class="' + baseBtn + ' ' + numBtn + '" data-num="8">8</button>';
        html += '<button class="' + baseBtn + ' ' + numBtn + '" data-num="9">9</button>';
        html += '<button class="' + baseBtn + ' ' + opBtn + '" data-action="multiply"><span>×</span></button>';
        if (isArch) {
          html += '<button class="' + baseBtn + ' bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 text-xs sm:text-sm font-semibold" data-action="toggle-sqcu"><span>SQ|CU</span><span class="shortcut">(u)</span></button>';
        } else {
          html += '<button class="' + baseBtn + ' bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 font-semibold" data-action="mem-add"><span>M+</span></button>';
        }

        // Row 4
        html += '<button class="' + baseBtn + ' ' + numBtn + '" data-num="4">4</button>';
        html += '<button class="' + baseBtn + ' ' + numBtn + '" data-num="5">5</button>';
        html += '<button class="' + baseBtn + ' ' + numBtn + '" data-num="6">6</button>';
        html += '<button class="' + baseBtn + ' ' + opBtn + ' text-2xl" data-action="subtract"><span>−</span></button>';
        if (isArch) {
          html += '<button class="' + baseBtn + ' ' + unitBtn + ' text-xs sm:text-sm font-medium" data-action="mem-store"><span>Store</span></button>';
        } else {
          html += '<button class="' + baseBtn + ' bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 font-semibold" data-action="mem-sub"><span>M−</span></button>';
        }

        // Row 5
        html += '<button class="' + baseBtn + ' ' + numBtn + '" data-num="1">1</button>';
        html += '<button class="' + baseBtn + ' ' + numBtn + '" data-num="2">2</button>';
        html += '<button class="' + baseBtn + ' ' + numBtn + '" data-num="3">3</button>';
        html += '<button class="' + baseBtn + ' ' + opBtn + ' text-2xl" data-action="add"><span>+</span></button>';
        if (isArch) {
          html += '<button class="' + baseBtn + ' ' + unitBtn + ' text-xs sm:text-sm font-medium" data-action="mem-recall"><span>Recall</span></button>';
        } else {
          html += '<button class="' + baseBtn + ' bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 font-semibold" data-action="mem-recall" data-action-dbl="mem-clear" title="Recall (MR) - Tap On/C to clear"><span>MR</span></button>';
        }

        // Row 6
        html += '<button class="' + baseBtn + ' ' + numBtn + '" data-num="0">0</button>';
        html += '<button class="' + baseBtn + ' ' + numBtn + ' font-bold" data-action="decimal">.</button>';
        html += '<button class="' + baseBtn + ' ' + numBtn + '" data-action="sign">+/-</button>';
        html += '<button class="' + baseBtn + ' col-span-2 bg-sky-500 hover:bg-sky-600 text-white dark:bg-sky-600 text-2xl font-semibold shadow-md active:bg-sky-700" data-action="equals">=</button>';

        // Row 7
        html += '<button class="' + baseBtn + ' ' + ctrlBtn + ' text-[11px] sm:text-xs font-medium" data-action="clear-tape"><span>Clear Tape</span></button>';
        html += '<button class="' + baseBtn + ' ' + ctrlBtn + ' text-xs sm:text-sm font-semibold" data-action="clear"><span>On/C</span></button>';
        html += '<button id="darkToggleBtn" class="' + baseBtn + ' ' + ctrlBtn + ' text-base" data-action="dark-mode" aria-label="Toggle dark mode">';
        html += darkMode
          ? '<svg class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
          : '<svg class="w-4 h-4 text-slate-700 dark:text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        html += '</button>';

        // Row 7: TOGGLE SWITCH (Bottom two slots on the lower right, col-span-2)
        html += '<div class="' + baseBtn + ' col-span-2 p-0.5 sm:p-1 bg-slate-200/90 dark:bg-slate-800/90 border border-slate-300/80 dark:border-slate-700/80 rounded-xl shadow-inner flex flex-row items-stretch select-none overflow-hidden" role="group" aria-label="Calculator Mode Switch">';
        
        // Archi Segment
        html += '<button type="button" data-switch="architectural" class="flex-1 min-w-0 flex items-center justify-center gap-0.5 min-[380px]:gap-1.5 rounded-lg py-1 px-0.5 min-[380px]:px-1.5 transition-all duration-200 cursor-pointer ' +
          (isArch ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold shadow-sm shadow-orange-500/30' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 font-medium') +
          '" title="Switch to Architectural Calculator">';
        html += '<svg class="w-3 h-3 min-[380px]:w-3.5 min-[380px]:h-3.5 shrink-0 ' + (isArch ? 'text-white' : 'opacity-70') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>';
        html += '<span class="text-[9.5px] min-[380px]:text-[11px] sm:text-xs font-semibold tracking-tighter min-[380px]:tracking-normal leading-none whitespace-nowrap">Archi</span></button>';

        // Regular Segment
        html += '<button type="button" data-switch="regular" class="flex-1 min-w-0 flex items-center justify-center gap-0.5 min-[380px]:gap-1.5 rounded-lg py-1 px-0.5 min-[380px]:px-1.5 transition-all duration-200 cursor-pointer ' +
          (!isArch ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-sm shadow-emerald-500/30' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 font-medium') +
          '" title="Switch to Regular Calculator">';
        html += '<svg class="w-3 h-3 min-[380px]:w-3.5 min-[380px]:h-3.5 shrink-0 ' + (!isArch ? 'text-white' : 'opacity-70') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line></svg>';
        html += '<span class="text-[9.5px] min-[380px]:text-[11px] sm:text-xs font-semibold tracking-tighter min-[380px]:tracking-normal leading-none whitespace-nowrap">Regular</span></button>';

        html += '</div>';

        keypadEl.innerHTML = html;
      }

      // --- Keypad Click Delegation ---
      keypadEl.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        // Mode switch segment
        if (btn.dataset.switch) {
          playFeedback('operator');
          toggleMode(btn.dataset.switch);
          return;
        }

        // Numbers
        if (btn.dataset.num !== undefined) {
          playFeedback('standard');
          handleDigit(btn.dataset.num);
          return;
        }

        const action = btn.dataset.action;
        if (!action) return;

        if (action === 'dark-mode') {
          playFeedback('standard');
          darkMode = !darkMode;
          applyTheme();
          renderKeypad();
          return;
        }

        switch (action) {
          case 'decimal': playFeedback('standard'); handleDecimal(); break;
          case 'sign': playFeedback('standard'); handleSign(); break;
          case 'backspace': playFeedback('standard'); handleBackspace(); break;
          case 'clear': playFeedback('standard'); handleClear(); break;
          case 'clear-tape': playFeedback('standard'); handleClearTape(); break;
          case 'equals': playFeedback('equals'); handleEquals(); break;

          case 'add':
          case 'subtract':
          case 'multiply':
          case 'divide':
          case 'power':
            playFeedback('operator'); handleOperator(action); break;

          case 'unit-yd': playFeedback('standard'); handleUnit('yd'); break;
          case 'unit-ft': playFeedback('standard'); handleUnit('ft'); break;
          case 'unit-in': playFeedback('standard'); handleUnit('in'); break;
          case 'unit-cm': playFeedback('standard'); handleUnit('cm'); break;
          case 'unit-mm': playFeedback('standard'); handleUnit('mm'); break;
          case 'unit-m': playFeedback('standard'); handleUnit('m'); break;

          case 'fraction': playFeedback('standard'); handleFraction(); break;
          case 'convert': playFeedback('operator'); handleConvert(); break;
          case 'toggle-sqcu': playFeedback('standard'); handleToggleSqCu(); break;
          case 'mem-store': playFeedback('standard'); handleMemoryStore(); break;
          case 'mem-recall': playFeedback('standard'); handleMemoryRecall(); break;

          case 'percent': playFeedback('operator'); handlePercent(); break;
          case 'paren-open':
            playFeedback('standard');
            if (isResultState) { currentInputStr = '('; isResultState = false; }
            else { currentInputStr = currentInputStr === '0' ? '(' : currentInputStr + '('; }
            updateDisplay();
            break;
          case 'paren-close':
            playFeedback('standard');
            currentInputStr += ')';
            updateDisplay();
            break;
          case 'sqrt': playFeedback('operator'); handleSqrt(); break;
          case 'square': playFeedback('operator'); handleSquare(); break;
          case 'reciprocal': playFeedback('operator'); handleReciprocal(); break;
          case 'pi': playFeedback('standard'); handlePi(); break;
          case 'mem-add': playFeedback('standard'); handleMemoryAdd(); break;
          case 'mem-sub': playFeedback('standard'); handleMemorySub(); break;
          case 'mem-clear': playFeedback('standard'); handleMemoryClear(); break;
        }
      });

      // --- Modals ---
      function openModal() { infoModalEl.classList.remove('hidden'); }
      function closeModal() { infoModalEl.classList.add('hidden'); }

      infoBtnEl.addEventListener('click', openModal);
      document.getElementById('titleContainer').addEventListener('click', openModal);
      closeInfoBtnEl.addEventListener('click', closeModal);
      modalDoneBtnEl.addEventListener('click', closeModal);
      infoModalEl.addEventListener('click', (e) => {
        if (e.target === infoModalEl) closeModal();
      });

      // Install button click
      let deferredPrompt = null;
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
      });
      installBtnEl.addEventListener('click', () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
        } else {
          openModal();
        }
      });

      // Keyboard Shortcuts
      window.addEventListener('keydown', (e) => {
        const k = e.key;
        if (/[0-9]/.test(k)) { e.preventDefault(); playFeedback('standard'); handleDigit(k); }
        else if (k === '.') { e.preventDefault(); playFeedback('standard'); handleDecimal(); }
        else if (k === '+') { e.preventDefault(); playFeedback('operator'); handleOperator('add'); }
        else if (k === '-') { e.preventDefault(); playFeedback('operator'); handleOperator('subtract'); }
        else if (k === '*' || k.toLowerCase() === 'x') { e.preventDefault(); playFeedback('operator'); handleOperator('multiply'); }
        else if (k === '/') {
          e.preventDefault();
          if (mode === 'architectural') { playFeedback('standard'); handleFraction(); }
          else { playFeedback('operator'); handleOperator('divide'); }
        }
        else if (k === 'Enter' || k === '=') { e.preventDefault(); playFeedback('equals'); handleEquals(); }
        else if (k === 'Backspace') { e.preventDefault(); playFeedback('standard'); handleBackspace(); }
        else if (k === 'Escape' || (k.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey)) { e.preventDefault(); playFeedback('standard'); handleClear(); }
        else if (k === "'" && mode === 'architectural') { e.preventDefault(); playFeedback('standard'); handleUnit('ft'); }
        else if (k === ';' && mode === 'architectural') { e.preventDefault(); playFeedback('standard'); handleUnit('in'); }
        else if (k === '\\\\' && mode === 'architectural') { e.preventDefault(); playFeedback('standard'); handleFraction(); }
        else if (k.toLowerCase() === 'v' && mode === 'architectural' && !e.ctrlKey && !e.metaKey) { e.preventDefault(); playFeedback('operator'); handleConvert(); }
        else if (k.toLowerCase() === 'u' && mode === 'architectural') { e.preventDefault(); playFeedback('standard'); handleToggleSqCu(); }
        else if (k.toLowerCase() === 'm' && !e.ctrlKey && !e.metaKey) { e.preventDefault(); playFeedback('operator'); toggleMode(); }
      });

      // Init
      renderKeypad();
      updateDisplay();
    })();
  </script>
</body>
</html>`;

fs.writeFileSync('public/ArchiCalc.html', htmlContent, 'utf8');
fs.writeFileSync('ArchiCalc.html', htmlContent, 'utf8');
console.log('Successfully generated public/ArchiCalc.html and ArchiCalc.html with embedded Archistico font!');
