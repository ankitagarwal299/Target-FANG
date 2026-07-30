# Atlassian Frontend System Design: Real-Time Comments System
## 45-Minute Interview Script (Staff Engineer)

---

## 🎯 TOP 10 EDGE CASES TO MEMORIZE

1. **Race Condition**: User deletes comment while another user is replying to it
2. **Network Partition**: Client offline for 5 minutes, then reconnects with 200+ pending updates
3. **Concurrent Edits**: Two users edit the same comment simultaneously within 100ms
4. **Deep Threading**: Comment thread exceeds 50 levels of nesting
5. **Screen Reader Context Loss**: User navigates away and returns - how to restore position in 500+ comments
6. **Mention Notifications**: User mentioned in a deleted comment before notification is sent
7. **Permission Changes**: User loses read access while actively viewing and commenting
8. **Zombie WebSocket**: Connection appears alive but server hasn't received heartbeat in 60s
9. **Optimistic UI Failure**: Local comment shows "posted" but server rejects it 5 seconds later
10. **Keyboard Navigation**: 1000+ comments - how to efficiently navigate without tabbing through all

---

## ⏱️ MINUTE-BY-MINUTE SCRIPT

### Minutes 0-5: Requirements Clarification & Scope

**[0:00-0:30] Opening (30 seconds)**

> "Thank you for this problem. Before I dive into the design, I'd like to clarify the requirements and scope. I'll approach this from a frontend-first perspective, but I'll also consider the backend contracts we'd need.
>
> For a real-time comments system at Atlassian, I'm thinking of something like Jira issue comments or Confluence page comments. Is that the right context?"

**[0:30-3:00] Rapid-Fire Clarifications (2.5 minutes)**

Ask these questions **confidently and quickly**:

> **Functional Requirements:**
> - "What's the scale? Are we talking 10-50 concurrent users per document, or thousands?"
> - "Do we need threading/replies, or flat comments only?"
> - "Rich text editing - should we support formatting, mentions, emoji, attachments?"
> - "Edit and delete capabilities - with edit history?"
> - "Real-time presence - showing who's typing?"
>
> **Non-Functional Requirements:**
> - "Latency expectations - is 100-200ms acceptable for real-time updates?"
> - "Should comments work offline with sync on reconnect?"
> - "Mobile web support required, or desktop-only?"
>
> **Accessibility - this is critical:**
> - "Should we support WCAG 2.1 Level AA or AAA?"
> - "Any specific screen reader requirements - JAWS, NVDA, VoiceOver?"

**[3:00-5:00] Confirm Scope (2 minutes)**

> "Based on typical Atlassian products, I'll assume:
> - **Scale**: 50-100 concurrent users per document
> - **Features**: Threaded replies (3 levels max), rich text with mentions, edit/delete with history
> - **Real-time**: WebSocket-based, <200ms latency, optimistic UI
> - **Accessibility**: WCAG 2.1 AA compliance, full screen reader support
> - **Offline**: Basic offline with conflict resolution
>
> I'll focus on the **frontend architecture** but outline the **API contracts** we need. Sound good?"

---

### Minutes 5-15: High-Level Architecture

**[5:00-7:00] Component Architecture (2 minutes)**

Draw this diagram while speaking:

```
┌─────────────────────────────────────────┐
│         CommentSection (Container)       │
│  - State management (React Context/Redux)│
│  - WebSocket connection manager          │
│  - Optimistic UI coordinator             │
└────────────┬────────────────────────────┘
             │
    ┌────────┴────────┬──────────────┐
    │                 │              │
┌───▼────┐   ┌───────▼──────┐  ┌───▼────────┐
│Comment │   │CommentComposer│  │PresenceBar │
│Thread  │   │   - Editor    │  │ (who's here)│
│List    │   │   - Mention   │  └────────────┘
└───┬────┘   │   - Upload    │
    │        └───────────────┘
┌───▼─────────────┐
│  CommentCard    │
│  - Header       │
│  - Body (rich)  │
│  - Actions      │
│  - ReplyThread  │
└─────────────────┘
```

