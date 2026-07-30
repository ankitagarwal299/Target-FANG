# Staff-Level Frontend System Design: Jira Board
## 40-Minute Interview Script (Atlassian Focus)

> [!IMPORTANT]
> **Duration**: 40 minutes  
> **Format**: Conversational, architecture-focused (NOT code implementation)  
> **Key Signals**: Tradeoffs, scale, concurrency, accessibility, correctness  
> **Atlassian Values**: Accessibility-first, collaboration, extensibility

---

## 📋 Interview Flow & Timeline

| Time | Section | Focus | Priority |
|------|---------|-------|----------|
| 0-2 min | Intro & Scope | Set the frame, ask the 4 "killer" questions. | |
| 2-5 min | Requirements | MVP + Staff-level non-functional requirements. | |
| 5-10 min | Data Model | Normalization + LexoRank ordering strategy. | 🔴 **3X** |
| 10-15 min | Architecture / API | **Draw Diagram**. REST (Web) vs GraphQL (Mobile). | 🟡 **2X** |
| 15-20 min | Frontend Arch | Component hierarchy + Server vs UI state. | |
| 20-26 min | **Accessibility** | **Deep-Dive**. Build-in focus, keyboard, screen readers. | 🔴 **3X** |
| 26-32 min | DnD & Concurrency | The "Hard Part": Optimistic UI, locking, conflict. | 🔴 **3X** |
| 32-36 min | Performance | Virtualization, Pagination, 10k+ issue scale. | 🟡 **2X** |
| 36-40 min | Errors & Edge Cases| Top 5 most critical edge cases + Error boundaries. | 🟡 **2X** |

---

## 🎯 Section-by-Section Details & Script

### 1. Intro & Scope (0:00–2:00)
**Script:**
> "I’ll design a Jira-style board where columns are statuses and cards are issues. My focus is on scalability—handling 10k+ issues—and collaboration. I’ll treat Accessibility as a first-class citizen throughout the design. Before I dive in, four quick questions:
> 1. Is 10k issues the target scale for a single board?
> 2. Is 'nearly real-time' (WebSocket) sufficient for collaboration?
> 3. Does the workflow allow custom status transitions?
> 4. Are quick-filters server-side for scale, or client-side presets?"

---

### 2. Requirements (2:00–5:00)
**Script:**
> "For the MVP, users need to view a board, transition cards via drag-and-drop, filter by assignee or priority, and edit details in a drawer. 
> 
> From a Staff perspective, my non-functional goals are:
> - **Performance**: <100ms interaction feel; optimized First Contentful Paint.
> - **Correctness**: Using versioning to prevent lost updates in a collaborative environment.
> - **Resilience**: Handles offline/flaky network, rate limits, and partial failures gracefully.
> - **Accessibility**: Full keyboard navigation for DnD, screen reader announcements, WCAG 2.1 AA."

---

### 3. Data Model & Ordering (5:00–10:00) 🔴 **REVISE 3X**
**Script:**
> "I will use a **Normalized State** to avoid the 'prop-drilling hell' of nested arrays. This keeps state mutations localized and prevents cascading re-renders. 
> 
> **Crucial Decision**: For task ordering, I'll use **Rank Tokens (LexoRank)** rather than integer indices. 
> - If I move an issue between Rank 'A' and 'B', I generate a string 'AB' client-side.
> - This avoids O(n) re-indexing of the whole column on every move, which is a massive performance and concurrency bottleneck at scale."

**Technical Details:**
- **Board**: `id, name, projectId, columnIds[], quickFilterIds[]`
- **Column**: `id, name, statusCategory, rank, issueOrder`
- **Issue**: `id, key, summary, statusId, priority, assigneeId, rank, version`
- **Normalization Structure**:
```json
{
  "issuesById": { "ISSUE-1": { ... }, "ISSUE-2": { ... } },
  "columnsById": { "COL-1": { "id": "COL-1", "issueIds": ["ISSUE-1", "ISSUE-2"] } },
  "board": { "columnIds": ["COL-1", "COL-2"] }
}
```

---

### 4. Architecture & API (10:00–15:00) 🟡 **REVISE 2X**
**→ 🎨 DRAW THE DIAGRAM NOW (Spend 2 mins max)**

```
                 ┌─────────────────────────────────────────────┐
                 │              Client (Web)                   │
                 │  React UI + DnD + Virtualized Lists         │
                 │  Server State: React Query Cache (REST)     │
                 │  UI State: filter, drag, selection          │
                 └───────────────┬─────────────────────────────┘
                                 │ REST (paginated)
                                 ▼
                       ┌───────────────────────┐
                       │   REST API Gateway    │
                       └─────────┬─────────────┘
                                 │
                                 │
                 ┌───────────────┴────────────────┐
                 │                                │
                 ▼                                ▼
┌─────────────────────────────────┐   ┌─────────────────────────────────┐
│         Client (Mobile)          │   │       Realtime Channel          │
│  GraphQL Query/Mutation Cache    │   │  WebSocket/SSE + GQL Subs       │
│  Single query for board+columns  │   │  Events: ISSUE_MOVED/UPDATED    │
└───────────────┬─────────────────┘   └───────────────┬─────────────────┘
                │ GraphQL                              │ push events
                ▼                                      ▼
        ┌───────────────────────┐            ┌───────────────────────┐
        │   GraphQL Gateway     │───────────▶│   Event Distributor   │
        └─────────┬─────────────┘            └─────────┬─────────────┘
                  │                                    │
                  ▼                                    ▼
          ┌──────────────────────────────────────────────────────────┐
          │                  Board Service                           │
          │  - Workflow rules (allowed transitions)                  │
          │  - Rank generation/validation (LexoRank-like)            │
          │  - Optimistic concurrency (expectedVersion)              │
          │  - Idempotency (clientMutationId dedupe)                 │
          └──────────────────────────────────────────────────────────┘
                              │
                              ▼
                   ┌─────────────────────────┐
                   │   DB + Search Index     │
                   │ issues, columns, ranks  │
                   └─────────────────────────┘
```

