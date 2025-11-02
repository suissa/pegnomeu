<p align="center">
  <img src="https://i.imgur.com/cB70gh8.png" width="480" alt="PegNoMeu logo"/>
</p>

<p align="center">
Manajer dependensi global untuk Bun yang Bun lupa buat
</p>


<p align="center">
  <a href="https://bun.sh" target="_blank"><img src="https://img.shields.io/badge/made%20for-bun-000000.svg?logo=bun" /></a>
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" />
  <a href="https://www.npmjs.com/package/pegnomeu" target="_blank">
    <img src="https://img.shields.io/npm/v/pegnomeu.svg" />
  </a>
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178c6.svg" />
</p>

> "Workspace global yang cerdas untuk Bun, dibuat oleh seseorang yang bosan menunggu Bun menyelesaikan Bun."

---

## 🌍 Bahasa / Languages

🇧🇷 [Português](README.md) | 🇺🇸 [English](README-en.md) | 🇪🇸 [Español](README-es.md) | 🇩🇪 [Deutsch](README-de.md) | 🇫🇷 [Français](README-fr.md) | 🇳🇱 [Nederlands](README-nl.md) | 🇯🇵 [日本語](README-jp.md) | 🇨🇳 [中文](README-ch.md) | 🇮🇳 [हिंदी](README-hi.md) | 🇷🇺 [Русский](README-ru.md) | 🇵🇱 [Polski](README-pl.md) | 🇮🇹 [Italiano](README-it.md) | 🇰🇷 [한국어](README-kr.md) | 🇸🇦 [العربية](README-ar.md) | 🇹🇷 [Türkçe](README-tr.md) | 🇸🇪 [Svenska](README-se.md) | 🇻🇳 [Tiếng Việt](README-vn.md) | 🇹🇭 [ไทย](README-th.md) | 🇮🇱 [עברית](README-he.md) | 🇮🇩 [Bahasa Indonesia](README-id.md)

---

<p align="center">
  <h1 align="center">Apa itu <br /><img src="https://i.imgur.com/cB70gh8.png" height="80" alt="PegNoMeu logo"/><br />?</h1>
</p>

**PegNoMeu** adalah manajer dependensi dengan **cache global**, **auto-link**, **mini-workspace** dan **mode sinkronisasi instan** — dibangun 100% dengan **Bun + TypeScript**.

Ide ini lahir karena Bun menjanjikan "kecepatan dan kesederhanaan" — tetapi dalam praktiknya, masih ada lapisan penting yang hilang:  
**penggunaan ulang dependensi yang nyata antar proyek**.

Setiap proyek menginstal ulang library yang sama. Setiap build mengunduh lagi. Setiap developer membuang waktu.

**PegNoMeu** menyelesaikan ini dengan membuat **workspace global** di sistem Anda, di mana dependensi diinstal sekali dan digunakan ulang melalui *symbolic links* (atau salinan, jika Anda suka).

---

## 🧪 Motivasi: mengapa kami membuat ini untuk Bun?

Bun cepat.  
Tapi cepat **sendiri** tidak cukup.

npm dan pnpm sudah memahami bahwa masa depan adalah **cache bersama dan atomisitas paket** — tetapi Bun masih bergantung pada lockfiles dan instalasi ulang yang berlebihan.

Filosofi **PegNoMeu** sederhana:

> **Kode bersifat sementara, cache bersifat abadi.**

Ketika Anda menginstal `axios@latest` di satu proyek, mengapa mengunduhnya lagi di proyek lain?  
**PegNoMeu** membuat repositori global (`~/.pegnomeu_workspace/js`) dan menghubungkan paket langsung ke proyek — seperti otak dependensi.

Selain itu, ia menambahkan sesuatu yang tidak ditawarkan manajer lain:

### 🧠 Mini-workspace ("preset")

Anda dapat menyimpan set dependensi dan menerapkannya ke proyek mana pun:
```bash
pegnomeu axios fastify zod
# Menanyakan apakah Anda ingin menyimpan sebagai preset → ketik "api"

pegnomeu use api
# menginstal semuanya lagi secara instan
```

---

## ⚡️ Fitur utama

