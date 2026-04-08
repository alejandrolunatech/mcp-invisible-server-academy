/**
 * chapterCard.js — Chapter card component for the world map
 */

import { navigate } from '../router.js';
import { setState } from '../state.js';
import { getT } from '../i18n.js';

/**
 * Build a chapter card element
 * @param {Object} chapter - Chapter data
 * @param {Object} state   - Current game state
 */
export function createChapterCard(chapter, state) {
  const { id, title, subtitle, icon, color, xpReward, description, isFinalBoss } = chapter;
  const unlocked  = state.unlockedChapters.includes(id);
  const completed = state.completedChapters.includes(id);
  const t = getT();

  const card = document.createElement('div');
  card.className = `chapter-card${unlocked ? '' : ' locked'}${completed ? ' completed' : ''}${isFinalBoss ? ' portal-shimmer' : ''}`;

  if (isFinalBoss) {
    card.className = `final-boss-card${unlocked ? '' : ' locked'}${completed ? ' completed' : ''}`;
    card.innerHTML = `
      <div class="final-boss-card__icon">${icon}</div>
      <h3 class="final-boss-card__title">${title}</h3>
      <p class="final-boss-card__desc">${description}</p>
      ${!unlocked ? `<div class="final-boss-card__lock">🔒 ${t('card.lockedBoss')}</div>` : ''}
      ${completed ? `<div style="color:var(--clr-success); margin-top:var(--sp-3); font-weight:700">✅ ${t('card.completed')}</div>` : ''}
    `;
  } else {
    card.innerHTML = `
      <div class="chapter-card__number">${t('card.chapter', { id })}</div>
      <div class="chapter-card__icon">${icon}</div>
      <div class="chapter-card__title">${title}</div>
      <div class="chapter-card__desc">${subtitle}</div>
      <div class="chapter-card__xp">⚡ ${t('card.xp', { xp: xpReward })}</div>
      ${!unlocked ? `<div class="chapter-card__lock">🔒</div>` : ''}
    `;
  }

  if (unlocked) {
    card.addEventListener('click', () => {
      setState({ currentChapterId: id });
      navigate('chapter', { chapterId: id });
    });
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') card.click();
    });
  }

  return card;
}
