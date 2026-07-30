# 🎯 REAL-TIME COMMENTS SYSTEM - VISUAL DELIVERY SCRIPT
## Staff-Level Frontend System Design (40 Mins)

> **STRATEGY**: Visual drawings only. No code blocks. 
> **FOCUS**: Concurrency, Accessibility, and Data Normalization.

---

## EXCALIDRAW: [text](https://excalidraw.com/#room=4736c9bd1a74ba6cae7a,w5VUZSYPbH3tAVWlDWxDhQ)

## ⏱️ PHASE 1: REQUIREMENTS (0-5 min)

### 🗣️ SPEAK:
"I'm designing a threaded comment system like Jira/Confluence.
**Scale**: 100 concurrent users/doc. 1M+ comments total.
**Priorities**: Low Latency (<200ms), Offline Support, Accessibility (Screen Readers)."

### ✍️ DRAW (The Scope):
*   **Structure**: Threaded (Nested) vs Flat
*   **Content**: Rich Text (Mentions, Attachments)
*   **Sync**: Real-time (WebSockets)
*   **perf**: Virtualized List

---

## ⏱️ PHASE 2: DATA MODLE & STATE (5-10 min)
**Focus: Normalization is Key for performance.**

### ✍️ DRAW (Three Specific Boxes):

```text
┌──────────────────────┐      ┌──────────────────────┐
│       THREAD         │      │       COMMENT        │
├──────────────────────┤      ├──────────────────────┤
│ id: "thread-1"       │──────│ id: "c-101"          │
│ context_id: "doc-A"  │ (1:N)│ parent_id: "c-100"   │
│ root_ids: ["c-1","2"]│      │ author_id: "u1"      │
└──────────────────────┘      │ content: ADF JSON    │
                              │ version: 5 (Lock)    │
                              │ likes_count: 5       │
                              └──────────────────────┘
                                         │
                                         ▼
                              ┌───────────────────────┐
                              │      UI STATE         │
                              ├───────────────────────┤
                              │ is_typing: boolean    │
                              │ optimistic_id: "temp" │
                              │ error: null           │
                              └───────────────────────┘
```

### 🗣️ SPEAK (The Logic):
1.  **Normalization**: "I store comments in a Flat Map `byId`. Nesting is handled by `parent_id` pointers."
2.  **Optimistic UI**: "I create a temporary ID (`temp-123`) to render immediately. Replaced by Server ID later."
3.  **Version**: "Used for conflict detection if two people edit the same comment."

---

## ⏱️ PHASE 3: COMPONENT HIERARCHY (10-15 min)
**Draw the Tree to show handling of Recursion.**

### ✍️ DRAW:

```text
[ CommentSection Container ]  <-- Fetches Data
       │
       ▼
[ CommentList (Virtualized) ] <-- Flattened List
       │
       ▼
[ CommentItem (Memoized) ]
       │
       ├─ [ Header ] (User info, Time)
       │
       ├─ [ Content ] (Rich Text Renderer)
       │
       └─ [ Action Bar ] (Reply, Like)
              │
              ▼
       [ Editor (Composer) ] <-- For Replies
```

### 🗣️ SPEAK (Performance):
"I don't render recursive components (Comment -> Comment -> Comment). I **flatten** the tree into a list for Virtualization to handle 1000+ comments efficiently."

---

## ⏱️ PHASE 4: API & ENDPOINTS (15-25 min)
**Focus on the 3 Signals: Pagination, Idempotency, Real-time.**

### 1. GET (Cursor Pagination)
```text
GET /comments?cursor=C-50&limit=50
----------------------------------
"Fetch flattened list. Stable pagination."
```

### 2. POST (Idempotency)
```text
POST /comments
--------------
• content: ADF
• parentId: "123"
• idempotencyKey: UUID  <-- RETRY SAFETY
```

### 3. SUBSCRIBE (Real-time)
```text
WS /subscribe
-------------
• event: "COMMENT_ADDED"
• event: "TYPING_START"
```

---

## ⏱️ PHASE 5: REAL-TIME & CONCURRENCY (25-35 min)
**The "Hard Part". Explain the sequence.**

### ✍️ DRAW (The Broadcast Flow):

**Scenario**: User A posts a comment.

1.  **User A Types & Sends**
    *   *UI*: Render immediately (Optimistic).
    *   *API*: `POST /comments` (Status: Pending).

2.  **Server Processes**
    *   *Action*: Save to DB.
    *   *Broadcast*: Publish to Redis `channel:doc-A`.

3.  **User B Receives**
    *   *WS Event*: `{ type: "COMMENT_ADDED", data: comment }`
    *   *Action*: Determine insert position (Thread logic).
    *   *UI*: **"Polite" Notification** (Don't auto-scroll).

---

## ⏱️ PHASE 6: ACCESSIBILITY (35-38 min) (Staff Level Signal)
**How to make Real-time A11y friendly.**

### ✍️ WRITE LIST:
1.  **Live Regions**:
    *   `aria-live="polite"`: "New comment from John."
    *   **Don't** auto-focus new comments (disrupts reading).
2.  **Keyboard Nav**:
    *   `J/K` shortcuts to jump between threads.
    *   `Escape` to exit Reply Editor.
3.  **Screen Reader Context**:
    *   Announce: *"Reply to comment by Sarah, level 3"*.

---

## ⏱️ PHASE 7: EDGE CASES (38-40 min)

### ✍️ WRITE LIST (Pick 3):
1.  **Offline**: 
    *   Queue comments in IndexedDB. Sync when online.
2.  **Deleted Parent**:
    *   User replies to deleted comment.
    *   *Solution*: Show "Parent Deleted" tombstone.
3.  **Massive Thread**: 
    *   User expands "Show 500 replies".
    *   *Solution*: Virtualization + Incremental Rendering.

---
## 💡 SUMMARY OF "ONE LINERS" TO MEMORIZE
*   **Normalization**: "Flat state is faster to update than a deep nested tree."
*   **A11y**: "For real-time updates, we must be 'Polite' - notify, don't interrupt."
*   **Performance**: "Virtualization is mandatory for threads > 50 items."
