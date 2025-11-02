<p align="center">
  <img src="https://i.imgur.com/cB70gh8.png" width="480" alt="PegNoMeu logo"/>
</p>

<p align="center">
Il gestore globale di dipendenze per Bun che Bun si è dimenticato di fare
</p>


<p align="center">
  <a href="https://bun.sh" target="_blank"><img src="https://img.shields.io/badge/made%20for-bun-000000.svg?logo=bun" /></a>
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" />
  <a href="https://www.npmjs.com/package/pegnomeu" target="_blank">
    <img src="https://img.shields.io/npm/v/pegnomeu.svg" />
  </a>
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178c6.svg" />
</p>

> "Un workspace globale intelligente per Bun, fatto da qualcuno che si è stancato di aspettare che Bun finisse Bun."

---

## 🌍 Lingue / Languages

🇧🇷 [Português](README.md) | 🇺🇸 [English](README-en.md) | 🇪🇸 [Español](README-es.md) | 🇩🇪 [Deutsch](README-de.md) | 🇫🇷 [Français](README-fr.md) | 🇳🇱 [Nederlands](README-nl.md) | 🇯🇵 [日本語](README-jp.md) | 🇨🇳 [中文](README-ch.md) | 🇮🇳 [हिंदी](README-hi.md) | 🇷🇺 [Русский](README-ru.md) | 🇵🇱 [Polski](README-pl.md) | 🇮🇹 [Italiano](README-it.md) | 🇰🇷 [한국어](README-kr.md) | 🇸🇦 [العربية](README-ar.md)

---

<p align="center">
  <h1 align="center">Cos'è <br /><img src="https://i.imgur.com/cB70gh8.png" height="80" alt="PegNoMeu logo"/><br />?</h1>
</p>

**PegNoMeu** è un gestore di dipendenze con **cache globale**, **auto-link**, **mini-workspace** e **modalità di sincronizzazione istantanea** — costruito al 100% in **Bun + TypeScript**.

L'idea è nata perché Bun ha promesso "velocità e semplicità" — ma in pratica, manca ancora uno strato essenziale:  
**riutilizzo reale delle dipendenze tra progetti**.

Ogni progetto reinstalla le stesse librerie. Ogni build scarica di nuovo. Ogni sviluppatore perde tempo.

**PegNoMeu** risolve questo creando un **workspace globale** nel tuo sistema, dove le dipendenze vengono installate una volta e riutilizzate tramite *symlink* (o copie, se preferisci).

---

## 🧪 Motivazione: perché l'abbiamo creato per Bun?

Bun è veloce.  
Ma veloce **da solo** non basta.

npm e pnpm hanno già capito che il futuro è **cache condivisa e atomicità dei pacchetti** — ma Bun dipende ancora da lockfile e reinstallazione ridondante.

La filosofia di **PegNoMeu** è semplice:

> **Il codice è effimero, la cache è eterna.**

Quando installi `axios@latest` in un progetto, perché scaricarlo di nuovo in un altro?  
**PegNoMeu** crea un repository globale (`~/.pegnomeu_workspace/js`) e collega i pacchetti direttamente ai progetti — come un cervello delle dipendenze.

Inoltre, aggiunge qualcosa che nessun altro gestore offre:

### 🧠 Mini-workspace (i "preset")

Puoi salvare set di dipendenze e applicarli a qualsiasi progetto:
```bash
pegnomeu axios fastify zod
# Chiede se vuoi salvare come preset → digita "api"

pegnomeu use api
# installa tutto di nuovo istantaneamente
```

---

## ⚡️ Caratteristiche principali

| Caratteristica | Descrizione |
|----------|------------|
| 💾 **Cache Globale Intelligente** | Ogni pacchetto viene installato solo una volta nel sistema. |
| 🪄 **Symlink automatici** | Nessuna duplicazione di `node_modules`, tutto punta alla cache globale. |
| 📦 **Modalità copia (`--copy`)** | Se vuoi build completamente isolate. |
| 📚 **Mini-Workspace** | Crea set di dipendenze nominati e riapplica in secondi. |
| 🧩 **Compatibile con qualsiasi progetto Bun** | Usa solo API native (`fs`, `os`, `path`, `child_process`). |
| 🛠️ **Modalità `--dev`** | Aggiunge pacchetti direttamente a `devDependencies`. |
| 🧭 **Modalità `sync`** | Copia tutto il workspace globale in `node_modules` locali. |
| 🖼️ **Log colorati (`kleur`)** | Feedback chiaro e divertente. |
| 🤗 **Nessuna dipendenza esterna di runtime** | Solo `kleur` e Bun. |

---

## 🚀 Installazione

```bash
bun add -g pegnomeu

npm i -g pegnomeu

# o eseguendo direttamente
npx pegnomeu
```

Verifica:
```bash
pegnomeu --help
```

Output atteso:
```
pegnomeu CLI 1.3.0

Uso:
  pegnomeu axios@latest   → Installa pacchetto direttamente
  pegnomeu use api        → Usa miniworkspace salvato
  pegnomeu list           → Elenca miniworkspace
  pegnomeu --dev          → Installa come devDependency
  pegnomeu --copy         → Copia invece di collegare
  pegnomeu sync           → Copia tutto il workspace globale
  pegnomeu --verbose      → Log dettagliati
```

---

## 💡 Esempio d'uso

```bash
# Installa axios globalmente e collega al progetto corrente
pegnomeu axios

# Installa più pacchetti
pegnomeu fastify zod openai

# Aggiunge pacchetti di sviluppo
pegnomeu --dev vitest typescript

# Crea e salva un mini-workspace
pegnomeu use api
```

---

## 📁 Struttura interna

PegNoMeu crea automaticamente:

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

Ogni pacchetto è una directory completa (cache fisica e riutilizzabile).
I preset sono descrizioni JSON con liste di dipendenze.

---

## 🧠 Filosofia di design

Il progetto segue tre principi:

1. **Zero ridondanza** — Niente viene installato due volte.
2. **Collegamento intelligente** — Ogni `node_modules` è una finestra sul workspace globale.
3. **Semplicità brutalista** — Tutto in TypeScript, senza magia nascosta.

---

## 🔮 Roadmap

- [ ] Supporto multi-linguaggio (`.pegnomeu/py`, `.pegnomeu/rust`)
- [ ] Registry basato su hash (checksum del pacchetto + versione)
- [ ] Sincronizzazione distribuita via IPFS o NFS
- [ ] UI CLI interattiva (`pegnomeu ui`)
- [ ] Integrazione con `pegnomeu.json` locale

---

## 💬 Perché "PegNoMeu"?

Perché **ogni strumento ha bisogno di una buona provocazione.**  
L'idea è che "afferra il tuo modulo", ma in modo intelligente —  
facendo il collegamento globale di ciò che dovrebbe essere globale fin dall'inizio.

Il nome è un omaggio ironico alla cultura hacker brasiliana:  
provocatoria, divertente e funzionale.

---

## 🧑‍💻 Autore

**Suissera da Bahia**  
Sviluppatore senior appassionato di architetture distribuite, resilienti e AI.  
Creatore dell'ecosistema **Full Agentic Stack**, **EnzyChop.Tech**, **Virion.Delivery**, e ora… **PegNoMeu**.

---

## 📄 Licenza

MIT © Suissa — libero di usare, remixare e migliorare.  
Ma se si rompe, è colpa di Bun.