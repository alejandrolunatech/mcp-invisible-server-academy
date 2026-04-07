/**
 * homeScene.js — Home / landing screen
 */

import { navigate } from '../router.js';
import { getState  } from '../state.js';

export class HomeScene {
  enter() {
    const el = document.getElementById('scene-home');
    const { completedChapters, playerXP } = getState();
    const hasProgress = completedChapters.length > 0;

    el.innerHTML = `
      <!-- Floating orbs -->
      <div class="home-orbs" aria-hidden="true">
        <div class="home-orb"></div>
        <div class="home-orb"></div>
        <div class="home-orb"></div>
      </div>

      <div class="home-content">
        <div class="home-eyebrow">MCP Academy</div>

        <h1 class="home-title">The Invisible<br>Server</h1>

        <p class="home-subtitle">
          A magical academy adventure where you learn to build Python MCP servers,
          understand STDIO, forge tools, and restore the invisible server spirit.
        </p>

        <div class="home-badges">
          <div class="home-badge">🌀 STDIO Streams</div>
          <div class="home-badge">⚗️ Python Tools</div>
          <div class="home-badge">📡 Message Flow</div>
          <div class="home-badge">⚡ UV Forge</div>
          <div class="home-badge">🌀 Client Portal</div>
        </div>

        <div class="home-cta">
          <button class="btn btn-primary btn-lg" id="btn-start">
            ${hasProgress ? '⚔️ Continue Journey' : '🔮 Begin Your Journey'}
          </button>
          ${hasProgress ? `
            <div style="color:var(--clr-text-muted); font-size:0.85rem;">
              Progress: ${completedChapters.length}/6 chapters · ${playerXP} XP earned
            </div>
          ` : ''}
        </div>

        <div class="home-scroll-hint">
          <span>▼</span>
          5 chapters + Final Boss
          <span>▼</span>
        </div>
      </div>
    `;

    el.querySelector('#btn-start').addEventListener('click', () => navigate('map'));

    // Add subtle starfield
    _addStarfield(el);
  }

  leave() {}
}

function _addStarfield(el) {
  const existing = el.querySelector('.starfield');
  if (existing) return;

  const stars = document.createElement('div');
  stars.className = 'starfield';
  stars.setAttribute('aria-hidden', 'true');

  for (let i = 0; i < 40; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      --dur:${2 + Math.random()*4}s;
      --delay:${Math.random()*4}s;
    `;
    stars.appendChild(star);
  }

  el.insertBefore(stars, el.firstChild);
}