| Fitur | Deskripsi |
|----------|------------|
| 💾 **Cache Global Cerdas** | Setiap paket diinstal hanya sekali di sistem. |
| 🪄 **Symbolic Links Otomatis** | Tidak ada duplikasi `node_modules`, semuanya menunjuk ke cache global. |
| 📦 **Mode copy (`--copy`)** | Jika Anda ingin build yang benar-benar terisolasi. |
| 📚 **Mini-Workspace** | Buat set dependensi bernama dan terapkan ulang dalam hitungan detik. |
| 🧩 **Kompatibel dengan proyek Bun apa pun** | Hanya menggunakan API native (`fs`, `os`, `path`, `child_process`). |
| 🛠️ **Mode `--dev`** | Menambahkan paket langsung ke `devDependencies`. |
| 🧭 **Mode `sync`** | Menyalin seluruh workspace global ke `node_modules` lokal. |
| 🖼️ **Log berwarna (`kleur`)** | Umpan balik yang jelas dan menyenangkan. |
| 🤗 **Tidak ada dependensi runtime eksternal** | Hanya `kleur` dan Bun. |

---

## 🚀 Instalasi

```bash
bun add -g pegnomeu

npm i -g pegnomeu

# atau jalankan langsung
npx pegnomeu
```

Verifikasi:
```bash
pegnomeu --help
```

Output yang diharapkan:
```
pegnomeu CLI 1.3.0

Penggunaan:
  pegnomeu axios@latest   → Menginstal paket langsung
  pegnomeu use api        → Menggunakan miniworkspace yang disimpan
  pegnomeu list           → Menampilkan daftar miniworkspace
  pegnomeu --dev          → Menginstal sebagai devDependency
  pegnomeu --copy         → Menyalin alih-alih menghubungkan
  pegnomeu sync           → Menyalin seluruh workspace global
  pegnomeu --verbose      → Log detail
```

---

## 💡 Contoh penggunaan

```bash
# Menginstal axios secara global dan menghubungkan ke proyek saat ini
pegnomeu axios

# Menginstal beberapa paket
pegnomeu fastify zod openai

# Menambahkan paket pengembangan
pegnomeu --dev vitest typescript

# Membuat dan menyimpan mini-workspace
pegnomeu use api
```

---

## 📁 Struktur internal

PegNoMeu secara otomatis membuat:

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

Setiap paket adalah direktori lengkap (cache fisik dan dapat digunakan ulang).
Preset adalah deskripsi JSON dengan daftar dependensi.

---

## 🧠 Filosofi desain

Proyek mengikuti tiga prinsip:

1. **Nol redundansi** — Tidak ada yang diinstal dua kali.
2. **Linking cerdas** — Setiap `node_modules` adalah jendela ke workspace global.
3. **Kesederhanaan brutalis** — Semuanya dalam TypeScript, tanpa sihir tersembunyi.

---

## 🔮 Roadmap

- [ ] Dukungan multi-bahasa (`.pegnomeu/py`, `.pegnomeu/rust`)
- [ ] Registry berbasis hash (checksum paket + versi)
- [ ] Sinkronisasi terdistribusi melalui IPFS atau NFS
- [ ] UI CLI interaktif (`pegnomeu ui`)
- [ ] Integrasi dengan `pegnomeu.json` lokal

---

## 💬 Mengapa "PegNoMeu"?

Karena **setiap alat membutuhkan provokasi yang baik.**  
Idenya adalah ia "mengambil modul Anda", tetapi dengan cerdas —  
membuat tautan global dari apa yang seharusnya global sejak awal.

Nama ini adalah penghormatan ironis terhadap budaya hacker Brasil:  
provokatif, humoris, dan fungsional.

---

## 🧑‍💻 Penulis

**Suissera da Bahia**  
Developer senior yang bersemangat tentang arsitektur terdistribusi, resilient, dan AI.  
Pencipta ekosistem **Full Agentic Stack**, **EnzyChop.Tech**, **Virion.Delivery**, dan sekarang… **PegNoMeu**.

---

## 📄 Lisensi

MIT © Suissa — bebas untuk digunakan, remix, dan ditingkatkan.  
Tapi jika rusak, itu salah Bun.