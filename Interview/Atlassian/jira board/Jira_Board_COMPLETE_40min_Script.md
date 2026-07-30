# 🎯 JIRA BOARD - VISUAL DELIVERY SCRIPT (NO CODE)
## Staff-Level Frontend System Design (40 Mins)

> **STRATEGY**: Do NOT write code. Draw boxes. List fields. Draw arrows. 
> **SPEED**: writing "{" "}" and " " takes too long. Use shorthand.

---

## ⏱️ PHASE 1: REQUIREMENTS (0-5 min)

### 🗣️ SPEAK (While bulleting on board):
"I'm designing a Jira-style board. 
**Scale**: 10k issues, 50 concurrent users.
**Priorities**: Performance (<100ms), Consistency (No lost updates), Accessibility."

### ✍️ DRAW (The Scope):
*   **View**: Board / Column / Card
*   **Action**: Drag-and-Drop (DnD)
*   **Updates**: Real-time (WebSockets)
*   **Perf**: Virtualized Lists

---

## ⏱️ PHASE 2: DATA MODLE & STATE (5-10 min) 
**Focus: The "Issue" is the Source of Truth.**

### ✍️ DRAW (Three Specific Boxes):

```text
┌──────────────────────┐      ┌──────────────────────┐
│        BOARD         │      │        COLUMN        │
├──────────────────────┤      ├──────────────────────┤
│ id: "board-1"        │      │ id: "col-A"          │
│ project_id: "P1"     │──────│ title: "Todo"        │
│ columns: ["A", "B"]  │      │ issue_ids: ["1","2"] │
└──────────────────────┘      └──────────────────────┘
         │                             │
         │                             ▼
         │                    ┌───────────────────────┐
         │                    │         ISSUE         │
         │                    ├───────────────────────┤
         │                    │ id: "101"             │
         └────────────────────│ status_id: "col-A"    │
                              │ rank: "0|hzi:" (Lexo) │
                              │ version: 5 (Lock)     │
                              └───────────────────────┘
```

### ✍️ DRAW (State & Persistence Strategy):

```text
┌─────────────────────────────┐    ┌─────────────────────────────┐
│    SERVER STATE (Memory)    │    │      UI STATE (Local)       │
│    (React Query Cache)      │    │      (Zustand)              │
├─────────────────────────────┤    ├─────────────────────────────┤
│ • issuesById: { ... }       │    │ • Dragging: { id, x, y }    │
│ • Optimistic Updates        │    │ • Filters: { user: "me" }   │
└──────────────┬──────────────┘    └─────────────────────────────┘
               │
          Sync │ (React Query Persist)
               ▼
┌─────────────────────────────┐    ┌─────────────────────────────┐
│   PERSISTENCE (IndexedDB)   │    │   REAL-TIME (WebSocket)     │
├─────────────────────────────┤    ├─────────────────────────────┤
│ 1. Offline Mutation Queue   │    │ • "ISSUE_MOVED" Event       │
│    [ {op: "MOVE", v:5} ]    │    │ • "USER_TYPING" Event       │
│ 2. Board Cache (Full Load)  │    │                             │
└─────────────────────────────┘    └─────────────────────────────┘
```

### 🗣️ SPEAK (The Logic):
1.  **Optimistic UI**: "I update Memory immediately. The user sees the move instantly."
2.  **Offline (IndexedDB)**: "If offline, I save the move to an **IndexedDB Queue**. Background Sync retries it when online."
3.  **WebSockets**: "I listen for `ISSUE_MOVED` events to update my Memory Cache when *others* make changes."

---

## ⏱️ PHASE 3: COMPONENT HIERARCHY (10-15 min)
**DO NOT WRITE REACT WRAPPERS.** Draw the Tree.

### 🗣️ SPEAK:
"I separate **Containers** (Data fetchers) from **Presentational** (Pure UI).
**Performance Key**: `IssueCard` is Memoized. It only re-renders if its specific ID changes."

### ✍️ DRAW (The Tree):

```text
[ Page Container ]  <-- Fetches Board & Columns
       │
       ▼
[ Board Layout ]
       │
       ├─ [ Header ] (Filter State: Zustand)
       │
       └─ [ Column List ]
              │
              ▼
       [ Column Container ] <-- Fetches Issues (Paginated)
              │
              ▼
       [ Virtual List (Window) ]
              │
              ▼
       [ Issue Card ]  <-- Memoized (Props: issueId)
```

