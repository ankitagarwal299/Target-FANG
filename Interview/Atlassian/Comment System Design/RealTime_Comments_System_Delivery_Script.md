# ULTIMATE PRACTICE SCRIPT: Real-Time Comments System (Staff Level)

*This is your one-stop script. Practice saying these words while simulating drawing/typing the code blocks.*

---

## ⏱️ PHASE 1: Requirements & Scope (0-5 Min)
**Goal:** Define the product and scale.

### [REVISE 2X] Opening & Functional Scope
> **Say this:** "I'll design this as a real-time comments system for a collaborative product like Jira. I'll focus on the frontend architecture but define the backend contracts for a seamless experience. 
> 
> **Quickly clarify:** 
> - **Scale:** Are we targeting 100+ concurrent users per document?
> - **Threading:** Should we support nested replies (recursive) or a fixed depth of 3 for UX clarity?
> - **Rich Text:** Do we need Markdown, Mentions (@), and Attachments?
> - **Real-time:** Is <200ms latency the target for 'presence' features?"

### [REVISE 2X] Finalizing the Requirements
> **Say this:** "Okay, I'll assume: 100 concurrent writers, 3-level threading, ADF (Atlassian Document Format) for rich text, and a hard requirement for WCAG 2.1 AA accessibility."

---

## ⏱️ PHASE 2: High-Level Architecture (5-15 Min)
**Goal:** Draw the system.

### [REVISE 3X] Component Hierarchy & Diagram
> **Say this:** "I'll start with the component structure. I'll use a container-component pattern to separate state logic from rendering."
>
> *(Simulate drawing this on the board)*:
> ```text
> [ CommentSection (Container/State) ]
>           |
>           |--- [ PresenceBar ] (Live users typing)
>           |
>           |--- [ CommentList ] (Virtualized Container)
>           |         |
>           |         |--- [ CommentThread ]
>           |                   |
>           |                   |--- [ CommentCard ] (Leaf)
>           |                   |--- [ ReplyList ]
>           |
>           |--- [ CommentComposer ] (Rich Text Editor)
> ```
>
> ### [REVISE 3X] High-Level System Architecture (MACRO VIEW)
> **Say this:** "To support real-time at scale, we need a robust backend sync layer. This is how the data flows:"
>
> *(Draw this diagram next to the components)*:
> ```text
> [ Client ] <----(REST)-----> [ API Gateway / LB ] <---> [ App Server ] <---> [ DB ]
>     ^                               |
>     |                               |
>     +----(WebSockets)-----> [ WebSocket Server ] <---> [ Pub/Sub (Redis) ]
>                                     ^
>                                     |
>                               [ Other Clients ]
> ```
> **Say this:** "The REST path is for **CONSISTENCY** (Initial load/Persistence), and the WebSocket/Pub-Sub path is for **LOW LATENCY** presence and updates."

### [REVISE 3X] Real-Time Strategy (The "Meat")
> **Say this:** "For data flow, I'm proposing a **🏆 HYBRID SYNC ENGINE**:
> 1. **Initial Load:** REST API fetches the first 50 comments with **BIDIRECTIONAL CURSOR PAGINATION**.
> 2. **Real-Time:** WebSockets for high-frequency events like `COMMENT_ADDED`.
> 3. **Optimistic Updates:** Immediate 'pending' state for **0ms PERCEIVED LATENCY**.
> 4. **🏆 NORMALIZATION:** I'll store comments in a `byId` map. This makes updates **O(1) OPERATIONS** instead of O(N) array scanning, which is critical for performance at scale."
> 
> **Say this:** This indexing allows me to render threads instantly. I'll maintain a **normalized store** with a **🏆 THREAD INDEX**:
> 
> ```javascript
> {
>   comments: {
>     byId: { "c1": { id: "c1", body: "...", parentId: null } },
>     allIds: ["c1"]
>   },
>   threadIndex: {
>     "root": ["c1", "c3"], // Top-level comments
>     "c1": ["c2"]         // Replies to c1
>   }
> }
> ```

---

## ⏱️ PHASE 3: Data Model & API (15-25 Min)
**Goal:** Show technical precision.

