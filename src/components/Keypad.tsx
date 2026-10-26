import React from 'react';
import { CalcOperator, UnitKey } from '../utils/calculatorEngine';
import { ArrowLeft, Moon, Sun, Calculator, Compass } from 'lucide-react';

export type CalculatorMode = 'architectural' | 'regular';

interface KeypadProps {
  mode: CalculatorMode;
  onToggleMode: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;

  // Numbers & base inputs
  onDigit: (digit: string) => void;
  onDecimal: () => void;
  onSign: () => void;
  onBackspace: () => void;
  onClear: () => void;
  onClearTape: () => void;
  onEquals: () => void;
  onOperator: (op: CalcOperator) => void;

  // Architectural specific
  onUnit: (unit: UnitKey) => void;
  onFraction: () => void;
  onConvert: () => void;
  onToggleSqCu: () => void;
  onMemoryStore: () => void;
  onMemoryRecall: () => void;

  // Standard calculator specific
  onPercent: () => void;
  onSqrt: () => void;
  onSquare: () => void;
  onReciprocal: () => void;
  onPi: () => void;
  onParenOpen: () => void;
  onParenClose: () => void;
  onMemoryAdd: () => void;
  onMemorySub: () => void;
  onMemoryClear: () => void;

  // Tactile feedback
  triggerFeedback: (type?: 'standard' | 'operator' | 'equals' | 'error') => void;
}

