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

### Install (dev)

```bash
git clone https://github.com/<your-username>/smart-search-component.git
cd smart-search-component
npm ci

### 📦 **Getting Started**

> ⚠️ **Prerequisites**:
> - Node.js `v20+`
> - `npm` `v10+` (required for native workspaces support)

### **Install dependencies (run from root)**

From the root of the monorepo:
Installs dependencies for both smart-search (Stencil) and smart-search-react (React) via npm workspaces.

```bash
npm install

### **Build the Stencil component**

```bash
cd smart-search
npm run build 


### **React Demo App**

Run from monorepo root or inside smart-search-react/:

```bash
npm run dev


### Testing
```bash
cd smart-search
npm run test
npm run test:e2e

