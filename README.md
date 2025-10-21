# Smart Search Monorepo

A reusable, accessible searchable dropdown web component built with **Stencil**, bundled in a monorepo with a **React + Vite demo app**.

---

## 📁 Folder Structure

```
smart-search-monorepo/
├── smart-search/             ← Stencil component
└── smart-search-react/       ← React + Vite demo app
```

---

## 🚀 Getting Started

### 🧩 Prerequisites

- **Node.js** v20+
- **npm** v10+ (required for native workspaces support)

---

### 🛠️ Install Dependencies (from monorepo root)

```bash
git clone https://github.com/<your-username>/smart-search-monorepo.git
cd smart-search-monorepo
npm install
```

This installs dependencies for both packages (`smart-search` and `smart-search-react`).

---

### 🏗️ Build the Stencil Component

```bash
cd smart-search
npm run build
```

---

### ⚛️ Build the React App

Run inside the React app folder:

```bash
cd ../smart-search-react
npm install
```

---

### 💻 Run the React Demo App

Run from **monorepo root** or inside `smart-search-react/`:

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser —  
your **Smart Search** component should render and work.

---

### 🧪 Testing

```bash
cd smart-search
npm run test       # Unit tests
npm run test:e2e   # End-to-end tests
```

---

