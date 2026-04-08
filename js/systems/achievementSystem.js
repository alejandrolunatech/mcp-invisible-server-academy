/**
 * achievementSystem.js — Tracks and awards achievement badges
 */

import { unlockAchievement, isAchievementUnlocked, getState } from '../state.js';
import { ACHIEVEMENTS } from '../data/achievements.js';
import { ACHIEVEMENTS_ES } from '../data/achievements.es.js';
import { ACHIEVEMENTS_NL } from '../data/achievements.nl.js';
import { ToastComponent } from '../components/toast.js';
import { getLang, getT } from '../i18n.js';

function getLocalizedAchievements() {
  const lang = getLang();
  if (lang === 'es') return ACHIEVEMENTS_ES;
  if (lang === 'nl') return ACHIEVEMENTS_NL;
  return ACHIEVEMENTS;
}

export const AchievementSystem = {
  init() {
    // Nothing to init — reactive unlocking is done per-action
  },

  /** Award an achievement by id and show toast if newly unlocked */
  award(id) {
    const wasNew = unlockAchievement(id);
    if (!wasNew) return false;

    const t   = getT();
    const def = getLocalizedAchievements().find(a => a.id === id);
    if (def) {
      ToastComponent.show({
        type: 'achievement',
        icon: def.icon,
        title: `${t('achievements.unlocked')}: ${def.title}`,
        message: def.description,
      });
    }
    return true;
  },

  /** Check wordsmith achievement after glossary discovery */
  checkWordsmith() {
    const { glossaryDiscoveries } = getState();
    if (glossaryDiscoveries.length >= 5) {
      AchievementSystem.award('wordsmith');
    }
  },

  /** Render achievement grid into a container */
  renderGrid(container) {
    const state = getState();
    const achievements = getLocalizedAchievements();
    container.innerHTML = achievements.map(a => {
      const unlocked = !!state.achievements[a.id];
      return `
        <div class="badge ${unlocked ? 'unlocked' : 'locked'}" title="${a.description}">
          <div class="badge__icon">${a.icon}</div>
          <div class="badge__name">${a.title}</div>
        </div>
      `;
    }).join('');
  },
};