> "The architecture consists of:
> 1. **CommentSection Container** - orchestrates state, WebSocket, and optimistic UI
> 2. **CommentThread** - virtualized list for performance (react-window for 1000+ comments)
> 3. **CommentCard** - individual comment with accessibility markup
> 4. **CommentComposer** - rich text editor with mentions
> 5. **PresenceBar** - real-time user awareness"

**[7:00-10:00] Real-Time Data Flow (3 minutes)**

> "For real-time updates, I'm proposing a **hybrid approach**:
>
> **1. WebSocket for Real-Time Events**
> ```javascript
> // Event types over WebSocket
> {
>   type: 'COMMENT_ADDED',
>   payload: { commentId, content, author, timestamp, parentId }
> }
> {
>   type: 'COMMENT_UPDATED',
>   payload: { commentId, content, version }
> }
> {
>   type: 'COMMENT_DELETED',
>   payload: { commentId, deletedBy, timestamp }
> }
> {
>   type: 'USER_TYPING',
>   payload: { userId, commentId } // expires after 3s
> }
> ```
>
> **2. Optimistic UI Pattern**
> - When user posts comment: immediately show with `status: 'pending'`
> - Show loading indicator in corner
> - On WebSocket ACK: update to `status: 'posted'`
> - On error: mark as failed with retry option
>
> **3. State Management**
> - Use **Normalized Redux store** for comments:
> ```javascript
> {
>   comments: {
>     byId: { 'c1': {...}, 'c2': {...} },
>     allIds: ['c1', 'c2'],
>     byParentId: { null: ['c1'], 'c1': ['c2'] }
>   },
>   optimistic: {
>     pending: ['temp-id-1'],
>     failed: []
>   }
> }
> ```
> Why normalized? Efficient updates when comment changes - no array scanning."

**[10:00-12:00] Performance Strategy (2 minutes)**

> "For performance at scale:
>
> **1. Virtualization**
> - Use `react-window` - only render visible comments
> - For 1000 comments, render ~20 at a time
> - Dynamic row heights for varied content
>
> **2. Pagination Strategy**
> - Initial load: most recent 50 comments
> - **Bidirectional infinite scroll**: load older on scroll up, newer on scroll down
> - Keep 100 comments in memory, evict older
>
> **3. Debouncing & Throttling**
> - Typing indicator: debounce 500ms
> - Scroll events: throttle to 16ms (60fps)
>
> **4. Memoization**
> - Memoize comment cards with `React.memo`
> - Compare by `commentId` and `version` only"

**[12:00-15:00] Reliability & Offline (3 minutes)**

> "For reliability:
>
> **1. Connection Management**
> ```javascript
> class WebSocketManager {
>   connect() {
>     this.ws = new WebSocket(url);
>     this.setupHeartbeat(); // ping every 30s
>     this.setupReconnect(); // exponential backoff
>   }
>   
>   setupReconnect() {
>     // Retry: 1s, 2s, 4s, 8s, max 30s
>     this.reconnectDelay = Math.min(
>       this.reconnectDelay * 2, 
>       30000
>     );
>   }
> }
> ```
>
> **2. Offline Queue**
> - Store pending actions in IndexedDB
> - On reconnect: replay queue with conflict detection
> - Show clear UI: 'Posted while offline - syncing...'
>
> **3. Conflict Resolution**
> - Server wins for edits (version-based)
> - Show modal: 'This comment was modified. View changes?'
> - For deletes: show tombstone 'Comment deleted by X'"

---

### Minutes 15-22: Data Model Design

**[15:00-17:00] Core Comment Model (2 minutes)**

> "Let me design the data model. For frontend state:
>
> ```typescript
> interface Comment {
>   id: string;                    // UUID
>   documentId: string;            // Parent document
>   parentId: string | null;       // For threading
>   author: {
>     id: string;
>     name: string;
>     avatarUrl: string;
>   };
>   content: {
>     raw: string;                 // Markdown or ADF
>     rendered: string;            // HTML (sanitized)
>   };
>   mentions: string[];            // User IDs mentioned
>   createdAt: number;             // Unix timestamp
>   updatedAt: number;             // For edit tracking
>   version: number;               // Optimistic concurrency
>   status: 'pending' | 'posted' | 'failed';
>   isDeleted: boolean;
>   editHistory?: EditRecord[];
>   
>   // Accessibility metadata
>   a11y: {
>     describedBy?: string;        // For error states
>     level: number;               // Thread depth (0-3)
>     position: number;            // Position in thread
>     totalSiblings: number;       // For "comment 2 of 5"
>   };
> }
> 
> interface EditRecord {
>   version: number;
>   content: string;
>   editedBy: string;
>   editedAt: number;
> }
> ```
>
> Why this structure?
> - `version` enables optimistic locking
> - `a11y` metadata supports screen readers
> - `status` tracks optimistic UI state
> - Flat structure - easier to serialize"

