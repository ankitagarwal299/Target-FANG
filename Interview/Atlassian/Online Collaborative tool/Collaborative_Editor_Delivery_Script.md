# ULTIMATE PRACTICE SCRIPT: Collaborative Editor (Google Docs/Confluence)

*This script is designed for a Senior/Staff Frontend System Design interview at Atlassian. Focus on real-time sync, conflict resolution, and rich accessibility.*

---

## ⏱️ PHASE 1: Requirements & Scope (0-5 Min)
**Goal:** Define the product boundaries.

### [REVISE 2X] Opening & Functional Scope
> **Say this:** "I'll approach this as designing a cloud-based collaborative rich-text editor, similar to Confluence or Google Docs. I'll focus on the frontend architecture, the synchronization engine, and how we handle concurrent edits from multiple users.
> 
> **Quickly clarify:** 
> - **Rich Text:** Do we need basic formatting (Bold/Italic) or complex embeds like tables and macros (Atlassian style)?
> - **Concurrency:** Should we optimize for 10-50 users per doc, or thousands of concurrent viewers?
> - **Offline:** Is full offline support (editing while disconnected) a priority?
> - **Conflict Resolution:** Should I focus on **Operational Transformation (OT)** or **CRDTs (Conflict-free Replicated Data Types)**?"

### [REVISE 2X] Finalizing the Requirements
> **Say this:** "Okay, I'll aim for: Rich text with Atlassian Document Format (ADF) support, 50 concurrent writers, high-perf real-time sync (<100ms lag), and full WCAG 2.1 AA accessibility."

---

## ⏱️ PHASE 2: High-Level Architecture (5-15 Min)
**Goal:** Macro and Micro view.

### [REVISE 3X] Component Hierarchy (The "Micro" View)
> **Say this:** "I'll divide the UI into a clean hierarchy to separate the **VIEW** from the **EDITING ENGINE**."
>
> *(Simulate drawing this on the board)*:
> ```text
> [ EditorContainer (State & Orchestration) ]
>           |
>           |--- [ Toolbar ] (Formatting Actions)
>           |
>           |--- [ PresenceOverlay ] (Cursors & Avatars)
>           |
>           |--- [ Canvas / EditingArea ] (Rich Text Surface)
>           |         |
>           |         |--- [ UserCursor ] (Dynamic ARIA position)
>           |         |--- [ TextSegments ] (ADF Nodes)
>           |
>           |--- [ SyncStatusIndicator ] (Online/Offline/Saving)
> ```

### [REVISE 3X] High-Level System Architecture (The "Macro" View)
> **Say this:** "To handle collaborative editing, we need a robust backend sync layer with low-latency delivery."
>
> *(Draw this diagram)*:
> ```text
> [ Client A ] <---(WebSockets)---> [ Load Balancer ] <---> [ Real-Time Sync Server ]
>                                         |                      | (Pub/Sub)
>                                         |                      V
> [ Client B ] <---(WebSockets)---> [ Auth/Rest ] <------> [ Document DB ]
>                                         |                      |
>                                         +----------------------+
> ```
> **Say this:** "The **Sync Server** manages the 'Truth' of the document. It receives operations, transforms them (if using OT), and broadcasts them to other clients via **Pub/Sub (Redis)**."

---

## ⏱️ PHASE 3: Data Model & Conflict Resolution (15-25 Min)
**Goal:** The "Meat" of the interview.

### [REVISE 3X] Data Model (Atlassian Document Format - ADF)
> **Say this:** "We won't use raw HTML. We'll use a **JSON Tree Structure** (like ADF) to represent the document. This makes it easy to calculate 'Operations'."
>
> *(Write this snippet)*:
> ```javascript
> {
>   type: "doc",
>   version: 42, // For sync versioning
>   content: [
>     { type: "paragraph", content: [{ type: "text", text: "Hello Atlassian" }] }
>   ]
> }
> ```

