/**
 * chapterScene.js — Chapter gameplay scene
 * Orchestrates: intro → puzzle → terminal → quiz → completion
 */

import { navigate }            from '../router.js';
import { getState, addXP, completeChapter } from '../state.js';
import { getLocalizedChapter } from '../data/localizedChapters.js';
import { DialogueSystem }      from '../systems/dialogueSystem.js';
import { PuzzleSystem }        from '../systems/puzzleSystem.js';
import { QuizSystem }          from '../systems/quizSystem.js';
import { TerminalSystem }      from '../systems/terminalSystem.js';
import { AchievementSystem }   from '../systems/achievementSystem.js';
import { createCodePanel }     from '../components/codePanel.js';
import { ToastComponent }      from '../components/toast.js';
import { discoverGlossaryTerm } from '../state.js';
import { getT } from '../i18n.js';

// Steps in a chapter flow
const STEPS = ['intro', 'puzzle', 'terminal', 'quiz', 'complete'];

export class ChapterScene {
  constructor() {
    this._chapter   = null;
    this._stepIndex = 0;
  }

  enter({ chapterId } = {}) {
    const id = chapterId || getState().currentChapterId;
    this._chapter   = getLocalizedChapter(id);
    this._stepIndex = 0;

    if (!this._chapter) {
      navigate('map');
      return;
    }

    this._render();
    this._showStep(0);
  }

  leave() {
    this._chapter   = null;
    this._stepIndex = 0;
  }

  // ─── Render shell ────────────────────────────────────────

  _render() {
    const c   = this._chapter;
    const el  = document.getElementById('scene-chapter');
    const t   = getT();
    const isBoss = c.isFinalBoss;

    el.innerHTML = `
      <!-- Chapter Header -->
      <div class="chapter-header">
        <button class="chapter-back-btn" id="chapter-back">
          ← ${t('chapter.backToMap')}
        </button>
        <div class="chapter-header-info">
          <div class="chapter-header-title">${c.icon} ${c.title}</div>
          <div class="chapter-header-sub">${c.subtitle}</div>
        </div>
        <div class="chapter-phase-indicator" id="phase-dots">
          ${STEPS.map((s, i) => `<div class="phase-dot" data-step="${i}" title="${s}"></div>`).join('')}
        </div>
      </div>

      <!-- Steps -->
      <div id="step-intro"    class="chapter-step" style="flex-direction:column; padding:var(--sp-6); gap:var(--sp-5); max-width:760px; margin:0 auto; width:100%"></div>
      <div id="step-puzzle"   class="chapter-step" style="flex-direction:column; padding:var(--sp-6); gap:var(--sp-5); max-width:900px; margin:0 auto; width:100%"></div>
      <div id="step-terminal" class="chapter-step" style="flex-direction:column; padding:var(--sp-6); gap:var(--sp-5); max-width:760px; margin:0 auto; width:100%"></div>
      <div id="step-quiz"     class="chapter-step" style="flex-direction:column; padding:var(--sp-6); gap:var(--sp-5); max-width:680px; margin:0 auto; width:100%"></div>
      <div id="step-complete" class="chapter-step" style="flex-direction:column; align-items:center; justify-content:center; padding:var(--sp-8); text-align:center; flex:1"></div>
    `;

    // Back button
    el.querySelector('#chapter-back').addEventListener('click', () => navigate('map'));

    // Pre-populate all steps
    this._buildIntroStep();
    this._buildPuzzleStep();
    this._buildTerminalStep();
    this._buildQuizStep();
    this._buildCompleteStep();
  }

  // ─── Step: Intro (dialogue) ────────────────────────────

  _buildIntroStep() {
    const c    = this._chapter;
    const t    = getT();
    const wrap = document.querySelector('#step-intro');

    wrap.innerHTML = `
      <div class="panel" style="background:rgba(${hexToRgb(c.color)},0.04); border-color:rgba(${hexToRgb(c.color)},0.2);">
        <div style="font-size:3rem; margin-bottom:var(--sp-3)">${c.icon}</div>
        <h2 style="color:${c.color}; margin-bottom:var(--sp-2)">${c.title}</h2>
        <p style="color:var(--clr-text-muted)">${c.description}</p>
      </div>
      <div id="dialogue-wrap"></div>
      <div style="display:flex; justify-content:flex-end">
        <button class="btn btn-primary" id="btn-next-intro" style="display:none">
          ${t('chapter.beginChallenge')}
        </button>
      </div>
    `;

    const dialogueWrap = wrap.querySelector('#dialogue-wrap');
    const nextBtn = wrap.querySelector('#btn-next-intro');

    // Run dialogue
    const ctrl = DialogueSystem.create(dialogueWrap, c.dialogue, () => {
      nextBtn.style.display = 'inline-flex';
    });

    nextBtn.addEventListener('click', () => this._goToStep(1));
  }