**[17:00-20:00] Thread Structure & Indexing (3 minutes)**

> "For efficient threading:
>
> **1. Denormalized Thread Index**
> ```typescript
> interface ThreadIndex {
>   [parentId: string]: {
>     childIds: string[];
>     depth: number;
>     collapsed: boolean;
>   }
> }
> ```
>
> **2. Tree Traversal Helpers**
> ```typescript
> function getCommentThread(commentId: string): Comment[] {
>   const result = [];
>   let current = commentsById[commentId];
>   
>   // Walk up to root
>   while (current) {
>     result.unshift(current);
>     current = current.parentId 
>       ? commentsById[current.parentId] 
>       : null;
>   }
>   return result;
> }
> ```
>
> **3. Maximum Depth Enforcement**
> - Limit to 3 levels (root → reply → reply to reply)
> - After depth 3: flatten into same level
> - UI feedback: 'Maximum thread depth reached'
>
> **Why limit depth?**
> - Screen readers struggle with deep nesting
> - Visual clarity for all users
> - Performance: simpler tree traversal"

**[20:00-22:00] Presence & Typing Indicators (2 minutes)**

> "For real-time presence:
>
> ```typescript
> interface PresenceState {
>   activeUsers: {
>     [userId: string]: {
>       name: string;
>       lastSeen: number;
>       currentAction: {
>         type: 'typing' | 'viewing';
>         targetCommentId?: string;
>       }
>     }
>   };
>   typingIndicators: {
>     [commentId: string]: {
>       userId: string;
>       expiresAt: number;  // Auto-remove after 3s
>     }[]
>   };
> }
> ```
>
> **Typing Logic:**
> - Client sends `USER_TYPING` on first keystroke
> - Server broadcasts to other clients
> - Auto-expires after 3 seconds
> - Debounce: don't send on every keystroke"

---

### Minutes 22-30: API Design

**[22:00-24:00] REST API Endpoints (2 minutes)**

> "I'll design RESTful APIs for the main operations:
>
> ```
> GET    /api/documents/{docId}/comments
>        ?limit=50&cursor={id}&order=desc
>        Response: { comments: Comment[], nextCursor, hasMore }
>
> POST   /api/documents/{docId}/comments
>        Body: { content, parentId?, mentions[] }
>        Response: { comment: Comment }
>
> PUT    /api/comments/{id}
>        Body: { content, version }
>        Response: { comment: Comment }
>        Error 409: Version conflict
>
> DELETE /api/comments/{id}
>        Response: 204 No Content
>
> GET    /api/comments/{id}/history
>        Response: { edits: EditRecord[] }
> ```
>
> **REST is for:**
> - Initial data fetch
> - Batch operations
> - Historical queries"

**[24:00-27:00] WebSocket Protocol (3 minutes)**

> "For real-time, WebSocket protocol:
>
> **Client → Server Messages**
> ```json
> {
>   "action": "subscribe",
>   "documentId": "doc-123",
>   "clientId": "client-abc"
> }
>
> {
>   "action": "comment.create",
>   "tempId": "temp-123",
>   "payload": {
>     "content": "Hello world",
>     "parentId": null
>   }
> }
>
> {
>   "action": "typing.start",
>   "commentId": "c-456"
> }
> ```
>
> **Server → Client Messages**
> ```json
> {
>   "type": "comment.created",
>   "tempId": "temp-123",       // Map to optimistic UI
>   "comment": { "id": "c-789", ... }
> }
>
> {
>   "type": "comment.updated",
>   "comment": { ... }
> }
>
> {
>   "type": "presence.update",
>   "userId": "u-123",
>   "action": "typing",
>   "commentId": "c-456"
> }
> ```
>
> **Error Handling**
> ```json
> {
>   "type": "error",
>   "tempId": "temp-123",
>   "code": "VALIDATION_ERROR",
>   "message": "Comment too long"
> }
> ```
>
> **Why tempId?** Links optimistic UI to server response"

