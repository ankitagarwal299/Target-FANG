# Staff-Level Frontend System Design: Jira Board
## 40-Minute Interview Script (Atlassian Focus)

> [!IMPORTANT]
> **Duration**: 40 minutes  
> **Format**: Conversational, architecture-focused.  
> **Key Goal**: Sound decisive. Use "I would choose X because of Y" phrasing.  
> **Atlassian Signal**: Weave Accessibility (A11y) in early to show it's a first-class citizen.


---
EXCALIDRAW 
[text](https://excalidraw.com/#room=a74a065480940a8a8403,F5fkE_sODZ3n3T8jhptiYQ)


## 📋 Interview Flow & Timeline

| Time | Section | Focus |
|------|---------|-------|
| 0-2 min | Intro & Scope | Set the frame, ask the 4 "killer" questions. |
| 2-5 min | Requirements | MVP + Staff-level non-functional requirements. |
| 5-10 min | Data Model | Normalization + LexoRank ordering strategy. |
| 10-15 min | Architecture / API | **Draw Diagram**. REST (Web) vs GraphQL (Mobile). |
| 15-20 min | Frontend Arch | Component hierarchy + Server vs UI state. |
| 20-26 min | **Accessibility** | **Deep-Dive**. Build-in focus, keyboard, screen readers. |
| 26-32 min | DnD & Concurrency | The "Hard Part": Optimistic UI, locking, conflict. |
| 32-36 min | Performance | Virtualization, Pagination, 10k+ issue scale. |
| 36-40 min | Errors & Edge Cases| Top 5 most critical edge cases + Error boundaries. |

---

## 🎯 Section-by-Section Script

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
> - **Interaction Latency**: <100ms for DnD feel.
> - **Correctness**: Using versioning to prevent lost updates in a collaborative environment.
> - **Offline Resilience**: Graceful degradation if the WebSocket or API drops.
> - **Extensibility**: Ensuring the board can handle custom fields/swimlanes later without an architectural rewrite."

---

### 3. Data Model & Ordering (5:00–10:00) 🔴 **REVISE 3X**
**Script:**
> "I will use a **Normalized State** to avoid the 'prop-drilling hell' of nested arrays.
> 
> My primary entities are `IssuesById`, `ColumnsById`, and a `Board` object containing ordered `columnIds`.
> 
> **Crucial Decision**: For task ordering, I won't use integer indices. I'll use **Rank Tokens (LexoRank)**. 
> - If I move an issue between Rank 'A' and 'B', I generate a string 'AB' client-side.
> - **Why?** It avoids O(n) re-indexing of the whole column on every move, which is a massive performance and concurrency bottleneck at scale."

---

### 4. Architecture & API (10:00–15:00) 🟡 **REVISE 2X**
**→ 🎨 DRAW THE DIAGRAM NOW (Spend 2 mins max)**

**Script while drawing:**
> "My architecture follows a clear separation of concerns. 
> - **Web/REST**: I'll use REST for web to leverage edge caching and simple CDN strategies.
> - **Mobile/GraphQL**: I'll use GraphQL for mobile to prevent round-trips and fetch only the subset of data (like summary/assignee) needed for smaller screens. 
> - **Board Service**: This acts as the source of truth, validating workflow rules and rank tokens before committing to the DB."

---

### 5. Frontend Arch & State (15:00–20:00)
**Script:**
> "I’ll divide state into **Server State** and **UI State**. 
> - **Server State** (handled by React Query/Apollo): Contains my normalized issue cache.
> - **UI State** (Zustand): Covers transient things like current drag position, active filters, and a 'Pending Mutation' queue.
> 
> **Performance Tip**: I'll memoize cards so they only re-render if their specific `issueId` payload changes. This ensures that moving one card doesn't re-render 50 others."

---

### 6. Accessibility Deep-Dive (20:00–26:00) 🔴 **REVISE 3X**
**Script (Crucial for Atlassian):**
> "Atlassian values inclusion, so A11y is built into my core UI logic, not added later.
> 1. **Keyboard DnD**: Mouse-only DnD is an anti-pattern. I'll implement 'Space' to pick up, 'Arrows' to move, 'Space' to drop.
> 2. **Live Regions**: I'll use `aria-live='polite'` to announce state changes, like 'Moved ISSUE-123 to In Progress'. 
> 3. **Computed Labels**: My `aria-label`s aren't in the DB. They are computed in the UI using i18n templates: `Issue Key + Summary + Priority`.
> 4. **Focus Management**: When a user opens an issue detail drawer, I'll trap focus within that drawer and restore it to the previous card on close. This is non-negotiable for screen reader users."

---

### 7. DnD, Concurrency & "The Hard Part" (26:00–32:00) 🔴 **REVISE 3X**
**Script:**
> "Drag-and-drop combined with collaboration is where things break. 
> - **Optimistic UI**: I'll move the card immediately in the UI. 
> - **Versioning**: Every mutation includes the `expectedVersion`. If User B edited the task while I was dragging it, the server returns a 409 Conflict.
> - **Resolution**: On conflict, I'll rollback the UI move, refetch, and show a toast: 'Issue updated by another user—refreshing.'
> - **Idempotency**: I'll use `clientMutationId` to ensure that if a user retries a move after a timeout, the server doesn't process it twice."

---

### 8. Scaling to 10k Issues (32:00–36:00) 🟡 **REVISE 2X**
**Script:**
> "To handle 10k issues without the browser crashing:
> 1. **List Virtualization**: I'll only render the 10-15 cards visible in the viewport.
> 2. **Column Pagination**: I won't fetch 10k issues at once. I'll fetch the first 50 per column and lazy-load more as the user scrolls.
> 3. **Skeleton UI**: I'll use skeletons to keep the layout stable during async fetches, preventing 'layout shift' which hurts UX and accessibility."

---

### 9. Top-5 Edge Cases (36:00–40:00) 🟡 **REVISE 2X**
**Script:**
> "Finally, let's look at the 5 scenarios that usually break a production board:
> 1. **Permission Revoked**: A user moves a card but their access was just pulled. *Handling*: Server returns 403, UI rolls back, we disable further DnD.
> 2. **DnD + Virtualization**: Dragging a card to a target that isn't in the DOM. *Handling*: Use a 'Drag Overlay' portal detached from the virtual list.
> 3. **Filtered-Out Move**: An issue is moved to a column but it doesn't meet the current active filter. *Handling*: The card disappears; we show a toast with an 'Undo' link.
> 4. **Race Conditions**: Two events (WebSocket update vs API response) arrive out of order. *Handling*: Ignore events with a lower version number than the current cache.
> 5. **Disconnected State**: User drags while offline. *Handling*: Show an offline banner immediately, disable DnD to prevent a complex 'correction' sync later."

---

## 🚨 Top 3 "Staff" Pro-Tips to Remember:
1. **Never say** 'I will use Redux'. **Say** 'I will choose a centralized store with normalized selectors to prevent O(n) re-renders.'
2. **Never say** 'I will fix bugs'. **Say** 'I will implement error boundaries at the card level so one failed custom field doesn't crash the entire board.'
3. **If asked about Mobile**: Mention that GraphQL's `@defer` or fragment colocation would be ideal for the issue list views.

---

## ✅ Pre-Interview Mantra:
*"Consistency over speed. Tradeoffs over single solutions. Correctness under concurrency. Accessibility by design."*
