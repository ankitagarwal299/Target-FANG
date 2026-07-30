# 🎯 COLLABORATIVE EDITOR - VISUAL DELIVERY SCRIPT
## Staff-Level Frontend System Design (40 Mins)

> **STRATEGY**: Visual diagrams only. No code. 
> **FOCUS**: Operational Transformation (OT), Real-time Sync, Off-Main-Thread.

---

excalidraw : https://excalidraw.com/#room=a74a065480940a8a8403,F5fkE_sODZ3n3T8jhptiYQ

## ⏱️ PHASE 1: REQUIREMENTS (0-5 min)

### 🗣️ SPEAK:
"I'm designing a rich-text editor like Google Docs/Confluence.
**Scale**: 50+ concurrent writers/doc. 100k+ chars.
**Core**: Real-time Sync (<50ms), Offline editing, Conflict Resolution (OT)."

### ✍️ DRAW (The Scope):
*   **Format**: JSON Tree (ADF/ProseMirror)
*   **Action**: Insert/Delete Operations
*   **Sync**: WebSocket (Bi-directional)
*   **Perf**: Web Workers (Calculation off-thread)

---

## ⏱️ PHASE 2: DATA MODEL (5-10 min) 
**Focus: The "Operation" is the Source of Truth.**

### ✍️ DRAW (Two Key Boxes):

```text
┌──────────────────────┐      ┌──────────────────────┐
│       DOCUMENT       │      │      OPERATION       │
├──────────────────────┤      ├──────────────────────┤
│ id: "doc-1"          │──────│ type: "insert"       │
│ version: 105         │ (Log)│ pos: 5               │
│ content: ADF Node    │      │ content: "Hello"     │
└──────────────────────┘      │ version: 105         │
                              │ user_id: "u1"        │
                              └──────────────────────┘
                                         │
                                         ▼
                              ┌───────────────────────┐
                              │      UI STATE         │
                              ├───────────────────────┤
                              │ selection: {from,to}  │
                              │ pending_ops: Queue[]  │
                              │ cursors: Map<User,Pos>│
                              └───────────────────────┘
```

### 🗣️ SPEAK (The Logic):
1.  **Operation (The delta)**: "I don't sync the whole doc. I sync small operations: `insert 'a' at pos 5`."
2.  **Version**: "Every operation increments version. If versions mismatch, I must **Transform** the operation."
3.  **Queue**: "Local edits are queued until confirmed by the server."

---

## ⏱️ PHASE 3: COMPONENT HIERARCHY (10-15 min)
**Draw the Tree to show Off-Main-Thread architecture.**

### ✍️ DRAW:

```text
[ Editor Container ]  <-- Orchestrates Data Flow
       │
       ▼
[ Web Worker (OT Engine) ] <-- *THE BRAIN* (Non-Blocking)
       │                       Calculates: Transform(IncomingOp, PendingOp)
       ▲ (Async Message)
       │
[ Render Layer (Canvas) ]
       │
       ├─ [ Text Surface ] (ContentEditable)
       │
       └─ [ Presence Overlay ] (Remote Cursors)
```

### 🗣️ SPEAK (Performance):
"I use a **Web Worker** because OT is CPU-intensive. If I receive a large 'Paste' operation from another user, I don't want the main thread to freeze while calculating the transform. The Worker handles the math; the Main Thread handles user typing."

---

## ⏱️ PHASE 4: API & SYNC (15-25 min)
**Protocol: Use WebSocket "Types" for everything.**

### 0. INIT (REST Pull / Snapshot)
**Fetch state BEFORE connecting.**
```json
GET /doc/:id
{
  "revision": 145,       // Base Version
  "document": { ... }    // ADF / ProseMirror JSON
}
```