**[27:00-30:00] API Versioning & Rate Limiting (3 minutes)**

> "For production robustness:
>
> **1. API Versioning**
> - Header: `Accept: application/vnd.atlassian.v1+json`
> - Allows backend changes without breaking clients
>
> **2. Rate Limiting**
> ```
> POST /comments - 10 requests/minute per user
> PUT /comments - 5 requests/minute
> WebSocket messages - 50/minute
> ```
> - Return: `429 Too Many Requests`
> - Headers: `X-RateLimit-Remaining`, `X-RateLimit-Reset`
>
> **3. Idempotency**
> - Header: `Idempotency-Key: <uuid>`
> - Prevents duplicate comments from retries
> - Server caches result for 24 hours
>
> **Frontend handling:**
> ```javascript
> async function postComment(content, retries = 3) {
>   const idempotencyKey = uuid();
>   
>   for (let i = 0; i < retries; i++) {
>     try {
>       return await api.post('/comments', {
>         content,
>         headers: { 'Idempotency-Key': idempotencyKey }
>       });
>     } catch (err) {
>       if (err.status !== 429) throw err;
>       await sleep(2 ** i * 1000); // Exponential backoff
>     }
>   }
> }
> ```"

---

### Minutes 30-40: Accessibility Deep Dive (CRITICAL SECTION)

**[30:00-31:00] Why A11y is Critical (1 minute)**

> "Accessibility is non-negotiable at Atlassian. For a comments system, visually impaired users must be able to:
> 1. Navigate through comments efficiently
> 2. Understand comment context (who, when, thread position)
> 3. Post and edit comments independently
> 4. Receive real-time updates without losing context
>
> I'll cover **semantic HTML, ARIA, screen reader UX, and keyboard navigation**."

**[31:00-34:00] Semantic HTML & ARIA Structure (3 minutes)**

> "First, proper semantic structure:
>
> ```html
> <section 
>   role="region" 
>   aria-label="Comments section"
>   aria-describedby="comment-count">
>   
>   <h2 id="comment-count">
>     156 Comments
>   </h2>
>   
>   <!-- Comment Composer -->
>   <form 
>     aria-label="Add new comment"
>     onSubmit={handleSubmit}>
>     
>     <label for="comment-input">
>       Your comment
>     </label>
>     <div 
>       id="comment-input"
>       role="textbox"
>       contenteditable="true"
>       aria-multiline="true"
>       aria-describedby="comment-help">
>       <!-- Rich text editor -->
>     </div>
>     
>     <div id="comment-help" class="sr-only">
>       Press @ to mention someone. 
>       Press Ctrl+Enter to submit.
>     </div>
>     
>     <button type="submit">
>       Post Comment
>       <span class="sr-only">
>         (Ctrl+Enter)
>       </span>
>     </button>
>   </form>
>   
>   <!-- Comments List -->
>   <div 
>     role="feed"
>     aria-label="Comments feed"
>     aria-busy={isLoading}>
>     
>     {comments.map(comment => (
>       <article
>         key={comment.id}
>         role="article"
>         aria-posinset={comment.a11y.position}
>         aria-setsize={comment.a11y.totalSiblings}
>         aria-level={comment.a11y.level}
>         aria-labelledby={`author-${comment.id}`}
>         tabindex="0">
>         
>         <header>
>           <h3 id={`author-${comment.id}`}>
>             {comment.author.name}
>           </h3>
>           <time datetime={comment.createdAt}>
>             {formatDate(comment.createdAt)}
>           </time>
>         </header>
>         
>         <div aria-label="Comment content">
>           {comment.content.rendered}
>         </div>
>         
>         {comment.updatedAt && (
>           <p className="sr-only">
>             Edited {formatDate(comment.updatedAt)}
>           </p>
>         )}
>         
>         <div role="group" aria-label="Comment actions">
>           <button aria-label="Reply to this comment">
>             Reply
>           </button>
>           <button aria-label="Edit this comment">
>             Edit
>           </button>
>         </div>
>       </article>
>     ))}
>   </div>
> </section>
> ```
>
> **Key ARIA decisions:**
> - `role="feed"` for comments list - tells screen readers this is dynamic content
> - `aria-posinset` and `aria-setsize` - announces 'comment 3 of 15'
> - `aria-level` - announces thread depth 'level 2'
> - `tabindex="0"` on articles - makes comments keyboard focusable"

