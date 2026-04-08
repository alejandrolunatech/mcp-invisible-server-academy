/**
 * glossary.nl.js — Dutch glossary terms
 */

export const GLOSSARY_TERMS_NL = [
  {
    id: 'mcp',
    word: 'MCP',
    metaphor: 'Het onzichtbare tovenaarsverdrag',
    definition: 'Model Context Protocol — een standaard manier voor AI-cliënten om tools, bronnen en prompts te ontdekken en aan te roepen die door een server worden blootgesteld.',
  },
  {
    id: 'stdio',
    word: 'STDIO',
    metaphor: 'De berichtentunnel naar en vanuit de wizardkamer',
    definition: 'Standaardinvoer/-uitvoer — het standaardcommunicatiekanaal voor een MCP-server. Berichten van de cliënt stromen STDIN binnen; antwoorden komen terug via STDOUT.',
  },
  {
    id: 'stdin',
    word: 'STDIN',
    metaphor: 'De pijp die berichten DE wizardkamer IN brengt',
    definition: 'Standaardinvoer — de stroom waar een MCP-server inkomende JSON-RPC-berichten van de cliënt leest.',
  },
  {
    id: 'stdout',
    word: 'STDOUT',
    metaphor: 'De pijp die antwoorden DE wizardkamer UIT brengt',
    definition: 'Standaarduitvoer — de stroom waar een MCP-server zijn JSON-RPC-antwoorden terug naar de cliënt schrijft.',
  },
  {
    id: 'stderr',
    word: 'STDERR',
    metaphor: 'Waarschuwingsrook die uit de kamer opstijgt',
    definition: 'Standaardfout — de stroom die gebruikt wordt voor debuglogs, waarschuwingen en foutberichten. Cliënten lezen STDERR niet als deel van het protocol; het is alleen voor zichtbaarheid voor de ontwikkelaar.',
  },
  {
    id: 'tool',
    word: 'Tool',
    metaphor: 'Een spreuk — een benoemde vaardigheid die de tovenaar kan gebruiken',
    definition: 'Een aanroepbare functie die door een MCP-server wordt blootgesteld. Cliënten kunnen tools ontdekken via tools/list en ze aanroepen met specifieke argumenten.',
  },
  {
    id: 'resource',
    word: 'Bron',
    metaphor: 'Een bibliotheekplank waar de tovenaar uit kan lezen',
    definition: 'Een gegevensbron die door een MCP-server wordt blootgesteld. Cliënten kunnen bronnen lezen om context of bestanden op te halen.',
  },
  {
    id: 'prompt',
    word: 'Prompt',
    metaphor: 'Een mentorrol met sjabloonguidance',
    definition: 'Een herbruikbaar instructiesjabloon dat door een MCP-server wordt blootgesteld. Cliënten kunnen prompts ophalen en parameters invullen.',
  },
  {
    id: 'jsonrpc',
    word: 'JSON-RPC',
    metaphor: 'Het gestructureerde spreukrolformaat',
    definition: 'Het berichtenformaat dat door MCP wordt gebruikt. Elk verzoek heeft een methode, id en optionele parameters. Elk antwoord heeft een resultaat of fout dat overeenkomt met het id.',
  },
  {
    id: 'uv',
    word: 'UV',
    metaphor: 'De snelheidsmidse voor Python-omgevingen',
    definition: 'Een snelle Python-pakketinstalleerder en manager voor virtuele omgevingen. UV kan omgevingen aanmaken en Python-projecten uitvoeren veel sneller dan pip + venv.',
  },
  {
    id: 'tools_list',
    word: 'tools/list',
    metaphor: 'De tovenaar vragen: "Welke spreuken ken jij?"',
    definition: 'Een MCP-protocolmethode die de cliënt aanroept om alle tools te ontdekken die de server blootstelt. De server antwoordt met een lijst van toolnamen, beschrijvingen en parameterschema\'s.',
  },
  {
    id: 'client',
    word: 'MCP-cliënt',
    metaphor: 'De leerling die aanklopt op de deur van de wizardkamer',
    definition: 'Elke applicatie of elk AI-model dat verbinding maakt met een MCP-server om zijn tools, bronnen en prompts te ontdekken en aan te roepen.',
  },
  {
    id: 'decorator',
    word: '@mcp.tool()',
    metaphor: 'Het spreukregistratiemerk',
    definition: 'Een Python-decorator die een functie registreert als MCP-tool, waardoor het vindbaar en aanroepbaar wordt door verbonden cliënten.',
  },
  {
    id: 'virtual_env',
    word: 'Virtuele omgeving',
    metaphor: 'Een privé-spreukbibliotheek voor jouw project',
    definition: 'Een geïsoleerde Python-omgeving die alleen de pakketten bevat die jouw project nodig heeft, ter voorkoming van conflicten met andere projecten.',
  },
];
