/**
 * toast.js — Toast notification component
 */

export const ToastComponent = {
  _container: null,

  init() {
    const existing = document.getElementById('toast-container');
    if (existing) { this._container = existing; return; }
    const el = document.createElement('div');
    el.id = 'toast-container';
    el.className = 'toast-container';
    document.body.appendChild(el);
    this._container = el;
  },

  /**
   * Show a toast notification.
   * @param {Object} opts - { type, icon, title, message, duration }
   *   type: 'success' | 'error' | 'info' | 'achievement'
   */
  show({ type = 'info', icon = 'ℹ️', title = '', message = '', duration = 4000 } = {}) {
    if (!this._container) this.init();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast__icon">${icon}</div>
      <div class="toast__body">
        <div class="toast__title">${title}</div>
        ${message ? `<div class="toast__msg">${message}</div>` : ''}
      </div>
    `;

    this._container.appendChild(toast);

    // Auto-remove
    const remove = () => {
      toast.classList.add('removing');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    };

    const timer = setTimeout(remove, duration);
    toast.addEventListener('click', () => { clearTimeout(timer); remove(); });
  },
};