**[34:00-37:00] Screen Reader UX for Real-Time Updates (3 minutes)**

> "This is the **hardest part** - real-time updates without disrupting screen readers:
>
> **Problem:** New comment arrives while user is reading. How do we notify without interrupting?
>
> **Solution: ARIA Live Regions**
>
> ```html
> <!-- Polite announcements (non-interrupting) -->
> <div 
>   role="status" 
>   aria-live="polite" 
>   aria-atomic="true"
>   class="sr-only">
>   {newCommentsCount > 0 && 
>     `${newCommentsCount} new ${newCommentsCount === 1 ? 'comment' : 'comments'}`
>   }
> </div>
>
> <!-- Assertive announcements (interrupting for critical) -->
> <div 
>   role="alert" 
>   aria-live="assertive" 
>   aria-atomic="true"
>   class="sr-only">
>   {errorMessage}
> </div>
> ```
>
> **When to announce:**
> - **Polite (aria-live='polite')**: New comments, edits by others
> - **Assertive (aria-live='assertive')**: Errors, your comment posted, mentions of you
> - **Never auto-announce**: Typing indicators (too noisy)
>
> **Implementation:**
> ```javascript
> function useA11yAnnouncements() {
>   const [announcement, setAnnouncement] = useState('');
>   
>   const announce = useCallback((message, priority = 'polite') => {
>     // Debounce: don't announce every single comment
>     if (priority === 'polite') {
>       debounce(() => setAnnouncement(message), 2000);
>     } else {
>       setAnnouncement(message);
>     }
>     
>     // Clear after announcement
>     setTimeout(() => setAnnouncement(''), 1000);
>   }, []);
>   
>   return { announcement, announce };
> }
>
> // Usage
> useEffect(() => {
>   if (newComment && newComment.author.id !== currentUser.id) {
>     announce(`New comment from ${newComment.author.name}`, 'polite');
>   }
> }, [newComment]);
> ```
>
> **Critical: Batching announcements**
> - 5 comments arrive in 2 seconds → announce '5 new comments', not each one
> - Prevents spam to screen reader users"

**[37:00-40:00] Keyboard Navigation & Focus Management (3 minutes)**

