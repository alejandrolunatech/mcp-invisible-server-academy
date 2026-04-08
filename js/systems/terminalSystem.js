/**
 * terminalSystem.js — Simulates a terminal with typed output and MCP messages
 */

export class TerminalSystem {
  /**
   * @param {HTMLElement} bodyEl - The .terminal-body element to render into
   */
  constructor(bodyEl) {
    this.body = bodyEl;
    this._queue = [];
    this._running = false;
  }

  /** Append a single line immediately */
  appendLine({ type = 'muted', text = '' }) {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.textContent = text;
    this.body.appendChild(line);
    this._scrollToBottom();
  }

  /** Clear all terminal output */
  clear() {
    this.body.innerHTML = '';
  }

  /**
   * Play a sequence of terminal lines with delays between them.
   * @param {Array} steps - Array of { type, text }
   * @param {number} delay - ms between lines
   * @returns {Promise} Resolves when complete
   */
  playSequence(steps, delay = 180) {
    return new Promise((resolve) => {
      this.clear();
      let i = 0;

      const next = () => {
        if (i >= steps.length) {
          resolve();
          return;
        }
        this.appendLine(steps[i]);
        i++;
        setTimeout(next, delay);
      };

      next();
    });
  }

  /**
   * Play a sequence without clearing first (for cumulative output)
   */
  appendSequence(steps, delay = 180) {
    return new Promise((resolve) => {
      let i = 0;
      const next = () => {
        if (i >= steps.length) { resolve(); return; }
        this.appendLine(steps[i]);
        i++;
        setTimeout(next, delay);
      };
      next();
    });
  }

  /** Replay the last played sequence */
  replay() {
    if (this._lastSequence) {
      this.playSequence(this._lastSequence);
    }
  }

  _scrollToBottom() {
    this.body.scrollTop = this.body.scrollHeight;
  }
}

/** Build a terminal panel HTML string */
export function buildTerminalHTML({ title = 'Terminal', id = 'terminal' } = {}) {
  return `
    <div class="terminal-panel">
      <div class="terminal-header">
        <div class="terminal-dots">
          <div class="terminal-dot"></div>
          <div class="terminal-dot"></div>
          <div class="terminal-dot"></div>
        </div>
        <div class="terminal-title">${title}</div>
        <div class="terminal-actions">
          <button class="btn-icon terminal-replay-btn" title="Replay">↺</button>
          <button class="btn-icon terminal-clear-btn"  title="Clear">✕</button>
        </div>
      </div>
      <div class="terminal-body" id="${id}-body"></div>
    </div>
  `;
}
