# MCP Academy: The Invisible Server 🧙‍♂️

🎮 **[Play it live → https://alejandrolunatech.github.io/mcp-invisible-server-academy/#home](https://alejandrolunatech.github.io/mcp-invisible-server-academy/#home)**

An interactive browser-based educational game that teaches Python MCP (Model Context Protocol) server concepts through story, puzzles, and hands-on terminal challenges.

---

## 🎮 What You'll Learn

| Chapter | Topic |
|---------|-------|
| 1 – The Silent Hall | STDIO, pipes, stdin/stdout/stderr |
| 2 – The Spell Forge | Python tools & `@mcp.tool()` decorator |
| 3 – The Message Tunnel | JSON-RPC request/response flow |
| 4 – UV Speed Forge | `uv` package manager & virtual environments |
| 5 – The Client Portal | MCP client connecting & calling tools |
| 6 – Final Boss | Diagnose and restore a broken MCP server |

---

## 🚀 Running Locally

### Option A — Python (no install needed)

```bash
python3 -m http.server 8080
```

Open → **http://localhost:8080**

### Option B — Node (http-server)

```bash
npx http-server . -p 8080 -c-1
```

Open → **http://localhost:8080**

### Option C — VS Code Live Server

1. Install the **Live Server** extension.
2. Right-click `index.html` → **Open with Live Server**.

> ⚠️ **Must use a web server.** ES modules (`type="module"`) do not work over the `file://` protocol.

---

## 📁 Project Structure

```
mcp-invisible-server-academy/
├── index.html               # Main HTML shell
├── README.md
│
├── styles/
│   ├── base.css             # Design tokens, reset, typography
│   ├── layout.css           # Grid, flex, top-bar, responsive
│   ├── components.css       # Buttons, modal, dialogue, terminal …
│   ├── scenes.css           # Per-scene styles
│   └── effects.css          # Animations & keyframes
│
├── js/
│   ├── main.js              # Entry point — boots the game
│   ├── state.js             # Global game state (getState/setState/subscribe)
│   ├── router.js            # Hash-based scene router
│   ├── i18n.js              # Internationalisation (EN / ES / NL)
│   │
│   ├── data/
│   │   ├── chapters.js           # English chapter content (dialogue, puzzles, quizzes)
│   │   ├── chapters.es.js        # Spanish chapter translations
│   │   ├── chapters.nl.js        # Dutch chapter translations
│   │   ├── localizedChapters.js  # Helper — merges translated text onto EN metadata
│   │   ├── glossary.js           # English glossary terms
│   │   ├── glossary.es.js        # Spanish glossary
│   │   ├── glossary.nl.js        # Dutch glossary
│   │   ├── achievements.js       # English achievement definitions
│   │   ├── achievements.es.js    # Spanish achievements
│   │   └── achievements.nl.js    # Dutch achievements
│   │
│   ├── systems/
│   │   ├── saveSystem.js         # localStorage save/load/reset
│   │   ├── dialogueSystem.js
│   │   ├── quizSystem.js
│   │   ├── achievementSystem.js
│   │   ├── terminalSystem.js
│   │   └── puzzleSystem.js
│   │
│   ├── components/
│   │   ├── toast.js
│   │   ├── modal.js
│   │   ├── codePanel.js
│   │   ├── progressBar.js
│   │   ├── chapterCard.js
│   │   ├── dialogueBox.js
│   │   ├── terminalPanel.js
│   │   └── quizPanel.js
│   │
│   └── scenes/
│       ├── homeScene.js
│       ├── mapScene.js
│       ├── chapterScene.js
│       ├── glossaryScene.js
│       └── settingsScene.js
│
├── assets/
│   ├── images/
│   ├── audio/
│   └── icons/
│
├── docs/
│   ├── real-python-mcp-example.md
│   ├── uv-commands.md
│   └── teacher-guide.md
│
└── 0x_*.md                  # Game design & spec documents
```

---

## 🌍 Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Go to **Settings → Pages → Source → Deploy from branch → main / (root)**.
3. Your game is live at `https://<username>.github.io/<repo>/`.

No build step required — it's pure static HTML/CSS/JS.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Vanilla HTML5 |
| Styles | Vanilla CSS (custom properties) |
| Logic | Vanilla JS (ES Modules, no build tool) |
| Persistence | `localStorage` |
| Animations | CSS keyframes + Canvas API |
| Routing | Hash-based (`#home`, `#map`, `#chapter?id=1` …) |

---

## 🎓 Educator Resources

See [`docs/teacher-guide.md`](docs/teacher-guide.md) for:
- Lesson plan suggestions
- Manual test checklist
- Learning outcomes per chapter

---

## 📜 License

MIT — free to use, modify, and share for educational purposes.
