/**
 * dialogueBox.js — Dialogue box component (standalone element builder)
 */

export function createDialogueBox() {
  const el = document.createElement('div');
  el.className = 'dialogue-box';
  el.innerHTML = `
    <div class="dialogue-box__header">
      <div class="dialogue-portrait" data-char="syn">🧙</div>
      <div>
        <div class="dialogue-speaker-name">—</div>
        <div class="dialogue-speaker-role">—</div>
      </div>
      <div class="dialogue-progress" style="margin-left:auto"></div>
    </div>
    <div class="dialogue-text" style="min-height:3em"></div>
    <div class="dialogue-actions">
      <button class="btn btn-ghost btn-sm dialogue-skip-btn">Skip All</button>
      <button class="btn btn-primary btn-sm dialogue-next-btn">Next ▶</button>
    </div>
  `;
  return el;
}
