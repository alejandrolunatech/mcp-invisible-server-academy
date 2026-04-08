/**
 * progressBar.js — Progress bar component
 */

export function createProgressBar({ label = '', value = 0, max = 100, id = '' } = {}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const el = document.createElement('div');
  el.className = 'progress-bar-wrap';
  if (id) el.id = id;

  el.innerHTML = `
    <div class="progress-bar-label">
      <span>${label}</span>
      <span>${pct}%</span>
    </div>
    <div class="progress-bar-track">
      <div class="progress-bar-fill" style="width:${pct}%"></div>
    </div>
  `;

  el.update = (newValue, newMax) => {
    const newPct = Math.min(100, Math.round((newValue / (newMax || max)) * 100));
    el.querySelector('.progress-bar-fill').style.width = `${newPct}%`;
    const labels = el.querySelectorAll('.progress-bar-label span');
    if (labels[1]) labels[1].textContent = `${newPct}%`;
  };

  return el;
}
