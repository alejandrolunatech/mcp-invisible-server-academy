/**
 * router.js — Scene routing and navigation
 * Controls which scene is visible, handles transitions.
 */

import { setState, getState } from './state.js';

// All registered scenes
const _scenes = new Map(); // id → { element, onEnter, onLeave }

let _current = null;
let _currentParams = {};

/** Register a scene by its DOM element id and lifecycle hooks */
export function registerScene(id, { onEnter, onLeave } = {}) {
  const el = document.getElementById(`scene-${id}`);
  if (!el) {
    console.warn(`[Router] Scene element #scene-${id} not found`);
    return;
  }
  _scenes.set(id, { element: el, onEnter, onLeave });
}

/** Navigate to a scene, passing optional params */
export async function navigate(id, params = {}) {
  if (_current === id) return;

  const next = _scenes.get(id);
  if (!next) {
    console.warn(`[Router] Unknown scene: ${id}`);
    return;
  }

  // Leave current scene
  if (_current) {
    const cur = _scenes.get(_current);
    if (cur) {
      if (cur.onLeave) await cur.onLeave();
      cur.element.classList.remove('active');
    }
  }

  // Enter new scene
  setState({ currentScene: id });
  _current = id;
  _currentParams = params;

  next.element.classList.add('active');
  next.element.scrollTop = 0;

  if (next.onEnter) await next.onEnter(params);

  // Update browser hash for bookmarking
  history.replaceState({ scene: id, params }, '', `#${id}`);
}

/** Get the currently active scene id */
export function getCurrentScene() {
  return _current;
}

/**
 * Re-run the current scene's onEnter without the duplicate-navigation guard.
 * Used by i18n to re-render after a language change.
 */
export async function reloadCurrentScene() {
  if (!_current) return;
  const scene = _scenes.get(_current);
  if (!scene) return;
  scene.element.scrollTop = 0;
  if (scene.onEnter) await scene.onEnter(_currentParams);
}

/** Handle browser back/forward */
window.addEventListener('popstate', (e) => {
  const id = e.state?.scene || 'home';
  navigate(id, e.state?.params || {});
});

/** Init — read hash on load */
export function initRouter() {
  const hash = location.hash.replace('#', '');
  // Always start at home on fresh load (don't auto-navigate into a chapter from URL)
  const safeStart = ['home', 'map', 'glossary', 'settings'].includes(hash) ? hash : 'home';
  navigate(safeStart);
}
