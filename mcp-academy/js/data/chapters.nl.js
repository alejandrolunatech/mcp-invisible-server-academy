/**
 * chapters.nl.js — Dutch translations for all chapter content
 */

export const CHAPTERS_NL = [
  // ──────────────────────────────────────────────────────────
  // HOOFDSTUK 1 — De Stille Zaal
  // ──────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'De Stille Zaal',
    subtitle: 'STDIO begrijpen',
    description: 'De zaal is stil geworden. Drie oude berichtenpijpen zijn losgeraakt. Sluit ze opnieuw aan om de stroom te herstellen.',

    dialogue: [
      {
        char: 'syn', name: 'Rector Syn', role: 'Architect van de Academie', emoji: '🧙',
        text: 'Welkom, leerling. Er is iets ergs misgegaan in de Stille Zaal. De serverspirit die hier woont… is onzichtbaar geworden — zelfs voor ons.',
      },
      {
        char: 'piper', name: 'Piper', role: 'Pijpingenieur', emoji: '🔧',
        text: 'Ik ken het probleem! Elke MCP-server communiceert via drie stromen. Het zijn als pijpen — STDIN brengt berichten NAAR BINNEN, STDOUT brengt antwoorden NAAR BUITEN, en STDERR brengt waarschuwingsrook.',
      },
      {
        char: 'piper', name: 'Piper', role: 'Pijpingenieur', emoji: '🔧',
        text: 'Op dit moment zijn die pijpen losgekoppeld. Berichten van de cliënt komen nergens aan. Daarom voelt de server onzichtbaar aan — hij bestaat, maar kan niet gehoord of bereikt worden.',
      },
      {
        char: 'syn', name: 'Rector Syn', role: 'Architect van de Academie', emoji: '🧙',
        text: 'Jouw taak: sluit elke stroom opnieuw aan op het juiste doel. Doe het goed en we zullen de eerste echte berichten door de tunnel zien stromen.',
      },
    ],

    puzzle: {
      type: 'matching',
      title: 'De berichtenpijpen herverbinden',
      instructions: 'Klik op een stroomnaam links, dan op de juiste beschrijving rechts om ze te verbinden.',
      leftItems: [
        { id: 'stdin',  label: 'STDIN',  icon: '📥', color: '#00d4ff' },
        { id: 'stdout', label: 'STDOUT', icon: '📤', color: '#10b981' },
        { id: 'stderr', label: 'STDERR', icon: '💨', color: '#f59e0b' },
      ],
      rightItems: [
        { id: 'desc_stdin',  label: 'Inkomende berichten van de cliënt komen hier binnen' },
        { id: 'desc_stdout', label: 'Normale antwoorden van de server stromen hier uit' },
        { id: 'desc_stderr', label: 'Waarschuwingsrook — debuglogs, geen deel van het protocol' },
      ],
      matches: { stdin: 'desc_stdin', stdout: 'desc_stdout', stderr: 'desc_stderr' },
      successMsg: '✅ De pijpen gloeien! Berichten kunnen nu door de kamer stromen.',
      failureHint: 'Probeer opnieuw — denk na over wat de server INGAAT versus wat UITGAAT.',
    },

    terminal: {
      title: 'MCP STDIO — Berichtenstroom',
      steps: [
        { type: 'muted',    text: '# Cliënt verbindt met MCP-server via STDIO' },
        { type: 'muted',    text: '# Serverproces start, leest van STDIN' },
        { type: 'prompt',   text: '{"jsonrpc":"2.0","method":"tools/list","id":1}' },
        { type: 'muted',    text: '# → Bericht reist via STDIN naar de server' },
        { type: 'muted',    text: '# Server verwerkt het verzoek...' },
        { type: 'response', text: '{"jsonrpc":"2.0","id":1,"result":{"tools":[{"name":"add","description":"Tel twee getallen op"}]}}' },
        { type: 'muted',    text: '# ← Antwoord reist via STDOUT terug naar cliënt' },
        { type: 'warning',  text: '[STDERR] Server succesvol gestart op stdio-transport' },
        { type: 'muted',    text: '# ↑ Waarschuwingsrook — STDERR toont logs, NIET naar cliënt gestuurd' },
        { type: 'success',  text: '# De server is niet langer onzichtbaar. Zijn gedrag is zichtbaar via berichten!' },
      ],
    },

    quiz: [
      {
        q: 'Wat transporteert STDIN in een MCP-serveropstelling?',
        options: [
          'Antwoorden die terugaan naar de cliënt',
          'Inkomende berichten van de cliënt',
          'Foutlogs en debuguitvoer',
          'Toolregistratiegegevens',
        ],
        correct: 1,
        explanation: 'STDIN (Standaardinvoer) is de stroom waar inkomende berichten van de MCP-cliënt de server BINNENKOMEN. Zie het als de pijp die de wizardkamer INGAAT.',
      },
      {
        q: 'Waarom voelt een MCP-server "onzichtbaar" aan voor beginners?',
        options: [
          'Hij draait op een externe cloudserver',
          'Hij gebruikt een grafische gebruikersinterface',
          'Hij communiceert stil via STDIO-stromen, niet via een zichtbaar venster',
          'Hij werkt alleen \'s nachts',
        ],
        correct: 2,
        explanation: 'MCP-servers communiceren via STDIN/STDOUT — er is geen browservenster of zichtbare UI. Ze voelen onzichtbaar aan omdat ze rustig leven in een terminalproces en gestructureerde berichten uitwisselen.',
      },
      {
        q: 'Waarvoor wordt STDERR gebruikt in een MCP-server?',
        options: [
          'Toolresultaten naar de cliënt sturen',
          'Cliëntverzoeken ontvangen',
          'Debuglogs en waarschuwingsberichten — geen deel van het MCP-protocol',
          'Tooldefinities opslaan',
        ],
        correct: 2,
        explanation: 'STDERR is de "waarschuwingsrook" — het is voor ontwikkelaarsgerichte logs, fouten en debuguitvoer. MCP-cliënten lezen STDERR NIET als deel van de protocolstroom.',
      },
    ],

    completionDialogue: [
      {
        char: 'piper', name: 'Piper', role: 'Pijpingenieur', emoji: '🔧',
        text: 'Kijk — de pijpen gloeien! Berichten stromen weer. De server was er altijd. We konden hem alleen niet horen omdat de pijpen losgekoppeld waren.',
      },
      {
        char: 'syn', name: 'Rector Syn', role: 'Architect van de Academie', emoji: '🧙',
        text: 'Onthoud dit: "De server is onzichtbaar, maar zijn gedrag wordt zichtbaar door berichten." Naar de Smederij!',
      },
    ],

    realWorldTakeaway: 'In een echte Python MCP-server met STDIO-transport leest jouw serverproces JSON-RPC-berichten van sys.stdin en schrijft antwoorden naar sys.stdout. Logs en debuginformatie gaan naar sys.stderr. Wanneer je `uv run server.py` uitvoert, verbindt de cliënt met precies die stromen.',
  },

  // ──────────────────────────────────────────────────────────
  // HOOFDSTUK 2 — De Toverspreuksmidse
  // ──────────────────────────────────────────────────────────
  {
    id: 2,
    title: 'De Toverspreuksmidse',
    subtitle: 'Python-functies als MCP-tools',
    description: 'Gewone Python-functies wachten in de smidse. Breng het registratiemerk aan om ze tot vindbare MCP-tools te maken.',

    dialogue: [
      {
        char: 'hexa', name: 'Hexa', role: 'Mentor van de Toverspreuksmidse', emoji: '⚗️',
        text: 'Welkom in de Toverspreuksmidse! Elke krachtige MCP-server begint met hetzelfde geheim: tools zijn gewoon Python-functies met een deur.',
      },
      {
        char: 'hexa', name: 'Hexa', role: 'Mentor van de Toverspreuksmidse', emoji: '⚗️',
        text: 'Je schrijft een gewone Python-functie — zeg `def add(a, b): return a + b`. Volkomen gewoon. Maar zodra je het magische merk `@mcp.tool()` bovenaan zet… wordt het vindbaar. De cliënt kan het vinden, aanroepen, resultaten krijgen.',
      },
      {
        char: 'hexa', name: 'Hexa', role: 'Mentor van de Toverspreuksmidse', emoji: '⚗️',
        text: 'Jouw uitdaging: koppel elke rekenmachinetoverspreuk aan zijn Python-functie en registreer ze als tools. Vier spreuken. Vier functies. Laten we smeden!',
      },
    ],

    puzzle: {
      type: 'matching',
      title: 'De rekenmachinetoverspeuken smeden',
      instructions: 'Klik op een spreukkaart links, dan op de bijbehorende Python-functie rechts om de verbinding te smeden.',
      leftItems: [
        { id: 'spell_add',      label: 'optelling spreuk',       icon: '➕', color: '#10b981' },
        { id: 'spell_subtract', label: 'aftrekking spreuk',      icon: '➖', color: '#ef4444' },
        { id: 'spell_multiply', label: 'vermenigvuldiging spreuk', icon: '✖️', color: '#a855f7' },
        { id: 'spell_divide',   label: 'deling spreuk',          icon: '➗', color: '#f59e0b' },
      ],
      rightItems: [
        { id: 'fn_add',      label: 'def add(a, b): return a + b' },
        { id: 'fn_subtract', label: 'def subtract(a, b): return a - b' },
        { id: 'fn_multiply', label: 'def multiply(a, b): return a * b' },
        { id: 'fn_divide',   label: 'def divide(a, b): return a / b' },
      ],
      matches: { spell_add: 'fn_add', spell_subtract: 'fn_subtract', spell_multiply: 'fn_multiply', spell_divide: 'fn_divide' },
      successMsg: '✅ Vonken vliegen! Alle vier spreuken zijn gesmeed en geregistreerd als MCP-tools.',
      failureHint: 'Koppel elke spreukennaam aan zijn bewerking — optelling bij +, aftrekking bij -, enz.',
    },

    codeExample: {
      lang: 'Python',
      title: 'Rekenmachine MCP-server',
      rawCode: `from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Rekenmachine")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Tel twee getallen op"""
    return a + b

@mcp.tool()
def subtract(a: int, b: int) -> int:
    """Trek b af van a"""
    return a - b

@mcp.tool()
def multiply(a: int, b: int) -> int:
    """Vermenigvuldig twee getallen"""
    return a * b

@mcp.tool()
def divide(a: float, b: float) -> float:
    """Deel a door b"""
    if b == 0:
        raise ValueError("Kan niet delen door nul!")
    return a / b

if __name__ == "__main__":
    mcp.run(transport="stdio")`,
      explanation: 'De @mcp.tool()-decorator is het magische merk — het vertelt FastMCP om deze functie te registreren als een vindbare, aanroepbare tool. De docstring wordt de beschrijving van de tool. Typehints worden het parameterschema.',
    },

    terminal: {
      title: 'Tool-ontdekking — tools/list',
      steps: [
        { type: 'muted',    text: '# Cliënt vraagt: "Welke spreuken ken jij?"' },
        { type: 'prompt',   text: '{"jsonrpc":"2.0","method":"tools/list","id":1}' },
        { type: 'muted',    text: '# Server antwoordt met alle geregistreerde tools' },
        { type: 'response', text: '{"jsonrpc":"2.0","id":1,"result":{"tools":[' },
        { type: 'response', text: '  {"name":"add","description":"Tel twee getallen op","inputSchema":{...}},' },
        { type: 'response', text: '  {"name":"subtract","description":"Trek b af van a","inputSchema":{...}},' },
        { type: 'response', text: '  {"name":"multiply","description":"Vermenigvuldig twee getallen","inputSchema":{...}},' },
        { type: 'response', text: '  {"name":"divide","description":"Deel a door b","inputSchema":{...}}' },
        { type: 'response', text: ']}}' },
        { type: 'success',  text: '# Tools zijn gewoon functies met een deur — nu weet de cliënt dat ze bestaan!' },
      ],
    },

    quiz: [
      {
        q: 'Wat doet de `@mcp.tool()`-decorator met een Python-functie?',
        options: [
          'Het voert de functie onmiddellijk uit',
          'Het registreert de functie als een vindbare MCP-tool',
          'Het maakt de functie sneller',
          'Het converteert Python-code naar JavaScript',
        ],
        correct: 1,
        explanation: '`@mcp.tool()` is het "spreukregistratiemerk" — het vertelt de MCP-server om deze functie bloot te stellen als een aanroepbare tool die cliënten kunnen ontdekken via tools/list.',
      },
      {
        q: 'In de MCP-metafoor, wat zijn tools?',
        options: [
          'Databasetabellen',
          'Netwerksockets',
          'Python-functies met een deur — spreuken die de tovenaar kan gebruiken',
          'HTML-sjablonen',
        ],
        correct: 2,
        explanation: 'Tools = spreuken. Een tool is gewoon een Python-functie die gedecoreerd is om vindbaar en aanroepbaar te zijn door MCP-cliënten. De docstring van de functie wordt zijn beschrijving en typehints definiëren het invoerschema.',
      },
      {
        q: 'Wat gebeurt er als je `divide(10, 0)` aanroept zonder foutafhandeling?',
        options: [
          'Het geeft 0 terug',
          'Het geeft None terug',
          'Het gooit een ZeroDivisionError die de server netjes moet afhandelen',
          'Het geeft stil oneindig terug',
        ],
        correct: 2,
        explanation: 'Zonder de `if b == 0: raise ValueError(...)`-bewaker gooit Python een ZeroDivisionError. Een goed gebouwde MCP-tool handelt randgevallen af en geeft betekenisvolle fouten terug aan de cliënt.',
      },
    ],

    completionDialogue: [
      {
        char: 'hexa', name: 'Hexa', role: 'Mentor van de Toverspreuksmidse', emoji: '⚗️',
        text: 'Schitterend! Vier functies, vier spreuken, allemaal gesmeden en geregistreerd! Onthoud — tools zijn gewoon functies met een deur. De decorator is de sleutel.',
      },
    ],

    realWorldTakeaway: 'In een echte FastMCP-server wordt elke functie met `@mcp.tool()` gedecoreerd een aanroepbare tool. Wanneer je jouw lokale MCP-UI opent en "add", "subtract", "multiply", "divide" ziet staan — dat ZIJN jouw Python-functies, blootgesteld via het protocol.',
  },

  // ──────────────────────────────────────────────────────────
  // HOOFDSTUK 3 — De Berichtentunnel
  // ──────────────────────────────────────────────────────────
  {
    id: 3,
    title: 'De Berichtentunnel',
    subtitle: 'Verzoek- en antwoordstroom',
    description: 'Berichten reizen in paren door de tunnel — elk verzoek heeft het juiste antwoord nodig. Leer ze te koppelen.',

    dialogue: [
      {
        char: 'tunnelfox', name: 'Tunnelvos', role: 'Snelle Boodschapper', emoji: '🦊',
        text: 'Ik breng berichten met bliksemsnelheid door de tunnel! Maar de laatste tijd… raken de verzoek-antwoordparen door elkaar. Chaos!',
      },
      {
        char: 'tunnelfox', name: 'Tunnelvos', role: 'Snelle Boodschapper', emoji: '🦊',
        text: 'Elke MCP-uitwisseling werkt hetzelfde: de cliënt stuurt een VERZOEK met een methode en een id. De server moet een ANTWOORD terugsturen met hetzelfde id en het resultaat.',
      },
      {
        char: 'tunnelfox', name: 'Tunnelvos', role: 'Snelle Boodschapper', emoji: '🦊',
        text: 'Koppel elk verzoek aan het juiste antwoord. Doe het goed en de tunnel stroomt weer vrij!',
      },
    ],

    puzzle: {
      type: 'matching',
      title: 'De berichtenparen routeren',
      instructions: 'Klik op een VERZOEK links, dan op het bijbehorende ANTWOORD rechts.',
      leftItems: [
        { id: 'req1', label: 'tools/list (vragen welke tools bestaan)', icon: '📋' },
        { id: 'req2', label: 'Roep add(5, 3) aan', icon: '➕' },
        { id: 'req3', label: 'Roep divide(10, 0) aan', icon: '⚠️' },
      ],
      rightItems: [
        { id: 'res1', label: 'Lijst van alle geregistreerde tools met namen en schema\'s' },
        { id: 'res2', label: 'Resultaat: 8' },
        { id: 'res3', label: 'Fout: Kan niet delen door nul!' },
      ],
      matches: { req1: 'res1', req2: 'res2', req3: 'res3' },
      successMsg: '✅ De tunnel zoemt met perfect gekoppelde berichtenparen!',
      failureHint: 'Koppel elke cliëntactie aan wat de server van nature zou terugsturen.',
    },

    terminal: {
      title: 'Volledige berichtentunnel — Verzoek / Antwoord',
      steps: [
        { type: 'muted',    text: '# Stap 1: Cliënt ontdekt beschikbare tools' },
        { type: 'prompt',   text: '→ {"jsonrpc":"2.0","method":"tools/list","id":1}' },
        { type: 'response', text: '← {"jsonrpc":"2.0","id":1,"result":{"tools":[{"name":"add",...},{"name":"divide",...}]}}' },
        { type: 'muted',    text: '' },
        { type: 'muted',    text: '# Stap 2: Cliënt roept de "add"-tool aan' },
        { type: 'prompt',   text: '→ {"jsonrpc":"2.0","method":"tools/call","id":2,"params":{"name":"add","arguments":{"a":5,"b":3}}}' },
        { type: 'response', text: '← {"jsonrpc":"2.0","id":2,"result":{"content":[{"type":"text","text":"8"}]}}' },
        { type: 'muted',    text: '' },
        { type: 'muted',    text: '# Stap 3: Cliënt roept divide aan met nul (foutgeval)' },
        { type: 'prompt',   text: '→ {"jsonrpc":"2.0","method":"tools/call","id":3,"params":{"name":"divide","arguments":{"a":10,"b":0}}}' },
        { type: 'error',    text: '← {"jsonrpc":"2.0","id":3,"error":{"code":-32603,"message":"Kan niet delen door nul!"}}' },
        { type: 'muted',    text: '# Elk verzoek heeft een bijpassend antwoord. Het id koppelt ze.' },
      ],
    },

    quiz: [
      {
        q: 'Wat doet het veld `id` in een MCP JSON-RPC-bericht?',
        options: [
          'Het identificeert met welke server verbinding gemaakt moet worden',
          'Het koppelt een verzoek aan het bijbehorende antwoord',
          'Het stelt de prioriteit van het bericht in',
          'Het is het sessietoken',
        ],
        correct: 1,
        explanation: 'Het veld `id` in JSON-RPC koppelt een verzoek aan zijn antwoord. Wanneer de server antwoordt, gebruikt het hetzelfde `id` zodat de cliënt weet welk verzoek beantwoord is.',
      },
      {
        q: 'Hoe ontdekt een cliënt welke tools een MCP-server heeft?',
        options: [
          'Door de Python-broncode van de server te lezen',
          'Door een tools/list-verzoek te sturen',
          'Door te raden op basis van de servernaam',
          'Tools kunnen niet worden ontdekt — ze moeten hardgecodeerd worden',
        ],
        correct: 1,
        explanation: 'De cliënt stuurt een `tools/list`-verzoek. De server antwoordt met een lijst van alle geregistreerde tools, inclusief hun namen, beschrijvingen en invoerschema\'s.',
      },
      {
        q: 'Wat geeft de server terug wanneer `tools/call` slaagt?',
        options: [
          'Niets — het print alleen het resultaat naar de terminal',
          'Een JSON-RPC-antwoord met een veld `result` dat de tooluitvoer bevat',
          'Een ruwe Python-waarde',
          'Een nieuwe Python-functie',
        ],
        correct: 1,
        explanation: 'Bij succes geeft de server een JSON-RPC-antwoord terug met een veld `result` dat de uitvoer van de tool bevat. Bij mislukking geeft het in plaats daarvan een veld `error` terug.',
      },
    ],

    completionDialogue: [
      {
        char: 'tunnelfox', name: 'Tunnelvos', role: 'Snelle Boodschapper', emoji: '🦊',
        text: 'Perfect! Elk verzoek heeft nu zijn bijpassende antwoord! De tunnel zoemt weer. Onthoud: elk bericht dat binnenkomt heeft een bericht dat buitengaat, en het id verbindt ze.',
      },
    ],

    realWorldTakeaway: 'Wanneer je jouw lokale MCP-UI opent en klikt op "Tools weergeven" dan "add(5, 3) uitvoeren", stuur je precies deze JSON-RPC-berichten. De server ontvangt ze op STDIN en stuurt antwoorden terug via STDOUT.',
  },

  // ──────────────────────────────────────────────────────────
  // HOOFDSTUK 4 — De UV-snelheidsmidse
  // ──────────────────────────────────────────────────────────
  {
    id: 4,
    title: 'De UV-snelheidsmidse',
    subtitle: 'Snelle Python-setup met UV',
    description: 'Twee smidsen branden naast elkaar — één oud en traag, één snel en schoon. Kies het UV-pad en stel de setupstroom samen.',

    dialogue: [
      {
        char: 'uvsprite', name: 'Smidse-elf UV', role: 'Energieke Bouwer', emoji: '⚡',
        text: 'ZOOM! Hallo! Ik ben UV — de snelheidsmidse. Voordat ik er was, betekende het opzetten van Python-projecten vechten met pip, venv en lange installatiewachttijden. Niet meer!',
      },
      {
        char: 'uvsprite', name: 'Smidse-elf UV', role: 'Energieke Bouwer', emoji: '⚡',
        text: 'UV is een supersnelle Python-pakketbeheerder en projectuitvoerder. Het beheert je virtuele omgeving, afhankelijkheden EN uitvoering — allemaal met eenvoudige opdrachten.',
      },
      {
        char: 'uvsprite', name: 'Smidse-elf UV', role: 'Energieke Bouwer', emoji: '⚡',
        text: 'Jouw missie: zet de UV-setupstappen in de juiste volgorde. Sleep ze op hun plaats!',
      },
    ],

    puzzle: {
      type: 'ordering',
      title: 'De UV-setupstroom samenstellen',
      instructions: 'Sleep de setupstappen in de juiste volgorde. Wat doe je eerst, tweede, derde en als laatste?',
      items: [
        { id: 'step_install', label: '1. Installeer UV op je machine',                   icon: '📥', correctPos: 0 },
        { id: 'step_init',    label: '2. Maak een nieuw project: uv init mijn-server',   icon: '📁', correctPos: 1 },
        { id: 'step_add',     label: '3. Voeg MCP-afhankelijkheid toe: uv add mcp',      icon: '➕', correctPos: 2 },
        { id: 'step_run',     label: '4. Voer je server uit: uv run server.py',          icon: '🚀', correctPos: 3 },
      ],
      successMsg: '⚡ Snelheidsboost! De UV-smidse draait op volle toeren!',
      failureHint: 'Denk aan de logische volgorde: je moet UV installeren voordat je het gebruikt, en pakketten toevoegen voordat je je code uitvoert.',
    },

    codeExample: {
      lang: 'Shell',
      rawCode: `# Installeer UV (één keer per machine)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Maak een nieuw MCP-serverproject aan
uv init mijn-rekenmachine-server
cd mijn-rekenmachine-server

# Voeg MCP toe als afhankelijkheid
uv add mcp

# Voer je server uit
uv run server.py

# Of voer uit met de MCP CLI voor ontwikkeling
uv run mcp dev server.py`,
      explanation: 'UV maakt automatisch een virtuele omgeving aan en beheert die voor je project. Geen handmatig "python -m venv .venv && source .venv/bin/activate" nodig. UV doet het allemaal.',
    },

    terminal: {
      title: 'UV vs. Oude manier — Snelheidsvergelijking',
      steps: [
        { type: 'error',   text: '# ❌ OUDE MANIER (traag, handmatig)' },
        { type: 'error',   text: 'python3 -m venv .venv' },
        { type: 'error',   text: 'source .venv/bin/activate' },
        { type: 'error',   text: 'pip install mcp  # duurt 30+ seconden...' },
        { type: 'error',   text: 'python server.py' },
        { type: 'muted',   text: '' },
        { type: 'success', text: '# ✅ UV-MANIER (snel, automatisch)' },
        { type: 'success', text: 'uv init mijn-server' },
        { type: 'success', text: 'uv add mcp        # < 2 seconden' },
        { type: 'success', text: 'uv run server.py  # beheert omgeving automatisch' },
        { type: 'muted',   text: '' },
        { type: 'info',    text: '# UV is als een snelle, schone smidse voor Python-werk.' },
        { type: 'info',    text: '# Één tool. Één opdracht. Geen omgevingsdrama.' },
      ],
    },

    quiz: [
      {
        q: 'Wat doet `uv add mcp`?',
        options: [
          'Installeert UV zelf',
          'Maakt een nieuwe projectmap aan',
          'Voegt het MCP-pakket toe als afhankelijkheid en installeert het',
          'Voert de MCP-server uit',
        ],
        correct: 2,
        explanation: '`uv add mcp` voegt het MCP-pakket toe aan de afhankelijkheden van je project EN installeert het — allemaal in één snelle opdracht. UV beheert de virtuele omgeving automatisch op de achtergrond.',
      },
      {
        q: 'Wat doet `uv run server.py` anders dan `python server.py`?',
        options: [
          'Niets — ze zijn identiek',
          'Het voert server.py automatisch uit in de beheerde virtuele omgeving van het project',
          'Het converteert Python eerst naar JavaScript',
          'Het werkt alleen op Linux',
        ],
        correct: 1,
        explanation: '`uv run` gebruikt automatisch de beheerde virtuele omgeving van het project, zodat je de juiste Python-versie en alle juiste pakketten krijgt — zonder handmatig een omgeving te activeren.',
      },
      {
        q: 'In de academiemetafoor, wat is UV?',
        options: [
          'Een type STDIO-stroom',
          'Een Python-webframework',
          'De snelheidsmidse — een snel, schoon bouwapparaat voor Python-projecten',
          'Een JSON-parserbibliotheek',
        ],
        correct: 2,
        explanation: 'UV is de "snelheidsmidse" — het versnelt Python-omgevingsopstelling, installatie van afhankelijkheden en projectuitvoering drastisch. Het vervangt de trage, handmatige workflow van pip + venv.',
      },
    ],

    completionDialogue: [
      {
        char: 'uvsprite', name: 'Smidse-elf UV', role: 'Energieke Bouwer', emoji: '⚡',
        text: 'ZOOM! Perfecte volgorde! Vier stappen, bliksemsnelheid. Geen omgevingsdrama. Gewoon schone, snelle setup. Dat is de UV-manier!',
      },
    ],

    realWorldTakeaway: 'Wanneer je een echte MCP-server bouwt, zijn `uv init`, `uv add` en `uv run` de drie opdrachten die je het meest zult gebruiken. UV beheert de virtuele omgeving, de afhankelijkheden en de uitvoering — allemaal automatisch.',
  },

  // ──────────────────────────────────────────────────────────
  // HOOFDSTUK 5 — Het Cliëntportaal
  // ──────────────────────────────────────────────────────────
  {
    id: 5,
    title: 'Het Cliëntportaal',
    subtitle: 'Tools verkennen vanuit de cliëntkant',
    description: 'Het portaal is actief! Stap in het perspectief van de cliënt en verken, roep aan en ontdek je tools.',

    dialogue: [
      {
        char: 'portalowl', name: 'Portaaluil', role: 'Cliëntzijgids', emoji: '🦉',
        text: 'Oehoe! Welkom in het Cliëntportaal! Dit is waar de cliëntzijde leeft — de plek die vragen stelt, tools ontdekt en ze aanroept.',
      },
      {
        char: 'portalowl', name: 'Portaaluil', role: 'Cliëntzijgids', emoji: '🦉',
        text: 'Wanneer je een lokale MCP-UI opent — zoals Claude Desktop of MCP Inspector — en die verbindt met je server, DIT is wat het doet. Het verbindt, vraagt naar tools en laat je ze uitvoeren.',
      },
      {
        char: 'portalowl', name: 'Portaaluil', role: 'Cliëntzijgids', emoji: '🦉',
        text: 'Stap door het portaal! Verbind, verken de tools, voer add en divide uit — activeer zelfs de delen-door-nul-fout. Kijk hoe het systeem ermee omgaat.',
      },
    ],

    puzzle: {
      type: 'simulation',
      title: 'Cliëntportaalsimulatie',
      instructions: 'Volg de stappen om de volledige cliënt-serverinteractie te ervaren. Klik op elke knop op volgorde.',
      steps: [
        {
          id: 'connect',
          label: '🔌 Verbinden met server',
          terminalOutput: [
            { type: 'info',    text: 'Verbinden met Rekenmachine MCP-server via stdio...' },
            { type: 'success', text: '✅ Verbonden! Server is gereed.' },
            { type: 'muted',   text: 'Protocol: stdio | Versie: MCP 1.0' },
          ],
        },
        {
          id: 'list_tools',
          label: '📋 Tools inspecteren',
          terminalOutput: [
            { type: 'muted',    text: '# tools/list-verzoek sturen...' },
            { type: 'prompt',   text: '→ {"method":"tools/list","id":1}' },
            { type: 'response', text: '← {"result":{"tools":["add","subtract","multiply","divide"]}}' },
            { type: 'success',  text: '✅ 4 tools ontdekt: add, subtract, multiply, divide' },
          ],
        },
        {
          id: 'run_add',
          label: '➕ Voer add(15, 27) uit',
          terminalOutput: [
            { type: 'muted',    text: '# add-tool aanroepen...' },
            { type: 'prompt',   text: '→ {"method":"tools/call","params":{"name":"add","arguments":{"a":15,"b":27}}}' },
            { type: 'response', text: '← {"result":{"content":[{"type":"text","text":"42"}]}}' },
            { type: 'success',  text: '✅ Resultaat: 42 🎉' },
          ],
        },
        {
          id: 'run_divide',
          label: '➗ Voer divide(100, 4) uit',
          terminalOutput: [
            { type: 'muted',    text: '# divide-tool aanroepen...' },
            { type: 'prompt',   text: '→ {"method":"tools/call","params":{"name":"divide","arguments":{"a":100,"b":4}}}' },
            { type: 'response', text: '← {"result":{"content":[{"type":"text","text":"25.0"}]}}' },
            { type: 'success',  text: '✅ Resultaat: 25.0' },
          ],
        },
        {
          id: 'run_div_zero',
          label: '⚠️ Voer divide(10, 0) uit — fout!',
          terminalOutput: [
            { type: 'muted',    text: '# divide aanroepen met nul...' },
            { type: 'prompt',   text: '→ {"method":"tools/call","params":{"name":"divide","arguments":{"a":10,"b":0}}}' },
            { type: 'error',    text: '← {"error":{"code":-32603,"message":"Kan niet delen door nul!"}}' },
            { type: 'warning',  text: '⚠️  Fout netjes afgehandeld — server blijft actief!' },
            { type: 'muted',    text: '# Dit is verwacht gedrag. Een goede server handelt fouten schoon af.' },
          ],
        },
      ],
      successMsg: '🌀 Portaal beheerst! Je hebt de volledige cliënt-serverlus ervaren.',
    },

    terminal: {
      title: 'Volledige cliëntportaalsessie',
      steps: [
        { type: 'info',    text: '# Samenvatting van de volledige cliëntportaalsessie' },
        { type: 'success', text: '1. Verbonden via stdio ✅' },
        { type: 'success', text: '2. 4 tools ontdekt via tools/list ✅' },
        { type: 'success', text: '3. add(15, 27) aangeroepen → 42 ✅' },
        { type: 'success', text: '4. divide(100, 4) aangeroepen → 25.0 ✅' },
        { type: 'warning', text: '5. divide(10, 0) aangeroepen → Fout (verwacht, afgehandeld) ✅' },
        { type: 'muted',   text: '' },
        { type: 'info',    text: '# De server is onzichtbaar — maar zijn gedrag is volledig zichtbaar via berichten!' },
      ],
    },

    quiz: [
      {
        q: 'Wat doet een MCP-cliënt als eerste wanneer het verbinding maakt met een server?',
        options: [
          'Roept onmiddellijk een tool aan',
          'Downloadt de broncode van de server',
          'Stuurt tools/list om te ontdekken welke tools beschikbaar zijn',
          'Vraagt de gebruiker een opdracht te typen',
        ],
        correct: 2,
        explanation: 'Het eerste dat elke MCP-cliënt doet is `tools/list` sturen om de mogelijkheden van de server te ontdekken. Het is als vragen "welke spreuken ken je?" voordat je iets aanroept.',
      },
      {
        q: 'Wat gebeurt er wanneer een cliënt een tool aanroept die een fout veroorzaakt?',
        options: [
          'De hele server crasht',
          'De cliënt verbreekt permanent de verbinding',
          'De server geeft een JSON-RPC-foutantwoord terug en blijft draaien',
          'De fout wordt stil genegeerd',
        ],
        correct: 2,
        explanation: 'Een goed gebouwde MCP-server handelt fouten netjes af — het geeft een JSON-RPC-foutantwoord terug met een bericht, maar blijft actief en klaar voor het volgende verzoek.',
      },
      {
        q: 'Wat is in de echte wereld een "MCP-cliënt"?',
        options: [
          'Alleen Claude Desktop',
          'Elke applicatie of elk AI-model dat verbinding maakt met een MCP-server om zijn tools te gebruiken',
          'Alleen een Python-bibliotheek',
          'Een clouddienst',
        ],
        correct: 1,
        explanation: 'Een MCP-cliënt is ELKE applicatie die het MCP-protocol spreekt — Claude Desktop, MCP Inspector, aangepaste scripts, AI-agenten. Het protocol is open, dus elke cliënt die JSON-RPC kent kan verbinding maken.',
      },
    ],

    completionDialogue: [
      {
        char: 'portalowl', name: 'Portaaluil', role: 'Cliëntzijgids', emoji: '🦉',
        text: 'Oehoe oehoe! Je hebt het gedaan! Je verbond, verkende, riep tools aan en handelde zelfs een fout af! Dat is de volledige cliënt-serverlus. Nog één uitdaging wacht — de Eindbaas!',
      },
    ],

    realWorldTakeaway: 'Wanneer je MCP Inspector of Claude Desktop opent en het verbindt met je draaiende `uv run server.py`, ben jij de Portaaluil. Je verbindt, toont tools, voert ze uit en ziet resultaten — allemaal via de onzichtbare STDIO-tunnel.',
  },

  // ──────────────────────────────────────────────────────────
  // HOOFDSTUK 6 — Eindbaas: De Onzichtbare Server herstellen
  // ──────────────────────────────────────────────────────────
  {
    id: 6,
    title: 'De Onzichtbare Server herstellen',
    subtitle: 'De Eindbaas',
    description: 'De Onzichtbare Server van de academie is op 5 manieren kapot. Gebruik alles wat je hebt geleerd om hem te diagnosticeren en te repareren.',
    isFinalBoss: true,

    dialogue: [
      {
        char: 'syn', name: 'Rector Syn', role: 'Architect van de Academie', emoji: '🧙',
        text: 'Leerling! De grote Onzichtbare Server in het hart van de academie is uitgevallen. Vijf problemen, allemaal tegelijk. Ik heb jouw gecombineerde kennis nodig om ze op te lossen.',
      },
      {
        char: 'syn', name: 'Rector Syn', role: 'Architect van de Academie', emoji: '🧙',
        text: 'Je hebt STDIO, tools, berichtenstroom, UV en het cliëntportaal geleerd. Pas nu alles toe om deze gebroken architectuur te diagnosticeren en te repareren.',
      },
      {
        char: 'syn', name: 'Rector Syn', role: 'Architect van de Academie', emoji: '🧙',
        text: 'Vijf gebroken componenten. Vijf reparaties. Begin.',
      },
    ],

    puzzle: {
      type: 'diagnosis',
      title: 'De gebroken server diagnosticeren',
      instructions: 'Vijf componenten zijn kapot. Lees elk probleem en klik op de juiste oplossing.',
      problems: [
        {
          id: 'prob1', icon: '🌀',
          symptom: 'De server start maar de cliënt ontvangt geen antwoorden. Berichten lijken te verdwijnen.',
          options: [
            'Wissel STDOUT- en STDIN-verbindingen om — ze zijn omgekeerd',
            'Start de server twee keer opnieuw',
            'Voeg meer Python-functies toe',
          ],
          correct: 0,
          explanation: 'Wanneer STDIN en STDOUT omgekeerd zijn, stromen berichten in de verkeerde richting. De cliënt stuurt naar wat STDOUT zou moeten zijn en de server leest van wat STDIN zou moeten zijn — niets verbindt.',
        },
        {
          id: 'prob2', icon: '⚗️',
          symptom: 'De cliënt voert tools/list uit en krijgt een lege lijst — er worden geen tools gevonden.',
          options: [
            'Voeg meer print-instructies toe',
            'Voeg de @mcp.tool()-decorator toe aan alle Python-functies',
            'Verwijder de server en begin opnieuw',
          ],
          correct: 1,
          explanation: 'Zonder `@mcp.tool()` bestaan Python-functies maar zijn ze NIET geregistreerd bij MCP. Ze zijn onzichtbaar voor het protocol. Het toevoegen van de decorator is wat "ze een deur geeft".',
        },
        {
          id: 'prob3', icon: '📡',
          symptom: 'Tool-aanroepen geven resultaten terug met het verkeerde id — de cliënt raakt in de war over welk resultaat bij welk verzoek hoort.',
          options: [
            'Gebruik een willekeurig id in elk antwoord',
            'Negeer het id-veld — het is optioneel',
            'Zorg ervoor dat elk antwoord hetzelfde id gebruikt als zijn verzoek',
          ],
          correct: 2,
          explanation: 'Het id-veld in JSON-RPC is hoe verzoeken en antwoorden worden gekoppeld. Als een antwoord het verkeerde id gebruikt, kan de cliënt niet weten welk verzoek beantwoord is. Het id moet altijd overeenkomen.',
        },
        {
          id: 'prob4', icon: '⚡',
          symptom: 'Setup duurt 5 minuten en mislukt vanwege conflicterende Python-pakketten.',
          options: [
            'Gebruik uv init + uv add om een schone, geïsoleerde omgeving in te stellen',
            'Installeer alles globaal met sudo pip',
            'Gebruik een oudere versie van Python',
          ],
          correct: 0,
          explanation: 'UV maakt een geïsoleerde virtuele omgeving voor het project. Geen globale conflicten. Geen 5 minuten wachten. `uv init` + `uv add mcp` + `uv run` is het schone, snelle pad.',
        },
        {
          id: 'prob5', icon: '🌀',
          symptom: 'De cliënt verbindt maar ziet "0 tools beschikbaar" hoewel de Python-functies correct gedecoreerd zijn.',
          options: [
            'De server vergat mcp.run(transport="stdio") aan te roepen bij opstarten',
            'De cliënt is kapot',
            'Er zijn te veel tools geregistreerd',
          ],
          correct: 0,
          explanation: 'Zelfs met gedecoreerde tools en alles ingesteld, moet de server worden gestart met `mcp.run(transport="stdio")`. Zonder dit begint de server nooit te luisteren — hij sluit gewoon stil af.',
        },
      ],
      successMsg: '🏆 ONGELOOFLIJK! Alle vijf problemen opgelost! De Onzichtbare Server is HERSTELD!',
    },

    terminal: {
      title: 'Academie hersteld — Volledige systeemcheck',
      steps: [
        { type: 'success', text: '✅ STDIO-stromen: STDIN → IN, STDOUT → UIT, STDERR → logs' },
        { type: 'success', text: '✅ Tools geregistreerd: add, subtract, multiply, divide' },
        { type: 'success', text: '✅ Berichtenroutering: alle verzoek-id\'s komen overeen met antwoorden' },
        { type: 'success', text: '✅ UV-setup: schone omgeving, snelle installatie, geen conflicten' },
        { type: 'success', text: '✅ Server gestart: mcp.run(transport="stdio") — luistert!' },
        { type: 'muted',   text: '' },
        { type: 'info',    text: '# Cliënt verbindt...' },
        { type: 'prompt',  text: '→ {"method":"tools/list","id":1}' },
        { type: 'response',text: '← {"result":{"tools":[{"name":"add"},{"name":"subtract"},{"name":"multiply"},{"name":"divide"}]}}' },
        { type: 'success', text: '🌟 DE ONZICHTBARE SERVER IS HERSTELD!' },
        { type: 'success', text: '   Onzichtbaar? Ja. Krachteloos? Nooit.' },
      ],
    },

    quiz: [
      {
        q: 'Wat is de minimaal vereiste regel om een MCP-server te STARTEN die luistert naar verbindingen?',
        options: [
          'import mcp',
          'def main(): pass',
          'mcp.run(transport="stdio")',
          'print("server gereed")',
        ],
        correct: 2,
        explanation: '`mcp.run(transport="stdio")` is wat de event-loop start en begint te lezen van STDIN. Zonder deze regel bestaan al je gedecoreerde functies maar activeert de server nooit.',
      },
      {
        q: 'Welke van deze opties vertegenwoordigt de volledige, correcte MCP-serversetupstroom?',
        options: [
          'Python schrijven → uitvoeren met python server.py → klaar',
          'uv init → uv add mcp → server schrijven met @mcp.tool() → uv run server.py',
          'Globaal installeren met pip → venv overslaan → uitvoeren als root',
          'Servercode van internet kopiëren → de juiste imports raden',
        ],
        correct: 1,
        explanation: 'De volledige stroom is: `uv init` → `uv add mcp` → je server schrijven met `@mcp.tool()`-decorators → `mcp.run(transport="stdio")` → `uv run server.py`.',
      },
      {
        q: 'Maak de zin af: "De server is onzichtbaar, maar..."',
        options: [
          '"...dat betekent dat hij kapot is"',
          '"...zijn gedrag wordt zichtbaar door berichten"',
          '"...alleen experts kunnen het begrijpen"',
          '"...het werkt alleen in productie"',
        ],
        correct: 1,
        explanation: 'Dit is het kernidee van MCP Academy! De server heeft geen zichtbaar venster — hij leeft in een proces, leest en schrijft stromen. Maar elke actie die hij uitvoert is zichtbaar via de gestructureerde berichten die hij uitwisselt.',
      },
    ],

    completionDialogue: [
      {
        char: 'syn', name: 'Rector Syn', role: 'Architect van de Academie', emoji: '🧙',
        text: 'BUITENGEWOON! Je hebt het gedaan! De Onzichtbare Server is hersteld! De pijpen stromen, de spreuken zijn gesmeed, de berichten worden perfect gerouteerd, de smidse brandt snel en het portaal is open!',
      },
      {
        char: 'syn', name: 'Rector Syn', role: 'Architect van de Academie', emoji: '🧙',
        text: 'Je bent geen leerling meer. Je bent een Onzichtbare Architect — iemand die begrijpt dat de grootste servers de servers zijn die je niet kunt zien, alleen voelen via hun gedrag.',
      },
      { char: 'piper', name: 'Piper', role: 'Pijpingenieur', emoji: '🔧', text: 'De pijpen zingen!' },
      { char: 'hexa', name: 'Hexa', role: 'Mentor van de Toverspreuksmidse', emoji: '⚗️', text: 'De spreuken zijn geregistreerd!' },
      { char: 'tunnelfox', name: 'Tunnelvos', role: 'Snelle Boodschapper', emoji: '🦊', text: 'De berichten stromen!' },
      { char: 'uvsprite', name: 'Smidse-elf UV', role: 'Energieke Bouwer', emoji: '⚡', text: 'ZOOM! De smidse brandt!' },
      { char: 'portalowl', name: 'Portaaluil', role: 'Cliëntzijgids', emoji: '🦉', text: 'Het portaal gloeit! Oehoe oehoe!' },
    ],

    realWorldTakeaway: 'Je weet nu precies hoe je een echte Python MCP-server bouwt: maak een project aan met UV, schrijf Python-functies gedecoreerd met @mcp.tool(), roep mcp.run(transport="stdio") aan en voer het uit met uv run. De cliënt verbindt, ontdekt tools en roept ze aan — allemaal via de onzichtbare STDIO-tunnel.',
  },
];