### 1. CLIENT UPDATE (Batched)
**Sent when user types or pastes.**
```json
{
  "type": "UPDATE",
  "requestId": 2,        // Monotonic ID. Correlate ACK.
  "revision": 146,       // Base v146 (Concurrency)
  "isUndo": false,       // Support Undo/Redo
  "operations": [        // BATCHING!
    { "type": "INSERT", "payload": { "chars": "Hello", "index": 4 } },
    { "type": "INSERT", "payload": { "chars": "Bye", "index": 2 } }
  ]
}
```

### 2. SERVER ACK (Confirmation)
**Moves op from "Pending" to "Committed".**
```json
{
  "type": "ACK",
  "requestIdAcknowledged": 2, // Matches Client ID
  "revision": 147             // New Server Version
}
```

### 3. PEER UPDATE (Incoming Change)
**Another user edited.**
```json
{
  "type": "PEER_UPDATE",
  "userId": 6543,
  "revision": 148,
  "operations": [...]
}
```

### 4. SYNC (Reconnection)
**Sent immediately after reconnect.**
```json
{
  "type": "SYNC",
  "revisions": [ { "revision": 147, "ops": [...] }, { "revision": 148, "ops": [...] } ]
}
```

---

## ⏱️ PHASE 5: CONFLICT RESOLUTION (OT) (25-35 min)
**The "Hard Part". Explain the sequence visually.**

### 🗣️ SPEAK (Crucial concept):
"The Server is the Source of Truth, BUT the Client **MUST** also perform OT. Why? Because of **Optimistic UI**. I can't wait for the server before showing my own typing. I have to transform *incoming* edits against my *pending* edits locally."

### ✍️ DRAW (Server OT - Convergence):
**Scenario**: Both type at pos 0 (v100). Server receives B first.

1.  **Server State**: Doc becomes "B" (v101).
2.  **Server Transforms A**:
    *   `T(opA, opB)` -> "Insert 'A' at **1**".
3.  **Result Doc**: "BA".

### ✍️ DRAW (Client OT - The "Shift" Logic):
**Scenario**: Doc = "abcd" (Indices: 0, 1, 2, 3)

1.  **Local (Pending)**: Insert "X" at **pos 2**.
    *   State: "ab**X**cd" (Char 'd' moves from 3 -> 4).
2.  **Remote (Incoming)**: Delete at **pos 3** (Intended to delete 'd').
3.  **The Conflict**: 
    *   If we delete at 3 now, we delete 'c'! ❌
    *   **Transform**: `T(Remote, Local)` -> `pos 3 + 1 = 4`.
4.  **Result**: Delete at **pos 4**.
    *   State: "abXc" (Correctly deleted 'd'). ✅

### 🗣️ SPEAK (The Logic):
"The Server transforms to save the truth (Convergence). The Client transforms to adjust indices so the UI remains correct (Shift Logic)."

---

## ⏱️ PHASE 6: ACCESSIBILITY (35-38 min) (Staff Level Signal)
**Collaborative Editing and A11y.**

### ✍️ WRITE LIST:
1.  **Remote Cursors**:
    *   Announce: *"John is editing paragraph 3"*. (Use `aria-live`).
2.  **Semantic HTML**:
    *   Map ADF nodes to real `<h1>`, `<p>`, `<ul>` so screen readers understand structure.
3.  **Focus Management**:
    *   Don't steal focus when remote users type.

---

## ⏱️ PHASE 7: EDGE CASES (38-40 min)

### ✍️ WRITE LIST (Pick 3):
1.  **Offline**: 
    *   Store Pending Ops in IndexedDB.
    *   On Reconnect: Send all pending ops (server transforms them).
2.  **Huge Copy/Paste**:
    *   Chunk the operation (don't block UI).
3.  **Server Desync**: 
    *   If version gap > 50, force full document reload (Reset).

---
## 💡 SUMMARY OF "ONE LINERS" TO MEMORIZE
*   **OT**: "Operational Transformation ensures eventual consistency without locking the document."
*   **Web Worker**: "Complex math belongs off the main thread to keep typing smooth."
*   **Optimistic UI**: "I apply my own edit instantly; I transform remote edits against my local state."