### [REVISE 3X] The "Staff" Data Model
> **Say this:** "A Staff-level model must handle concurrency and accessibility natively. 
> 
> *Note for Interviewer: The server provides raw data, and our **Frontend Selector Layer** calculates the `a11y` metadata to keep the server logic clean.*
> 
> - **🏆 VERSION FIELD:** For **OPTIMISTIC CONCURRENCY CONTROL**.
> - **🏆 A11Y METADATA (Client-Side Calculated):** We calculate `aria-level` and `posInSet` in our **MEMOIZED SELECTORS**. This ensures screen readers get instant context without re-calculating on every UI scroll.
>
> *(Type/Write this model)*:
> ```typescript
> interface Comment {
>   id: string; 
>   parentId: string | null;
>   author: { id: string; name: string; avatar: string };
>   content: { raw: string; html: string };
>   version: number;       // For Optimistic Concurrency
>   status: 'pending' | 'success' | 'error'; // For Optimistic UI
>   a11y: {                // Pre-calculated for Screen Readers
>     level: number;       // nesting depth
>     posInSet: number;    // "Comment 2 of 5"
>     setSize: number;
>   };
>   updatedAt: number;
> }
> ```

### [REVISE 3X] Robust API Design
> **Say this:** "For the API, I'll use a mix of REST for persistence and WebSockets for speed:
> 1. **🏆 IDEMPOTENCY KEYS:** Enforced on all `POST` requests. Prevents duplicate comments on network retries.
> 2. **🏆 EVENT THROTTLING:** For typing indicators, I'll throttle to 500ms to avoid overloading the socket.
> 3. **409 CONFLICT HANDLING:** If versions mismatch, the API rejects with the latest state so the UI can prompt a merge."
>
> *(Write these endpoints)*:
> ```text
> GET  /api/docs/:id/comments?cursor=X&limit=50  
> POST /api/docs/:id/comments (Header: Idempotency-Key)
> PUT  /api/comments/:id (Body: {content, version}) -> 409 Conflict
>
> WS Event: { type: "COMMENT_SYNC", payload: Comment }
> ```

---

## ⏱️ PHASE 4: Accessibility Deep Dive (25-35 Min)
**Goal:** Win the interview here.

### [REVISE 3X] Real-Time Screen Reader UX
> **Say this:** "The challenge is notifying screen reader users without disrupting their flow.
> 
> My strategy uses **🏆 ARIA LIVE REGIONS**:
> - **'POLITE' ANNOUNCEMENTS:** For new comments, so we don't interrupt the user reading.
> - **'ASSERTIVE' ANNOUNCEMENTS:** Only for **MENTIONS** or **ERRORS**, as these require immediate action.
> - **🏆 BATCHED ANNOUNCEMENTS:** If 5 comments arrive, say '5 new comments' rather than reading every name.
> 
> **🏆 ROVING TABINDEX:**
> - Only the active comment is focusable. **J/K KEYS** handle navigation so users don't have to tab 1000 times.
> - **🏆 FOCUS TRAP:** Used in the Edit Modal to ensure keyboard focus doesn't leak back into the main thread."

---

## ⏱️ PHASE 5: Edge Cases & Trade-offs (35-45 Min)
**Goal:** Prove you can handle chaos.

### [REVISE 3X] Top 5 Critical Scenarios
> **Say this:** "In a production system at Atlassian scale, these 5 scenarios are critical:"
>
> 1. **🏆 RACE CONDITION (Delete while Replying):** User A deletes a comment while User B replies.
>    - **Fix:** Server returns 404. I'll show a UI fallback: 'Parent deleted. Post as new top-level comment?'
> 2. **🏆 ZOMBIE WEBSOCKET:** Connection appears alive but is 'stale'.
>    - **Fix:** **PING/PONG HEARTBEAT** every 30s. If it fails, trigger **EXPONENTIAL BACKOFF RECONNECTION**.
> 3. **🏆 VERSION CONFLICT (409):** Two people edit at once.
>    - **Fix:** Version mismatch triggers a 'Merge Conflict' UI. **STOP 'LAST WRITE WINS'** data loss.
> 4. **🏆 NETWORK PARTITION (RESYNC):** User offline for 10 mins.
>    - **Fix:** Upon reconnection, fetch a **DELTA SYNC** using the last received timestamp.
> 5. **🏆 TOMBSTONE PATTERN:** Deleting a comment that has 50 replies.
>    - **Fix:** Leave a **'Tombstone'** (e.g., 'Deleted') to maintain thread structure without breaking the reference chain."

### [REVISE 2X] Final Trade-off
> **Say this:** "I chose **WebSockets** for the responsiveness needed for 'Presence', acknowledging the trade-off is higher server memory usage compared to Long Polling. For the frontend, I chose **Virtualization** to keep memory low, even though it adds complexity to keyboard focus management, which I solved with the **Roving Tabindex**."

---

## 💡 DELIVERY TIPS:
- **Don't just talk, type/draw.**
- **Staff Signal:** Always mention **"Idempotency"** and **"Normalization"**.
- **Atlassian Culture:** Spend extra time on **A11y (Accessibility)**. It's their internal priority.
