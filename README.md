# HR Workflow Designer

A visual HR Workflow Designer built with React, TypeScript, and React Flow.

## Features

- Drag and drop workflow canvas
- 5 node types: Start, Task, Approval, Automated Step, End
- Node configuration forms for each node type
- Mock API layer for automated actions
- Workflow simulation sandbox with step-by-step execution log
- Validation (cycles, missing connections, missing nodes)

## Tech Stack

- React + TypeScript
- Vite
- @xyflow/react (React Flow)
- Zustand (state management)

## How to Run

1. Clone the repository
2. Install dependencies:
   npm install
3. Start the development server:
   npm run dev
4. Open http://localhost:5173 in your browser

## Architecture

- src/components/ — All UI components
- src/components/nodes/ — Custom node types (Start, Task, Approval, Automated, End)
- src/components/WorkflowCanvas.tsx — Main React Flow canvas
- src/components/Sidebar.tsx — Node palette sidebar
- src/components/NodeFormPanel.tsx — Dynamic node editing forms
- src/components/SandboxPanel.tsx — Workflow simulation panel
- src/store/workflowStore.ts — Zustand global state store

## Design Decisions

- Used Zustand for simple global state without boilerplate
- Each node type has its own component for easy extensibility
- NodeFormPanel dynamically renders fields based on selected node type
- Sandbox simulates workflow by traversing the graph from Start to End

## What I Would Add With More Time

- Export/Import workflow as JSON
- Undo/Redo functionality
- Visual error indicators on nodes
- Backend persistence with PostgreSQL
- Authentication with OAuth
- Auto-layout feature
- Unit tests with Jest