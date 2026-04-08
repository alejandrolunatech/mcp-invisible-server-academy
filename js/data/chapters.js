/**
 * chapters.js — All chapter content: dialogue, puzzles, quizzes, terminal demos
 */

export const CHAPTERS = [
  // ──────────────────────────────────────────────────────────
  // CHAPTER 1 — The Silent Hall
  // ──────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'The Silent Hall',
    subtitle: 'Understanding STDIO',
    icon: '🌀',
    color: '#00d4ff',
    xpReward: 100,
    achievementId: 'pipe_fixer',
    description: 'The hall has gone quiet. Three ancient message pipes have come undone. Reconnect them to restore the flow.',

    // Intro dialogue sequence
    dialogue: [
      {
        char: 'syn',
        name: 'Headmaster Syn',
        role: 'Architect of the Academy',
        emoji: '🧙',
        text: 'Welcome, apprentice. Something has gone very wrong in the Silent Hall. The server spirit that lives here… has become invisible — even to us.',
      },
      {
        char: 'piper',
        name: 'Piper',
        role: 'Pipe Engineer',
        emoji: '🔧',
        text: 'I know the problem! Every MCP server communicates through three streams. They are like pipes — STDIN carries messages IN, STDOUT carries answers OUT, and STDERR carries warning smoke.',
      },
      {
        char: 'piper',
        name: 'Piper',
        role: 'Pipe Engineer',
        emoji: '🔧',
        text: 'Right now, those pipes are disconnected. Messages from the client go nowhere. That\'s why the server feels invisible — it exists, but it cannot be heard or reached.',
      },
      {
        char: 'syn',
        name: 'Headmaster Syn',
        role: 'Architect of the Academy',
        emoji: '🧙',
        text: 'Your task: reconnect each stream to its correct purpose. Get it right, and we will see the first real messages flow through the tunnel.',
      },
    ],

    // Puzzle config
    puzzle: {
      type: 'matching',
      title: 'Reconnect the Message Pipes',
      instructions: 'Click a stream name on the left, then click its correct description on the right to connect them.',
      leftItems: [
        { id: 'stdin',  label: 'STDIN',  icon: '📥', color: '#00d4ff' },
        { id: 'stdout', label: 'STDOUT', icon: '📤', color: '#10b981' },
        { id: 'stderr', label: 'STDERR', icon: '💨', color: '#f59e0b' },
      ],
      rightItems: [
        { id: 'desc_stdin',  label: 'Incoming messages from the client enter through here' },
        { id: 'desc_stdout', label: 'Normal responses from the server flow out through here' },
        { id: 'desc_stderr', label: 'Warning smoke — debug logs, not part of the protocol' },
      ],
      matches: {
        stdin:  'desc_stdin',
        stdout: 'desc_stdout',
        stderr: 'desc_stderr',
      },
      successMsg: '✅ The pipes glow! Messages can now flow through the chamber.',
      failureHint: 'Try again — think about what goes INTO a server versus what comes OUT.',
    },

    // Terminal simulation steps
    terminal: {
      title: 'MCP STDIO — Message Flow',
      steps: [
        { type: 'muted',    text: '# Client connects to MCP server via STDIO' },
        { type: 'muted',    text: '# Server process starts, reads from STDIN' },
        { type: 'prompt',   text: '{"jsonrpc":"2.0","method":"tools/list","id":1}' },
        { type: 'muted',    text: '# → Message travels through STDIN into the server' },
        { type: 'muted',    text: '# Server processes the request...' },
        { type: 'response', text: '{"jsonrpc":"2.0","id":1,"result":{"tools":[{"name":"add","description":"Add two numbers"}]}}' },
        { type: 'muted',    text: '# ← Response travels through STDOUT back to client' },
        { type: 'warning',  text: '[STDERR] Server started successfully on stdio transport' },
        { type: 'muted',    text: '# ↑ Warning smoke — STDERR shows logs, NOT sent to client' },
        { type: 'success',  text: '# The server is no longer invisible. Its behavior is visible through messages!' },
      ],
    },

    // Quiz questions
    quiz: [
      {
        q: 'What does STDIN carry in an MCP server setup?',
        options: [
          'Responses going back to the client',
          'Incoming messages from the client',
          'Error logs and debug output',
          'Tool registration data',
        ],
        correct: 1,
        explanation: 'STDIN (Standard Input) is the stream where incoming messages from the MCP client flow INTO the server. Think of it as the pipe going INTO the wizard chamber.',
      },
      {
        q: 'Why does an MCP server feel "invisible" to beginners?',
        options: [
          'It runs on a remote cloud server',
          'It uses a graphical user interface',
          'It communicates silently through STDIO streams, not a visible window',
          'It only works at night',
        ],
        correct: 2,
        explanation: 'MCP servers communicate via STDIN/STDOUT — there\'s no browser window or visible UI. They feel invisible because they live quietly in a terminal process, exchanging structured messages.',
      },
      {
        q: 'What is STDERR used for in an MCP server?',
        options: [
          'Sending tool results to the client',
          'Receiving client requests',
          'Debug logs and warning messages — not part of the MCP protocol',
          'Storing tool definitions',
        ],
        correct: 2,
        explanation: 'STDERR is the "warning smoke" — it\'s for developer-facing logs, errors, and debug output. MCP clients do NOT read STDERR as part of the protocol flow.',
      },
    ],

    completionDialogue: [
      {
        char: 'piper',
        name: 'Piper',
        role: 'Pipe Engineer',
        emoji: '🔧',
        text: 'Look — the pipes are glowing! Messages are flowing again. The server was always there. We just couldn\'t hear it because the pipes were disconnected.',
      },
      {
        char: 'syn',
        name: 'Headmaster Syn',
        role: 'Architect of the Academy',
        emoji: '🧙',
        text: 'Remember this: "The server is invisible, but its behavior becomes visible through messages." On to the Spell Forge!',
      },
    ],

    realWorldTakeaway: 'In a real Python MCP server using STDIO transport, your server process reads JSON-RPC messages from sys.stdin and writes responses to sys.stdout. Logs and debug info go to sys.stderr. When you run `uv run server.py`, the client connects to those exact streams.',
  },

  // ──────────────────────────────────────────────────────────
  // CHAPTER 2 — The Spell Forge
  // ──────────────────────────────────────────────────────────
  {
    id: 2,
    title: 'The Spell Forge',
    subtitle: 'Python Functions as MCP Tools',
    icon: '⚗️',
    color: '#a855f7',
    xpReward: 120,
    achievementId: 'first_spell',
    description: 'Plain Python functions wait in the forge. Apply the registration mark to make them discoverable MCP tools.',

    dialogue: [
      {
        char: 'hexa',
        name: 'Hexa',
        role: 'Spell Forge Mentor',
        emoji: '⚗️',
        text: 'Welcome to the Spell Forge! Every powerful MCP server starts with the same secret: tools are just Python functions given a doorway.',
      },
      {
        char: 'hexa',
        name: 'Hexa',
        role: 'Spell Forge Mentor',
        emoji: '⚗️',
        text: 'You write a normal Python function — say, `def add(a, b): return a + b`. Perfectly ordinary. But once you put the magic mark `@mcp.tool()` on top… it becomes discoverable. The client can find it, call it, get results.',
      },
      {
        char: 'hexa',
        name: 'Hexa',
        role: 'Spell Forge Mentor',
        emoji: '⚗️',
        text: 'Your challenge: match each calculator spell to its Python function, then register them as tools. Four spells. Four functions. Let\'s forge!',
      },
    ],

    puzzle: {
      type: 'matching',
      title: 'Forge the Calculator Spells',
      instructions: 'Click a spell card on the left, then click its matching Python function on the right to forge the connection.',
      leftItems: [
        { id: 'spell_add',      label: 'add spell',      icon: '➕', color: '#10b981' },
        { id: 'spell_subtract', label: 'subtract spell', icon: '➖', color: '#ef4444' },
        { id: 'spell_multiply', label: 'multiply spell', icon: '✖️', color: '#a855f7' },
        { id: 'spell_divide',   label: 'divide spell',   icon: '➗', color: '#f59e0b' },
      ],
      rightItems: [
        { id: 'fn_add',      label: 'def add(a, b): return a + b' },
        { id: 'fn_subtract', label: 'def subtract(a, b): return a - b' },
        { id: 'fn_multiply', label: 'def multiply(a, b): return a * b' },
        { id: 'fn_divide',   label: 'def divide(a, b): return a / b' },
      ],
      matches: {
        spell_add:      'fn_add',
        spell_subtract: 'fn_subtract',
        spell_multiply: 'fn_multiply',
        spell_divide:   'fn_divide',
      },
      successMsg: '✅ Sparks fly! All four spells are forged and registered as MCP tools.',
      failureHint: 'Match each spell name to its operation — addition goes with +, subtraction with -, etc.',
    },

    codeExample: {
      lang: 'Python',
      title: 'Calculator MCP Server',
      code: [
        { type: 'py-cmt',  text: '# A real MCP server with calculator tools' },
        { type: 'py-kw',   text: 'from', extra: ' mcp.server.fastmcp ' },
        { type: 'plain',   text: '' },
        { type: 'py-kw',   text: 'import', extra: ' FastMCP' },
        { type: 'blank' },
        { type: 'py-fn',   text: 'mcp', extra: ' = FastMCP("Calculator")' },
        { type: 'blank' },
        { type: 'py-dec',  text: '@mcp.tool()' },
        { type: 'py-kw',   text: 'def ', extra: '' },
        { type: 'py-fn',   text: 'add', extra: '(' },
        { type: 'py-param',text: 'a', extra: ': ' },
        { type: 'py-type', text: 'int', extra: ', ' },
        { type: 'py-param',text: 'b', extra: ': ' },
        { type: 'py-type', text: 'int', extra: ') -> ' },
        { type: 'py-type', text: 'int', extra: ':' },
        { type: 'plain',   text: '    ' },
        { type: 'py-str',  text: '"""Add two numbers"""' },
        { type: 'plain',   text: '    ' },
        { type: 'py-kw',   text: 'return ', extra: 'a + b' },
      ],
      // Simplified display version
      rawCode: `from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Calculator")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

@mcp.tool()
def subtract(a: int, b: int) -> int:
    """Subtract b from a"""
    return a - b

@mcp.tool()
def multiply(a: int, b: int) -> int:
    """Multiply two numbers"""
    return a * b

@mcp.tool()
def divide(a: float, b: float) -> float:
    """Divide a by b"""
    if b == 0:
        raise ValueError("Cannot divide by zero!")
    return a / b

if __name__ == "__main__":
    mcp.run(transport="stdio")`,
      explanation: 'The @mcp.tool() decorator is the magic mark — it tells FastMCP to register this function as a discoverable, callable tool. The docstring becomes the tool\'s description. Type hints become the parameter schema.',
    },

    terminal: {
      title: 'Tool Discovery — tools/list',
      steps: [
        { type: 'muted',    text: '# Client asks: "What spells do you know?"' },
        { type: 'prompt',   text: '{"jsonrpc":"2.0","method":"tools/list","id":1}' },
        { type: 'muted',    text: '# Server responds with all registered tools' },
        { type: 'response', text: '{"jsonrpc":"2.0","id":1,"result":{"tools":[' },
        { type: 'response', text: '  {"name":"add","description":"Add two numbers","inputSchema":{...}},' },
        { type: 'response', text: '  {"name":"subtract","description":"Subtract b from a","inputSchema":{...}},' },
        { type: 'response', text: '  {"name":"multiply","description":"Multiply two numbers","inputSchema":{...}},' },
        { type: 'response', text: '  {"name":"divide","description":"Divide a by b","inputSchema":{...}}' },
        { type: 'response', text: ']}}' },
        { type: 'success',  text: '# Tools are just functions given a doorway — now the client knows they exist!' },
      ],
    },

    quiz: [
      {
        q: 'What does the `@mcp.tool()` decorator do to a Python function?',
        options: [
          'It runs the function immediately',
          'It registers the function as a discoverable MCP tool',
          'It makes the function faster',
          'It converts Python code to JavaScript',
        ],
        correct: 1,
        explanation: '`@mcp.tool()` is the "spell registration mark" — it tells the MCP server to expose this function as a callable tool that clients can discover via tools/list and invoke.',
      },
      {
        q: 'In the MCP metaphor, what are tools?',
        options: [
          'Database tables',
          'Network sockets',
          'Python functions given a doorway — spells the wizard can cast',
          'HTML templates',
        ],
        correct: 2,
        explanation: 'Tools = spells. A tool is simply a Python function decorated to be discoverable and callable by MCP clients. The function\'s docstring becomes its description, and its type hints define its input schema.',
      },
      {
        q: 'What happens if you call `divide(10, 0)` without error handling?',
        options: [
          'It returns 0',
          'It returns None',
          'It raises a ZeroDivisionError that the server should handle gracefully',
          'It returns infinity silently',
        ],
        correct: 2,
        explanation: 'Without the `if b == 0: raise ValueError(...)` guard, Python raises a ZeroDivisionError. A well-built MCP tool handles edge cases and returns meaningful errors to the client.',
      },
    ],

    completionDialogue: [
      {
        char: 'hexa',
        name: 'Hexa',
        role: 'Spell Forge Mentor',
        emoji: '⚗️',
        text: 'Magnificent! Four functions, four spells, all forged and registered! Remember — tools are just functions given a doorway. The decorator is the key.',
      },
    ],

    realWorldTakeaway: 'In a real FastMCP server, every `@mcp.tool()` decorated function becomes a callable tool. When you open your local MCP UI and see "add", "subtract", "multiply", "divide" listed — those ARE your Python functions, exposed through the protocol.',
  },

  // ──────────────────────────────────────────────────────────
  // CHAPTER 3 — The Message Tunnel
  // ──────────────────────────────────────────────────────────
  {
    id: 3,
    title: 'The Message Tunnel',
    subtitle: 'Request & Response Flow',
    icon: '📡',
    color: '#f59e0b',
    xpReward: 130,
    achievementId: 'tunnel_listener',
    description: 'Messages travel through the tunnel in pairs — every request needs the right response. Learn to match them.',

    dialogue: [
      {
        char: 'tunnelfox',
        name: 'Tunnel Fox',
        role: 'Fast Messenger',
        emoji: '🦊',
        text: 'I carry messages through the tunnel at lightning speed! But lately… the request-response pairs are getting mixed up. Chaos!',
      },
      {
        char: 'tunnelfox',
        name: 'Tunnel Fox',
        role: 'Fast Messenger',
        emoji: '🦊',
        text: 'Every MCP exchange works the same way: the client sends a REQUEST with a method and an id. The server must send back a RESPONSE with the SAME id and the result.',
      },
      {
        char: 'tunnelfox',
        name: 'Tunnel Fox',
        role: 'Fast Messenger',
        emoji: '🦊',
        text: 'Match each request to its correct response. Get it right and the tunnel flows freely again!',
      },
    ],

    puzzle: {
      type: 'matching',
      title: 'Route the Message Pairs',
      instructions: 'Click a REQUEST on the left, then click its matching RESPONSE on the right.',
      leftItems: [
        { id: 'req1', label: 'tools/list (ask what tools exist)', icon: '📋' },
        { id: 'req2', label: 'Call add(5, 3)', icon: '➕' },
        { id: 'req3', label: 'Call divide(10, 0)', icon: '⚠️' },
      ],
      rightItems: [
        { id: 'res1', label: 'List of all registered tools with names and schemas' },
        { id: 'res2', label: 'Result: 8' },
        { id: 'res3', label: 'Error: Cannot divide by zero!' },
      ],
      matches: {
        req1: 'res1',
        req2: 'res2',
        req3: 'res3',
      },
      successMsg: '✅ The tunnel hums with perfectly matched message pairs!',
      failureHint: 'Match each client action to what the server would naturally return.',
    },

    terminal: {
      title: 'Full Message Tunnel — Request / Response',
      steps: [
        { type: 'muted',    text: '# Step 1: Client discovers available tools' },
        { type: 'prompt',   text: '→ {"jsonrpc":"2.0","method":"tools/list","id":1}' },
        { type: 'response', text: '← {"jsonrpc":"2.0","id":1,"result":{"tools":[{"name":"add",...},{"name":"divide",...}]}}' },
        { type: 'muted',    text: '' },
        { type: 'muted',    text: '# Step 2: Client calls the "add" tool' },
        { type: 'prompt',   text: '→ {"jsonrpc":"2.0","method":"tools/call","id":2,"params":{"name":"add","arguments":{"a":5,"b":3}}}' },
        { type: 'response', text: '← {"jsonrpc":"2.0","id":2,"result":{"content":[{"type":"text","text":"8"}]}}' },
        { type: 'muted',    text: '' },
        { type: 'muted',    text: '# Step 3: Client calls divide with zero (error case)' },
        { type: 'prompt',   text: '→ {"jsonrpc":"2.0","method":"tools/call","id":3,"params":{"name":"divide","arguments":{"a":10,"b":0}}}' },
        { type: 'error',    text: '← {"jsonrpc":"2.0","id":3,"error":{"code":-32603,"message":"Cannot divide by zero!"}}' },
        { type: 'muted',    text: '# Every request has a matching response. The id links them.' },
      ],
    },

    quiz: [
      {
        q: 'What does the `id` field do in an MCP JSON-RPC message?',
        options: [
          'It identifies which server to connect to',
          'It links a request to its matching response',
          'It sets the priority of the message',
          'It is the session token',
        ],
        correct: 1,
        explanation: 'The `id` field in JSON-RPC links a request to its response. When the server replies, it uses the same `id` so the client knows which request was answered. This is how the tunnel stays organised even if multiple requests are in flight.',
      },
      {
        q: 'How does a client discover what tools an MCP server has?',
        options: [
          'By reading the server\'s Python source code',
          'By sending a tools/list request',
          'By guessing based on the server name',
          'Tools cannot be discovered — they must be hard-coded',
        ],
        correct: 1,
        explanation: 'The client sends a `tools/list` request. The server responds with a list of all registered tools, including their names, descriptions, and input schemas. This is how exploration works.',
      },
      {
        q: 'What does the server return when `tools/call` succeeds?',
        options: [
          'Nothing — it just prints the result to the terminal',
          'A JSON-RPC response with a `result` field containing the tool output',
          'A raw Python value',
          'A new Python function',
        ],
        correct: 1,
        explanation: 'On success, the server returns a JSON-RPC response with a `result` field containing the tool\'s output (usually as `{"content":[{"type":"text","text":"..."}]}`). On failure, it returns an `error` field instead.',
      },
    ],

    completionDialogue: [
      {
        char: 'tunnelfox',
        name: 'Tunnel Fox',
        role: 'Fast Messenger',
        emoji: '🦊',
        text: 'Perfect! Every request now has its matching response! The tunnel is humming again. Remember: every message in has a message out, and the id ties them together.',
      },
    ],

    realWorldTakeaway: 'When you open your local MCP UI and click "List Tools" then "Run add(5, 3)", you are sending exactly these JSON-RPC messages. The server receives them on STDIN and sends back responses through STDOUT.',
  },

  // ──────────────────────────────────────────────────────────
  // CHAPTER 4 — The UV Speed Forge
  // ──────────────────────────────────────────────────────────
  {
    id: 4,
    title: 'The UV Speed Forge',
    subtitle: 'Fast Python Setup with UV',
    icon: '⚡',
    color: '#10b981',
    xpReward: 110,
    achievementId: 'uv_sprinter',
    description: 'Two forges burn side by side — one old and slow, one fast and clean. Choose the UV path and assemble the setup flow.',

    dialogue: [
      {
        char: 'uvsprite',
        name: 'Forge Sprite UV',
        role: 'Energetic Builder',
        emoji: '⚡',
        text: 'ZOOM! Hi! I\'m UV — the speed forge. Before I arrived, setting up Python projects meant fighting with pip, venv, and long install waits. Not anymore!',
      },
      {
        char: 'uvsprite',
        name: 'Forge Sprite UV',
        role: 'Energetic Builder',
        emoji: '⚡',
        text: 'UV is a super-fast Python package manager and project runner. It handles your virtual environment, dependencies, AND running your project — all with simple commands.',
      },
      {
        char: 'uvsprite',
        name: 'Forge Sprite UV',
        role: 'Energetic Builder',
        emoji: '⚡',
        text: 'Your mission: put the UV setup steps in the correct order. Drag them into place!',
      },
    ],

    puzzle: {
      type: 'ordering',
      title: 'Assemble the UV Setup Flow',
      instructions: 'Drag the setup steps into the correct order. What do you do first, second, third, and last?',
      items: [
        { id: 'step_install', label: '1. Install UV on your machine',           icon: '📥', correctPos: 0 },
        { id: 'step_init',    label: '2. Create a new project: uv init my-server', icon: '📁', correctPos: 1 },
        { id: 'step_add',     label: '3. Add the MCP dependency: uv add mcp',    icon: '➕', correctPos: 2 },
        { id: 'step_run',     label: '4. Run your server: uv run server.py',     icon: '🚀', correctPos: 3 },
      ],
      successMsg: '⚡ Speed burst! The UV forge is firing on all cylinders!',
      failureHint: 'Think about the logical order: you must install UV before using it, and add packages before running your code.',
    },

    codeExample: {
      lang: 'Shell',
      rawCode: `# Install UV (once per machine)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create a new MCP server project
uv init my-calculator-server
cd my-calculator-server

# Add MCP as a dependency
uv add mcp

# Run your server
uv run server.py

# Or run with the MCP CLI for development
uv run mcp dev server.py`,
      explanation: 'UV automatically creates and manages a virtual environment for your project. No manual "python -m venv .venv && source .venv/bin/activate" needed. UV does it all.',
    },

    terminal: {
      title: 'UV vs. Old Way — Speed Comparison',
      steps: [
        { type: 'error',    text: '# ❌ OLD WAY (slow, manual)' },
        { type: 'error',    text: 'python3 -m venv .venv' },
        { type: 'error',    text: 'source .venv/bin/activate' },
        { type: 'error',    text: 'pip install mcp  # takes 30+ seconds...' },
        { type: 'error',    text: 'python server.py' },
        { type: 'muted',    text: '' },
        { type: 'success',  text: '# ✅ UV WAY (fast, automatic)' },
        { type: 'success',  text: 'uv init my-server' },
        { type: 'success',  text: 'uv add mcp        # < 2 seconds' },
        { type: 'success',  text: 'uv run server.py  # auto-handles env' },
        { type: 'muted',    text: '' },
        { type: 'info',     text: '# UV is like a fast clean forge for Python work.' },
        { type: 'info',     text: '# One tool. One command. No environment drama.' },
      ],
    },

    quiz: [
      {
        q: 'What does `uv add mcp` do?',
        options: [
          'Installs UV itself',
          'Creates a new project folder',
          'Adds the MCP package as a dependency and installs it',
          'Runs the MCP server',
        ],
        correct: 2,
        explanation: '`uv add mcp` adds the MCP package to your project\'s dependencies AND installs it — all in one fast command. UV manages the virtual environment automatically in the background.',
      },
      {
        q: 'What does `uv run server.py` do differently from `python server.py`?',
        options: [
          'Nothing — they are identical',
          'It runs server.py inside the project\'s managed virtual environment automatically',
          'It converts Python to JavaScript first',
          'It only works on Linux',
        ],
        correct: 1,
        explanation: '`uv run` automatically uses the project\'s managed virtual environment, so you get the right Python version and all the right packages — without manually activating an environment first.',
      },
      {
        q: 'In the academy metaphor, what is UV?',
        options: [
          'A type of STDIO stream',
          'A Python web framework',
          'The speed forge — a fast, clean build engine for Python projects',
          'A JSON parsing library',
        ],
        correct: 2,
        explanation: 'UV is the "speed forge" — it dramatically speeds up Python environment setup, dependency installation, and project execution. It replaces the slow, manual workflow of pip + venv.',
      },
    ],

    completionDialogue: [
      {
        char: 'uvsprite',
        name: 'Forge Sprite UV',
        role: 'Energetic Builder',
        emoji: '⚡',
        text: 'ZOOM! Perfect order! Four steps, lightning fast. No environment drama. Just clean, fast setup. That\'s the UV way!',
      },
    ],

    realWorldTakeaway: 'When you build a real MCP server, `uv init`, `uv add`, and `uv run` are the three commands you\'ll use most. UV handles the virtual environment, the dependencies, and the execution — all automatically.',
  },

  // ──────────────────────────────────────────────────────────
  // CHAPTER 5 — The Client Portal
  // ──────────────────────────────────────────────────────────
  {
    id: 5,
    title: 'The Client Portal',
    subtitle: 'Exploring Tools from the Client Side',
    icon: '🌀',
    color: '#8b5cf6',
    xpReward: 140,
    achievementId: 'portal_explorer',
    description: 'The portal is live! Step into the client\'s perspective and explore, call, and discover your tools.',

    dialogue: [
      {
        char: 'portalowl',
        name: 'Portal Owl',
        role: 'Client-Side Guide',
        emoji: '🦉',
        text: 'Hoo! Welcome to the Client Portal! This is where the client side lives — the place that asks questions, discovers tools, and calls them.',
      },
      {
        char: 'portalowl',
        name: 'Portal Owl',
        role: 'Client-Side Guide',
        emoji: '🦉',
        text: 'When you open a local MCP UI — like Claude Desktop or MCP Inspector — and connect it to your server, THIS is what it does. It connects, it asks for tools, it lets you run them.',
      },
      {
        char: 'portalowl',
        name: 'Portal Owl',
        role: 'Client-Side Guide',
        emoji: '🦉',
        text: 'Step through the portal! Connect, explore the tools, run add and divide — even trigger the divide-by-zero error. See how the system handles it.',
      },
    ],

    puzzle: {
      type: 'simulation',
      title: 'Client Portal Simulation',
      instructions: 'Follow the steps below to experience the full client-server interaction. Click each button in order.',
      steps: [
        {
          id: 'connect',
          label: '🔌 Connect to Server',
          terminalOutput: [
            { type: 'info',    text: 'Connecting to Calculator MCP Server via stdio...' },
            { type: 'success', text: '✅ Connected! Server is ready.' },
            { type: 'muted',   text: 'Protocol: stdio | Version: MCP 1.0' },
          ],
        },
        {
          id: 'list_tools',
          label: '📋 Inspect Tools',
          terminalOutput: [
            { type: 'muted',    text: '# Sending tools/list request...' },
            { type: 'prompt',   text: '→ {"method":"tools/list","id":1}' },
            { type: 'response', text: '← {"result":{"tools":["add","subtract","multiply","divide"]}}' },
            { type: 'success',  text: '✅ 4 tools discovered: add, subtract, multiply, divide' },
          ],
        },
        {
          id: 'run_add',
          label: '➕ Run add(15, 27)',
          terminalOutput: [
            { type: 'muted',    text: '# Calling add tool...' },
            { type: 'prompt',   text: '→ {"method":"tools/call","params":{"name":"add","arguments":{"a":15,"b":27}}}' },
            { type: 'response', text: '← {"result":{"content":[{"type":"text","text":"42"}]}}' },
            { type: 'success',  text: '✅ Result: 42 🎉' },
          ],
        },
        {
          id: 'run_divide',
          label: '➗ Run divide(100, 4)',
          terminalOutput: [
            { type: 'muted',    text: '# Calling divide tool...' },
            { type: 'prompt',   text: '→ {"method":"tools/call","params":{"name":"divide","arguments":{"a":100,"b":4}}}' },
            { type: 'response', text: '← {"result":{"content":[{"type":"text","text":"25.0"}]}}' },
            { type: 'success',  text: '✅ Result: 25.0' },
          ],
        },
        {
          id: 'run_div_zero',
          label: '⚠️ Run divide(10, 0) — error!',
          terminalOutput: [
            { type: 'muted',    text: '# Calling divide with zero...' },
            { type: 'prompt',   text: '→ {"method":"tools/call","params":{"name":"divide","arguments":{"a":10,"b":0}}}' },
            { type: 'error',    text: '← {"error":{"code":-32603,"message":"Cannot divide by zero!"}}' },
            { type: 'warning',  text: '⚠️  Error handled gracefully — server stays alive!' },
            { type: 'muted',    text: '# This is expected behaviour. A good server handles errors cleanly.' },
          ],
        },
      ],
      successMsg: '🌀 Portal mastered! You\'ve experienced the full client-server loop.',
    },

    terminal: {
      title: 'Full Client Portal Session',
      steps: [
        { type: 'info',    text: '# Full client portal session summary' },
        { type: 'success', text: '1. Connected via stdio ✅' },
        { type: 'success', text: '2. Discovered 4 tools via tools/list ✅' },
        { type: 'success', text: '3. Called add(15, 27) → 42 ✅' },
        { type: 'success', text: '4. Called divide(100, 4) → 25.0 ✅' },
        { type: 'warning', text: '5. Called divide(10, 0) → Error (expected, handled) ✅' },
        { type: 'muted',   text: '' },
        { type: 'info',    text: '# The server is invisible — but its behavior is completely visible through messages!' },
      ],
    },

    quiz: [
      {
        q: 'What does an MCP client do first when it connects to a server?',
        options: [
          'Immediately calls a tool',
          'Downloads the server source code',
          'Sends tools/list to discover what tools are available',
          'Asks the user to type a command',
        ],
        correct: 2,
        explanation: 'The first thing any MCP client does is send `tools/list` to discover the server\'s capabilities. It\'s like asking "what spells do you know?" before casting anything.',
      },
      {
        q: 'What happens when a client calls a tool that produces an error?',
        options: [
          'The entire server crashes',
          'The client disconnects permanently',
          'The server returns a JSON-RPC error response and keeps running',
          'The error is silently ignored',
        ],
        correct: 2,
        explanation: 'A well-built MCP server handles errors gracefully — it returns a JSON-RPC error response with a message, but stays alive and ready for the next request. The client receives the error and can display it.',
      },
      {
        q: 'In real-world terms, what is an "MCP client"?',
        options: [
          'Only Claude Desktop',
          'Any application or AI model that connects to an MCP server to use its tools',
          'A Python library only',
          'A cloud service',
        ],
        correct: 1,
        explanation: 'An MCP client is ANY application that speaks the MCP protocol — Claude Desktop, MCP Inspector, custom scripts, AI agents. The protocol is open, so any client that knows JSON-RPC can connect.',
      },
    ],

    completionDialogue: [
      {
        char: 'portalowl',
        name: 'Portal Owl',
        role: 'Client-Side Guide',
        emoji: '🦉',
        text: 'Hoo hoo! You\'ve done it! You connected, explored, called tools, and even handled an error! That\'s the full client-server loop. One more challenge awaits — the Final Boss!',
      },
    ],

    realWorldTakeaway: 'When you open MCP Inspector or Claude Desktop and connect it to your running `uv run server.py`, you are the Portal Owl. You connect, list tools, run them, and see results — all through the invisible STDIO tunnel.',
  },

  // ──────────────────────────────────────────────────────────
  // CHAPTER 6 — Final Boss: Restore the Invisible Server
  // ──────────────────────────────────────────────────────────
  {
    id: 6,
    title: 'Restore the Invisible Server',
    subtitle: 'The Final Boss',
    icon: '🏰',
    color: '#ef4444',
    xpReward: 250,
    achievementId: 'invisible_architect',
    description: 'The academy\'s Invisible Server is broken in 5 ways. Use everything you\'ve learned to diagnose and fix it.',
    isFinalBoss: true,

    dialogue: [
      {
        char: 'syn',
        name: 'Headmaster Syn',
        role: 'Architect of the Academy',
        emoji: '🧙',
        text: 'Apprentice! The great Invisible Server at the heart of the academy has failed. Five problems, all at once. I need your combined knowledge to fix them.',
      },
      {
        char: 'syn',
        name: 'Headmaster Syn',
        role: 'Architect of the Academy',
        emoji: '🧙',
        text: 'You\'ve learned STDIO, tools, message flow, UV, and the client portal. Now apply all of it to diagnose and repair this broken architecture.',
      },
      {
        char: 'syn',
        name: 'Headmaster Syn',
        role: 'Architect of the Academy',
        emoji: '🧙',
        text: 'Five broken components. Five fixes. Begin.',
      },
    ],

    puzzle: {
      type: 'diagnosis',
      title: 'Diagnose the Broken Server',
      instructions: 'Five components are broken. Read each problem and click the correct fix.',
      problems: [
        {
          id: 'prob1',
          icon: '🌀',
          symptom: 'The server starts but the client receives no responses. Messages seem to vanish.',
          options: [
            'Switch STDOUT and STDIN connections — they are reversed',
            'Restart the server twice',
            'Add more Python functions',
          ],
          correct: 0,
          explanation: 'When STDIN and STDOUT are reversed, messages flow in the wrong direction. The client sends to what should be STDOUT, and the server reads from what should be STDIN — nothing connects.',
        },
        {
          id: 'prob2',
          icon: '⚗️',
          symptom: 'The client does tools/list and gets an empty list — no tools are found.',
          options: [
            'Add more print statements',
            'Add the @mcp.tool() decorator to all the Python functions',
            'Delete the server and start over',
          ],
          correct: 1,
          explanation: 'Without `@mcp.tool()`, Python functions exist but are NOT registered with MCP. They are invisible to the protocol. Adding the decorator is what "gives them a doorway".',
        },
        {
          id: 'prob3',
          icon: '📡',
          symptom: 'Tool calls return results with the wrong id — the client gets confused about which result belongs to which request.',
          options: [
            'Use a random id in every response',
            'Ignore the id field — it is optional',
            'Make sure every response uses the same id as its request',
          ],
          correct: 2,
          explanation: 'The id field in JSON-RPC is how requests and responses are matched. If a response uses the wrong id, the client cannot know which request was answered. The id must always match.',
        },
        {
          id: 'prob4',
          icon: '⚡',
          symptom: 'Setup takes 5 minutes and fails because of conflicting Python packages.',
          options: [
            'Use uv init + uv add to set up a clean isolated environment',
            'Install everything globally with sudo pip',
            'Use an older version of Python',
          ],
          correct: 0,
          explanation: 'UV creates an isolated virtual environment for the project. No global conflicts. No 5-minute waits. `uv init` + `uv add mcp` + `uv run` is the clean, fast path.',
        },
        {
          id: 'prob5',
          icon: '🌀',
          symptom: 'The client connects but sees "0 tools available" even though the Python functions are decorated correctly.',
          options: [
            'The server forgot to call mcp.run(transport="stdio") at startup',
            'The client is broken',
            'Too many tools were registered',
          ],
          correct: 0,
          explanation: 'Even with tools decorated and everything set up, the server must be started with `mcp.run(transport="stdio")`. Without this, the server never begins listening — it just exits silently.',
        },
      ],
      successMsg: '🏆 INCREDIBLE! All five problems fixed! The Invisible Server is RESTORED!',
    },

    terminal: {
      title: 'Academy Restored — Full System Check',
      steps: [
        { type: 'success', text: '✅ STDIO streams: STDIN → IN, STDOUT → OUT, STDERR → logs' },
        { type: 'success', text: '✅ Tools registered: add, subtract, multiply, divide' },
        { type: 'success', text: '✅ Message routing: all request IDs match responses' },
        { type: 'success', text: '✅ UV setup: clean environment, fast install, no conflicts' },
        { type: 'success', text: '✅ Server started: mcp.run(transport="stdio") — listening!' },
        { type: 'muted',   text: '' },
        { type: 'info',    text: '# Client connecting...' },
        { type: 'prompt',  text: '→ {"method":"tools/list","id":1}' },
        { type: 'response',text: '← {"result":{"tools":[{"name":"add"},{"name":"subtract"},{"name":"multiply"},{"name":"divide"}]}}' },
        { type: 'success', text: '🌟 THE INVISIBLE SERVER IS RESTORED!' },
        { type: 'success', text: '   Invisible? Yes. Powerless? Never.' },
      ],
    },

    quiz: [
      {
        q: 'What is the minimum required line to actually START an MCP server listening for connections?',
        options: [
          'import mcp',
          'def main(): pass',
          'mcp.run(transport="stdio")',
          'print("server ready")',
        ],
        correct: 2,
        explanation: '`mcp.run(transport="stdio")` is what starts the event loop and begins reading from STDIN. Without this line, all your decorated functions exist but the server never activates.',
      },
      {
        q: 'Which of these represents the complete, correct MCP server setup flow?',
        options: [
          'Write Python → run it with python server.py → done',
          'uv init → uv add mcp → write server with @mcp.tool() → uv run server.py',
          'Install globally with pip → skip venv → run as root',
          'Copy server code from the internet → guess the right imports',
        ],
        correct: 1,
        explanation: 'The complete flow is: `uv init` (create project) → `uv add mcp` (add dependency) → write your server with `@mcp.tool()` decorators → `mcp.run(transport="stdio")` → `uv run server.py`. This is the clean, fast, correct path.',
      },
      {
        q: 'Complete the sentence: "The server is invisible, but..."',
        options: [
          '"...that means it is broken"',
          '"...its behavior becomes visible through messages"',
          '"...only experts can understand it"',
          '"...it only works in production"',
        ],
        correct: 1,
        explanation: 'This is the core insight of MCP Academy! The server has no visible window — it lives in a process, reading and writing streams. But every action it takes is visible through the structured messages it exchanges.',
      },
    ],

    completionDialogue: [
      {
        char: 'syn',
        name: 'Headmaster Syn',
        role: 'Architect of the Academy',
        emoji: '🧙',
        text: 'EXTRAORDINARY! You have done it! The Invisible Server is restored! The pipes flow, the spells are forged, the messages route perfectly, the forge burns fast, and the portal is open!',
      },
      {
        char: 'syn',
        name: 'Headmaster Syn',
        role: 'Architect of the Academy',
        emoji: '🧙',
        text: 'You are no longer an apprentice. You are an Invisible Architect — one who understands that the greatest servers are the ones you cannot see, only feel through their behavior.',
      },
      {
        char: 'piper',
        name: 'Piper',
        role: 'Pipe Engineer',
        emoji: '🔧',
        text: 'The pipes sing!',
      },
      {
        char: 'hexa',
        name: 'Hexa',
        role: 'Spell Forge Mentor',
        emoji: '⚗️',
        text: 'The spells are registered!',
      },
      {
        char: 'tunnelfox',
        name: 'Tunnel Fox',
        role: 'Fast Messenger',
        emoji: '🦊',
        text: 'The messages flow!',
      },
      {
        char: 'uvsprite',
        name: 'Forge Sprite UV',
        role: 'Energetic Builder',
        emoji: '⚡',
        text: 'ZOOM! The forge burns!',
      },
      {
        char: 'portalowl',
        name: 'Portal Owl',
        role: 'Client-Side Guide',
        emoji: '🦉',
        text: 'The portal shimmers! Hoo hoo!',
      },
    ],

    realWorldTakeaway: 'You now know exactly how to build a real Python MCP server: create a project with UV, write Python functions decorated with @mcp.tool(), call mcp.run(transport="stdio"), and run it with uv run. The client connects, discovers tools, and calls them — all through the invisible STDIO tunnel.',
  },
];

/** Get chapter by id */
export function getChapter(id) {
  return CHAPTERS.find(c => c.id === id) || null;
}