**Script while drawing:**
> "I'll support REST for web to leverage edge caching, and GraphQL for mobile to prevent round-trips and fetch only needed fields. Both hit the same Board Service, ensuring **API Parity**. Realtime events keep clients in sync; versioning prevents applying stale updates."

**Technical Details:**
- **Web (REST)**:
  - `GET /api/boards/{id}` -> Metadata & config
  - `GET /api/boards/{id}/columns/{colId}/issues?cursor=...` -> Paginated issues
  - `POST /api/issues/{id}/move` -> `{ toColumnId, afterIssueId, clientMutationId, expectedVersion }`
- **Mobile (GraphQL)**:
  - `query GetBoard { board { columns { issues(first: 50) { ... } } } }`
  - `mutation MoveIssue { moveIssue(input: $input) { issue { rank, version } } }`

---

### 5. Frontend Arch & State (15:00–20:00)
**Script:**
> "I’ll divide state into **Server State** (React Query/Apollo normalized cache) and **UI State** (Zustand for filters/drag state). 
> 
> My component hierarchy is structured for performance: `<IssueCard>` is memoized and subscribes only to its own `issueId`. This prevents re-rendering 10k cards when one issue changes."

**Technical Details:**
- **Hierarchy**: `BoardPage` -> `BoardToolbar`, `BoardGrid` -> `Column` -> `IssueList` (Virtualized) -> `IssueCard`.

---

### 6. Accessibility Deep-Dive (20:00–26:00) 🔴 **REVISE 3X**
**Script:**
> "Atlassian values inclusion, so A11y is built into my core UI logic:
> 1. **Keyboard DnD**: implemented as 'Space' to pick up, 'Arrows' to move, 'Space' to drop. Esc cancels.
> 2. **Live Regions**: I'll use `aria-live='polite'` to announce state changes, like 'Moved ISSUE-123 to In Progress'. 
> 3. **Computed Labels**: My `aria-label`s are computed in the UI using i18n templates: `Key + Summary + Priority`. They are **NOT** in the data model.
> 4. **Focus Management**: Trap focus in drawers/modals and restore it to the previous card on close."

---

### 7. DnD, Concurrency & "The Hard Part" (26:00–32:00) 🔴 **REVISE 3X**
**Script:**
> "Drag-and-drop combined with collaboration is where things break. 
> - **Optimistic UI**: Move the card immediately in the UI state.
> - **Versioning**: Every mutation includes the `expectedVersion`. If User B edited the task while I was dragging it, the server returns a 409 Conflict.
> - **Resolution**: On conflict, I'll rollback, refetch, and show a toast: 'Issue updated by another user—refreshing.'
> - **Idempotency**: I'll use `clientMutationId` to ensure safe retries after network timeouts."

---

### 8. Scaling to 10k Issues (32:00–36:00) 🟡 **REVISE 2X**
**Script:**
> "Performance is about not rendering what you can't see. 
> 1. **List Virtualization**: Only render visible cards (e.g., using `react-window`).
> 2. **Pagination**: Load the first 50 issues per column and lazy-load on scroll.
> 3. **Progressive Rendering**: Load board shell (columns + counts) first, then hydrate issues."

---

### 9. Top-5 Edge Cases (36:00–40:00) 🟡 **REVISE 2X**
**Script:**
> "Finally, the 5 scenarios that break most boards:
> 1. **Permission Revoked**: User moves card but access was pulled. *Solution*: 403 response trigger UI rollback.
> 2. **DnD + Virtualization**: Dragging a card to a target not in DOM. *Solution*: Use 'Drag Overlay' portal detached from scrolling list.
> 3. **Filtered-Out Move**: Issue moved to a column but doesn't meet active filter. *Solution*: Card disappears; show toast with 'Undo' link.
> 4. **Race Conditions**: WebSocket update arrives before/after API response. *Solution*: Ignore events with version <= current cache version.
> 5. **Disconnected State**: User drags while offline. *Solution*: Show offline banner, disable DnD, safe retry with idempotency."

---

## 🚨 Final Success Signals (Staff-Level):
1. **Tradeoffs**: Mention "REST vs GraphQL" or "Manual re-indexing vs LexoRank".
2. **Resilience**: Talk about "Error boundaries at the card level" so one failure doesn't crash the board.
3. **Correctness**: Always mention "Source of truth" (server) vs "Optimistic representation" (client).

 Good luck! You've got this. 🎯
