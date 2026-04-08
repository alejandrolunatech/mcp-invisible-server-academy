/**
 * state.js — Global game state and update helpers
 * Single source of truth for all game data.
 * Never mutate state directly — use the provided helpers.
 */

export const DEFAULT_STATE = {
  currentScene: 'home',
  currentChapterId: null,
  unlockedChapters: [1],
  completedChapters: [],
  achievements: {},          // { achievementId: true }
  playerXP: 0,
  quizScores: {},            // { chapterId: { score, total } }
  settings: {
    sound: false,
    reducedMotion: false,
    showRealWorldPanel: true,
  },
  glossaryDiscoveries: [],   // Array of discovered term ids
  version: 1,
};

// Live state (hydrated from localStorage or defaults)
let _state = deepCopy(DEFAULT_STATE);

// Subscribers for state changes
const _subscribers = new Set();

/** Get a shallow snapshot of state (read-only) */
export function getState() {
  return { ..._state };
}

/** Update state with a partial object and notify subscribers */
export function setState(partial) {
  _state = { ..._state, ...partial };
  _notify();
}

/** Subscribe to state changes */
export function subscribe(fn) {
  _subscribers.add(fn);
  return () => _subscribers.delete(fn); // returns unsubscribe fn
}

/** Notify all subscribers */
function _notify() {
  _subscribers.forEach(fn => fn(getState()));
}

// ─── Chapter helpers ───────────────────────────────────────
export function unlockChapter(id) {
  const { unlockedChapters } = _state;
  if (!unlockedChapters.includes(id)) {
    setState({ unlockedChapters: [...unlockedChapters, id] });
  }
}

export function completeChapter(id) {
  const { completedChapters, unlockedChapters } = _state;
  const updated = completedChapters.includes(id)
    ? completedChapters
    : [...completedChapters, id];

  // Auto-unlock the next chapter
  const nextId = id + 1;
  const newUnlocked = unlockedChapters.includes(nextId)
    ? unlockedChapters
    : [...unlockedChapters, nextId];

  // Unlock final boss (chapter 6) when all 5 main chapters done
  const mainChapters = [1, 2, 3, 4, 5];
  const allMain = mainChapters.every(c => updated.includes(c));
  const finalUnlocked = allMain && !newUnlocked.includes(6)
    ? [...newUnlocked, 6]
    : newUnlocked;

  setState({ completedChapters: updated, unlockedChapters: finalUnlocked });
}

export function isChapterUnlocked(id) {
  return _state.unlockedChapters.includes(id);
}

export function isChapterCompleted(id) {
  return _state.completedChapters.includes(id);
}

// ─── XP helpers ────────────────────────────────────────────
export function addXP(amount) {
  setState({ playerXP: _state.playerXP + amount });
}

// ─── Achievement helpers ────────────────────────────────────
export function unlockAchievement(id) {
  if (_state.achievements[id]) return false; // already unlocked
  setState({ achievements: { ..._state.achievements, [id]: true } });
  return true;
}

export function isAchievementUnlocked(id) {
  return !!_state.achievements[id];
}

// ─── Quiz score helpers ─────────────────────────────────────
export function saveQuizScore(chapterId, score, total) {
  setState({
    quizScores: { ..._state.quizScores, [chapterId]: { score, total } },
  });
}

// ─── Glossary helpers ───────────────────────────────────────
export function discoverGlossaryTerm(termId) {
  if (!_state.glossaryDiscoveries.includes(termId)) {
    setState({ glossaryDiscoveries: [..._state.glossaryDiscoveries, termId] });
  }
}

// ─── Settings helpers ───────────────────────────────────────
export function updateSetting(key, value) {
  setState({ settings: { ..._state.settings, [key]: value } });
}

// ─── Full reset ─────────────────────────────────────────────
export function resetState() {
  _state = deepCopy(DEFAULT_STATE);
  _notify();
}

// ─── Internal utils ─────────────────────────────────────────
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
