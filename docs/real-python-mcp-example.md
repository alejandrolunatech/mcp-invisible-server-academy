# Real Python MCP Server Example

This guide shows you how to build the actual MCP server that the game simulates.

---

## Prerequisites

- Python 3.11+
- [`uv`](https://docs.astral.sh/uv/) (fast Python package manager)

---

## Step 1 — Install uv

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Or with Homebrew:

```bash
brew install uv
```

---

## Step 2 — Create a New Project

```bash
uv init my-mcp-server
cd my-mcp-server
```

---

## Step 3 — Add the FastMCP Dependency

```bash
uv add fastmcp
```

This creates a virtual environment and installs `fastmcp` (and its dependencies including `mcp`) automatically.

---

## Step 4 — Write the Server (`server.py`)

```python
from fastmcp import FastMCP

# Create the MCP server instance
mcp = FastMCP("My Calculator Server")


@mcp.tool()
def add(a: float, b: float) -> float:
    """Add two numbers together."""
    return a + b


@mcp.tool()
def subtract(a: float, b: float) -> float:
    """Subtract b from a."""
    return a - b


@mcp.tool()
def multiply(a: float, b: float) -> float:
    """Multiply two numbers."""
    return a * b


@mcp.tool()
def divide(a: float, b: float) -> float:
    """Divide a by b. Raises an error if b is zero."""
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b


if __name__ == "__main__":
    # Runs over STDIO — the standard MCP transport
    mcp.run()
```

---

## Step 5 — Run the Server

```bash
uv run server.py
```

The server now listens on **STDIN** for JSON-RPC messages and responds on **STDOUT**.  
It is "invisible" — no browser window, no HTTP port. It lives entirely in the pipe.

---

## Step 6 — Connect a Client (Claude Desktop)

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "my-calculator": {
      "command": "uv",
      "args": ["run", "/absolute/path/to/my-mcp-server/server.py"]
    }
  }
}
```

Restart Claude Desktop. You'll see "my-calculator" tools available in the conversation.

---

## How It Works

```
Claude Desktop (MCP Client)
        │
        │  JSON-RPC over STDIO
        ▼
  ┌─────────────────────────────┐
  │  uv run server.py           │
  │                             │
  │  FastMCP handles:           │
  │  • tools/list  → returns    │
  │    [add, subtract, ...]     │
  │  • tools/call  → executes   │
  │    the decorated function   │
  └─────────────────────────────┘
```

### JSON-RPC Flow

**Client sends:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "add",
    "arguments": { "a": 5, "b": 3 }
  }
}
```

**Server responds:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [{ "type": "text", "text": "8.0" }]
  }
}
```

---

## Key Concepts Demonstrated

| Game Concept | Real Code Equivalent |
|---|---|
| Whispering to the pipe | Writing JSON-RPC to STDIN |
| Listening at the tunnel | Reading JSON-RPC from STDOUT |
| Casting a spell | `@mcp.tool()` decorated function |
| The spellbook | `tools/list` response |
| The invisible server | `mcp.run()` over STDIO |
| UV Speed Forge | `uv init`, `uv add`, `uv run` |

---

## Advanced: Adding Resources

```python
@mcp.resource("config://settings")
def get_settings() -> str:
    """Expose configuration as a resource."""
    return '{"theme": "dark", "version": "1.0"}'
```

## Advanced: Adding Prompts

```python
@mcp.prompt()
def explain_error(error_message: str) -> str:
    """Generate a prompt to explain an error."""
    return f"Please explain this Python error in simple terms: {error_message}"
```

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `ModuleNotFoundError: fastmcp` | Run `uv add fastmcp` first |
| Server exits immediately | Make sure you call `mcp.run()` at the end |
| Client can't connect | Check the absolute path in `claude_desktop_config.json` |
| `divide by zero` error | The server correctly raises `ValueError` — the client handles it |
