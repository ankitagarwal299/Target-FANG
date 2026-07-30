# Accessibility Quick Reference Guide - Real-Time Comments
## What to Actually Say & Draw in Interview (No Full Code!)

---

## 🎯 ACCESSIBILITY CORE CONCEPTS (Memorize These)

### 1. **ARIA Roles for Comments** (Just Say These)

**What to say:**
> "I'll use semantic HTML with ARIA roles. The comments section would be a `role='feed'` because it's dynamic content. Each comment is an `article` with position information."

**What to draw on whiteboard:**
```
┌────────────────────────────────┐
│ <section role="region">        │
│   aria-label="Comments"        │
│                                │
│  ┌──────────────────────────┐ │
│  │ <div role="feed">        │ │
│  │                          │ │
│  │  <article                │ │
│  │    aria-posinset="1"     │ │ ← Say: "Position 1 of 5"
│  │    aria-setsize="5"      │ │
│  │    aria-level="1">       │ │ ← Say: "Thread depth"
│  │  </article>              │ │
│  │                          │ │
│  └──────────────────────────┘ │
└────────────────────────────────┘
```

**Key attributes to mention:**
- ✅ `role="feed"` - for dynamic content
- ✅ `aria-posinset` & `aria-setsize` - announces "comment 3 of 15"
- ✅ `aria-level` - announces thread depth
- ✅ `aria-labelledby` - links to author name

---

### 2. **ARIA Live Regions** (Critical - Master This!)

**What to say:**
> "For real-time updates, I'd use ARIA live regions. There are two types:
> - **Polite** (`aria-live='polite'`) - doesn't interrupt, for new comments
> - **Assertive** (`aria-live='assertive'`) - interrupts, for errors or mentions
> 
> The key is to **batch announcements**. If 5 comments arrive, announce '5 new comments', not each one individually."

**What to draw:**
```
┌─────────────────────────────────┐
│  POLITE (Non-interrupting)      │
│  ┌───────────────────────────┐  │
│  │ <div aria-live="polite">  │  │
│  │   "3 new comments"        │  │
│  │ </div>                    │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  ASSERTIVE (Interrupting)       │
│  ┌───────────────────────────┐  │
│  │ <div aria-live="assertive"│  │
│  │   "Error: Comment failed" │  │
│  │ </div>                    │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

**Decision Matrix (Memorize This!):**

| Event | aria-live | Why |
|-------|-----------|-----|
| New comment by others | `polite` | Don't interrupt reading |
| Your comment posted | `assertive` | Important confirmation |
| Error | `assertive` | Needs immediate attention |
| You were mentioned | `assertive` | Important notification |
| Typing indicator | None | Too noisy |

---

### 3. **Keyboard Navigation** (Simple to Explain)

**What to say:**
> "For keyboard users, I'd implement shortcuts like Gmail:
> - **c** - focus comment composer
> - **n/p** - next/previous comment
> - **r** - reply to current
> - **/** - search
> 
> For large lists with 1000+ comments, I'd use **roving tabindex** - only one comment is tabbable at a time, preventing Tab exhaustion."

**What to draw:**
```
Keyboard Shortcuts:
┌─────────────────────────────┐
│  c  → Focus composer        │
│  n  → Next comment          │
│  p  → Previous comment      │
│  r  → Reply                 │
│  /  → Search                │
└─────────────────────────────┘

Roving Tabindex:
  Comment 1 [tabindex="0"]  ← Only this is tabbable
  Comment 2 [tabindex="-1"]
  Comment 3 [tabindex="-1"]
  ...
  (Use arrow keys to navigate)
```

---

### 4. **Focus Management** (Key Principle)

**What to say:**
> "When a comment is posted, I'd move focus to the new comment and announce it. When editing, focus goes to the editor. When closing a modal, focus returns to the trigger button. This creates a **predictable focus flow** for screen reader users."

**What to draw:**
```
User posts comment
      ↓
  Focus moves to new comment
      ↓
  Announce: "Comment posted successfully"
```

---

## 🧠 REVISION & MEMORY TECHNIQUES

### **Use the "A11y Rule of 3s"**

**3 Core Principles:**
1. **Semantic First** - Use correct HTML elements (article, section, button)
2. **ARIA When Needed** - Add roles/attributes for dynamic content
3. **Keyboard Always** - Everything must work without mouse

**3 ARIA Must-Knows:**
1. **Live Regions** - `aria-live` for real-time updates
2. **Positional Info** - `aria-posinset/setsize` for lists
3. **Relationships** - `aria-labelledby/describedby` for context

**3 Keyboard Patterns:**
1. **Shortcuts** - Single keys for common actions (n/p/r)
2. **Roving Tabindex** - Only one item tabbable in lists
3. **Focus Management** - Always return focus after modals

---

## 📝 WHAT TO ACTUALLY WRITE ON WHITEBOARD

### During A11y Section (Minutes 30-40):

**1. Draw this simple structure (30 seconds):**
```
Comments Section (role="region")
  ↓