> "For keyboard-only users:
>
> **1. Keyboard Shortcuts**
> ```javascript
> const shortcuts = {
>   'c': 'Focus comment composer',
>   'n': 'Next comment',
>   'p': 'Previous comment',
>   'r': 'Reply to current comment',
>   'e': 'Edit current comment',
>   '/': 'Search comments',
>   '?': 'Show keyboard shortcuts'
> };
> ```
>
> **2. Focus Management**
> ```javascript
> function CommentSection() {
>   const [focusedCommentId, setFocusedCommentId] = useState(null);
>   
>   const handleKeyDown = (e) => {
>     switch(e.key) {
>       case 'n':
>         // Focus next comment
>         const currentIndex = comments.findIndex(
>           c => c.id === focusedCommentId
>         );
>         const nextComment = comments[currentIndex + 1];
>         if (nextComment) {
>           document.getElementById(
>             `comment-${nextComment.id}`
>           ).focus();
>           setFocusedCommentId(nextComment.id);
>         }
>         break;
>       
>       case 'p':
>         // Focus previous comment
>         // ... similar logic
>         break;
>       
>       case 'r':
>         // Open reply composer for focused comment
>         openReplyComposer(focusedCommentId);
>         break;
>     }
>   };
>   
>   return (
>     <div onKeyDown={handleKeyDown}>
>       {/* comments */}
>     </div>
>   );
> }
> ```
>
> **3. Skip Links**
> ```html
> <a href="#comment-composer" class="skip-link">
>   Skip to comment composer
> </a>
> <a href="#latest-comment" class="skip-link">
>   Skip to latest comment
> </a>
> ```
>
> **4. Focus Trap in Modals**
> ```javascript
> // When editing comment in modal
> function EditCommentModal({ comment, onClose }) {
>   const modalRef = useRef();
>   
>   useEffect(() => {
>     const focusableElements = modalRef.current.querySelectorAll(
>       'a, button, input, textarea, [tabindex]:not([tabindex="-1"])'
>     );
>     const firstElement = focusableElements[0];
>     const lastElement = focusableElements[focusableElements.length - 1];
>     
>     const handleTab = (e) => {
>       if (e.key === 'Tab') {
>         if (e.shiftKey && document.activeElement === firstElement) {
>           e.preventDefault();
>           lastElement.focus();
>         } else if (!e.shiftKey && document.activeElement === lastElement) {
>           e.preventDefault();
>           firstElement.focus();
>         }
>       }
>       
>       if (e.key === 'Escape') {
>         onClose();
>       }
>     };
>     
>     modalRef.current.addEventListener('keydown', handleTab);
>     firstElement.focus();
>     
>     return () => {
>       modalRef.current?.removeEventListener('keydown', handleTab);
>     };
>   }, []);
>   
>   return (
>     <div 
>       ref={modalRef}
>       role="dialog"
>       aria-modal="true"
>       aria-labelledby="edit-title">
>       {/* modal content */}
>     </div>
>   );
> }
> ```
>
> **5. Roving TabIndex for Large Lists**
> ```javascript
> // For 1000+ comments - only one comment is tabbable at a time
> <article 
>   tabindex={isFocused ? 0 : -1}
>   onFocus={() => setFocusedCommentId(comment.id)}>
> ```
>
> This prevents Tab-key exhaustion through hundreds of comments!"

---

### Minutes 40-45: Edge Cases & Closing

**[40:00-43:00] Walking Through Edge Cases (3 minutes)**

> "Let me walk through the top edge cases:
>
> **1. Race Condition - Delete while replying**
> - User A deletes comment
> - User B submitting reply to that comment
> - **Solution**: Server rejects with `404 Parent Not Found`
> - Frontend: Show error 'Original comment was deleted. Post as new comment instead?'
>
> **2. Network Partition - Offline 5 minutes**
> - User offline, misses 200 updates
> - **Solution**: On reconnect, full sync via REST
> - WebSocket sends: `{type: 'RESYNC_REQUIRED'}`
> - Client fetches latest via `GET /comments?since={lastSyncTimestamp}`
> - Merge with local changes, show conflicts
>
> **3. Concurrent Edits**
> - Two users edit same comment < 100ms apart
> - **Solution**: Optimistic versioning
> - First edit: version 1 → 2 (succeeds)
> - Second edit: sends version 1, server has version 2
> - Server returns `409 Conflict` with latest content
> - UI shows: 'Comment changed. Your changes: [diff]'
>
> **4. Deep Threading**
> - Thread exceeds 50 levels
> - **Solution**: Hard limit at depth 3
> - After depth 3: 'Continue thread' link → opens new flat thread
>
> **5. Screen Reader Context Loss**
> - User navigates away, returns to comment section
> - **Solution**: Store last focused comment in localStorage
> - On return: `scrollToComment(lastFocusedId)` and `.focus()`
> - Announce: 'Returned to comment by {author}'
>
> **6. Mention in Deleted Comment**
> - User mentioned, comment deleted before notification sent
> - **Solution**: Check comment existence before sending notification
> - If deleted: don't send, log event for analytics
>
> **7. Permission Changes**
> - User loses read access while viewing
> - **Solution**: WebSocket sends `{type: 'PERMISSION_REVOKED'}`
> - Client immediately hides comments
> - Shows: 'You no longer have access to this content'
>
> **8. Zombie WebSocket**
> - Connection alive, but heartbeat timeout
> - **Solution**: Heartbeat every 30s
> - Server closes connection if no heartbeat in 60s
> - Client detects close, reconnects with exponential backoff
>
> **9. Optimistic UI Failure**
> - Local comment shown as posted
> - Server rejects 5 seconds later
> - **Solution**: Keep optimistic status for 10s
> - On failure: Show inline error with 'Retry' button
> - Don't auto-remove - let user fix and retry
>
> **10. Keyboard Navigation with 1000+ comments**
> - Tabbing through all is impossible
> - **Solution**: Roving tabindex + j/k shortcuts
> - Only one comment tabbable, arrow keys navigate
> - Add 'Jump to top' / 'Jump to bottom' shortcuts"

