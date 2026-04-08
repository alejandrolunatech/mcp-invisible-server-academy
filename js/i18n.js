/**
 * i18n.js — Internationalisation system
 * Supported languages: 'en' (English), 'es' (Spanish), 'nl' (Dutch)
 *
 * Usage:
 *   import { getT, setLang, getLang, subscribeI18n } from './i18n.js';
 *   const t = getT();
 *   t('home.title')  → localised string
 */

// ─── All UI strings ──────────────────────────────────────────────────────────

const TRANSLATIONS = {

  // ──────────────────────────────────────────────────────────
  // ENGLISH
  // ──────────────────────────────────────────────────────────
  en: {
    lang: { en: 'EN', es: 'ES', nl: 'NL' },

    // Top bar
    topbar: {
      title: 'MCP Academy',
      xp:    '{xp} XP',
      map:   'World Map',
      glossary: 'Glossary',
      settings: 'Settings',
    },

    // Home scene
    home: {
      eyebrow: 'MCP Academy',
      title:   'The Invisible\nServer',
      subtitle:
        'A magical academy adventure where you learn to build Python MCP servers, understand STDIO, forge tools, and restore the invisible server spirit.',
      badge1: '🌀 STDIO Streams',
      badge2: '⚗️ Python Tools',
      badge3: '📡 Message Flow',
      badge4: '⚡ UV Forge',
      badge5: '🌀 Client Portal',
      begin:       '🔮 Begin Your Journey',
      continue:    '⚔️ Continue Journey',
      progress: 'Progress: {completed}/6 chapters · {xp} XP earned',
      scrollHint: '5 chapters + Final Boss',
    },

    // Map scene
    map: {
      title:    '🗺️ Academy World Map',
      subtitle: 'Master each chapter to restore the Invisible Server',
      progressLabel: '{completed} / {total} chapters complete',
      finalBossLabel: '⚔️ Final Boss',
      achievementsTitle: 'Your Achievements',
    },

    // Chapter card
    card: {
      chapter:   'Chapter {id}',
      xp:        '{xp} XP',
      locked:    '🔒',
      lockedBoss:'Complete all 5 chapters first',
      completed: 'COMPLETED — The Server is Restored!',
    },

    // Chapter scene generic
    chapter: {
      backToMap:      'Back to Map',
      beginChallenge: 'Begin Challenge →',
      seeInAction:    'See it in Action →',
      takeQuiz:       'Take the Quiz →',
      nextChapter:    'Next Chapter →',
      realCodeExample: '📜 Real Code Example',
      terminalTitle:  '📟 Live Terminal Simulation',
      knowledgeCheck: '🎯 Knowledge Check',
      realWorldTakeaway: '🌍 Real World Takeaway',
      replay:         'Replay',
      chapterComplete: '{title} Complete!',
      serverRestored:  'The Invisible Server is RESTORED!',
      bossCompleteMsg: 'You have mastered every concept in MCP Academy. The invisible server spirit has been restored. You are an Invisible Architect!',
      chapterCompleteMsg: 'Excellent work! Your knowledge grows stronger. The academy is one step closer to restoration.',
      xpEarned:       '+{xp} XP earned',
      completeToast:  'Chapter Complete!',
    },

    // Glossary scene
    glossary: {
      title:       '📖 Academy Glossary',
      subtitle:    'Every term from the MCP world, explained in plain language.',
      placeholder: 'Search terms…',
      noResults:   'No matching terms found.',
    },

    // Settings scene
    settings: {
      title:       '⚙️ Settings',
      subtitle:    'Manage your academy experience.',
      languageSection:    'Language',
      languageLabel:      'Game Language',
      languageDesc:       'Switch the game language.',
      progressSection:    'Progress',
      yourXP:             'Your XP',
      xpEarned:           '{xp} XP earned',
      chaptersCompleted:  'Chapters Completed',
      chaptersOf:         '{completed} of 6',
      resetLabel:         'Reset All Progress',
      resetDesc:          'Wipes all saves, XP, and achievements.',
      resetBtn:           'Reset ⚠️',
      resetConfirm:       'Are you sure you want to reset ALL progress? This cannot be undone.',
      resetToastTitle:    'Progress reset!',
      resetToastMsg:      'Starting fresh.',
      displaySection:     'Display',
      reducedMotionLabel: 'Reduced Motion',
      reducedMotionDesc:  'Disables animations and transitions.',
      realWorldLabel:     'Show Real World Panels',
      realWorldDesc:      'Show "Real World Takeaway" sections in chapters.',
      aboutSection:       'About',
      aboutTitle:         'MCP Academy: The Invisible Server',
      aboutDesc:          'An educational browser game teaching MCP server concepts.',
    },

    // Achievement system
    achievements: {
      unlocked: 'Achievement Unlocked',
    },

    // Quiz system
    quiz: {
      quizTime:       'Quiz Time',
      correct:        '✅ Correct!',
      incorrect:      '❌ Not quite.',
      xpPop:          '+20 XP',
      perfect:        'Perfect score! Amazing!',
      great:          'Great work!',
      keepPractising: 'Keep practising — every attempt teaches you something!',
      complete:       'Quiz Complete',
      continue:       'Continue →',
    },
  },

  // ──────────────────────────────────────────────────────────
  // SPANISH
  // ──────────────────────────────────────────────────────────
  es: {
    lang: { en: 'EN', es: 'ES', nl: 'NL' },

    topbar: {
      title:    'MCP Academy',
      xp:       '{xp} XP',
      map:      'Mapa del mundo',
      glossary: 'Glosario',
      settings: 'Ajustes',
    },

    home: {
      eyebrow: 'MCP Academy',
      title:   'El Servidor\nInvisible',
      subtitle:
        'Una aventura en una academia mágica donde aprenderás a construir servidores MCP en Python, entender STDIO, forjar herramientas y restaurar el espíritu del servidor invisible.',
      badge1: '🌀 Flujos STDIO',
      badge2: '⚗️ Herramientas Python',
      badge3: '📡 Flujo de mensajes',
      badge4: '⚡ Forja UV',
      badge5: '🌀 Portal del cliente',
      begin:       '🔮 Comenzar tu aventura',
      continue:    '⚔️ Continuar aventura',
      progress: 'Progreso: {completed}/6 capítulos · {xp} XP obtenidos',
      scrollHint: '5 capítulos + Jefe Final',
    },

    map: {
      title:    '🗺️ Mapa del mundo',
      subtitle: 'Domina cada capítulo para restaurar el Servidor Invisible',
      progressLabel: '{completed} / {total} capítulos completados',
      finalBossLabel: '⚔️ Jefe Final',
      achievementsTitle: 'Tus logros',
    },

    card: {
      chapter:   'Capítulo {id}',
      xp:        '{xp} XP',
      locked:    '🔒',
      lockedBoss:'Completa los 5 capítulos primero',
      completed: 'COMPLETADO — ¡El servidor ha sido restaurado!',
    },

    chapter: {
      backToMap:      'Volver al mapa',
      beginChallenge: 'Comenzar desafío →',
      seeInAction:    'Verlo en acción →',
      takeQuiz:       'Hacer el quiz →',
      nextChapter:    'Siguiente capítulo →',
      realCodeExample: '📜 Ejemplo de código real',
      terminalTitle:  '📟 Simulación de terminal en vivo',
      knowledgeCheck: '🎯 Comprueba tu conocimiento',
      realWorldTakeaway: '🌍 Aplicación en el mundo real',
      replay:         'Repetir',
      chapterComplete: '¡{title} completado!',
      serverRestored:  '¡El Servidor Invisible ha sido RESTAURADO!',
      bossCompleteMsg: '¡Has dominado todos los conceptos de MCP Academy! El espíritu del servidor invisible ha sido restaurado. ¡Eres un Arquitecto Invisible!',
      chapterCompleteMsg: '¡Excelente trabajo! Tu conocimiento se fortalece. La academia está un paso más cerca de la restauración.',
      xpEarned:       '+{xp} XP obtenidos',
      completeToast:  '¡Capítulo completado!',
    },

    glossary: {
      title:       '📖 Glosario de la Academia',
      subtitle:    'Cada término del mundo MCP, explicado en lenguaje sencillo.',
      placeholder: 'Buscar términos…',
      noResults:   'No se encontraron términos.',
    },

    settings: {
      title:       '⚙️ Ajustes',
      subtitle:    'Gestiona tu experiencia en la academia.',
      languageSection:    'Idioma',
      languageLabel:      'Idioma del juego',
      languageDesc:       'Cambia el idioma del juego.',
      progressSection:    'Progreso',
      yourXP:             'Tu XP',
      xpEarned:           '{xp} XP obtenidos',
      chaptersCompleted:  'Capítulos completados',
      chaptersOf:         '{completed} de 6',
      resetLabel:         'Reiniciar todo el progreso',
      resetDesc:          'Borra todas las partidas, XP y logros.',
      resetBtn:           'Reiniciar ⚠️',
      resetConfirm:       '¿Estás seguro de que quieres reiniciar TODO el progreso? Esta acción no se puede deshacer.',
      resetToastTitle:    '¡Progreso reiniciado!',
      resetToastMsg:      'Empezando de nuevo.',
      displaySection:     'Pantalla',
      reducedMotionLabel: 'Movimiento reducido',
      reducedMotionDesc:  'Desactiva animaciones y transiciones.',
      realWorldLabel:     'Mostrar paneles del mundo real',
      realWorldDesc:      'Muestra secciones de "Aplicación en el mundo real" en los capítulos.',
      aboutSection:       'Acerca de',
      aboutTitle:         'MCP Academy: El Servidor Invisible',
      aboutDesc:          'Un juego educativo en el navegador que enseña conceptos de servidores MCP.',
    },

    achievements: {
      unlocked: 'Logro desbloqueado',
    },

    quiz: {
      quizTime:       '¡Es hora del quiz!',
      correct:        '✅ ¡Correcto!',
      incorrect:      '❌ No es correcto.',
      xpPop:          '+20 XP',
      perfect:        '¡Puntuación perfecta! ¡Increíble!',
      great:          '¡Buen trabajo!',
      keepPractising: '¡Sigue practicando — cada intento te enseña algo!',
      complete:       'Quiz completado',
      continue:       'Continuar →',
    },
  },

  // ──────────────────────────────────────────────────────────
  // DUTCH
  // ──────────────────────────────────────────────────────────
  nl: {
    lang: { en: 'EN', es: 'ES', nl: 'NL' },

    topbar: {
      title:    'MCP Academy',
      xp:       '{xp} XP',
      map:      'Wereldkaart',
      glossary: 'Woordenlijst',
      settings: 'Instellingen',
    },

    home: {
      eyebrow: 'MCP Academy',
      title:   'De Onzichtbare\nServer',
      subtitle:
        'Een magisch academie-avontuur waarbij je leert Python MCP-servers te bouwen, STDIO te begrijpen, tools te smeden en de geest van de onzichtbare server te herstellen.',
      badge1: '🌀 STDIO-stromen',
      badge2: '⚗️ Python-tools',
      badge3: '📡 Berichtenstroom',
      badge4: '⚡ UV-smidse',
      badge5: '🌀 Cliëntportaal',
      begin:       '🔮 Begin je reis',
      continue:    '⚔️ Reis vervolgen',
      progress: 'Voortgang: {completed}/6 hoofdstukken · {xp} XP verdiend',
      scrollHint: '5 hoofdstukken + Eindbaas',
    },

    map: {
      title:    '🗺️ Academie Wereldkaart',
      subtitle: 'Beheers elk hoofdstuk om de Onzichtbare Server te herstellen',
      progressLabel: '{completed} / {total} hoofdstukken voltooid',
      finalBossLabel: '⚔️ Eindbaas',
      achievementsTitle: 'Jouw prestaties',
    },

    card: {
      chapter:   'Hoofdstuk {id}',
      xp:        '{xp} XP',
      locked:    '🔒',
      lockedBoss:'Voltooi eerst alle 5 hoofdstukken',
      completed: 'VOLTOOID — De server is hersteld!',
    },

    chapter: {
      backToMap:      'Terug naar kaart',
      beginChallenge: 'Uitdaging beginnen →',
      seeInAction:    'Zie het in actie →',
      takeQuiz:       'Quiz doen →',
      nextChapter:    'Volgend hoofdstuk →',
      realCodeExample: '📜 Echt codevoorbeeld',
      terminalTitle:  '📟 Live terminalsimulatie',
      knowledgeCheck: '🎯 Kennischeck',
      realWorldTakeaway: '🌍 Toepassing in de praktijk',
      replay:         'Opnieuw afspelen',
      chapterComplete: '{title} voltooid!',
      serverRestored:  'De Onzichtbare Server is HERSTELD!',
      bossCompleteMsg: 'Je hebt elk concept in MCP Academy beheerst. De geest van de onzichtbare server is hersteld. Je bent een Onzichtbare Architect!',
      chapterCompleteMsg: 'Uitstekend werk! Je kennis groeit. De academie is een stap dichter bij herstel.',
      xpEarned:       '+{xp} XP verdiend',
      completeToast:  'Hoofdstuk voltooid!',
    },

    glossary: {
      title:       '📖 Academie Woordenlijst',
      subtitle:    'Elke term uit de MCP-wereld, uitgelegd in eenvoudige taal.',
      placeholder: 'Zoek termen…',
      noResults:   'Geen overeenkomende termen gevonden.',
    },

    settings: {
      title:       '⚙️ Instellingen',
      subtitle:    'Beheer je academie-ervaring.',
      languageSection:    'Taal',
      languageLabel:      'Speltaal',
      languageDesc:       'Wissel de taal van het spel.',
      progressSection:    'Voortgang',
      yourXP:             'Jouw XP',
      xpEarned:           '{xp} XP verdiend',
      chaptersCompleted:  'Voltooide hoofdstukken',
      chaptersOf:         '{completed} van 6',
      resetLabel:         'Alle voortgang resetten',
      resetDesc:          'Wist alle opgeslagen data, XP en prestaties.',
      resetBtn:           'Resetten ⚠️',
      resetConfirm:       'Weet je zeker dat je ALLE voortgang wilt resetten? Dit kan niet ongedaan worden gemaakt.',
      resetToastTitle:    'Voortgang gereset!',
      resetToastMsg:      'Opnieuw beginnen.',
      displaySection:     'Weergave',
      reducedMotionLabel: 'Verminderde beweging',
      reducedMotionDesc:  'Schakelt animaties en overgangen uit.',
      realWorldLabel:     'Toon praktijkpanelen',
      realWorldDesc:      'Toon secties "Toepassing in de praktijk" in hoofdstukken.',
      aboutSection:       'Over',
      aboutTitle:         'MCP Academy: De Onzichtbare Server',
      aboutDesc:          'Een educatief browserspel dat MCP-serverconcepten uitlegt.',
    },

    achievements: {
      unlocked: 'Prestatie ontgrendeld',
    },

    quiz: {
      quizTime:       'Quiztijd',
      correct:        '✅ Correct!',
      incorrect:      '❌ Niet helemaal.',
      xpPop:          '+20 XP',
      perfect:        'Perfecte score! Geweldig!',
      great:          'Goed gedaan!',
      keepPractising: 'Blijf oefenen — elke poging leert je iets!',
      complete:       'Quiz voltooid',
      continue:       'Doorgaan →',
    },
  },
};

