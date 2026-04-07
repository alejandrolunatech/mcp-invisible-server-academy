/**
 * achievementSystem.js — Tracks and awards achievement badges
 */

import { unlockAchievement, isAchievementUnlocked, getState } from '../state.js';
import { ACHIEVEMENTS } from '../data/achievements.js';
import { ToastComponent } from '../components/toast.js';

export const AchievementSystem = {
  init() {
    // Nothing to init — reactive unlocking is done per-action
  },

  /** Award an achievement by id and show toast if newly unlocked */
  award(id) {
    const wasNew = unlockAchievement(id);
    if (!wasNew) return false;

    const def = ACHIEVEMENTS.find(a => a.id === id);
    if (def) {
      ToastComponent.show({
        type: 'achievement',
        icon: def.icon,
        title: `Achievement Unlocked: ${def.title}`,
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
    container.innerHTML = ACHIEVEMENTS.map(a => {
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
