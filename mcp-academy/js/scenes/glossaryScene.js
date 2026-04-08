/**
 * glossaryScene.js — Glossary / encyclopedia scene
 */

import { GLOSSARY_TERMS }        from '../data/glossary.js';
import { GLOSSARY_TERMS_ES }     from '../data/glossary.es.js';
import { GLOSSARY_TERMS_NL }     from '../data/glossary.nl.js';
import { discoverGlossaryTerm, getState } from '../state.js';
import { AchievementSystem }     from '../systems/achievementSystem.js';
import { getLang, getT }         from '../i18n.js';

function getLocalizedGlossary() {
  const lang = getLang();
  if (lang === 'es') return GLOSSARY_TERMS_ES;
  if (lang === 'nl') return GLOSSARY_TERMS_NL;
  return GLOSSARY_TERMS;
}

export class GlossaryScene {
  enter() {
    const el = document.getElementById('scene-glossary');
    const t  = getT();
    const terms = getLocalizedGlossary();

    // Mark all as discovered on view
    GLOSSARY_TERMS.forEach(gt => discoverGlossaryTerm(gt.id));
    AchievementSystem.checkWordsmith();

    el.innerHTML = `
      <div style="padding:var(--sp-8) var(--sp-6) var(--sp-4);">
        <div class="container container--wide">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:var(--sp-4); margin-bottom:var(--sp-6)">
            <div>
              <h2>${t('glossary.title')}</h2>
              <p style="color:var(--clr-text-muted)">${t('glossary.subtitle')}</p>
            </div>
            <div>
              <input type="search" id="glossary-search" placeholder="${t('glossary.placeholder')}"
                style="background:var(--bg-card); border:1px solid var(--clr-border); color:var(--clr-text);
                       border-radius:var(--radius-lg); padding:var(--sp-3) var(--sp-4); font-size:0.9rem; min-width:220px;"
                aria-label="${t('glossary.placeholder')}">
            </div>
          </div>
          <div class="glossary-grid" id="glossary-grid"></div>
        </div>
      </div>
    `;

    this._renderTerms(el, terms, t);

    el.querySelector('#glossary-search').addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = terms.filter(gt =>
        gt.word.toLowerCase().includes(q) ||
        gt.definition.toLowerCase().includes(q) ||
        gt.metaphor.toLowerCase().includes(q)
      );
      this._renderTerms(el, filtered, t);
    });
  }

  _renderTerms(el, terms, t) {
    const grid = el.querySelector('#glossary-grid');
    if (!grid) return;

    if (!terms.length) {
      grid.innerHTML = `<p style="color:var(--clr-text-muted)">${t('glossary.noResults')}</p>`;
      return;
    }

    grid.innerHTML = terms.map(gt => `
      <div class="glossary-term">
        <div class="glossary-term__word">${gt.word}</div>
        <div class="glossary-term__metaphor">✨ ${gt.metaphor}</div>
        <div class="glossary-term__def">${gt.definition}</div>
      </div>
    `).join('');
  }

  leave() {}
}
