# UV Command Reference

`uv` is a blazing-fast Python package manager and project tool written in Rust.  
It replaces `pip`, `venv`, `pip-tools`, and `pyenv` in a single binary.

---

## Installation

```bash
# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# macOS (Homebrew)
brew install uv

# Windows (PowerShell)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

---

## Project Lifecycle

### Create a new project

```bash
uv init my-project
cd my-project
```

Creates:
```
my-project/
├── pyproject.toml   # project metadata + dependencies
├── .python-version  # pinned Python version
├── .venv/           # virtual environment (auto-created on first uv run)
└── main.py
```

---

### Add a dependency

```bash
uv add fastmcp
uv add httpx pandas numpy
uv add "requests>=2.31"
```

- Installs into `.venv/` automatically
- Updates `pyproject.toml` and `uv.lock`

### Remove a dependency

```bash
uv remove fastmcp
```

### Sync dependencies (install all from lockfile)

```bash
uv sync
```

---

## Running Code

### Run a script (using the project's venv)

```bash
uv run server.py
uv run python -c "import fastmcp; print(fastmcp.__version__)"
```

### Run a Python module

```bash
uv run -m pytest
uv run -m http.server 8080
```

---

## Virtual Environments

### Create/recreate the venv

```bash
uv venv
uv venv --python 3.12        # specify Python version
```

### Activate manually (if needed)

```bash
source .venv/bin/activate    # macOS/Linux
.venv\Scripts\activate       # Windows
```

> With `uv run`, you never need to activate manually.

---

## Python Version Management

### Pin a Python version for the project

```bash
uv python pin 3.12
```

### List available Pythons

```bash
uv python list
```

### Install a specific Python version

```bash
uv python install 3.12
```

---

## Package Information

### List installed packages

```bash
uv pip list
```

### Show package details

```bash
uv pip show fastmcp
```

### Check for outdated packages

```bash
uv pip list --outdated
```

---

## Tool Execution (without a project)

Run a one-off tool without installing it permanently:

```bash
uvx ruff check .             # run ruff linter
uvx black server.py          # run black formatter
uvx pytest                   # run pytest
```

---

## Speed Comparison

| Task | pip | uv |
|------|-----|----|
| Install fastmcp | ~8s | ~0.3s |
| Create venv | ~2s | ~0.05s |
| Resolve deps | slow | near-instant |

`uv` is typically **10–100× faster** than pip because it uses a compiled Rust resolver with a global package cache.

---

## Common Workflows

### Start a new MCP server project from scratch

```bash
uv init my-mcp-server
cd my-mcp-server
uv add fastmcp
uv run server.py
```

### Reproduce someone else's project

```bash
git clone <repo>
cd <repo>
uv sync          # installs everything from uv.lock
uv run main.py
```

### Update all dependencies

```bash
uv lock --upgrade
uv sync
```

---

## pyproject.toml Example

After `uv init` + `uv add fastmcp`, your `pyproject.toml` will look like:

```toml
[project]
name = "my-mcp-server"
version = "0.1.0"
description = "My MCP server"
requires-python = ">=3.11"
dependencies = [
    "fastmcp>=2.0",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `uv: command not found` | Re-run the install script and restart your shell |
| Python version not found | Run `uv python install 3.12` |
| Stale lockfile | Run `uv lock --upgrade` then `uv sync` |
| `.venv` corrupted | Delete `.venv/` and run `uv sync` again |
| `uv run` can't find script | Make sure you're in the project directory |

---

## Further Reading

- [uv documentation](https://docs.astral.sh/uv/)
- [uv GitHub repository](https://github.com/astral-sh/uv)
- [FastMCP documentation](https://gofastmcp.com)
