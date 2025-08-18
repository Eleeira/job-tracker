# Job Application Tracker (Private & Offline-First)

A tiny, privacy-friendly Kanban to track your job applications. Built with **React + Vite + Tailwind**.  
No accounts, no servers — everything stays in your browser (**IndexedDB**). Multilingual (**EN/SV**) and light/dark mode.

> Demo: https://eleeira.github.io/job-tracker
> - Data is stored locally. Export CSV regularly for backups.

---

## Features

- 🧭 **Simple pipeline**: Applied → Interviewing → Offer → Rejected  
- 🖱️ **Drag & drop** (order is persisted)
- ➕ **Add/Edit/Delete** applications
- 🔄 **CSV import/export** (portable data)
- 🌓 **Light/Dark** mode (soft light palette)
- 🌐 **English/Swedish** toggle (remembers selection)
- 📱 **Responsive**: mobile dock (Import / Add / Export), desktop actions in header
- ✨ **Quick Add Assistant**: paste natural text → parsed into a card (offline)
- 🔒 **Private by default**: IndexedDB (no server)

---

## Privacy & Data

- All data lives in IndexedDB in your browser.
- No external API calls or servers.
- Clearing site data or switching devices will remove data — export CSV to keep backups.

---
## Tech Stack

- **React 18**, **Vite**
- **Tailwind CSS**
- **Dexie/IndexedDB** (in `db.js`)
- **@hello-pangea/dnd** (drag & drop)
- **PapaParse** (CSV)
- Lightweight **i18n** via React context

---

## Getting Started

### Prerequisites
- Node **18+** and npm

### Install & Run
```bash
npm install
npm run dev
```
---

## License
- All Rights are reserved to the creator [Adina Catucci]