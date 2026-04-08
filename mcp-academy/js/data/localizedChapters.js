/**
 * localizedChapters.js — Helper that merges translated chapter text
 * onto the base English chapter metadata (icon, color, xpReward, etc.)
 *
 * The EN chapters.js is the single source of truth for all non-text fields.
 * The *.es.js / *.nl.js files only carry translated strings; missing fields
 * fall back to the English base automatically.
 */

import { CHAPTERS }    from './chapters.js';
import { CHAPTERS_ES } from './chapters.es.js';
import { CHAPTERS_NL } from './chapters.nl.js';
import { getLang }     from '../i18n.js';

/** Fields that are language-independent and always come from the EN base */
const META_FIELDS = ['id', 'icon', 'color', 'xpReward', 'achievementId', 'isFinalBoss'];

/**
 * Merge a translated chapter record onto the base English chapter.
 * Text fields come from `translated`; metadata fields come from `base`.
 */
function merge(base, translated) {
  if (!translated) return base;
  const result = { ...base, ...translated };
  // Always keep metadata from EN base
  META_FIELDS.forEach(k => { result[k] = base[k]; });
  return result;
}

/** Return all chapters for the current language, with full metadata. */
export function getLocalizedChapters() {
  const lang = getLang();
  if (lang === 'es') return CHAPTERS.map(base => merge(base, CHAPTERS_ES.find(c => c.id === base.id)));
  if (lang === 'nl') return CHAPTERS.map(base => merge(base, CHAPTERS_NL.find(c => c.id === base.id)));
  return CHAPTERS;
}

/** Return a single chapter by id for the current language, with full metadata. */
export function getLocalizedChapter(id) {
  const lang = getLang();
  const base = CHAPTERS.find(c => c.id === id);
  if (!base) return null;
  if (lang === 'es') return merge(base, CHAPTERS_ES.find(c => c.id === id));
  if (lang === 'nl') return merge(base, CHAPTERS_NL.find(c => c.id === id));
  return base;
}
