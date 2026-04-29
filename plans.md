# Site Plans

## Implementation Plans

See `docs/superpowers/plans/` for detailed task-by-task implementation plans.

| Plan | Status |
|------|--------|
| [Foundation](docs/superpowers/plans/2026-04-28-foundation.md) | Ready |
| Ventures Wheel | Not written |
| Library Panel | Not written |
| Writings Panel | Not written |
| Watercolors Panel | Not written |
| Mobile | Not written |

---

## Chatbot — Digital Twin (future)

Build an n8n-powered chatbot that lets visitors talk to a version of Dima trained on his writings, philosophy, and project descriptions. Not a FAQ bot — sounds like him.

**Backend:** n8n on Railway — Chat Trigger → vector store RAG (writings + resume) → Claude Haiku or GPT-4o mini → Respond to Webhook. Postgres Chat Memory node keyed to a UUID in localStorage for return-visitor continuity.

**Frontend:** Small pill (initials `DP` + pulse) in the bottom-right corner. Expands into a floating ~360×500px draggable chat window. First message written by Dima to set tone immediately.

**Deferred because:** RAG setup (vector store choice: Pinecone vs Supabase pgvector), system prompt voice, and n8n hosting (self-hosted Railway vs n8n Cloud) are all unresolved. Resolve these before writing the plan.

---

## Loose Ideas

- Need to manage all different viewing styles. Design.
- A shorter url that can expand to dmytropetryshchuk.com
- Degree displayed
- Contact should be CTA!
- /contact, /about
- Instead of writing about yourself, write what you wish you knew 3-5 years ago.
