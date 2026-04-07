/**
 * quizPanel.js — Quiz panel component (standalone builder)
 * Wraps QuizSystem.render() in a container element.
 */

import { QuizSystem } from '../systems/quizSystem.js';

export function createQuizPanel(questions, opts = {}) {
  const el = document.createElement('div');
  el.className = 'quiz-panel-wrapper';

  // Render will be triggered when caller appends to DOM and calls start()
  el.start = () => {
    QuizSystem.render(el, questions, opts);
  };

  return el;
}
