/**
 * homeScene.js — Home / landing screen
 */

import { navigate } from '../router.js';
import { getState  } from '../state.js';
import { getT } from '../i18n.js';

export class HomeScene {
  enter() {
    const el = document.getElementById('scene-home');
    const { completedChapters, playerXP } = getState();
    const hasProgress = completedChapters.length > 0;
    const t = getT();

    el.innerHTML = `
      <!-- Floating orbs -->
      <div class="home-orbs" aria-hidden="true">
        <div class="home-orb"></div>
        <div class="home-orb"></div>
        <div class="home-orb"></div>
      </div>

      <div class="home-content">
        <div class="home-eyebrow">${t('home.eyebrow')}</div>

        <h1 class="home-title">${t('home.title').replace('\n', '<br>')}</h1>

        <p class="home-subtitle">${t('home.subtitle')}</p>

        <div class="home-badges">
          <div class="home-badge">${t('home.badge1')}</div>
          <div class="home-badge">${t('home.badge2')}</div>
          <div class="home-badge">${t('home.badge3')}</div>
          <div class="home-badge">${t('home.badge4')}</div>
          <div class="home-badge">${t('home.badge5')}</div>
        </div>

        <div class="home-cta">
          <button class="btn btn-primary btn-lg" id="btn-start">
            ${hasProgress ? t('home.continue') : t('home.begin')}
          </button>
          ${hasProgress ? `
            <div style="color:var(--clr-text-muted); font-size:0.85rem;">
              ${t('home.progress', { completed: completedChapters.length, xp: playerXP })}
            </div>
          ` : ''}
        </div>

        <div class="home-scroll-hint">
          <span>▼</span>
          ${t('home.scrollHint')}
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
