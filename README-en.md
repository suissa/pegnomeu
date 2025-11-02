<p align="center">
  <img src="https://i.imgur.com/cB70gh8.png" width="480" alt="PegNoMeu logo"/>
</p>

<p align="center">
The global dependency manager for Bun that Bun forgot to make
</p>


[![Bun](https://img.shields.io/badge/made%20for-bun-000000.svg?logo=bun)](https://bun.sh)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/pegnomeu.svg)](https://www.npmjs.com/package/pegnomeu)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6.svg)](https://www.typescriptlang.org/)

> "An intelligent global workspace for Bun, made by someone who got tired of waiting for Bun to finish Bun."

---

## 🌍 Languages / Idiomas

🇧🇷 [Português](README.md) | 🇺🇸 [English](README-en.md) | 🇪🇸 [Español](README-es.md) | 🇩🇪 [Deutsch](README-de.md) | 🇫🇷 [Français](README-fr.md) | 🇳🇱 [Nederlands](README-nl.md) | 🇯🇵 [日本語](README-jp.md) | 🇨🇳 [中文](README-ch.md) | 🇮🇳 [हिंदी](README-hi.md)

---

<p align="center">
  <h1 align="center">What is <br /><img src="https://i.imgur.com/cB70gh8.png" height="80" alt="PegNoMeu logo"/><br />?</h1>
</p>

**PegNoMeu** is a dependency manager with **global cache**, **auto-link**, **mini-workspaces** and **instant sync mode** — built 100% in **Bun + TypeScript**.

The idea was born because Bun promised "speed and simplicity" — but in practice, an essential layer is still missing:  
**real dependency reuse between projects**.

Each project reinstalls the same libs. Each build downloads again. Each dev wastes time.

**PegNoMeu** solves this by creating a **global workspace** on your system, where dependencies are installed once and reused via *symlinks* (or copies, if you prefer).

---

## 🧪 Motivation: why did we create this for Bun?

Bun is fast.  
But fast **alone** is not enough.

npm and pnpm already understood that the future is **shared cache and package atomicity** — but Bun still depends on lockfiles and redundant reinstallation.

The **PegNoMeu** philosophy is simple:

> **Code is ephemeral, cache is eternal.**

When you install `axios@latest` in one project, why download it again in another?  
**PegNoMeu** creates a global repository (`~/.pegnomeu_workspace/js`) and links packages directly to projects — like a dependency brain.

Additionally, it adds something no other manager offers:

### 🧠 Mini-workspaces (the "presets")

You can save dependency sets and apply them to any project:
```bash
pegnomeu axios fastify zod
# Asks if you want to save as preset → type "api"

pegnomeu use api
# installs everything again instantly
```

---

## ⚡️ Main features

| Feature | Description |
|----------|------------|
| 💾 **Intelligent Global Cache** | Each package is installed only once on the system. |
| 🪄 **Automatic Symlinks** | No `node_modules` duplication, everything points to global cache. |
| 📦 **Copy mode (`--copy`)** | If you want completely isolated builds. |
| 📚 **Mini-Workspaces** | Create named dependency sets and reapply in seconds. |
| 🧩 **Compatible with any Bun project** | Uses only native APIs (`fs`, `os`, `path`, `child_process`). |
| 🛠️ **`--dev` mode** | Adds packages directly to `devDependencies`. |
| 🧭 **`sync` mode** | Copies entire global workspace to local `node_modules`. |
| 🖼️ **Colored logs (`kleur`)** | Clear and fun feedback. |
| 🤗 **No external runtime dependencies** | Only `kleur` and Bun. |

---

## 🚀 Installation

```bash
bun add -g pegnomeu

npm i -g pegnomeu

# or running directly
npx pegnomeu
```

Verify:
```bash
pegnomeu --help
```

Expected output:
```
pegnomeu CLI 1.3.0

Usage:
  pegnomeu axios@latest   → Installs package directly
  pegnomeu use api        → Uses saved miniworkspace
  pegnomeu list           → Lists miniworkspaces
  pegnomeu --dev          → Installs as devDependency
  pegnomeu --copy         → Copies instead of linking
  pegnomeu sync           → Copies entire global workspace
  pegnomeu --verbose      → Detailed logs
```

---

## 💡 Usage example

```bash
# Installs axios globally and links to current project
pegnomeu axios

# Installs multiple packages
pegnomeu fastify zod openai

# Adds development packages
pegnomeu --dev vitest typescript

# Creates and saves a mini-workspace
pegnomeu use api
```

---

## 📁 Internal structure

PegNoMeu automatically creates:

```
~/.pegnomeu/
├── js/
│   ├── axios__latest/
│   ├── fastify__5.0.0/
│   └── zod__3.23.0/
└── presets/
    ├── api.json
    ├── web.json
    └── utils.json
```

Each package is a complete directory (physical and reusable cache).
Presets are JSON descriptions with dependency lists.

---

## 🧠 Design philosophy

The project follows three principles:

1. **Zero redundancy** — Nothing is installed twice.
2. **Intelligent linking** — Each `node_modules` is a window to the global workspace.
3. **Brutalist simplicity** — Everything in TypeScript, no hidden magic.

---

## 🔮 Roadmap

- [ ] Multi-language support (`.pegnomeu/py`, `.pegnomeu/rust`)
- [ ] Hash-based registry (package checksum + version)
- [ ] Distributed sync via IPFS or NFS
- [ ] Interactive CLI UI (`pegnomeu ui`)
- [ ] Integration with local `pegnomeu.json`

---

## 💬 Why "PegNoMeu"?

Because **every tool needs a good provocation.**  
The idea is that it "grabs your module", but intelligently —  
making the global link of what should have been global from the beginning.

The name is an ironic homage to Brazilian hacker culture:  
provocative, good-humored and functional.

---

## 🧑‍💻 Author

**Suissera da Bahia**  
Senior developer passionate about distributed, resilient architectures and AI.  
Creator of the **Full Agentic Stack**, **EnzyChop.Tech**, **Virion.Delivery** ecosystem, and now… **PegNoMeu**.

---

## 📄 License

MIT © Suissa — free to use, remix and improve.  
But if it breaks, it was Bun's fault.