  // ─── Step: Puzzle ──────────────────────────────────────

  _buildPuzzleStep() {
    const c    = this._chapter;
    const wrap = document.querySelector('#step-puzzle');
    wrap.innerHTML = '';

    const puzzleContainer = document.createElement('div');
    wrap.appendChild(puzzleContainer);

    PuzzleSystem.render(puzzleContainer, c.puzzle, () => {
      // Show code example (if chapter has one) + continue button
      this._onPuzzleComplete(wrap, c);
    });
  }

  _onPuzzleComplete(wrap, c) {
    const t = getT();
    // Add sparkle effect
    wrap.classList.add('forge-spark');
    setTimeout(() => wrap.classList.remove('forge-spark'), 600);

    // Show code panel if chapter has one
    if (c.codeExample) {
      const codeWrap = document.createElement('div');
      codeWrap.style.cssText = 'animation:slideUp 0.4s ease both';
      codeWrap.innerHTML = `
        <p class="section-title">${t('chapter.realCodeExample')}</p>
      `;
      const panel = createCodePanel({
        lang: c.codeExample.lang,
        rawCode: c.codeExample.rawCode,
        explanation: c.codeExample.explanation,
      });
      codeWrap.appendChild(panel);
      wrap.appendChild(codeWrap);
    }

    // Continue button
    const continueWrap = document.createElement('div');
    continueWrap.style.cssText = 'display:flex; justify-content:flex-end; animation:slideUp 0.4s 0.2s ease both';
    continueWrap.innerHTML = `<button class="btn btn-primary" id="btn-next-puzzle">${t('chapter.seeInAction')}</button>`;
    wrap.appendChild(continueWrap);
    continueWrap.querySelector('#btn-next-puzzle').addEventListener('click', () => this._goToStep(2));
  }

  // ─── Step: Terminal demo ───────────────────────────────

  _buildTerminalStep() {
    const c    = this._chapter;
    const t    = getT();
    const wrap = document.querySelector('#step-terminal');

    wrap.innerHTML = `
      <p class="section-title">${t('chapter.terminalTitle')}</p>
      <p style="color:var(--clr-text-muted); font-size:0.9rem; margin-bottom:var(--sp-2)">${c.terminal.title}</p>
      <div class="terminal-panel">
        <div class="terminal-header">
          <div class="terminal-dots">
            <div class="terminal-dot"></div><div class="terminal-dot"></div><div class="terminal-dot"></div>
          </div>
          <div class="terminal-title">${c.terminal.title}</div>
          <div class="terminal-actions">
            <button class="btn-icon" id="term-replay" title="${t('chapter.replay')}">↺</button>
          </div>
        </div>
        <div class="terminal-body" id="chapter-terminal-body" style="min-height:220px"></div>
      </div>
      <div id="realworld-wrap"></div>
      <div style="display:flex; justify-content:flex-end">
        <button class="btn btn-primary" id="btn-next-terminal" style="display:none">
          ${t('chapter.takeQuiz')}
        </button>
      </div>
    `;

    const body   = wrap.querySelector('#chapter-terminal-body');
    const ts     = new TerminalSystem(body);
    const replayBtn = wrap.querySelector('#term-replay');
    const nextBtn   = wrap.querySelector('#btn-next-terminal');

    const play = () => ts.playSequence(c.terminal.steps, 160).then(() => {
      // Show real-world takeaway
      if (c.realWorldTakeaway) {
        const rw = wrap.querySelector('#realworld-wrap');
        rw.innerHTML = `
          <div class="real-world-panel" style="animation:slideUp 0.4s ease both">
            <div class="real-world-panel__title">${t('chapter.realWorldTakeaway')}</div>
            <div class="real-world-panel__body">${c.realWorldTakeaway}</div>
          </div>
        `;
      }
      nextBtn.style.display = 'inline-flex';
    });

    play();
    replayBtn.addEventListener('click', play);
    nextBtn.addEventListener('click', () => this._goToStep(3));
  }

  // ─── Step: Quiz ─────────────────────────────────────────

