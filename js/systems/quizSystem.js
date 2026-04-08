/**
 * quizSystem.js — Handles quiz rendering, scoring, and XP awards
 */

import { addXP, saveQuizScore, unlockAchievement } from '../state.js';
import { ToastComponent } from '../components/toast.js';
import { getT } from '../i18n.js';

export class QuizSystem {
  /**
   * Render a quiz inside a container.
   * @param {HTMLElement} container
   * @param {Array}  questions - Array of { q, options, correct, explanation }
   * @param {Object} opts - { chapterId, onComplete }
   */
  static render(container, questions, { chapterId = 0, onComplete } = {}) {
    let current = 0;
    let score   = 0;

    const render = () => {
      if (current >= questions.length) {
        _showSummary(container, score, questions.length, chapterId, onComplete);
        return;
      }
      _renderQuestion(container, questions[current], (correct) => {
        if (correct) score++;
        setTimeout(() => {
          current++;
          render();
        }, 1800);
      });
    };

    render();
  }
}

// ─── Internal helpers ─────────────────────────────────────

function _renderQuestion(container, q, onAnswer) {
  const letters = ['A', 'B', 'C', 'D'];
  const t = getT();
  container.innerHTML = `
    <div class="quiz-panel" style="animation: slideUp 0.3s ease both">
      <p class="section-title">${t('quiz.quizTime')}</p>
      <p class="quiz-question">${q.q}</p>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" data-index="${i}" aria-label="Option ${letters[i]}">
            <span class="quiz-option-letter">${letters[i]}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="quiz-feedback"></div>
    </div>
  `;

  const optionBtns = container.querySelectorAll('.quiz-option');
  const feedback   = container.querySelector('#quiz-feedback');
  let answered = false;

  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;

      const chosen  = parseInt(btn.getAttribute('data-index'));
      const correct = chosen === q.correct;

      // Mark all options
      optionBtns.forEach((b, i) => {
        b.disabled = true;
        if (i === q.correct) {
          b.classList.add('correct', 'revealed');
        } else if (i === chosen && !correct) {
          b.classList.add('wrong');
        }
      });

      // Show feedback
      feedback.className = `quiz-feedback show ${correct ? 'correct' : 'wrong'}`;
      feedback.innerHTML = `
        <strong>${correct ? t('quiz.correct') : t('quiz.incorrect')}</strong>
        ${q.explanation}
      `;

      // XP pop
      if (correct) {
        _xpPop(btn, t('quiz.xpPop'));
        addXP(20);
      }

      onAnswer(correct);
    });
  });
}

function _showSummary(container, score, total, chapterId, onComplete) {
  const pct = Math.round((score / total) * 100);
  const stars = pct === 100 ? '⭐⭐⭐' : pct >= 66 ? '⭐⭐' : '⭐';
  const t = getT();
  const msg = pct === 100 ? t('quiz.perfect') : pct >= 66 ? t('quiz.great') : t('quiz.keepPractising');

  // Save score
  saveQuizScore(chapterId, score, total);

  // Quiz ace achievement
  if (pct === 100) {
    unlockAchievement('quiz_ace');
  }

  container.innerHTML = `
    <div class="quiz-panel" style="text-align:center; animation: scaleIn 0.4s ease both">
      <p class="section-title">${t('quiz.complete')}</p>
      <div style="font-size:2.5rem; margin:var(--sp-4) 0">${stars}</div>
      <h3 style="color:var(--clr-primary); margin-bottom:var(--sp-2)">${score} / ${total} ${t('quiz.correct')}</h3>
      <p style="color:var(--clr-text-muted); margin-bottom:var(--sp-6)">${msg}</p>
      <button class="btn btn-primary" id="quiz-continue-btn">${t('quiz.continue')}</button>
    </div>
  `;

  container.querySelector('#quiz-continue-btn').addEventListener('click', () => {
    if (onComplete) onComplete(score, total);
  });
}

function _xpPop(nearEl, text) {
  const rect = nearEl.getBoundingClientRect();
  const pop = document.createElement('div');
  pop.className = 'xp-pop';
  pop.textContent = text;
  pop.style.left = `${rect.left + rect.width / 2}px`;
  pop.style.top  = `${rect.top}px`;
  document.body.appendChild(pop);
  pop.addEventListener('animationend', () => pop.remove());
}
