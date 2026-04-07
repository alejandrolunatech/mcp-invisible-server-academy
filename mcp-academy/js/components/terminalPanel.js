/**
 * terminalPanel.js — Terminal panel component builder
 */

import { TerminalSystem, buildTerminalHTML } from '../systems/terminalSystem.js';

export function createTerminalPanel({ title = 'Terminal', id = 'terminal' } = {}) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = buildTerminalHTML({ title, id });
  const panel = wrapper.firstElementChild;

  const body = panel.querySelector(`#${id}-body`);
  const system = new TerminalSystem(body);

  // Wire replay and clear buttons
  panel.querySelector('.terminal-replay-btn')?.addEventListener('click', () => system.replay());
  panel.querySelector('.terminal-clear-btn')?.addEventListener('click', () => system.clear());

  panel.terminalSystem = system;
  return panel;
}