export const Keypad: React.FC<KeypadProps> = ({
  mode,
  onToggleMode,
  darkMode,
  onToggleDarkMode,
  onDigit,
  onDecimal,
  onSign,
  onBackspace,
  onClear,
  onClearTape,
  onEquals,
  onOperator,
  onUnit,
  onFraction,
  onConvert,
  onToggleSqCu,
  onMemoryStore,
  onMemoryRecall,
  onPercent,
  onSqrt,
  onSquare,
  onReciprocal,
  onPi,
  onParenOpen,
  onParenClose,
  onMemoryAdd,
  onMemorySub,
  onMemoryClear,
  triggerFeedback,
}) => {
  const isArch = mode === 'architectural';

  // Base button classes with min-h-0 to allow proportional shrinking on shorter viewports
  const baseBtn =
    'relative flex flex-col items-center justify-center rounded-xl font-medium select-none transition-all duration-75 active:scale-95 cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 h-full min-h-0';
  const shortcutStyle = 'text-[9px] sm:text-[10px] opacity-60 font-normal leading-none mt-0.5';

  return (
    <div className="grid grid-cols-5 grid-rows-7 gap-1.5 sm:gap-2 p-2 sm:p-2.5 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex-1 min-h-0 select-none">
      {/* ROW 1 */}
      {isArch ? (
        <>
          <button
            onPointerDown={() => triggerFeedback()}
            onClick={() => onUnit('yd')}
            className={`${baseBtn} bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:hover:bg-sky-900 text-sm sm:text-base`}
            title="Convert to Yards"
          >
            <span>Yards</span>
          </button>
          <button
            onPointerDown={() => triggerFeedback()}
            onClick={() => onUnit('ft')}
            className={`${baseBtn} bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:hover:bg-sky-900 text-sm sm:text-base`}
            title="Add Feet"
          >
            <span>Feet</span>
            <span className={shortcutStyle}>(')</span>
          </button>
          <button
            onPointerDown={() => triggerFeedback()}
            onClick={() => onUnit('in')}
            className={`${baseBtn} bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:hover:bg-sky-900 text-sm sm:text-base`}
            title="Add Inches"
          >
            <span>Inch</span>
            <span className={shortcutStyle}>(;)</span>
          </button>
          <button
            onPointerDown={() => triggerFeedback()}
            onClick={() => onFraction()}
            className={`${baseBtn} bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:hover:bg-sky-900 text-sm sm:text-base`}
            title="Enter Fraction / Round Result"
          >
            <span className="leading-none text-base"><sup>x</sup>&frasl;<sub>x</sub></span>
            <span className={shortcutStyle}>round (\)</span>
          </button>
        </>
      ) : (
        <>
          <button
            onPointerDown={() => triggerFeedback('operator')}
            onClick={() => onPercent()}
            className={`${baseBtn} bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:text-indigo-300 text-base sm:text-lg font-semibold`}
            title="Percentage"
          >
            <span>%</span>
          </button>
          <button
            onPointerDown={() => triggerFeedback()}
            onClick={() => onParenOpen()}
            className={`${baseBtn} bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:text-indigo-300 text-base sm:text-lg`}
            title="Open Parenthesis"
          >
            <span>(</span>
          </button>
          <button
            onPointerDown={() => triggerFeedback()}
            onClick={() => onParenClose()}
            className={`${baseBtn} bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:text-indigo-300 text-base sm:text-lg`}
            title="Close Parenthesis"
          >
            <span>)</span>
          </button>
          <button
            onPointerDown={() => triggerFeedback('operator')}
            onClick={() => onReciprocal()}
            className={`${baseBtn} bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:text-indigo-300 text-sm sm:text-base font-semibold`}
            title="Reciprocal (1/x)"
          >
            <span>1/x</span>
          </button>
        </>
      )}

      {/* Row 1 Col 5: Backspace (shared) */}
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onBackspace()}
        className={`${baseBtn} bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-950/80 dark:text-amber-200 dark:hover:bg-amber-900 text-lg`}
        title="Backspace"
        aria-label="Backspace"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* ROW 2 */}
      {isArch ? (
        <>
          <button
            onPointerDown={() => triggerFeedback()}
            onClick={() => onUnit('cm')}
            className={`${baseBtn} bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-300 text-sm sm:text-base`}
            title="Convert to cm"
          >
            <span>cm</span>
          </button>
          <button
            onPointerDown={() => triggerFeedback()}
            onClick={() => onUnit('mm')}
            className={`${baseBtn} bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-300 text-sm sm:text-base`}
            title="Convert to mm"
          >
            <span>mm</span>
          </button>
          <button
            onPointerDown={() => triggerFeedback()}
            onClick={() => onUnit('m')}
            className={`${baseBtn} bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-300 text-sm sm:text-base`}
            title="Convert to meters"
          >
            <span>m</span>
          </button>
        </>
      ) : (
        <>
          <button
            onPointerDown={() => triggerFeedback('operator')}
            onClick={() => onSqrt()}
            className={`${baseBtn} bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:text-indigo-300 text-base sm:text-lg`}
            title="Square Root"
          >
            <span>√x</span>
          </button>
          <button
            onPointerDown={() => triggerFeedback('operator')}
            onClick={() => onSquare()}
            className={`${baseBtn} bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:text-indigo-300 text-base sm:text-lg`}
            title="Square (x²)"
          >
            <span>x²</span>
          </button>
          <button
            onPointerDown={() => triggerFeedback()}
            onClick={() => onPi()}
            className={`${baseBtn} bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:text-indigo-300 text-base sm:text-lg`}
            title="Pi (π = 3.14159...)"
          >
            <span>π</span>
          </button>
        </>
      )}

      {/* Row 2 Col 4: Divide (shared) */}
      <button
        onPointerDown={() => triggerFeedback('operator')}
        onClick={() => onOperator('divide')}
        className={`${baseBtn} bg-cyan-100 text-cyan-800 hover:bg-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 text-xl font-semibold`}
        title="Divide"
      >
        <span>÷</span>
      </button>

      {/* Row 2 Col 5: Conv (Archi) vs xʸ Power (Standard) */}
      {isArch ? (
        <button
          onPointerDown={() => triggerFeedback('operator')}
          onClick={() => onConvert()}
          className={`${baseBtn} bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 text-sm sm:text-base font-medium`}
          title="Conversion Mode"
        >
          <span>Conv</span>
          <span className={shortcutStyle}>(v)</span>
        </button>
      ) : (
        <button
          onPointerDown={() => triggerFeedback('operator')}
          onClick={() => onOperator('power')}
          className={`${baseBtn} bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:text-indigo-300 text-sm sm:text-base font-semibold`}
          title="Power (xʸ)"
        >
          <span>xʸ</span>
        </button>
      )}

      {/* ROW 3 */}
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onDigit('7')}
        className={`${baseBtn} bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 text-lg sm:text-xl font-semibold`}
      >
        7
      </button>
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onDigit('8')}
        className={`${baseBtn} bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 text-lg sm:text-xl font-semibold`}
      >
        8
      </button>
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onDigit('9')}
        className={`${baseBtn} bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 text-lg sm:text-xl font-semibold`}
      >
        9
      </button>
      {/* Row 3 Col 4: Multiply (shared) */}
      <button
        onPointerDown={() => triggerFeedback('operator')}
        onClick={() => onOperator('multiply')}
        className={`${baseBtn} bg-cyan-100 text-cyan-800 hover:bg-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 text-xl font-semibold`}
        title="Multiply"
      >
        <span>×</span>
      </button>
      {/* Row 3 Col 5: SQ|CU (Archi) vs M+ (Standard) */}
      {isArch ? (
        <button
          onPointerDown={() => triggerFeedback()}
          onClick={() => onToggleSqCu()}
          className={`${baseBtn} bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 text-xs sm:text-sm font-semibold`}
          title="Toggle SQ/CU Mode"
        >
          <span>SQ|CU</span>
          <span className={shortcutStyle}>(u)</span>
        </button>
      ) : (
        <button
          onPointerDown={() => triggerFeedback()}
          onClick={() => onMemoryAdd()}
          className={`${baseBtn} bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 text-sm sm:text-base font-semibold`}
          title="Memory Add (M+)"
        >
          <span>M+</span>
        </button>
      )}

      {/* ROW 4 */}
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onDigit('4')}
        className={`${baseBtn} bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 text-lg sm:text-xl font-semibold`}
      >
        4
      </button>
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onDigit('5')}
        className={`${baseBtn} bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 text-lg sm:text-xl font-semibold`}
      >
        5
      </button>
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onDigit('6')}
        className={`${baseBtn} bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 text-lg sm:text-xl font-semibold`}
      >
        6
      </button>
      {/* Row 4 Col 4: Subtract (shared) */}
      <button
        onPointerDown={() => triggerFeedback('operator')}
        onClick={() => onOperator('subtract')}
        className={`${baseBtn} bg-cyan-100 text-cyan-800 hover:bg-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 text-2xl font-semibold`}
        title="Subtract"
      >
        <span>−</span>
      </button>
      {/* Row 4 Col 5: Store (Archi) vs M- (Standard) */}
      {isArch ? (
        <button
          onPointerDown={() => triggerFeedback()}
          onClick={() => onMemoryStore()}
          className={`${baseBtn} bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-300 text-xs sm:text-sm font-medium`}
          title="Store Value into Memory"
        >
          <span>Store</span>
        </button>
      ) : (
        <button
          onPointerDown={() => triggerFeedback()}
          onClick={() => onMemorySub()}
          className={`${baseBtn} bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 text-sm sm:text-base font-semibold`}
          title="Memory Subtract (M-)"
        >
          <span>M−</span>
        </button>
      )}

      {/* ROW 5 */}
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onDigit('1')}
        className={`${baseBtn} bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 text-lg sm:text-xl font-semibold`}
      >
        1
      </button>
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onDigit('2')}
        className={`${baseBtn} bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 text-lg sm:text-xl font-semibold`}
      >
        2
      </button>
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onDigit('3')}
        className={`${baseBtn} bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 text-lg sm:text-xl font-semibold`}
      >
        3
      </button>
      {/* Row 5 Col 4: Add (shared) */}
      <button
        onPointerDown={() => triggerFeedback('operator')}
        onClick={() => onOperator('add')}
        className={`${baseBtn} bg-cyan-100 text-cyan-800 hover:bg-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 text-2xl font-semibold`}
        title="Add"
      >
        <span>+</span>
      </button>
      {/* Row 5 Col 5: Recall (Archi) vs MR (Standard) */}
      {isArch ? (
        <button
          onPointerDown={() => triggerFeedback()}
          onClick={() => onMemoryRecall()}
          className={`${baseBtn} bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-300 text-xs sm:text-sm font-medium`}
          title="Recall Memory"
        >
          <span>Recall</span>
        </button>
      ) : (
        <button
          onPointerDown={() => triggerFeedback()}
          onClick={() => onMemoryRecall()}
          className={`${baseBtn} bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 text-sm sm:text-base font-semibold`}
          title="Memory Recall (MR)"
        >
          <span>MR</span>
        </button>
      )}

      {/* ROW 6 */}
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onDigit('0')}
        className={`${baseBtn} bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 text-lg sm:text-xl font-semibold`}
      >
        0
      </button>
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onDecimal()}
        className={`${baseBtn} bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 text-xl font-bold`}
        title="Decimal point"
      >
        .
      </button>
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onSign()}
        className={`${baseBtn} bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 text-base sm:text-lg`}
        title="Toggle Sign (+/-)"
      >
        +/-
      </button>
      {/* Row 6 Col 4 & 5: Equals (span 2) */}
      <button
        onPointerDown={() => triggerFeedback('equals')}
        onClick={() => onEquals()}
        className={`${baseBtn} col-span-2 bg-sky-500 hover:bg-sky-600 text-white dark:bg-sky-600 dark:hover:bg-sky-500 text-2xl font-semibold shadow-md active:bg-sky-700`}
        title="Calculate Result (=)"
      >
        =
      </button>

      {/* ROW 7 */}
      {/* Col 1: Clear Tape */}
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onClearTape()}
        className={`${baseBtn} bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 text-[11px] sm:text-xs font-medium`}
        title="Clear Tape History"
      >
        <span>Clear Tape</span>
      </button>

      {/* Col 2: On/C */}
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onClear()}
        className={`${baseBtn} bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 text-xs sm:text-sm font-semibold`}
        title="Clear Current Calculation"
      >
        <span>On/C</span>
      </button>

      {/* Col 3: Dark Mode Toggle */}
      <button
        onPointerDown={() => triggerFeedback()}
        onClick={() => onToggleDarkMode()}
        className={`${baseBtn} bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 text-base`}
        title="Toggle Dark / Light Mode"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
      </button>

      {/* Col 4 & 5: Calculator Mode Toggle Switch (Archi vs Standard) */}
      <div
        className={`${baseBtn} col-span-2 p-0.5 sm:p-1 bg-slate-200/90 dark:bg-slate-800/90 border border-slate-300/80 dark:border-slate-700/80 rounded-xl shadow-inner flex flex-row items-stretch select-none overflow-hidden`}
        role="group"
        aria-label="Calculator Mode Switch"
      >
        {/* Archi Mode Toggle Option */}
        <button
          type="button"
          onPointerDown={() => triggerFeedback('operator')}
          onClick={() => {
            if (!isArch) onToggleMode();
          }}
          className={`flex-1 min-w-0 flex items-center justify-center gap-0.5 min-[380px]:gap-1.5 rounded-lg py-1 px-0.5 min-[380px]:px-1.5 transition-all duration-200 cursor-pointer ${
            isArch
              ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold shadow-sm shadow-orange-500/30'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 font-medium'
          }`}
          title="Switch to Architectural Calculator (Feet, Inches, Fractions, Conversions)"
          aria-pressed={isArch}
        >
          <Compass className={`w-3 h-3 min-[380px]:w-3.5 min-[380px]:h-3.5 shrink-0 ${isArch ? 'text-white' : 'opacity-70'}`} />
          <span className="text-[9px] min-[360px]:text-[10px] min-[400px]:text-xs font-semibold tracking-tighter min-[380px]:tracking-normal leading-none whitespace-nowrap">Archi</span>
        </button>

        {/* Standard Mode Toggle Option */}
        <button
          type="button"
          onPointerDown={() => triggerFeedback('operator')}
          onClick={() => {
            if (isArch) onToggleMode();
          }}
          className={`flex-1 min-w-0 flex items-center justify-center gap-0.5 min-[380px]:gap-1.5 rounded-lg py-1 px-0.5 min-[380px]:px-1.5 transition-all duration-200 cursor-pointer ${
            !isArch
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-sm shadow-emerald-500/30'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 font-medium'
          }`}
          title="Switch to Standard Calculator (Standard Math, Percent, Powers, Roots)"
          aria-pressed={!isArch}
        >
          <Calculator className={`w-3 h-3 min-[380px]:w-3.5 min-[380px]:h-3.5 shrink-0 ${!isArch ? 'text-white' : 'opacity-70'}`} />
          <span className="text-[9px] min-[360px]:text-[10px] min-[400px]:text-xs font-semibold tracking-tighter min-[380px]:tracking-normal leading-none whitespace-nowrap">Standard</span>
        </button>
      </div>
    </div>
  );
};
