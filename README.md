# NexusGraph — App Graph Builder

A dark-theme infrastructure graph builder with service node inspection, built as a frontend intern take-home task.

## Setup

```bash
npm install
npm run dev
```

Other scripts:
```bash
npm run build      # production build
npm run preview    # preview production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Key Decisions

**Unique Design Identity — "Terminal Dark"**
Rather than a generic grey dark mode, NexusGraph uses a deep navy palette (`hsl(222, 25%, 7%)`) with a purple/indigo primary accent and neon green cost badges. The typography is JetBrains Mono for identifiers and Inter for prose, giving an IDE-like feel.

**ReactFlow Integration**
- Custom `ServiceNode` component wraps ReactFlow's node API, rendering real resource metrics inline (CPU, Memory, Disk, Replicas)
- Node selection synced bidirectionally: clicking the canvas selects the node; Zustand propagates to the inspector
- Delete/Backspace removes selected node + its connected edges
- "Add Node" FAB creates a new service node in-place

**TanStack Query**
- `/apps` and `/apps/:appId/graph` are simulated with `setTimeout` in `src/mocks/api.ts`
- Switching apps invalidates the graph query — fresh fetch with loading skeleton
- 5% random error rate on graph fetch to demonstrate error state

**Zustand**
- Minimal store: `selectedAppId`, `selectedNodeId`, `isMobilePanelOpen`, `activeInspectorTab`
- Inspector edits are local state until "Apply Changes" which writes back via `queryClient.setQueryData`

**Responsive**
- Right panel becomes a slide-over drawer on mobile (`lg:hidden` / `lg:flex`)
- Controlled by `isMobilePanelOpen` in Zustand

## Known Limitations

- No real MSW setup (uses simple Promise delays instead)
- Minimap not enabled (keeps UI clean)
- Node positions reset on app switch (graph comes fresh from the mock)
- `tsconfig` `noUnusedLocals` may fire on some placeholder components
