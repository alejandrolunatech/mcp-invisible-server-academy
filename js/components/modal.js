/**
 * modal.js — Generic modal component
 */

export function createModal({ title = '', content = '', onClose } = {}) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" aria-label="${title}">
      <div class="modal-header">
        <h2 class="modal-title">${title}</h2>
        <button class="modal-close" aria-label="Close">✕</button>
      </div>
      <div class="modal-body">${content}</div>
    </div>
  `;

  const close = () => {
    overlay.classList.add('hidden');
    if (onClose) onClose();
    overlay.remove();
  };

  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  // Keyboard close
  const keydown = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', keydown); } };
  document.addEventListener('keydown', keydown);

  document.body.appendChild(overlay);
  overlay.querySelector('.modal-close').focus();

  return { close, el: overlay };
}
