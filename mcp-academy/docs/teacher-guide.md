# Teacher & Parent Guide

**MCP Academy: The Invisible Server** is an interactive browser game for learners aged 12+ who are curious about how AI tools, servers, and Python actually work under the hood.

---

## 🎯 Learning Outcomes

After completing all 6 chapters, students will be able to:

1. **Explain STDIO communication** — describe how processes talk through stdin/stdout/stderr pipes
2. **Understand JSON-RPC** — read a basic request/response JSON message pair
3. **Write a Python tool** — use the `@mcp.tool()` decorator pattern
4. **Use UV** — initialize a Python project and install packages with `uv`
5. **Describe MCP architecture** — explain the client/server relationship in Model Context Protocol
6. **Debug a broken server** — identify common configuration and code errors

---

## 📚 Curriculum Alignment

| Chapter | Core CS Concept | Real-World Analogy Used |
|---------|----------------|------------------------|
| 1 | Inter-process communication | Magical pipes / whispering |
| 2 | Functions, decorators, APIs | Spell casting from a spellbook |
| 3 | Request/response, protocols | Message tunnels & echoes |
| 4 | Package management, environments | Speed forge / potion mixing |
| 5 | Client/server architecture | Portal key & connection ritual |
| 6 | Debugging, systems thinking | Diagnosing a broken castle |

---

## 🗓 Suggested Lesson Plans

### One-Session (60 min)

- Chapters 1–2 with class discussion after each
- Pause after each terminal simulation to ask: *"What did the server just receive? What did it send back?"*

### Two-Session (2 × 45 min)

- **Session 1**: Chapters 1–3 (communication fundamentals)
- **Session 2**: Chapters 4–6 (tooling, client, debugging)

### Self-Paced Individual Study

- Students complete all chapters independently
- Pair with `docs/real-python-mcp-example.md` for hands-on coding
- Final boss chapter as capstone assessment

---

## ✅ Manual Test Checklist

Use this checklist to verify the game is working correctly before a class session.

### Setup
- [ ] Web server is running (`python3 -m http.server 8080`)
- [ ] Game loads at `http://localhost:8080`
- [ ] Particle effects visible on home screen
- [ ] "Begin Your Journey" button navigates to map

### Chapter Flow (test Chapter 1)
- [ ] Click Chapter 1 card → opens chapter view
- [ ] Narrator dialogue types out character by character
- [ ] "Next" / "Continue" button advances dialogue
- [ ] Puzzle loads after dialogue completes
- [ ] Matching puzzle: drag-and-drop or click works
- [ ] Correct match shows ✅ feedback
- [ ] "Complete Puzzle" button activates after all matches
- [ ] Terminal simulation plays through steps automatically
- [ ] Quiz renders 3 questions with options
- [ ] Correct answer shows green highlight + XP pop
- [ ] Incorrect answer shows red + correct answer revealed
- [ ] Completion screen shows XP earned
- [ ] "Back to Map" returns to map with chapter marked ✓
- [ ] Chapter 2 unlocks on map

### Progress & Persistence
- [ ] Refresh the page → progress is preserved (localStorage)
- [ ] Settings → Reset Progress → confirm → returns to fresh start
- [ ] XP counter in top bar updates after each chapter

### Achievements
- [ ] Complete Chapter 1 → "First Spell" badge toasts
- [ ] Open Glossary → all terms visible → "Wordsmith" badge (may need all 14 found)
- [ ] Answer all quiz questions correctly in one chapter → "Quiz Ace" badge

### Final Boss (Chapter 6)
- [ ] Only unlocks after completing chapters 1–5
- [ ] Diagnosis puzzle shows 5 broken components
- [ ] Each fix awards XP
- [ ] Completing all 5 shows victory screen

### Accessibility
- [ ] Settings → Reduce Motion → animations disable
- [ ] Tab navigation works through main buttons
- [ ] High contrast readable on both light and dark displays

---

## 💬 Discussion Questions

**After Chapter 1:**
> "When you type a command in a terminal, which stream carries your input — stdin, stdout, or stderr?"

**After Chapter 2:**
> "What's the difference between a *function* and a *tool*? (Hint: a tool is just a function the AI can *call*.)"

**After Chapter 3:**
> "Why do you think MCP uses JSON-RPC instead of just plain text?"

**After Chapter 4:**
> "Why is it important to use a virtual environment instead of installing packages globally?"

**After Chapter 5:**
> "The MCP server has no browser window and no visible interface. How does the client know what tools are available?"

**After Final Boss:**
> "If you were building your own AI tool, what would you make it do? What would the `@mcp.tool()` function look like?"

---

## 🏆 Achievement Reference

| Achievement | How to Earn |
|-------------|------------|
| 🔧 Pipe Fixer | Complete Chapter 1 |
| ✨ First Spell | Complete Chapter 2 |
| 📡 Tunnel Listener | Complete Chapter 3 |
| ⚡ UV Sprinter | Complete Chapter 4 |
| 🌀 Portal Explorer | Complete Chapter 5 |
| 🏛 Invisible Architect | Complete the Final Boss |
| 🎯 Quiz Ace | Score 100% on any chapter quiz |
| 📖 Wordsmith | Discover all 14 glossary terms |

---

## 🛠 Troubleshooting for Educators

| Issue | Solution |
|-------|----------|
| Game shows blank screen | Use a web server — not `file://` |
| Progress resets after refresh | Check that `localStorage` is not blocked (private/incognito mode disables it) |
| Animations too distracting | Enable "Reduce Motion" in Settings |
| Student is stuck on a puzzle | Puzzles have no fail state — they can retry as many times as needed |
| Can't complete final boss | Confirm chapters 1–5 are all marked complete on the map |
| Sound effects not playing | Game uses no audio by default — safe for classroom use |

---

## 📎 Companion Resources

- [`real-python-mcp-example.md`](real-python-mcp-example.md) — Build the real server from scratch
- [`uv-commands.md`](uv-commands.md) — UV command cheat sheet for hands-on exercises
- [FastMCP documentation](https://gofastmcp.com) — Full framework reference
- [Model Context Protocol spec](https://modelcontextprotocol.io) — Official MCP documentation
- [uv documentation](https://docs.astral.sh/uv/) — Official uv reference
