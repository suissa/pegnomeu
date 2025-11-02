<p align="center">
  <img src="https://i.imgur.com/cB70gh8.png" width="480" alt="PegNoMeu logo"/>
</p>

<p align="center">
Den globala beroendehanteraren för Bun som Bun glömde att skapa
</p>


[![Bun](https://img.shields.io/badge/made%20for-bun-000000.svg?logo=bun)](https://bun.sh)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/pegnomeu.svg)](https://www.npmjs.com/package/pegnomeu)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6.svg)](https://www.typescriptlang.org/)

> "En intelligent global arbetsyta för Bun, skapad av någon som tröttnade på att vänta på att Bun skulle färdigställa Bun."

---

## 🌍 Språk / Languages

🇧🇷 [Português](README.md) | 🇺🇸 [English](README-en.md) | 🇪🇸 [Español](README-es.md) | 🇩🇪 [Deutsch](README-de.md) | 🇫🇷 [Français](README-fr.md) | 🇳🇱 [Nederlands](README-nl.md) | 🇯🇵 [日本語](README-jp.md) | 🇨🇳 [中文](README-ch.md) | 🇮🇳 [हिंदी](README-hi.md) | 🇷🇺 [Русский](README-ru.md) | 🇵🇱 [Polski](README-pl.md) | 🇮🇹 [Italiano](README-it.md) | 🇰🇷 [한국어](README-kr.md) | 🇸🇦 [العربية](README-ar.md) | 🇹🇷 [Türkçe](README-tr.md) | 🇸🇪 [Svenska](README-se.md) | 🇻🇳 [Tiếng Việt](README-vn.md) | 🇹🇭 [ไทย](README-th.md) | 🇮🇱 [עברית](README-he.md) | 🇮🇩 [Bahasa Indonesia](README-id.md)

---

<p align="center">
  <h1 align="center">Vad är <br /><img src="https://i.imgur.com/cB70gh8.png" height="80" alt="PegNoMeu logo"/><br />?</h1>
</p>

**PegNoMeu** är en beroendehanterare med **global cache**, **auto-länkning**, **mini-arbetsytor** och **omedelbart synkroniseringsläge** — byggd 100% i **Bun + TypeScript**.

Idén föddes eftersom Bun lovade "hastighet och enkelhet" — men i praktiken saknas fortfarande ett väsentligt lager:  
**verklig återanvändning av beroenden mellan projekt**.

Varje projekt ominstallerar samma bibliotek. Varje bygge laddar ner igen. Varje utvecklare slösar tid.

**PegNoMeu** löser detta genom att skapa en **global arbetsyta** i ditt system, där beroenden installeras en gång och återanvänds via *symboliska länkar* (eller kopior, om du föredrar).

---

## 🧪 Motivation: varför skapade vi detta för Bun?

Bun är snabb.  
Men snabb **ensam** räcker inte.

npm och pnpm har redan förstått att framtiden är **delad cache och paketatomicitet** — men Bun är fortfarande beroende av låsfiler och redundant ominstallation.

**PegNoMeu**s filosofi är enkel:

> **Kod är tillfällig, cache är evig.**

När du installerar `axios@latest` i ett projekt, varför ladda ner det igen i ett annat?  
**PegNoMeu** skapar ett globalt förråd (`~/.pegnomeu_workspace/js`) och länkar paket direkt till projekt — som en beroendehjärna.

Dessutom lägger det till något som ingen annan hanterare erbjuder:

### 🧠 Mini-arbetsytor ("förinställningar")

Du kan spara beroendeuppsättningar och tillämpa dem på vilket projekt som helst:
```bash
pegnomeu axios fastify zod
# Frågar om du vill spara som förinställning → skriv "api"

pegnomeu use api
# installerar allt igen omedelbart
```

---

## ⚡️ Huvudfunktioner

| Funktion | Beskrivning |
|----------|------------|
| 💾 **Intelligent Global Cache** | Varje paket installeras endast en gång i systemet. |
| 🪄 **Automatiska Symboliska Länkar** | Ingen `node_modules` duplicering, allt pekar på global cache. |
| 📦 **Kopieringsläge (`--copy`)** | Om du vill ha helt isolerade byggen. |
| 📚 **Mini-Arbetsytor** | Skapa namngivna beroendeuppsättningar och återanvänd på sekunder. |
| 🧩 **Kompatibel med alla Bun-projekt** | Använder endast inbyggda API:er (`fs`, `os`, `path`, `child_process`). |
| 🛠️ **`--dev` läge** | Lägger till paket direkt i `devDependencies`. |
| 🧭 **`sync` läge** | Kopierar hela globala arbetsytan till lokala `node_modules`. |
| 🖼️ **Färgade loggar (`kleur`)** | Tydlig och rolig återkoppling. |
| 🤗 **Inga externa runtime-beroenden** | Endast `kleur` och Bun. |

---

## 🚀 Installation

```bash
bun add -g pegnomeu

npm i -g pegnomeu

# eller kör direkt
npx pegnomeu
```

Verifiera:
```bash
pegnomeu --help
```

Förväntad utdata:
```
pegnomeu CLI 1.3.0

Användning:
  pegnomeu axios@latest   → Installerar paket direkt
  pegnomeu use api        → Använder sparad miniarbetsyta
  pegnomeu list           → Listar miniarbetsytor
  pegnomeu --dev          → Installerar som devDependency
  pegnomeu --copy         → Kopierar istället för att länka
  pegnomeu sync           → Kopierar hela globala arbetsytan
  pegnomeu --verbose      → Detaljerade loggar
```

---

## 💡 Användningsexempel

```bash
# Installerar axios globalt och länkar till aktuellt projekt
pegnomeu axios

# Installerar flera paket
pegnomeu fastify zod openai

# Lägger till utvecklingspaket
pegnomeu --dev vitest typescript

# Skapar och sparar en mini-arbetsyta
pegnomeu use api
```

---

## 📁 Intern struktur

PegNoMeu skapar automatiskt:

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

Varje paket är en komplett katalog (fysisk och återanvändbar cache).
Förinställningar är JSON-beskrivningar med beroendelistor.

---

## 🧠 Designfilosofi

Projektet följer tre principer:

1. **Noll redundans** — Inget installeras två gånger.
2. **Intelligent länkning** — Varje `node_modules` är ett fönster till den globala arbetsytan.
3. **Brutalistisk enkelhet** — Allt i TypeScript, ingen dold magi.

---

## 🔮 Färdplan

- [ ] Flerspråksstöd (`.pegnomeu/py`, `.pegnomeu/rust`)
- [ ] Hash-baserat register (paketets kontrollsumma + version)
- [ ] Distribuerad synkronisering via IPFS eller NFS
- [ ] Interaktivt CLI-gränssnitt (`pegnomeu ui`)
- [ ] Integration med lokal `pegnomeu.json`

---

## 💬 Varför "PegNoMeu"?

För att **varje verktyg behöver en bra provokation.**  
Idén är att det "griper din modul", men intelligent —  
skapar den globala länken för det som borde ha varit globalt från början.

Namnet är en ironisk hyllning till brasiliansk hackerkultur:  
provokativ, humoristisk och funktionell.

---

## 🧑‍💻 Författare

**Suissera da Bahia**  
Senior utvecklare passionerad om distribuerade, motståndskraftiga arkitekturer och AI.  
Skapare av **Full Agentic Stack**, **EnzyChop.Tech**, **Virion.Delivery** ekosystemet, och nu… **PegNoMeu**.

---

## 📄 Licens

MIT © Suissa — fri att använda, remixa och förbättra.  
Men om det går sönder var det Buns fel.