  _buildQuizStep() {
    const c    = this._chapter;
    const t    = getT();
    const wrap = document.querySelector('#step-quiz');
    wrap.innerHTML = `<p class="section-title">${t('chapter.knowledgeCheck')}</p>`;

    const quizContainer = document.createElement('div');
    wrap.appendChild(quizContainer);

    QuizSystem.render(quizContainer, c.quiz, {
      chapterId: c.id,
      onComplete: (score, total) => {
        this._goToStep(4);
      },
    });
  }

  // ─── Step: Completion ──────────────────────────────────

  _buildCompleteStep() {
    const c    = this._chapter;
    const t    = getT();
    const wrap = document.querySelector('#step-complete');
    const isBoss = c.isFinalBoss;

    wrap.innerHTML = `
      <div class="completion-panel">
        <div class="completion-icon">${isBoss ? '🏆' : '🌟'}</div>
        <div class="completion-stars">
          <div class="completion-star">⭐</div>
          <div class="completion-star">⭐</div>
          <div class="completion-star">⭐</div>
        </div>
        <h2 style="color:${c.color}; margin-bottom:var(--sp-3)">
          ${isBoss ? t('chapter.serverRestored') : t('chapter.chapterComplete', { title: c.title })}
        </h2>
        <div class="completion-xp">⚡ +${c.xpReward} XP</div>
        <p style="color:var(--clr-text-muted); max-width:480px; margin:var(--sp-4) auto var(--sp-6)">
          ${isBoss ? t('chapter.bossCompleteMsg') : t('chapter.chapterCompleteMsg')}
        </p>
        <div id="completion-dialogue-wrap" style="text-align:left; margin-bottom:var(--sp-6)"></div>
        <div style="display:flex; gap:var(--sp-4); justify-content:center; flex-wrap:wrap">
          <button class="btn btn-ghost" id="btn-back-map">← ${t('chapter.backToMap')}</button>
          ${!isBoss ? `<button class="btn btn-primary" id="btn-next-chapter">${t('chapter.nextChapter')}</button>` : ''}
        </div>
      </div>
    `;

    // Wire buttons (done after DOM is visible)
    wrap._wireFns = () => {
      wrap.querySelector('#btn-back-map').addEventListener('click', () => navigate('map'));

      const nextBtn = wrap.querySelector('#btn-next-chapter');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const nextId = c.id + 1;
          const nextChapter = getLocalizedChapter(nextId);
          if (nextChapter) {
            window.App.setState({ currentChapterId: nextId });
            navigate('chapter', { chapterId: nextId });
          } else {
            navigate('map');
          }
        });
      }

      // Completion dialogue
      if (c.completionDialogue?.length) {
        const dlgWrap = wrap.querySelector('#completion-dialogue-wrap');
        DialogueSystem.create(dlgWrap, c.completionDialogue, null);
      }
    };
  }

  // ─── Step navigation ────────────────────────────────────

  _goToStep(index) {
    const names = STEPS;
    const prev  = names[this._stepIndex];
    const next  = names[index];

    // Hide all steps
    document.querySelectorAll('.chapter-step').forEach(el => el.classList.remove('active'));

    // Show next step
    const nextEl = document.querySelector(`#step-${next}`);
    if (nextEl) nextEl.classList.add('active');

    this._stepIndex = index;
    this._updatePhaseDots();

    // Special step actions
    if (next === 'complete') {
      this._onComplete();
    }
  }

  _showStep(index) {
    this._goToStep(index);
  }

  _updatePhaseDots() {
    const dots = document.querySelectorAll('.phase-dot');
    dots.forEach((dot, i) => {
      dot.classList.remove('active', 'done');
      if (i === this._stepIndex) dot.classList.add('active');
      else if (i < this._stepIndex) dot.classList.add('done');
    });
  }

  _onComplete() {
    const c = this._chapter;
    const t = getT();

    // Award XP
    addXP(c.xpReward);

    // Mark chapter complete and unlock next
    completeChapter(c.id);

    // Award achievement
    if (c.achievementId) {
      AchievementSystem.award(c.achievementId);
    }

    // Toast
    ToastComponent.show({
      type: 'success',
      icon: '🌟',
      title: t('chapter.completeToast'),
      message: t('chapter.xpEarned', { xp: c.xpReward }),
    });

    // Wire completion buttons (must happen after DOM is visible)
    const wrap = document.querySelector('#step-complete');
    if (wrap._wireFns) {
      wrap._wireFns();
      wrap._wireFns = null;
    }
  }
}

// ─── Helper: hex to rgb ──────────────────────────────────
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