Comment Feed (role="feed")
  ↓
Comment (article, aria-posinset, aria-level)
```

**2. Write these key attributes (20 seconds):**
```
- role="feed"
- aria-live="polite|assertive"
- aria-posinset / aria-setsize
- aria-level
- tabindex (roving)
```

**3. Draw the live region decision tree (30 seconds):**
```
Is it critical?
  Yes → aria-live="assertive"
  No  → aria-live="polite"
```

**4. Mention these 3 scenarios (verbal, no writing):**
- New comment → polite announcement
- Error → assertive announcement
- Keyboard shortcuts for navigation

---

## 💡 HOW TO REVISE THIS

### **Day Before Interview:**

**Morning (30 min):**
1. ✅ Read "A11y Rule of 3s" above
2. ✅ Practice drawing the structure diagram (5 times)
3. ✅ Memorize the ARIA decision matrix table

**Afternoon (30 min):**
1. ✅ Practice saying the "What to say" sections out loud
2. ✅ Draw the keyboard shortcuts box from memory
3. ✅ Review the Top 10 Edge Cases (#5 is about screen readers)

**Evening (15 min):**
1. ✅ Quick review of ARIA attributes (role, aria-live, aria-posinset)
2. ✅ Say the 3 core principles out loud

### **1 Hour Before Interview:**

**Review these 5 things ONLY:**
1. 🎯 ARIA live regions (polite vs assertive)
2. 🎯 role="feed" for comments list
3. 🎯 aria-posinset/setsize for position
4. 🎯 Keyboard shortcuts (c/n/p/r)
5. 🎯 Roving tabindex concept

---

## 🗣️ PRACTICE OUT LOUD

**Say this script 3 times:**

> "For accessibility, I'd ensure WCAG 2.1 AA compliance. The comments would use a feed role with positional information. Each comment announces its position like 'comment 3 of 15' and thread depth using aria-level.
>
> For real-time updates, I'd use aria-live regions - polite for new comments so we don't interrupt reading, and assertive for critical things like errors or mentions.
>
> Keyboard navigation is essential. I'd add shortcuts like 'n' for next comment, 'c' to focus the composer. For large lists, I'd use roving tabindex so users don't have to tab through hundreds of comments.
>
> Focus management is key - when a comment posts, focus moves to it and we announce 'Comment posted'. When editing, focus goes to the editor, then returns when done."

**Time yourself - this should take 60-90 seconds.**

---

## ✅ CHECKLIST: Am I Ready?

- [ ] Can I explain aria-live polite vs assertive in 20 seconds?
- [ ] Can I draw the semantic structure in 30 seconds?
- [ ] Can I name 3 keyboard shortcuts?
- [ ] Can I explain roving tabindex in 1 sentence?
- [ ] Can I explain focus management for modals?
- [ ] Do I know when to use role="feed"?
- [ ] Can I explain the "comment 3 of 15" pattern?

If you checked all boxes: **You're ready! 🚀**

---

## 🎯 WHAT INTERVIEWER WANTS TO HEAR

**Good Answers:**
- ✅ "I'd use ARIA live regions with polite for non-critical updates"
- ✅ "Keyboard shortcuts prevent Tab exhaustion through long lists"
- ✅ "Focus management ensures predictable navigation for screen readers"
- ✅ "I'd batch announcements - '5 new comments' not 5 separate announcements"

**Red Flags (Avoid These):**
- ❌ "I'd add ARIA everywhere" (wrong - use semantic HTML first)
- ❌ "Screen readers will just figure it out" (no - be intentional)
- ❌ "I haven't thought about accessibility yet" (unacceptable at Atlassian)

---

## 🔑 THE SECRET WEAPON

**If you forget details during interview, fall back to this mantra:**

> **"Semantic HTML first, ARIA when dynamic, keyboard always, announce changes thoughtfully."**

This shows you understand the principles even if you forget specific attributes.

**Remember:** Atlassian cares MORE about:
- Your **thinking process** (why aria-live polite vs assertive?)
- **User empathy** (how does this help visually impaired users?)
- **Trade-offs** (batching announcements vs real-time - why batch?)

Than about:
- Remembering every ARIA attribute name
- Writing perfect code
- Knowing obscure edge cases

**You got this! 💪**
