/**
 * main.js — App entry point
 * Bootstraps all systems, registers scenes, starts the router.
 */

import { initRouter, registerScene, navigate } from './router.js';
import { getState, setState, subscribe, resetState } from './state.js';
import { SaveSystem }       from './systems/saveSystem.js';
import { AchievementSystem } from './systems/achievementSystem.js';
import { ToastComponent }   from './components/toast.js';

// Scene renderers
import { HomeScene }     from './scenes/homeScene.js';
import { MapScene }      from './scenes/mapScene.js';
import { ChapterScene }  from './scenes/chapterScene.js';
import { GlossaryScene } from './scenes/glossaryScene.js';
import { SettingsScene } from './scenes/settingsScene.js';

// ─── Global singletons exposed on window for cross-module use ─────
window.App = {
  navigate,
  getState,
  setState,
  subscribe,
  resetState,
};

async function boot() {
  // 1. Load saved progress
  SaveSystem.load();

  // 2. Create toast container
  ToastComponent.init();

  // 3. Init achievement system
  AchievementSystem.init();

  // 4. Build top-bar XP counter
  buildTopBar();

  // 5. Init particle canvas
  initParticles();

  // 6. Register all scenes
  const homeScene     = new HomeScene();
  const mapScene      = new MapScene();
  const chapterScene  = new ChapterScene();
  const glossaryScene = new GlossaryScene();
  const settingsScene = new SettingsScene();

  registerScene('home', {
    onEnter: () => homeScene.enter(),
    onLeave: () => homeScene.leave(),
  });
  registerScene('map', {
    onEnter: () => mapScene.enter(),
    onLeave: () => mapScene.leave(),
  });
  registerScene('chapter', {
    onEnter: (params) => chapterScene.enter(params),
    onLeave: () => chapterScene.leave(),
  });
  registerScene('glossary', {
    onEnter: () => glossaryScene.enter(),
    onLeave: () => glossaryScene.leave(),
  });
  registerScene('settings', {
    onEnter: () => settingsScene.enter(),
    onLeave: () => settingsScene.leave(),
  });

  // 7. Subscribe to state changes to keep UI in sync
  subscribe((state) => {
    updateTopBar(state);
    SaveSystem.save(state);
  });

  // 8. Start the router
  initRouter();
}

// ─── Top Bar ────────────────────────────────────────────────
function buildTopBar() {
  const bar = document.getElementById('top-bar');
  if (!bar) return;

  bar.innerHTML = `
    <div class="top-bar__logo">
      <span>🧙</span>
      MCP Academy
    </div>
    <div class="top-bar__actions">
      <div class="xp-badge" id="xp-badge">⚡ 0 XP</div>
      <button class="btn-icon" id="btn-map"      title="World Map">🗺️</button>
      <button class="btn-icon" id="btn-glossary" title="Glossary">📖</button>
      <button class="btn-icon" id="btn-settings" title="Settings">⚙️</button>
    </div>
  `;

  bar.querySelector('#btn-map')
     .addEventListener('click', () => navigate('map'));
  bar.querySelector('#btn-glossary')
     .addEventListener('click', () => navigate('glossary'));
  bar.querySelector('#btn-settings')
     .addEventListener('click', () => navigate('settings'));

  updateTopBar(getState());
}

function updateTopBar(state) {
  const badge = document.getElementById('xp-badge');
  if (badge) badge.textContent = `⚡ ${state.playerXP} XP`;
}

// ─── Particle Canvas ────────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const particles = [];
  const PARTICLE_COUNT = 60;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  // Create particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '0,212,255' : '168,85,247',
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// ─── Boot ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', boot);