**[43:00-44:30] Trade-offs & Alternatives (1.5 minutes)**

> "Key trade-offs I made:
>
> **1. WebSocket vs Polling**
> - Chose WebSocket for <200ms latency
> - Trade-off: More complex connection management
> - Alternative: Long polling (simpler, higher latency)
>
> **2. Optimistic UI**
> - Chose immediate feedback for UX
> - Trade-off: Complex conflict resolution
> - Alternative: Wait for server ACK (slower, simpler)
>
> **3. Virtualization**
> - Chose react-window for performance
> - Trade-off: Accessibility complexity (dynamic content)
> - Alternative: Pagination (simpler, worse UX)
>
> **4. Depth Limit of 3**
> - Chose to prevent cognitive overload
> - Trade-off: Can't have deeply nested discussions
> - Alternative: Unlimited depth (overwhelming for screen readers)"

**[44:30-45:00] Closing (30 seconds)**

> "To summarize:
> - **Architecture**: React with normalized Redux, WebSocket for real-time, REST for sync
> - **Data Model**: Versioned comments with thread indexing
> - **API**: Hybrid REST + WebSocket with idempotency
> - **A11y**: ARIA live regions, keyboard shortcuts, focus management, WCAG AA
> - **Performance**: Virtualization, memoization, pagination
>
> What would you like me to dive deeper into?"

---

## 📚 FOLLOW-UP QUESTIONS & ANSWERS

### Technical Deep Dives

**Q: How would you handle very large attachments in comments?**

