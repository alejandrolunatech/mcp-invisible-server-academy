/**
 * puzzleSystem.js — Handles matching, ordering, simulation and diagnosis puzzles
 */

export class PuzzleSystem {
  /**
   * Render a puzzle inside a container.
   * @param {HTMLElement} container
   * @param {Object} puzzleConfig - Chapter puzzle configuration
   * @param {Function} onComplete - Called when puzzle is solved
   */
  static render(container, puzzleConfig, onComplete) {
    const { type } = puzzleConfig;

    switch (type) {
      case 'matching':
        renderMatchingPuzzle(container, puzzleConfig, onComplete);
        break;
      case 'ordering':
        renderOrderingPuzzle(container, puzzleConfig, onComplete);
        break;
      case 'simulation':
        renderSimulationPuzzle(container, puzzleConfig, onComplete);
        break;
      case 'diagnosis':
        renderDiagnosisPuzzle(container, puzzleConfig, onComplete);
        break;
      default:
        container.innerHTML = `<p class="text-muted">Unknown puzzle type: ${type}</p>`;
    }
  }
}

// ─── MATCHING PUZZLE ──────────────────────────────────────

function renderMatchingPuzzle(container, puzzle, onComplete) {
  const { leftItems, rightItems, matches, successMsg, failureHint } = puzzle;

  container.innerHTML = `
    <div class="puzzle-area">
      <div class="puzzle-title">🧩 ${puzzle.title}</div>
      <p class="puzzle-instructions">${puzzle.instructions}</p>
      <div class="puzzle-columns">
        <div>
          <div class="puzzle-column-label">Select one →</div>
          ${leftItems.map(item => `
            <div class="puzzle-item" data-id="${item.id}" data-side="left" style="border-left:3px solid ${item.color || 'var(--clr-primary)'}">
              <span>${item.icon || '•'}</span>
              <span>${item.label}</span>
            </div>
          `).join('')}
        </div>
        <div>
          <div class="puzzle-column-label">← Then select match</div>
          ${rightItems.map(item => `
            <div class="puzzle-item" data-id="${item.id}" data-side="right">
              <span>${item.icon || ''}</span>
              <span>${item.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="puzzle-status" id="puzzle-status"></div>
      <div id="puzzle-hint" style="margin-top:var(--sp-3); font-size:0.85rem; color:var(--clr-text-muted); display:none">
        💡 ${failureHint}
      </div>
    </div>
  `;

  let selected = null;
  const solved = new Set();
  const wrongMatches = new Map();

  const allItems = container.querySelectorAll('.puzzle-item');

  allItems.forEach(el => {
    el.addEventListener('click', () => {
      const id   = el.getAttribute('data-id');
      const side = el.getAttribute('data-side');

      if (el.classList.contains('matched')) return;

      if (!selected) {
        // Select a left item
        if (side !== 'left') return;
        allItems.forEach(i => i.classList.remove('selected'));
        el.classList.add('selected');
        selected = id;
      } else {
        // Must click right item to match
        if (side !== 'right') {
          // Reselect from left
          allItems.forEach(i => i.classList.remove('selected'));
          if (side === 'left') {
            el.classList.add('selected');
            selected = id;
          } else {
            selected = null;
          }
          return;
        }

        const leftEl  = container.querySelector(`[data-id="${selected}"]`);
        const rightEl = el;

        const correct = matches[selected] === id;

        if (correct) {
          leftEl.classList.add('matched');
          rightEl.classList.add('matched');
          leftEl.classList.remove('selected');
          solved.add(selected);
          selected = null;

          // All matched?
          if (solved.size === leftItems.length) {
            const statusEl = container.querySelector('#puzzle-status');
            statusEl.className = 'puzzle-status show success';
            statusEl.textContent = successMsg;
            // Disable all items
            allItems.forEach(i => { i.style.pointerEvents = 'none'; });
            setTimeout(() => onComplete && onComplete(), 1200);
          }
        } else {
          // Wrong match
          leftEl.classList.add('incorrect');
          rightEl.classList.add('incorrect');
          leftEl.classList.remove('selected');
          selected = null;

          // Show hint after 2 wrong attempts
          wrongMatches.set(selected, (wrongMatches.get(selected) || 0) + 1);
          if ([...wrongMatches.values()].reduce((a, b) => a + b, 0) >= 2) {
            container.querySelector('#puzzle-hint').style.display = 'block';
          }

          setTimeout(() => {
            leftEl.classList.remove('incorrect');
            rightEl.classList.remove('incorrect');
          }, 700);
        }
      }
    });
  });
}

// ─── ORDERING PUZZLE ──────────────────────────────────────

function renderOrderingPuzzle(container, puzzle, onComplete) {
  const { items, successMsg, failureHint } = puzzle;

  // Shuffle items for initial display
  const shuffled = [...items].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <div class="puzzle-area">
      <div class="puzzle-title">📋 ${puzzle.title}</div>
      <p class="puzzle-instructions">${puzzle.instructions}</p>
      <div class="order-list" id="order-list">
        ${shuffled.map(item => `
          <div class="order-item" draggable="true" data-id="${item.id}" data-correct="${item.correctPos}">
            <span class="order-handle">⠿</span>
            <span>${item.icon || ''}</span>
            <span>${item.label}</span>
          </div>
        `).join('')}
      </div>
      <div style="margin-top:var(--sp-4); display:flex; gap:var(--sp-3);">
        <button class="btn btn-primary btn-sm" id="check-order-btn">Check Order ✓</button>
        <button class="btn btn-ghost btn-sm"   id="shuffle-order-btn">Shuffle ↺</button>
      </div>
      <div class="puzzle-status" id="puzzle-status"></div>
    </div>
  `;

  const list = container.querySelector('#order-list');
  let dragSrc = null;

  list.addEventListener('dragstart', (e) => {
    dragSrc = e.target.closest('.order-item');
    dragSrc.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
  });

  list.addEventListener('dragend', (e) => {
    const item = e.target.closest('.order-item');
    if (item) item.style.opacity = '';
    list.querySelectorAll('.order-item').forEach(i => i.classList.remove('drag-over'));
  });

  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const target = e.target.closest('.order-item');
    if (target && target !== dragSrc) {
      list.querySelectorAll('.order-item').forEach(i => i.classList.remove('drag-over'));
      target.classList.add('drag-over');
    }
  });

  list.addEventListener('drop', (e) => {
    e.preventDefault();
    const target = e.target.closest('.order-item');
    if (target && target !== dragSrc) {
      const parent = list;
      const srcIdx = [...parent.children].indexOf(dragSrc);
      const tgtIdx = [...parent.children].indexOf(target);
      if (srcIdx < tgtIdx) {
        parent.insertBefore(dragSrc, target.nextSibling);
      } else {
        parent.insertBefore(dragSrc, target);
      }
    }
    target && target.classList.remove('drag-over');
  });

  container.querySelector('#check-order-btn').addEventListener('click', () => {
    const currentOrder = [...list.querySelectorAll('.order-item')].map(el => el.getAttribute('data-id'));
    const correctOrder = [...items].sort((a, b) => a.correctPos - b.correctPos).map(i => i.id);

    const isCorrect = currentOrder.every((id, i) => id === correctOrder[i]);

    // Highlight correct/incorrect positions
    list.querySelectorAll('.order-item').forEach((el, i) => {
      const id = el.getAttribute('data-id');
      const expectedId = correctOrder[i];
      el.classList.remove('correct-pos', 'incorrect');
      if (id === expectedId) {
        el.classList.add('correct-pos');
      }
    });

    const statusEl = container.querySelector('#puzzle-status');
    if (isCorrect) {
      statusEl.className = 'puzzle-status show success';
      statusEl.textContent = successMsg;
      container.querySelector('#check-order-btn').disabled = true;
      setTimeout(() => onComplete && onComplete(), 1200);
    } else {
      statusEl.className = 'puzzle-status show error';
      statusEl.textContent = `Not quite! ${failureHint}`;
    }
  });

  container.querySelector('#shuffle-order-btn').addEventListener('click', () => {
    const items = [...list.querySelectorAll('.order-item')];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      list.appendChild(items[j]);
    }
    list.querySelectorAll('.order-item').forEach(el => el.classList.remove('correct-pos', 'incorrect'));
    container.querySelector('#puzzle-status').className = 'puzzle-status';
  });
}

