# Palo Alto Networks: Staff Frontend System Design - Security Threat Dashboard

**Role:** Staff Frontend Engineer  
**Duration:** 60 Minutes  
**Core Challenge:** Visualize & Filter high-throughput security event streams (5k+ events/sec) with zero UI latency.

---

## 1. High-Level Requirements & Constraints (5 Minutes)

**Overview:**
"We are building a **Real-Time Security Operations Center (SOC) Dashboard**. Analysts use this to monitor threats, triage incidents, and investigate anomalies."

**Key Requirements:**
1.  **Ingestion:** Handle 5,000+ events/sec via WebSocket.
2.  **Visualization:**
    *   **Live Feed:** Infinite scroll list of latest alerts.
    *   **Trend Chart:** 24h volume history (Line Chart).
    *   **Aggregations:** Top Sources/Attacks (Bar Charts).
3.  **Interaction:** Instant filtering (e.g., "Show me all Critical Malware from IP 10.0.0.1").

**The "Staff" Constraint (Performance):**
*   **Zero UI Freezes:** The UI must run at 60fps even during a "DDoS Attack" scenario (100k events/sec burst).
*   **Data Integrity:** We cannot drop critical alerts.

---

## 2. Updated Data Model: In-Memory Database (15 Minutes) - *CRITICAL*

**Rationale:**
"Storing data in a simple array `Alert[]` is fatal for performance. Filtering becomes O(N), which at 100k items kills the main thread.
Instead, I propose a **Normalized, Indexed In-Memory Database** structure using `Map` and `Set`."

### 2.1 The Schema (TypeScript)

```typescript
type AlertId = string;
type Timestamp = number;
type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
type Status = 'OPEN' | 'INVESTIGATING' | 'RESOLVED';

interface ClientDB {
  // 1. Primary Storage (The "Table")
  // O(1) read/write. Map is faster than Object for frequent additions/deletions.
  alerts: Map<AlertId, Alert>;

  // 2. Inverted Indices (The "Search Engine")
  // Pre-computed buckets for instant filtering.
  // Instead of alert.filter(a => a.severity === 'CRITICAL'), we just grab indices.severity.CRITICAL
  indices: {
    severity: Record<Severity, Set<AlertId>>;
    status: Record<Status, Set<AlertId>>;
    // Dynamic indices (e.g. by Source IP) created on demand or for top N keys
    sourceIp: Map<string, Set<AlertId>>;
  };

  // 3. Time Series Data (Optimized for Charts)
  // Decoupled from the Alert List to avoid re-generating chart data from raw alerts every frame.
  stats: {
    // Ring Buffer or TypedArray for memory efficiency
    timeBuckets: { time: Timestamp; count: number }[]; // 1-minute buckets
    topSources: Map<string, number>;
  };

  // 4. View State (The "Result Set")
  // The current list of IDs being displayed after filtering.
  visibleIds: AlertId[];
}
```

### 2.2 Why this Model? (Trade-offs)
*   **O(1) Filtering:** To show "Critical" alerts, I don't scan 50,000 items. I just grab `indicies.severity.CRITICAL` (a Set of IDs).
*   **Intersection:** To show "Critical AND Open", I perform a Set Intersection between the two indices. This is orders of magnitude faster than array filtering.
*   **Memory Management:** `Map` and `Set` in JS are optimized for frequent adds/removes.
*   **Reference Stability:** The `Alert` object in `alerts` map is the single source of truth. The Sets just hold references (IDs).

---

## 3. High-Performance Architecture (15 Minutes)

**"How do we handle 5,000 events/sec without freezing the browser?"**

### 3.1 The "Off-Main-Thread" Pipeline (Web Workers)
We do **not** process raw WebSocket data on the UI thread.

1.  **Ingestion Worker (Web Worker):**
    *   **Input:** Raw WebSocket Stream.
    *   **Task:** Parsing JSON, Validating Schema, Updating Indices, Aggregating Stats (1-min buckets).
    *   **Output:** Batched "Diffs" sent to Main Thread every 500ms (or dynamic based on load).
    *   *Why?* If GC kicks in or parsing is slow, the UI (scrolling/hovering) remains buttery smooth.

2.  **SharedArrayBuffer (Optional "Staff" Flex):**
    *   For extreme performance (100k/sec), we could use `SharedArrayBuffer` to share memory between Worker and Main Thread without serialization overhead. (Mention this as an optimization, but stick to standard `postMessage` for simplicity first).

### 3.2 Main Thread (UI Layer)
The UI is a "Dumb View" of the Worker's state.

*   **Virtualization (React-Window):**
    *   Only render the ~20 visible rows.
    *   Use `CSS.contain: strict` on rows to isolate layout recalculations.
*   **Canvas Rendering (Charts):**
    *   **Chart.js / Visx-Canvas:**
    *   Use `OffscreenCanvas` where possible to let the Worker draw the chart and just transfer the bitmap to the Main Thread.
    *   *Why?* 10,000 SVG DOM nodes = Crash. 1 Canvas = 60fps.

---

## 4. API & Data Transport (10 Minutes)

### 4.1 Hybrid Feching
*   **Initial Load:** `GET /api/v1/snapshot?window=1h` (Fast binary format like Protocol Buffers or just gzipped JSON).
*   **Live Stream:** `WS wss://api.paloalto.com/stream`
    *   **Protocol:** Server sends **Delta Updates** only.
    *   `{ id: "123", s: "HIGH" }` instead of full object.

### 4.2 Handling "The Flood" (Backpressure)
**Scenario:** A botnet triggers 100,000 alerts in 10 seconds.
*   **Backend:** Should aggregate identical alerts (Deduping).
*   **Frontend (Sampling):**
    *   If buffer > 5,000 items/sec: **Switch to "Visual" mode.**
    *   Stop updating the Grid (it's unreadable anyway).
    *   Update the *Counters* and *Charts* only.
    *   Show a banner: *"High Velocity Mode: Paused Live Feed (10k new events)"*.

---

## 5. Script / Narrative (Speaking Guide)

**Intro:**
"High-frequency security dashboards are a **data management** problem, not just a UI problem. My design centers on keeping the Main Thread unblocked by moving ingestion to a Web Worker and using an Indexed Data Model for instant filtering."

**On Data Model:**
"I'm choosing a **Normalized Store with Inverted Indices**. Instead of filtering arrays O(N), I map Severities to Sets of IDs. This makes filtering 'Critical' alerts instantaneous O(1), regardless of dataset size."

**On Charts:**
"For the Time Series, I'll use **Canvas** (Chart.js) over SVG. SVG creates a DOM node per data point, which chokes at >5k points. Canvas is a single raster image, perfect for high-frequency updates."

**On Reliability:**
"To prevent memory leaks in a long-running dashboard (24/7 ops), I'll implement a **Ring Buffer** in the store, automatically purging alerts older than 24 hours or exceeding 100k items, ensuring memory usage stays flat."

---

## 6. Summary Checklist
*   [ ] **Web Workers** for parsing/indexing.
*   [ ] **Inverted Indices** (Map/Set) for O(1) filtering.
*   [ ] **Virtualization** for the grid.
*   [ ] **Canvas** for charts.
*   [ ] **Throttle/Batching** (500ms) for UI updates.
*   [ ] **Backpressure/Sampling** UI mode for floods.