> "Great question. For attachments:
> 1. **Client-side**: Upload directly to S3 with pre-signed URLs
> 2. **Flow**:
>    - Frontend requests signed URL: `POST /api/upload-url` → `{uploadUrl, fileId}`
>    - Upload file directly to S3 (doesn't block comment post)
>    - Include fileId in comment: `{content, attachments: [{fileId, name, size}]}`
>    - Server validates file exists in S3
> 3. **Progress**: Show upload progress bar separately from comment
> 4. **A11y**: Announce upload completion to screen readers
> 5. **Failure**: If upload fails, allow posting comment without attachment"

**Q: How do you handle mentions/notifications?**

> "Mention system:
> 1. **In Editor**: Autocomplete on '@' keypress
>    - Fetch users: `GET /api/users/search?q={query}&context=document`
>    - Show dropdown with keyboard navigation (arrow keys, enter to select)
> 2. **Data**: Store as structured data
>    ```javascript
>    {
>      content: {
>        raw: 'Hey @[John Doe](user:123), check this',
>        mentions: [{userId: '123', name: 'John Doe'}]
>      }
>    }
>    ```
> 3. **Rendering**: Clickable mention chips, navigate to user profile
> 4. **Notifications**:
>    - Server extracts mentions from `mentions[]` array
>    - Sends real-time notification: `{type: 'MENTION', commentId, mentionedBy}`
>    - Email notification if user offline
> 5. **A11y**: 
>    - Screen reader: 'Mention John Doe'
>    - Focus management: Tab moves between mentions"

**Q: How would you implement edit history?**

> "Edit history UI:
> 1. **Data**: Store each version (shown in data model earlier)
> 2. **UI Trigger**: '(edited)' link next to timestamp
> 3. **Modal**:
>    ```html
>    <dialog aria-labelledby='history-title'>
>      <h2 id='history-title'>Edit History</h2>
>      {history.map((edit, index) => (
>        <article>
>          <h3>Version {history.length - index}</h3>
>          <time>{edit.editedAt}</time>
>          <div class='diff'>
>            {generateDiff(
>              history[index - 1]?.content, 
>              edit.content
>            )}
>          </div>
>        </article>
>      ))}
>    </dialog>
>    ```
> 4. **Diff Generation**: Use `diff-match-patch` library
> 5. **A11y**: 
>    - Navigate versions with arrow keys
>    - Screen reader: 'Version 2, edited by John at 2pm. Added: hello world'"

**Q: How do you prevent XSS attacks in comments?**

> "Security is critical:
> 1. **Sanitization**: Use DOMPurify on server AND client
>    ```javascript
>    import DOMPurify from 'dompurify';
>    
>    const sanitized = DOMPurify.sanitize(content, {
>      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li'],
>      ALLOWED_ATTR: ['href'],
>      ALLOW_DATA_ATTR: false
>    });
>    ```
> 2. **CSP Headers**: Content-Security-Policy
>    ```
>    Content-Security-Policy: 
>      default-src 'self'; 
>      script-src 'self' 'nonce-{random}';
>      style-src 'self' 'unsafe-inline';
>    ```
> 3. **Iframe Sandboxing**: If allowing embeds
>    ```html
>    <iframe sandbox='allow-scripts' src='...'></iframe>
>    ```
> 4. **Link Validation**: Check URLs for javascript: protocol
> 5. **Server Validation**: Never trust client, re-sanitize on backend"

**Q: How would you test this system?**

> "Comprehensive testing strategy:
>
> **1. Unit Tests** (Jest + React Testing Library)
> ```javascript
> describe('CommentCard', () => {
>   it('should have accessible structure', () => {
>     const { getByRole } = render(<CommentCard {...comment} />);
>     expect(getByRole('article')).toBeInTheDocument();
>     expect(getByRole('article')).toHaveAttribute('aria-level', '1');
>   });
>   
>   it('should announce edit to screen readers', () => {
>     const { rerender, getByRole } = render(<CommentCard {...comment} />);
>     const updatedComment = { ...comment, updatedAt: Date.now() };
>     rerender(<CommentCard {...updatedComment} />);
>     expect(getByRole('status')).toHaveTextContent('Comment edited');
>   });
> });
> ```
>
> **2. Integration Tests** (Cypress)
> ```javascript
> describe('Real-time comments', () => {
>   it('should show new comment in real-time', () => {
>     cy.visit('/document/123');
>     cy.window().then(win => {
>       // Simulate WebSocket message
>       win.mockWebSocket.send({
>         type: 'COMMENT_ADDED',
>         payload: newComment
>       });
>     });
>     cy.contains(newComment.content).should('be.visible');
>   });
> });
> ```
>
> **3. A11y Tests** (jest-axe, Pa11y)
> ```javascript
> import { axe } from 'jest-axe';
> 
> it('should have no accessibility violations', async () => {
>   const { container } = render(<CommentSection />);
>   const results = await axe(container);
>   expect(results).toHaveNoViolations();
> });
> ```
>
> **4. Screen Reader Testing**
> - Manual: NVDA (Windows), JAWS (Windows), VoiceOver (Mac)
> - Test scenarios:
>   - Navigate through comments
>   - Post a comment
>   - Receive real-time update
>   - Edit a comment
>
> **5. Performance Tests** (Lighthouse, WebPageTest)
> - Load time with 1000 comments
> - Real-time update latency
> - Memory usage over time
>
> **6. E2E Tests** (Playwright)
> - Multi-user scenarios
> - Offline/online transitions
> - Concurrent edits"

---

## 🎓 BONUS: WHAT INTERVIEWERS LOOK FOR (STAFF ENGINEER)

1. **Systems Thinking**: Did you consider the entire system, not just frontend?
2. **Trade-offs**: Can you articulate why you chose X over Y?
3. **Accessibility First**: Not an afterthought - designed in from the start
4. **Edge Cases**: Proactive about failure scenarios
5. **Scalability**: Designed for 10x growth
6. **Communication**: Clear explanations, checking understanding
7. **Leadership**: Opinions, but open to feedback
8. **Production Readiness**: Monitoring, error handling, security

---

## ✅ PREPARATION CHECKLIST

- [ ] Memorize top 10 edge cases
- [ ] Practice drawing component diagram in 60 seconds
- [ ] Rehearse accessibility section (most critical for Atlassian)
- [ ] Time yourself - each section should fit in allocated time
- [ ] Prepare 2-3 questions to ask interviewer at end
- [ ] Review Atlassian Design System (accessibility patterns)
- [ ] Practice explaining WebSocket vs polling trade-off

**Good luck! Focus on demonstrating depth in accessibility - that's where Staff Engineers shine at Atlassian.**
