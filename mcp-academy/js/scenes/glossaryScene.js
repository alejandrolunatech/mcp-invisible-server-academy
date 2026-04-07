/**
 * glossaryScene.js — Glossary / encyclopedia scene
 */

import { GLOSSARY_TERMS }        from '../data/glossary.js';
import { discoverGlossaryTerm, getState } from '../state.js';
import { AchievementSystem }     from '../systems/achievementSystem.js';

export class GlossaryScene {
  enter() {
    const el = document.getElementById('scene-glossary');
    const { glossaryDiscoveries } = getState();

    // Mark all as discovered on view
    GLOSSARY_TERMS.forEach(t => discoverGlossaryTerm(t.id));
    AchievementSystem.checkWordsmith();

    el.innerHTML = `
      <div style="padding:var(--sp-8) var(--sp-6) var(--sp-4);">
        <div class="container container--wide">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:var(--sp-4); margin-bottom:var(--sp-6)">
            <div>
              <h2>📖 Academy Glossary</h2>
              <p style="color:var(--clr-text-muted)">Every term from the MCP world, explained in plain language.</p>
            </div>
            <div>
              <input type="search" id="glossary-search" placeholder="Search terms…"
                style="background:var(--bg-card); border:1px solid var(--clr-border); color:var(--clr-text);
                       border-radius:var(--radius-lg); padding:var(--sp-3) var(--sp-4); font-size:0.9rem; min-width:220px;"
                aria-label="Search glossary">
            </div>
          </div>
          <div class="glossary-grid" id="glossary-grid"></div>
        </div>
      </div>
    `;

    this._renderTerms(el, GLOSSARY_TERMS);

    el.querySelector('#glossary-search').addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = GLOSSARY_TERMS.filter(t =>
        t.word.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.metaphor.toLowerCase().includes(q)
      );
      this._renderTerms(el, filtered);
    });
  }

  _renderTerms(el, terms) {
    const grid = el.querySelector('#glossary-grid');
    if (!grid) return;

    if (!terms.length) {
      grid.innerHTML = `<p style="color:var(--clr-text-muted)">No matching terms found.</p>`;
      return;
    }

    grid.innerHTML = terms.map(t => `
      <div class="glossary-term">
        <div class="glossary-term__word">${t.word}</div>
        <div class="glossary-term__metaphor">✨ ${t.metaphor}</div>
        <div class="glossary-term__def">${t.definition}</div>
      </div>
    `).join('');
  }

  leave() {}
}