// ─── Runtime state ────────────────────────────────────────────────────────────

const SUPPORTED = ['en', 'es', 'nl'];
let _lang = 'en';
const _subscribers = new Set();

/** Get the current language code */
export function getLang() { return _lang; }

/** Set a new language and notify subscribers */
export function setLang(code) {
  if (!SUPPORTED.includes(code)) return;
  _lang = code;
  // Persist in localStorage alongside game save
  try { localStorage.setItem('mcp_academy_lang', code); } catch (_) {}
  _subscribers.forEach(fn => fn(code));
}

/** Subscribe to language changes. Returns unsubscribe function. */
export function subscribeI18n(fn) {
  _subscribers.add(fn);
  return () => _subscribers.delete(fn);
}

/**
 * Returns the translation lookup function for the CURRENT language.
 *
 *   const t = getT();
 *   t('home.title')                     → string
 *   t('chapter.complete', {title:'X'})  → 'X Complete!'
 */
export function getT() {
  const dict = TRANSLATIONS[_lang] || TRANSLATIONS.en;
  return function t(key, vars = {}) {
    const parts = key.split('.');
    let value = dict;
    for (const p of parts) {
      if (value == null) break;
      value = value[p];
    }
    if (typeof value !== 'string') {
      // Fallback to English
      let fallback = TRANSLATIONS.en;
      for (const p of parts) {
        if (fallback == null) break;
        fallback = fallback[p];
      }
      value = typeof fallback === 'string' ? fallback : key;
    }
    // Interpolate {var} placeholders
    return value.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : `{${k}}`));
  };
}

/** Load persisted language from localStorage on startup */
export function initI18n() {
  try {
    const saved = localStorage.getItem('mcp_academy_lang');
    if (saved && SUPPORTED.includes(saved)) _lang = saved;
  } catch (_) {}
}
