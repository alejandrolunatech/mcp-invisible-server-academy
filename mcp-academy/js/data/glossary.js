/**
 * glossary.js — Glossary term definitions
 */

export const GLOSSARY_TERMS = [
  {
    id: 'mcp',
    word: 'MCP',
    metaphor: 'The invisible wizard contract',
    definition:
      'Model Context Protocol — a standard way for AI clients to discover and call tools, resources, and prompts exposed by a server.',
  },
  {
    id: 'stdio',
    word: 'STDIO',
    metaphor: 'The message tunnel into and out of the wizard chamber',
    definition:
      'Standard Input/Output — the default communication channel for an MCP server. Messages from the client flow in through STDIN; responses flow back through STDOUT.',
  },
  {
    id: 'stdin',
    word: 'STDIN',
    metaphor: 'The pipe carrying messages INTO the wizard chamber',
    definition:
      'Standard Input — the stream where an MCP server reads incoming JSON-RPC messages sent by the client.',
  },
  {
    id: 'stdout',
    word: 'STDOUT',
    metaphor: 'The pipe carrying replies OUT of the wizard chamber',
    definition:
      'Standard Output — the stream where an MCP server writes its JSON-RPC responses back to the client.',
  },
  {
    id: 'stderr',
    word: 'STDERR',
    metaphor: 'Warning smoke rising from the chamber',
    definition:
      'Standard Error — the stream used for debug logs, warnings, and error messages. Clients do not read STDERR as part of the protocol; it is for developer visibility only.',
  },
  {
    id: 'tool',
    word: 'Tool',
    metaphor: 'A spell — a named ability the wizard can cast',
    definition:
      'A callable function exposed by an MCP server. Clients can discover tools via tools/list and invoke them with specific arguments.',
  },
  {
    id: 'resource',
    word: 'Resource',
    metaphor: 'A library shelf the wizard can read from',
    definition:
      'A data source exposed by an MCP server. Clients can read resources to retrieve context or files.',
  },
  {
    id: 'prompt',
    word: 'Prompt',
    metaphor: 'A mentor scroll with templated guidance',
    definition:
      'A reusable instruction template exposed by an MCP server. Clients can retrieve prompts and fill in parameters.',
  },
  {
    id: 'jsonrpc',
    word: 'JSON-RPC',
    metaphor: 'The structured spell scroll format',
    definition:
      'The message format used by MCP. Every request has a method, id, and optional params. Every response has a result or error matching the id.',
  },
  {
    id: 'uv',
    word: 'UV',
    metaphor: 'The speed forge for Python environments',
    definition:
      'A fast Python package installer and virtual environment manager. UV can create environments and run Python projects much faster than pip + venv.',
  },
  {
    id: 'tools_list',
    word: 'tools/list',
    metaphor: 'Asking the wizard: "What spells do you know?"',
    definition:
      'An MCP protocol method the client calls to discover all tools the server exposes. The server responds with a list of tool names, descriptions, and parameter schemas.',
  },
  {
    id: 'client',
    word: 'MCP Client',
    metaphor: 'The apprentice knocking on the wizard chamber door',
    definition:
      'Any application or AI model that connects to an MCP server to discover and call its tools, resources, and prompts.',
  },
  {
    id: 'decorator',
    word: '@mcp.tool()',
    metaphor: 'The spell registration mark',
    definition:
      'A Python decorator that registers a function as an MCP tool, making it discoverable and callable by connected clients.',
  },
  {
    id: 'virtual_env',
    word: 'Virtual Environment',
    metaphor: 'A private spell library for your project',
    definition:
      'An isolated Python environment that contains only the packages your project needs, preventing conflicts with other projects.',
  },
];