### [REVISE 3X] 🏆 Operational Transformation (OT) Strategy
> **Say this:** "To handle conflicts (two people typing at once), I'll use **OT**. Instead of sending the whole doc, we send small **OPERATIONS**."
> 
> *(Type/Write this example)*:
> ```javascript
> // Operation Example
> {
>   userId: "user-123",
>   version: 42,
>   type: "insert",
>   pos: 5,
>   char: "!"
> }
> ```
> **Say this:** "If two users send an operation at version 42, the **Sync Server** performs the transformation (e.g., shifting the second operation's position by +1) to ensure everyone ends up with the same final state. This is **🏆 CONVERGENCE**."
>
> ### [REVISE 2X] The API Contract
> **Say this:** "The interaction happens over two channels: REST for setup, WebSockets for sync."
>
> *(Write these endpoints)*:
> ```text
> GET  /api/v1/docs/:id          // Initial document load (ADF JSON)
> POST /api/v1/docs/:id/ops      // REST Fallback for sending operations
> GET  /api/v1/docs/:id/history  // Fetch revision history
>
> WS Event: { "action": "op", "data": Operation }    // Send/Recv Edits
> WS Event: { "action": "presence", "data": CursorPos } // Cursor updates
> ```

---

## ⏱️ PHASE 4: Real-Time Sync & Performance (25-35 Min)
**Goal:** Optimization and UX.

### [REVISE 2X] Real-Time Sync Strategy
> **Say this:** "I'll use **WebSockets** for the lowest latency. 
> 1. **Optimistic UI:** When a user types, we update the local UI instantly. 
> 2. **Buffer:** We buffer local changes and send them in 'packets' every 200ms to avoid overwhelming the socket.
> 3. **Cursors:** I'll broadcast cursor positions (`{x, y, userId}`) as high-frequency 'volatiles' that don't need to be saved to the DB."

### [REVISE 3X] Rendering Performance
> **Say this:** "For a 100-page document, rendering thousands of DOM nodes is slow. I'll use **🏆 VIRTUALIZED RENDERING**: Only render the blocks visible in the viewport. 
> 
> **Staff Signal:** I'll use a **🏆 WEB WORKER** for the 'OT Engine' calculation. This keeps the UI thread free for 60fps typing and cursor movement, even when receiving heavy sync updates from other users."

---

## ⏱️ PHASE 5: Accessibility & Edge Cases (35-45 Min)
**Goal:** The Atlassian differentiator.

### [REVISE 3X] 🏆 ACCESSIBILITY (Non-Negotiable)
> **Say this:** "A collaborative editor is an accessibility challenge. visually impaired users need to know what others are doing."
> 
> **My Strategy:**
> 1. **ARIA Live Regions:** Use `aria-live="polite"` to announce when someone joins or leaves.
> 2. **Collaborative Cursors:** If someone edits a line the user is focused on, use a **screen reader announcement**: 'User John Doe modified this paragraph'.
> 3. **Semantic HTML:** Mapping our ADF tree to native HTML elements (`<p>`, `<h1>`, `<ul>`) within a `contenteditable` container to leverage built-in browser screen reader support."

### [REVISE 3X] Top 5 Edge Cases
> **Say this:** "These are the scenarios that break real-time editors:"
> 
> 1. **🏆 NETWORK PARTITION (The 'Tunnel' Scenario):** User is in a tunnel, makes 50 edits. 
>    - **Fix:** Buffer all operations in **IndexedDB**. On reconnect, perform a **🏆 REBASE** against the server's new version.
> 2. **🏆 ZOMBIE CURSORS:** User closes the tab without 'logging out'.
>    - **Fix:** WebSocket server detects 'Close' and broadcasts a `USER_LEFT` event. Add a 30s timeout on the client for safety.
> 3. **🏆 VERSION MISMATCH (409):** The client is too far behind (e.g., missed 1000 operations).
>    - **Fix:** The server sends a `REFRESH_REQUIRED`. The client re-fetches the full document state rather than trying to transform 1000 ops.
> 4. **🏆 LARGE COPY-PASTE:** User pastes a 500-page document.
>    - **Fix:** Sanitize on the frontend, chunk the operations, and show a 'Syncing...' progress bar to prevent UI lockup.
> 5. **🏆 SIMULTANEOUS STYLING:** One user deletes a word while another makes it Bold.
>    - **Fix:** The OT engine must handle 'Retain' and 'Delete' logic to ensure the style is either discarded or applied to the new range correctly."

---

## 💡 STAFF-LEVEL DELIVERY TIPS:
- **Mention 🏆 IDEMPOTENCY:** Ensure that operations applied twice don't break the state.
- **Mention 🏆 IMMUTABILITY:** State should be updated immutably to make 'Undo/Redo' logic trivial (keeping a history stack of operations).
- **Atlassian Culture:** Always reference **ADF (Atlassian Document Format)**—it shows you've researched their specific tech stack.
