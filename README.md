# 🚀 App Graph Builder

A responsive application graph visualization tool built with **React**, **TypeScript**, **React Flow (xyflow)**, **TanStack Query**, and **Zustand**.

This project allows users to visualize application architectures, inspect service nodes, manage graph interactions, and explore infrastructure relationships through an interactive graph-based UI.

---

## 🌐 Live Demo

🔗 **Deployment:** https://nexusgraph-app-graph-builder.vercel.app/

---

## 📸 Application Preview

<img width="1527" height="815" alt="Screenshot 2026-06-11 202946" src="https://github.com/user-attachments/assets/0a5badb1-8eda-4b14-8695-16aa20bbdeda" />


---

## ✨ Features

### 🎯 Interactive Graph Canvas

* Interactive graph built using React Flow
* Drag and reposition nodes
* Select nodes to inspect details
* Delete selected nodes using Delete/Backspace
* Zoom and pan support
* Fit view support
* Dotted background canvas

### 🔍 Service Node Inspector

* Status indicators (Healthy, Degraded, Down)
* Config and Runtime tabs
* Editable node name
* Editable description
* Synced slider and numeric input
* Updates reflected directly in graph state

### 📦 Application Management

* Multiple application selection
* Dynamic graph loading
* Cached data fetching using TanStack Query
* Loading and error handling states
* Graph refetches when application changes

### 📱 Responsive Design

* Desktop layout with side panels
* Mobile-friendly drawer-based inspector
* Adaptive layout for smaller screens

---

## 🛠️ Tech Stack

| Technology          | Purpose                 |
| ------------------- | ----------------------- |
| React + Vite        | Frontend Framework      |
| TypeScript          | Type Safety             |
| React Flow (xyflow) | Graph Visualization     |
| TanStack Query      | Server State Management |
| Zustand             | Client State Management |
| shadcn/ui           | UI Components           |
| Tailwind CSS        | Styling                 |

---

## 🏗️ Architecture Overview

The application is divided into three major layers:

### 📡 Server State Layer

Managed using **TanStack Query**:

* Fetching application data
* Fetching graph data
* Caching responses
* Loading states
* Error handling
* Automatic refetching

### 🐻 Client State Layer

Managed using **Zustand**:

* Selected application
* Selected node
* Active inspector tab
* Mobile panel visibility

### 🎨 Presentation Layer

Built using:

* React Flow
* shadcn/ui
* Tailwind CSS

---

## 🔄 Application Flow

1. User selects an application from the Applications panel.
2. TanStack Query fetches graph data from mock APIs.
3. React Flow renders nodes and edges.
4. User selects a node.
5. Node Inspector displays node configuration.
6. User updates values through inspector controls.
7. Changes are reflected immediately in graph state.

---

## 🔌 Mock API Implementation

The project uses in-memory mock APIs with simulated network latency.

### Available Endpoints

```http
GET /apps
GET /apps/:appId/graph
```

### Supported States

* Loading State
* Success State
* Error State
* Cached State

Network latency is simulated using Promise-based delays to mimic real-world API behavior.

---

## 📁 Project Structure

```txt
src/
├── components/
│   ├── canvas/
│   ├── layout/
│   ├── inspector/
│   ├── nodes/
│   └── ui/
│
├── hooks/
│   └── queries/
│
├── store/
│
├── mocks/
│
├── types/
│
├── lib/
│
├── App.tsx
└── main.tsx
```

---

## ⚡ Available Scripts

### Development

```
npm run dev
```

### Production Build

```
npm run build
```

### Preview Production Build

```
npm run preview
```

### Linting

```
npm run lint
```

### Type Checking

```
npm run typecheck
```

---

## 🚀 Local Setup

### Clone Repository
https://github.com/2200032705-SREEJA/nexusgraph-app-graph-builder
```

### Install Dependencies

```
npm install
```

### Start Development Server

```
npm run dev
```

---

## 🚧 Known Limitations

* Data persistence is currently in-memory only
* Graph changes are not saved after page refresh
* Mock APIs are used instead of a real backend
* Authentication and authorization are not implemented

---

## 🔮 Future Improvements

* Additional custom node types
* Persistent graph storage
* Real backend integration
* Keyboard shortcuts
* Node grouping
* Graph export/import
* Real-time collaboration
* Advanced graph editing tools

---

## 👩‍💻 Author

**Sreeja Penumudi**

