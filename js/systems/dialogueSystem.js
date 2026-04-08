/**
 * dialogueSystem.js — Runs dialogue sequences with typing effect
 */

export class DialogueSystem {
  /**
   * Run a dialogue sequence inside a container element.
   * @param {HTMLElement} container - Element to render dialogue into
   * @param {Array} lines - Array of { char, name, role, emoji, text }
   * @returns {Promise} Resolves when the sequence is complete
   */
  static run(container, lines) {
    return new Promise((resolve) => {
      let index = 0;

      const box = container.querySelector('.dialogue-box') || _createBox(container);
      _showLine(box, lines, index, () => {
        index++;
        if (index < lines.length) {
          _showLine(box, lines, index, arguments.callee);
        } else {
          resolve();
        }
      });

      // Recursive advance
      function advance() {
        index++;
        if (index < lines.length) {
          _showLine(box, lines, index, advance);
        } else {
          resolve();
        }
      }

      _showLine(box, lines, index, advance);
    });
  }

  /**
   * Create and show dialogue box; returns a controller with next() and skip()
   */
  static create(container, lines, onComplete) {
    const box = _createBox(container);
    let index = 0;
    let typing = null;
    let done = false;

    function showCurrent() {
      if (index >= lines.length) {
        done = true;
        if (onComplete) onComplete();
        return;
      }
      typing = _typeLine(box, lines[index], () => {
        _updateDots(box, index, lines.length);
        _updateNextBtn(box, index, lines.length);
      });
      _updateDots(box, index, lines.length);
      _updateNextBtn(box, index, lines.length);
    }

    // Next button handler
    container.addEventListener('click', (e) => {
      if (!e.target.closest('.dialogue-next-btn')) return;
      if (typing && typing.isTyping) {
        typing.skip();
      } else {
        index++;
        showCurrent();
      }
    });

    // Skip all button
    container.addEventListener('click', (e) => {
      if (!e.target.closest('.dialogue-skip-btn')) return;
      index = lines.length;
      showCurrent();
    });

    showCurrent();
    return { isDone: () => done };
  }
}

// ─── Internal helpers ─────────────────────────────────────

function _createBox(container) {
  container.innerHTML = `
    <div class="dialogue-box">
      <div class="dialogue-box__header">
        <div class="dialogue-portrait" data-char="syn">🧙</div>
        <div>
          <div class="dialogue-speaker-name">—</div>
          <div class="dialogue-speaker-role">—</div>
        </div>
        <div class="dialogue-progress ms-auto" style="margin-left:auto"></div>
      </div>
      <div class="dialogue-text"></div>
      <div class="dialogue-actions">
        <button class="btn btn-ghost btn-sm dialogue-skip-btn">Skip All</button>
        <button class="btn btn-primary btn-sm dialogue-next-btn">Next ▶</button>
      </div>
    </div>
  `;
  return container.querySelector('.dialogue-box');
}

function _typeLine(box, line, onDone) {
  const portrait = box.querySelector('.dialogue-portrait');
  const nameEl   = box.querySelector('.dialogue-speaker-name');
  const roleEl   = box.querySelector('.dialogue-speaker-role');
  const textEl   = box.querySelector('.dialogue-text');

  portrait.setAttribute('data-char', line.char);
  portrait.textContent = line.emoji || '🧙';
  nameEl.textContent   = line.name;
  roleEl.textContent   = line.role;
  textEl.textContent   = '';

  const state = { isTyping: true, skip: null };
  const fullText = line.text;
  let i = 0;
  const speed = 22; // ms per character

  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  textEl.appendChild(cursor);

  const interval = setInterval(() => {
    if (i < fullText.length) {
      textEl.insertBefore(document.createTextNode(fullText[i]), cursor);
      i++;
    } else {
      clearInterval(interval);
      cursor.remove();
      state.isTyping = false;
      if (onDone) onDone();
    }
  }, speed);

  state.skip = () => {
    clearInterval(interval);
    textEl.textContent = fullText;
    state.isTyping = false;
    if (onDone) onDone();
  };

  return state;
}

function _showLine(box, lines, index, onNext) {
  if (index >= lines.length) return;
  _typeLine(box, lines[index], () => {
    _updateDots(box, index, lines.length);
    _updateNextBtn(box, index, lines.length);
  });
  _updateDots(box, index, lines.length);
  _updateNextBtn(box, index, lines.length);
}

function _updateDots(box, current, total) {
  const progress = box.querySelector('.dialogue-progress');
  if (!progress) return;
  progress.innerHTML = Array.from({ length: total }, (_, i) =>
    `<span class="dialogue-dot ${i === current ? 'active' : i < current ? 'done' : ''}"></span>`
  ).join('');
}

function _updateNextBtn(box, current, total) {
  const btn = box.querySelector('.dialogue-next-btn');
  if (!btn) return;
  btn.textContent = current >= total - 1 ? 'Continue ✓' : 'Next ▶';
}