// ─── SIMULATION PUZZLE ────────────────────────────────────

function renderSimulationPuzzle(container, puzzle, onComplete) {
  const { steps, successMsg } = puzzle;
  let currentStep = 0;
  let terminalLines = [];

  container.innerHTML = `
    <div class="puzzle-area">
      <div class="puzzle-title">🌀 ${puzzle.title}</div>
      <p class="puzzle-instructions">${puzzle.instructions}</p>
      <div class="terminal-panel" style="margin-bottom:var(--sp-4)">
        <div class="terminal-header">
          <div class="terminal-dots">
            <div class="terminal-dot"></div><div class="terminal-dot"></div><div class="terminal-dot"></div>
          </div>
          <div class="terminal-title">Client Portal</div>
        </div>
        <div class="terminal-body" id="sim-terminal" style="min-height:150px">
          <div class="terminal-line muted"># Client portal ready. Click a button to begin.</div>
        </div>
      </div>
      <div id="sim-buttons" style="display:flex; flex-wrap:wrap; gap:var(--sp-3)">
        ${steps.map((step, i) => `
          <button class="btn btn-ghost btn-sm sim-step-btn" data-index="${i}" ${i > 0 ? 'disabled' : ''}>
            ${step.label}
          </button>
        `).join('')}
      </div>
      <div class="puzzle-status" id="puzzle-status"></div>
    </div>
  `;

  const terminal = container.querySelector('#sim-terminal');

  container.querySelectorAll('.sim-step-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-index'));
      const step  = steps[index];

      btn.classList.remove('btn-ghost');
      btn.classList.add('btn-primary');
      btn.disabled = true;

      // Append terminal output
      step.terminalOutput.forEach(line => {
        const el = document.createElement('div');
        el.className = `terminal-line ${line.type}`;
        el.textContent = line.text;
        terminal.appendChild(el);
      });
      terminal.scrollTop = terminal.scrollHeight;

      // Unlock next step
      currentStep++;
      const nextBtn = container.querySelector(`[data-index="${currentStep}"]`);
      if (nextBtn) {
        nextBtn.disabled = false;
      } else {
        // All steps done
        const statusEl = container.querySelector('#puzzle-status');
        statusEl.className = 'puzzle-status show success';
        statusEl.textContent = successMsg;
        setTimeout(() => onComplete && onComplete(), 1000);
      }
    });
  });
}

