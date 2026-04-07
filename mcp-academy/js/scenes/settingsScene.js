/**
 * settingsScene.js — Settings and options scene
 */

import { getState, updateSetting, resetState } from '../state.js';
import { SaveSystem }   from '../systems/saveSystem.js';
import { ToastComponent } from '../components/toast.js';
import { navigate }     from '../router.js';
import { AchievementSystem } from '../systems/achievementSystem.js';

export class SettingsScene {
  enter() {
    const el    = document.getElementById('scene-settings');
    const state = getState();

    el.innerHTML = `
      <div style="padding:var(--sp-8) var(--sp-6) var(--sp-4)">
        <div class="container container--narrow">
          <h2 style="margin-bottom:var(--sp-2)">⚙️ Settings</h2>
          <p style="color:var(--clr-text-muted); margin-bottom:var(--sp-8)">Manage your academy experience.</p>

          <!-- Progress -->
          <div class="settings-section">
            <div class="settings-section-title">Progress</div>
            <div class="settings-row">
              <div>
                <div class="settings-row__label">Your XP</div>
                <div class="settings-row__desc">${state.playerXP} XP earned</div>
              </div>
              <div class="xp-badge">⚡ ${state.playerXP}</div>
            </div>
            <div class="settings-row">
              <div>
                <div class="settings-row__label">Chapters Completed</div>
                <div class="settings-row__desc">${state.completedChapters.length} of 6</div>
              </div>
            </div>
            <div class="settings-row">
              <div>
                <div class="settings-row__label">Reset All Progress</div>
                <div class="settings-row__desc">Wipes all saves, XP, and achievements.</div>
              </div>
              <button class="btn btn-ghost btn-sm" id="btn-reset" style="border-color:var(--clr-error); color:var(--clr-error)">
                Reset ⚠️
              </button>
            </div>
          </div>

          <!-- Display -->
          <div class="settings-section">
            <div class="settings-section-title">Display</div>
            <div class="settings-row">
              <div>
                <div class="settings-row__label">Reduced Motion</div>
                <div class="settings-row__desc">Disables animations and transitions.</div>
              </div>
              <label class="toggle">
                <input type="checkbox" id="toggle-motion" ${state.settings.reducedMotion ? 'checked' : ''}>
                <div class="toggle-track"><div class="toggle-thumb"></div></div>
              </label>
            </div>
            <div class="settings-row">
              <div>
                <div class="settings-row__label">Show Real World Panels</div>
                <div class="settings-row__desc">Show "Real World Takeaway" sections in chapters.</div>
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
            <div class="settings-section-title">About</div>
            <div class="settings-row">
              <div>
                <div class="settings-row__label">MCP Academy: The Invisible Server</div>
                <div class="settings-row__desc">An educational browser game teaching MCP server concepts.</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

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
      if (confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) {
        SaveSystem.reset();
        resetState();
        ToastComponent.show({ type: 'info', icon: '🔄', title: 'Progress reset!', message: 'Starting fresh.' });
        navigate('home');
      }
    });
  }

  leave() {}
}
