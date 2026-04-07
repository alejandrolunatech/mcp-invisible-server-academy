/**
 * saveSystem.js — Persist and restore game state via localStorage
 */

import { getState, setState, DEFAULT_STATE } from '../state.js';

const SAVE_KEY = 'mcp_academy_save_v1';

export const SaveSystem = {
  /** Save current state to localStorage */
  save(state) {
    try {
      const data = state || getState();
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('[SaveSystem] Could not save:', e);
    }
  },

  /** Load state from localStorage (merges into defaults) */
  load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      // Merge saved data over defaults to handle new fields added in updates
      const merged = { ...DEFAULT_STATE, ...saved };
      setState(merged);
    } catch (e) {
      console.warn('[SaveSystem] Could not load save:', e);
    }
  },

  /** Wipe save data and reset to defaults */
  reset() {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch (e) {
      console.warn('[SaveSystem] Could not reset:', e);
    }
  },
};