// ─── DIAGNOSIS PUZZLE ─────────────────────────────────────

function renderDiagnosisPuzzle(container, puzzle, onComplete) {
  const { problems, successMsg } = puzzle;
  let solved = 0;

  container.innerHTML = `
    <div class="puzzle-area">
      <div class="puzzle-title">🔍 ${puzzle.title}</div>
      <p class="puzzle-instructions">${puzzle.instructions}</p>
      <div id="problems-list">
        ${problems.map((p, pi) => `
          <div class="puzzle-item" style="flex-direction:column; align-items:flex-start; gap:var(--sp-3); margin-bottom:var(--sp-4)" id="prob-${pi}">
            <div style="display:flex; gap:var(--sp-3); align-items:center; width:100%">
              <span style="font-size:1.5rem">${p.icon}</span>
              <div>
                <div style="font-weight:600; color:var(--clr-error); font-size:0.9rem; margin-bottom:4px">Problem ${pi+1}:</div>
                <div style="font-size:0.88rem; color:var(--clr-text-muted)">${p.symptom}</div>
              </div>
            </div>
            <div style="width:100%; display:flex; flex-direction:column; gap:var(--sp-2)">
              ${p.options.map((opt, oi) => `
                <button class="btn btn-ghost btn-sm diag-option" data-prob="${pi}" data-opt="${oi}" style="text-align:left; justify-content:flex-start">
                  ${opt}
                </button>
              `).join('')}
            </div>
            <div class="quiz-feedback" id="diag-feedback-${pi}" style="width:100%"></div>
          </div>
        `).join('')}
      </div>
      <div class="puzzle-status" id="puzzle-status"></div>
    </div>
  `;

  container.querySelectorAll('.diag-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const pi  = parseInt(btn.getAttribute('data-prob'));
      const oi  = parseInt(btn.getAttribute('data-opt'));
      const prob = problems[pi];
      const probEl = container.querySelector(`#prob-${pi}`);

      // Disable all options for this problem
      container.querySelectorAll(`.diag-option[data-prob="${pi}"]`).forEach(b => {
        b.disabled = true;
        if (parseInt(b.getAttribute('data-opt')) === prob.correct) {
          b.classList.remove('btn-ghost');
          b.classList.add('btn-secondary');
        }
      });

      const correct = oi === prob.correct;
      const feedback = container.querySelector(`#diag-feedback-${pi}`);
      feedback.className = `quiz-feedback show ${correct ? 'correct' : 'wrong'}`;
      feedback.innerHTML = `<strong>${correct ? '✅ Correct fix!' : '❌ That\'s not it.'}</strong> ${prob.explanation}`;

      if (correct) {
        probEl.classList.add('pipe-connected');
        solved++;
        if (solved === problems.length) {
          const statusEl = container.querySelector('#puzzle-status');
          statusEl.className = 'puzzle-status show success';
          statusEl.innerHTML = `<strong>${successMsg}</strong>`;
          setTimeout(() => onComplete && onComplete(), 1500);
        }
      }
    });
  });
}