---

## ⏱️ PHASE 4: API & ENDPOINTS (15-25 min)
**Strategy: Focus on 3 specific "Signals"**

### 1. GET (The "Scale" Signal)
**Don't write the full JSON.** just write the URL to show you know **Cursor Pagination**.

### ✍️ WRITE:
```text
GET /issues?cursor=ISSUE-50&limit=50
------------------------------------
Why Cursor? 
"Offset is O(N) and unstable if items are inserted. Cursor is O(1) and stable."
```

### 2. PATCH (The "Concurrency" Signal)
**Use this to explain Optimistic Locking (409 Conflict).**

### ✍️ WRITE:
```text
PATCH /issue/123
----------------
• summary: "New Title"
• expectedVersion: 5   <-- "I believe I'm editing v5"
```

**🗣️ SPEAK (The Logic):**
"If User B updates the issue to **v6** while I'm typing...
My request sends `expectedVersion: 5`.
Server checks `5 != 6`.
Server returns **409 Conflict**.
UI shows: 'This issue has changed. Reload?'"

### 3. POST (The "Complex" Signal)
**The Move Operation handles Ranking & Idempotency.**

### ✍️ WRITE:
```text
POST /move-issue
----------------
• issueId: "123"
• toColumnId: "B"
• prevIssueId: "100"      <-- For LexoRank Calc
• idempotencyKey: UUID    <-- For Safe Retries
```

**🗣️ SPEAK (Why POST?):**
"I use POST because 'Moving' isn't just a database update (PATCH). It triggers side-effects: **Re-ranking**, **Workflow Rules**, and **Notifications**. It's an Action, not a Resource edit."

---

## ⏱️ PHASE 5: DRAG & DROP + CONCURRENCY (25-35 min)
**The "Hard Part". Explain the sequence.**

### 🗣️ SPEAK & DRAW (The Optimistic Flow):

**Scenario**: User drags Card A to Column B.

1.  **User Drops Card**
    *   *Action*: Calc new `rank` (midpoint string) locally.
    *   *Update*: **Optimistic UI** (Immediate move).

2.  **Send Request**
    *   *Payload*: `{ id, rank, version: 5 }`

3.  **Race Condition Check (Server)**
    *   *Check*: Is DB version == 5?
    *   *Yes*: Update DB -> v6 -> Broadcast WS.
    *   *No*: **Reject (409)** -> Client Rollback.

4.  **Real-time Update (User B)**
    *   *WS Event*: `{ issueId, rank, version: 6 }`
    *   *Action*: Update Store -> Components re-render.

---

## ⏱️ PHASE 6: ACCESSIBILITY (35-38 min) (Staff Level Signal)
**Don't write code. List the features.**

### 🗣️ SPEAK:
"For A11y, mouse-only DnD is a no-go. I need 3 things:"

### ✍️ WRITE LIST:
1.  **Keyboard DnD**:
    *   `Space` (Lift) -> `Arrows` (Move) -> `Space` (Drop) -> `Esc` (Cancel).
2.  **Live Regions**:
    *   `aria-live="polite"`
    *   Announce: *"Item moved to column Done"*.
3.  **Focus Mgmt**:
    *   Restore focus to card after drawer closes.

---

## ⏱️ PHASE 7: EDGE CASES (38-40 min)

### ✍️ WRITE LIST (Pick 3):
1.  **Offline**: 
    *   Queue mutations (Redux Offline). 
    *   Sync on reconnect using `idempotencyKey`.
2.  **Permissions Lost Mid-Drag**:
    *   Server 403.
    *   UI Rollback + Toast Error.
3.  **Large Scale (10k items)**:
    *   **Virtualization**: Only render visible rows.
    *   **Lazy Load**: Fetch first 20 items/column.

---
## 💡 SUMMARY OF "ONE LINERS" TO MEMORIZE
*   **Ranking**: "LexoRank allows O(1) reordering by using strings instead of shifting integers."
*   **Consistency**: "Optimistic UI gives speed; Versioning ensures correctness."
*   **State**: "Normalized state avoids prop-drilling and enables instant lookups."
