/**
 * mapScene.js — World map / chapter selector
 */

import { getState } from '../state.js';
import { getLocalizedChapters } from '../data/localizedChapters.js';
import { createChapterCard } from '../components/chapterCard.js';
import { createProgressBar  } from '../components/progressBar.js';
import { AchievementSystem  } from '../systems/achievementSystem.js';
import { getT } from '../i18n.js';

export class MapScene {
  enter() {
    const el    = document.getElementById('scene-map');
    const state = getState();
    const t     = getT();
    const { completedChapters, playerXP } = state;

    const chapters     = getLocalizedChapters();
    const mainChapters = chapters.filter(c => !c.isFinalBoss);
    const finalBoss    = chapters.find(c => c.isFinalBoss);
    const completed    = completedChapters.length;

    el.innerHTML = `
      <div class="map-header">
        <h2 class="map-title">${t('map.title')}</h2>
        <p class="map-subtitle">${t('map.subtitle')}</p>
        <div class="map-progress-wrap">
          <div id="map-progress-bar"></div>
        </div>
      </div>

      <div class="map-grid" id="map-grid"></div>

      <div class="final-boss-section">
        <div class="final-boss-label">${t('map.finalBossLabel')}</div>
        <div id="final-boss-card"></div>
      </div>

      <div style="max-width:1200px; margin:0 auto; padding:0 var(--sp-6) var(--sp-10);">
        <div class="panel" style="text-align:center;">
          <p class="section-title">${t('map.achievementsTitle')}</p>
          <div class="badge-grid" id="achievement-grid" style="justify-content:center"></div>
        </div>
      </div>
    `;

    // Progress bar
    const pbWrap = el.querySelector('#map-progress-bar');
    const pb = createProgressBar({
      label: t('map.progressLabel', { completed, total: chapters.length }),
      value: completed,
      max: chapters.length,
    });
    pbWrap.appendChild(pb);

    // Chapter cards
    const grid = el.querySelector('#map-grid');
    mainChapters.forEach(chapter => {
      grid.appendChild(createChapterCard(chapter, state));
    });

    // Final boss card
    if (finalBoss) {
      el.querySelector('#final-boss-card').appendChild(
        createChapterCard(finalBoss, state)
      );
    }

    // Achievement grid
    AchievementSystem.renderGrid(el.querySelector('#achievement-grid'));
  }

  leave() {}
}
