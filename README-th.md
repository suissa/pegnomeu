<p align="center">
  <img src="https://i.imgur.com/cB70gh8.png" width="480" alt="PegNoMeu logo"/>
</p>

<p align="center">
ตัวจัดการ dependency แบบ global สำหรับ Bun ที่ Bun ลืมสร้าง
</p>


[![Bun](https://img.shields.io/badge/made%20for-bun-000000.svg?logo=bun)](https://bun.sh)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/pegnomeu.svg)](https://www.npmjs.com/package/pegnomeu)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6.svg)](https://www.typescriptlang.org/)

> "workspace แบบ global ที่ฉลาดสำหรับ Bun ที่สร้างโดยคนที่เบื่อการรอให้ Bun ทำ Bun ให้เสร็จ"

---

## 🌍 ภาษา / Languages

🇧🇷 [Português](README.md) | 🇺🇸 [English](README-en.md) | 🇪🇸 [Español](README-es.md) | 🇩🇪 [Deutsch](README-de.md) | 🇫🇷 [Français](README-fr.md) | 🇳🇱 [Nederlands](README-nl.md) | 🇯🇵 [日本語](README-jp.md) | 🇨🇳 [中文](README-ch.md) | 🇮🇳 [हिंदी](README-hi.md) | 🇷🇺 [Русский](README-ru.md) | 🇵🇱 [Polski](README-pl.md) | 🇮🇹 [Italiano](README-it.md) | 🇰🇷 [한국어](README-kr.md) | 🇸🇦 [العربية](README-ar.md) | 🇹🇷 [Türkçe](README-tr.md) | 🇸🇪 [Svenska](README-se.md) | 🇻🇳 [Tiếng Việt](README-vn.md) | 🇹🇭 [ไทย](README-th.md) | 🇮🇱 [עברית](README-he.md) | 🇮🇩 [Bahasa Indonesia](README-id.md)

---

<p align="center">
  <h1 align="center"><br /><img src="https://i.imgur.com/cB70gh8.png" height="80" alt="PegNoMeu logo"/><br /> คืออะไร?</h1>
</p>

**PegNoMeu** คือตัวจัดการ dependency ที่มี **global cache**, **auto-link**, **mini-workspaces** และ **โหมดซิงค์แบบทันที** — สร้างด้วย **Bun + TypeScript** 100%

ไอเดียนี้เกิดขึ้นเพราะ Bun สัญญาว่าจะให้ "ความเร็วและความเรียบง่าย" — แต่ในทางปฏิบัติ ยังขาดชั้นสำคัญอยู่:  
**การใช้ dependency ซ้ำระหว่างโปรเจกต์อย่างแท้จริง**

ทุกโปรเจกต์ติดตั้งไลบรารีเดิมซ้ำ ทุกการ build ดาวน์โหลดใหม่ ทุกนักพัฒนาเสียเวลา

**PegNoMeu** แก้ปัญหานี้โดยสร้าง **workspace แบบ global** ในระบบของคุณ ที่ dependency จะถูกติดตั้งครั้งเดียวและใช้ซ้ำผ่าน *symbolic links* (หรือ copies หากคุณต้องการ)

---

## 🧪 แรงบันดาลใจ: ทำไมเราถึงสร้างสิ่งนี้สำหรับ Bun?

Bun เร็ว  
แต่เร็ว**เพียงอย่างเดียว**ไม่พอ

npm และ pnpm เข้าใจแล้วว่าอนาคตคือ **shared cache และ package atomicity** — แต่ Bun ยังคงพึ่งพา lockfiles และการติดตั้งซ้ำที่ไม่จำเป็น

ปรัชญาของ **PegNoMeu** เรียบง่าย:

> **โค้ดเป็นสิ่งชั่วคราว cache เป็นนิรันดร์**

เมื่อคุณติดตั้ง `axios@latest` ในโปรเจกต์หนึ่ง ทำไมต้องดาวน์โหลดใหม่ในอีกโปรเจกต์?  
**PegNoMeu** สร้าง global repository (`~/.pegnomeu_workspace/js`) และเชื่อมโยง packages โดยตรงกับโปรเจกต์ — เหมือนสมองของ dependency

นอกจากนี้ยังเพิ่มสิ่งที่ไม่มี manager ตัวไหนเสนอ:

### 🧠 Mini-workspaces ("presets")

คุณสามารถบันทึกชุด dependency และนำไปใช้กับโปรเจกต์ใดก็ได้:
```bash
pegnomeu axios fastify zod
# ถามว่าต้องการบันทึกเป็น preset ไหม → พิมพ์ "api"

pegnomeu use api
# ติดตั้งทุกอย่างใหม่ทันที
```

---

## ⚡️ ฟีเจอร์หลัก

| ฟีเจอร์ | คำอธิบาย |
|----------|------------|
| 💾 **Global Cache ที่ฉลาด** | แต่ละ package ติดตั้งเพียงครั้งเดียวในระบบ |
| 🪄 **Symbolic Links อัตโนมัติ** | ไม่มีการซ้ำซ้อนของ `node_modules` ทุกอย่างชี้ไปที่ global cache |
| 📦 **โหมด copy (`--copy`)** | หากคุณต้องการ build ที่แยกออกจากกันโดยสมบูรณ์ |
| 📚 **Mini-Workspaces** | สร้างชุด dependency ที่มีชื่อและนำมาใช้ใหม่ในไม่กี่วินาที |
| 🧩 **เข้ากันได้กับโปรเจกต์ Bun ใดๆ** | ใช้เฉพาะ native APIs (`fs`, `os`, `path`, `child_process`) |
| 🛠️ **โหมด `--dev`** | เพิ่ม packages โดยตรงใน `devDependencies` |
| 🧭 **โหมด `sync`** | คัดลอก global workspace ทั้งหมดไปยัง local `node_modules` |
| 🖼️ **Logs สีสัน (`kleur`)** | ข้อมูลป้อนกลับที่ชัดเจนและสนุก |
| 🤗 **ไม่มี external runtime dependencies** | เฉพาะ `kleur` และ Bun |

---

## 🚀 การติดตั้ง

```bash
bun add -g pegnomeu

npm i -g pegnomeu

# หรือรันโดยตรง
npx pegnomeu
```

ตรวจสอบ:
```bash
pegnomeu --help
```

ผลลัพธ์ที่คาดหวัง:
```
pegnomeu CLI 1.3.0

การใช้งาน:
  pegnomeu axios@latest   → ติดตั้ง package โดยตรง
  pegnomeu use api        → ใช้ miniworkspace ที่บันทึกไว้
  pegnomeu list           → แสดงรายการ miniworkspaces
  pegnomeu --dev          → ติดตั้งเป็น devDependency
  pegnomeu --copy         → คัดลอกแทนการเชื่อมโยง
  pegnomeu sync           → คัดลอก global workspace ทั้งหมด
  pegnomeu --verbose      → logs แบบละเอียด
```

---

## 💡 ตัวอย่างการใช้งาน

```bash
# ติดตั้ง axios แบบ global และเชื่อมโยงกับโปรเจกต์ปัจจุบัน
pegnomeu axios

# ติดตั้งหลาย packages
pegnomeu fastify zod openai

# เพิ่ม development packages
pegnomeu --dev vitest typescript

# สร้างและบันทึก mini-workspace
pegnomeu use api
```

---

## 📁 โครงสร้างภายใน

PegNoMeu สร้างโดยอัตโนมัติ:

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

แต่ละ package เป็น directory ที่สมบูรณ์ (cache ทางกายภาพและใช้ซ้ำได้)
Presets เป็นคำอธิบาย JSON พร้อมรายการ dependency

---

## 🧠 ปรัชญาการออกแบบ

โปรเจกต์ปฏิบัติตามหลักการสามข้อ:

1. **ไม่มีความซ้ำซ้อน** — ไม่มีอะไรถูกติดตั้งสองครั้ง
2. **การเชื่อมโยงที่ฉลาด** — ทุก `node_modules` เป็นหน้าต่างสู่ global workspace
3. **ความเรียบง่ายแบบ brutalist** — ทุกอย่างใน TypeScript ไม่มีเวทมนตร์ที่ซ่อนอยู่

---

## 🔮 แผนงาน

- [ ] รองรับหลายภาษา (`.pegnomeu/py`, `.pegnomeu/rust`)
- [ ] Registry ที่ใช้ hash (package checksum + version)
- [ ] การซิงค์แบบกระจายผ่าน IPFS หรือ NFS
- [ ] UI CLI แบบโต้ตอบ (`pegnomeu ui`)
- [ ] การรวมกับ local `pegnomeu.json`

---

## 💬 ทำไมถึงเป็น "PegNoMeu"?

เพราะ**ทุกเครื่องมือต้องการการยั่วยุที่ดี**  
ไอเดียคือมัน "จับโมดูลของคุณ" แต่อย่างฉลาด —  
สร้างการเชื่อมโยงแบบ global ของสิ่งที่ควรจะเป็น global ตั้งแต่แรก

ชื่อนี้เป็นการแสดงความเคารพอย่างประชดประชันต่อวัฒนธรรม hacker ของบราซิล:  
ยั่วยุ ตลก และใช้งานได้

---

## 🧑‍💻 ผู้เขียน

**Suissera da Bahia**  
Senior developer ที่หลงใหลใน distributed, resilient architectures และ AI  
ผู้สร้าง ecosystem **Full Agentic Stack**, **EnzyChop.Tech**, **Virion.Delivery** และตอนนี้… **PegNoMeu**

---

## 📄 ใบอนุญาต

MIT © Suissa — เสรีในการใช้ remix และปรับปรุง  
แต่ถ้ามันพัง นั่นเป็นความผิดของ Bun