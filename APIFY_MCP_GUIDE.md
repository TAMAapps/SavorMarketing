# Apify MCP Best-Practice Guide for Cursor Agents

> **Purpose**   Consult this document **before every Apify MCP interaction** to minimise hallucinations, infinite loops, and wasted credits.

---

## 1. Why Agents Fail or Hallucinate

| # | Failure Mode | Root Cause |
|---|--------------|-----------|
| 1 | **Fabricated `runId` / `datasetId`** | Tool schema says only `string`; agent guesses IDs. |
| 2 | **Empty results → retry loop** | Actor still *RUNNING* while agent polls; 404 triggers blind retry. |
| 3 | **Tool list out-of-sync** | Cursor caches MCP tool list; new tools never appear. |
| 4 | **Silent auth / quota errors** | 401/403 collapsed into generic error, agent invents success. |
| 5 | **Missing discovery helpers** | No way to list real runs/datasets, so agent fabricates. |
| 6 | **Model optimism bias** | LLM prefers to answer rather than respond with “need lookup”. |

---

## 2. Schema & Server Hardening

1. **Constrain parameters**
   ```jsonc
   {
     "name": "datasetId",
     "type": "string",
     "pattern": "^[A-Za-z0-9]{17}$",
     "description": "Real Apify dataset ID"
   }
   ```
2. **Expose lookup tools** – `list_actor_runs`, `get_last_run`, `list_datasets`.
3. **Wrap async runs** – provide `run_actor_and_wait` that returns dataset only after state =`SUCCEEDED`.
4. **Pass through error bodies** so agents see `{"message":"dataset not found"}`.

---

## 3. Agent Prompt Guard (optional)
```
If you do not have a REAL datasetId or runId retrieved via an MCP call in THIS
session, reply exactly with "NEED_LOOKUP" instead of inventing one.
```
Add to system prompt to slash hallucinations.

---

## 4. Operational Checklist (perform **in order**)

1. 🔑 **Authenticate** – verify `APIFY_TOKEN` via `curl https://api.apify.com/v2/key-value-stores`.
2. 🔄 **Refresh tool list** – `Developer: Reload Window` or run `cursor mcp refresh`.
3. 🗒️ **Discover IDs** – call helper tools **first**; never guess.
4. ⏳ **Wait for completion** – poll `status` until `SUCCEEDED` *once*; abort on `FAILED`.
5. 🛑 **Guard against loops** – stop after 2 identical errors; surface message to user.
6. 📜 **Log real errors** – check *MCP Logs* panel for 4xx/5xx.

---

## 5. Quick-Start Template
```js
// 1) Start actor and wait
const { datasetId } = await run_actor_and_wait({
  actorName: "apify/twitter-scraper",
  input: { query: "yelp reviews fake", maxTweets: 100 }
});

// 2) Fetch items
const items = await get_dataset_items({ datasetId, limit: 10, clean: true });
```

---

## 6. Troubleshooting Table

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| `Client closed` | Expired token / network drop | Refresh token; retry once. |
| Repeated 404 on dataset | Actor still running OR wrong ID | Use `run_actor_and_wait`; verify ID via `list_datasets`. |
| Tools missing in Cursor | Cache bug | Restart Cursor or `mcp refresh`. |
| Infinite retries | No guard clause | Add server-side repeat-limit or Prompt Guard. |

---

## 7. References & Community Threads
* "MCP keep loading" (Cursor Forum, Jun 2025)
* "SOLVED: MCP Servers can cause issue with Agent Mode" (Feb 2025)
* Blog: *How to use MCP with Apify* (Apify, 2025-05)

---

**Remember:** _If a real lookup hasn’t happened, don’t invent IDs._ 