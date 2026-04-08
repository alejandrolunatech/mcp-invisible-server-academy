/**
 * settingsScene.js — Settings and options scene
 */

import { getState, updateSetting, resetState } from '../state.js';
import { SaveSystem }   from '../systems/saveSystem.js';
import { ToastComponent } from '../components/toast.js';
import { navigate }     from '../router.js';
import { AchievementSystem } from '../systems/achievementSystem.js';
import { getLang, setLang, getT } from '../i18n.js';

export class SettingsScene {
  enter() {
    const el    = document.getElementById('scene-settings');
    const state = getState();
    const t     = getT();
    const lang  = getLang();

    el.innerHTML = `
      <div style="padding:var(--sp-8) var(--sp-6) var(--sp-4)">
        <div class="container container--narrow">
          <h2 style="margin-bottom:var(--sp-2)">${t('settings.title')}</h2>
          <p style="color:var(--clr-text-muted); margin-bottom:var(--sp-8)">${t('settings.subtitle')}</p>

          <!-- Language -->
          <div class="settings-section">
            <div class="settings-section-title">${t('settings.languageSection')}</div>
            <div class="settings-row">
              <div>
                <div class="settings-row__label">${t('settings.languageLabel')}</div>
                <div class="settings-row__desc">${t('settings.languageDesc')}</div>
              </div>
              <div class="lang-switcher" role="group" aria-label="Language">
                <button class="lang-btn${lang === 'en' ? ' active' : ''}" data-lang="en">EN</button>
                <button class="lang-btn${lang === 'es' ? ' active' : ''}" data-lang="es">ES</button>
                <button class="lang-btn${lang === 'nl' ? ' active' : ''}" data-lang="nl">NL</button>
              </div>
            </div>
          </div>

          <!-- Progress -->
          <div class="settings-section">
            <div class="settings-section-title">${t('settings.progressSection')}</div>
            <div class="settings-row">
              <div>
                <div class="settings-row__label">${t('settings.yourXP')}</div>
                <div class="settings-row__desc">${t('settings.xpEarned', { xp: state.playerXP })}</div>
              </div>
              <div class="xp-badge">⚡ ${state.playerXP}</div>
            </div>
            <div class="settings-row">
              <div>
                <div class="settings-row__label">${t('settings.chaptersCompleted')}</div>
                <div class="settings-row__desc">${t('settings.chaptersOf', { completed: state.completedChapters.length })}</div>
              </div>
            </div>
            <div class="settings-row">
              <div>
                <div class="settings-row__label">${t('settings.resetLabel')}</div>
                <div class="settings-row__desc">${t('settings.resetDesc')}</div>
              </div>
              <button class="btn btn-ghost btn-sm" id="btn-reset" style="border-color:var(--clr-error); color:var(--clr-error)">
                ${t('settings.resetBtn')}
              </button>
            </div>
          </div>

          <!-- Display -->
          <div class="settings-section">
            <div class="settings-section-title">${t('settings.displaySection')}</div>
            <div class="settings-row">
              <div>
                <div class="settings-row__label">${t('settings.reducedMotionLabel')}</div>
                <div class="settings-row__desc">${t('settings.reducedMotionDesc')}</div>
              </div>
              <label class="toggle">
                <input type="checkbox" id="toggle-motion" ${state.settings.reducedMotion ? 'checked' : ''}>
                <div class="toggle-track"><div class="toggle-thumb"></div></div>
              </label>
            </div>
            <div class="settings-row">
              <div>
                <div class="settings-row__label">${t('settings.realWorldLabel')}</div>
                <div class="settings-row__desc">${t('settings.realWorldDesc')}</div>
              </div>
              <label class="toggle">
                <input type="checkbox" id="toggle-realworld" ${state.settings.showRealWorldPanel ? 'checked' : ''}>
                <div class="toggle-track"><div class="toggle-thumb"></div></div>
              </label>
            </div>
          </div>

          <!-- Real Python Mode -->
          <div class="real-world-panel">
            <div class="real-world-panel__title">🐍 Real Python Mode</div>
            <div class="real-world-panel__body">
              <p>Want to build a real MCP server? Here's the quick start:</p>
              <pre style="margin:var(--sp-3) 0; font-size:0.8rem">
# 1. Install UV
curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. Create your project
uv init my-mcp-server
cd my-mcp-server

# 3. Add MCP
uv add mcp

# 4. Create server.py with @mcp.tool() functions
# 5. Run it
uv run server.py</pre>
              <p>Then connect MCP Inspector or Claude Desktop to your server and explore the tools!</p>
              <p>See <code>docs/real-python-mcp-example.md</code> for a full walkthrough.</p>
            </div>
          </div>

          <!-- About -->
          <div class="settings-section" style="margin-top:var(--sp-5)">
            <div class="settings-section-title">${t('settings.aboutSection')}</div>
            <div class="settings-row">
              <div>
                <div class="settings-row__label">${t('settings.aboutTitle')}</div>
                <div class="settings-row__desc">${t('settings.aboutDesc')}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    // Language switcher in settings
    el.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });

    // Toggle: reduced motion
    el.querySelector('#toggle-motion').addEventListener('change', (e) => {
      updateSetting('reducedMotion', e.target.checked);
      document.documentElement.style.setProperty(
        '--transition-base',
        e.target.checked ? '0ms' : '250ms ease'
      );
    });

    // Toggle: real world panels
    el.querySelector('#toggle-realworld').addEventListener('change', (e) => {
      updateSetting('showRealWorldPanel', e.target.checked);
    });

    // Reset progress
    el.querySelector('#btn-reset').addEventListener('click', () => {
      if (confirm(t('settings.resetConfirm'))) {
        SaveSystem.reset();
        resetState();
        ToastComponent.show({ type: 'info', icon: '🔄', title: t('settings.resetToastTitle'), message: t('settings.resetToastMsg') });
        navigate('home');
      }
    });
  }

  leave() {}
}
