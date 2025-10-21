# Smart Search Web Component

A reusable accessible searchable dropdown web component built with **Stencil**.

## Features

- Lightweight web component (shadow DOM)
- Keyboard navigation (ArrowUp/Down, Enter, Escape)
- Built-in and pluggable search (emit `query` to provide async results)
- Emits `itemSelected` event on selection
- Simple theming via CSS custom properties
- Unit and E2E tests included

---

## Quick start

## 📦 **Getting Started**

> ⚠️ **Prerequisites**:
> - Node.js `v20+`
> - `npm` `v10+` (required for native workspaces support)


---

## ✨ Features

- Lightweight web component (Shadow DOM encapsulated)
- Keyboard navigation (ArrowUp / ArrowDown / Enter / Escape)
- Emits `query` event for custom async search logic
- Emits `itemSelected` event when an item is chosen
- Themeable via CSS custom properties
- Unit and E2E tests included

---

## Getting Started

###  Prerequisites

- **Node.js** v20+
- **npm** v10+ (required for native workspaces support)

---

###  Setup 

Clone the repository and install dependencies:

```bash
git clone https://github.com/<your-username>/smart-search-monorepo.git
cd smart-search-monorepo
npm install


### **Build the Stencil component**

```bash
cd smart-search
npm run build 


### **Build React App**

Run inside smart-search-react/:

```bash
npm i

### **React Demo App**

Run from monorepo root or inside smart-search-react/:

```bash
npm run dev


### **Testing**
```bash
cd smart-search
npm run test
npm run test:e2e

