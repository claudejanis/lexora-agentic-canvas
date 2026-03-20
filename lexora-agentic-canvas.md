# Agentic AI Architecture & Context Engineering Canvas — Lexora ERP

---

## 1. Business Objective

**What problem should the agent solve?**

- **Target workflow:** Automate and assist with ERP operations across BDO Latvia's professional services — time entry, billing, client onboarding, reporting, and compliance
- **Expected outcomes:**
  - Reduce manual time entry and invoice drafting effort by automating repetitive workflows
  - Accelerate client onboarding with AI-driven risk scoring and compliance form pre-fill
  - Improve billing accuracy by catching rate mismatches, missing time, and WIP anomalies
  - Enable natural-language querying of financial data (utilization, profitability, receivables)
- **Success metrics:**
  - Time saved on weekly timesheet submission (target: 40% reduction)
  - Invoice drafting accuracy (target: 95%+ first-pass correctness)
  - Onboarding cycle time (target: 30% faster)
  - User adoption rate of AI-assisted features (target: 70%+ within 3 months)

**Example:**
- Auto-draft weekly timesheets from calendar/project activity
- Generate invoice drafts from approved time entries with correct rates and VAT
- Pre-screen new clients and auto-populate compliance forms via Verified.eu

---

## 2. Agent Role Definition

**What role does the agent play?**

- **Agent role:** Operations Assistant & Analyst
  - Acts as a smart assistant embedded in the ERP — not a replacement for users, but an accelerator
  - Drafts, suggests, and validates — humans approve
- **Decision autonomy level:**
  - **Autonomous:** Data lookups, report generation, timesheet pre-fill suggestions, notification routing
  - **Supervised:** Invoice draft creation, rate card recommendations, compliance form pre-population
  - **Human-required:** Invoice approval, client acceptance decisions, write-off approvals, financial adjustments
- **Human-in-the-loop checkpoints:**
  - Before any invoice is finalized
  - Before client acceptance status changes
  - Before any financial write-up/write-down is applied
  - Before syncing data to Horizon (external finance system)

**Example agents:**
- **Billing Assistant Agent** — drafts invoices, flags anomalies, suggests write adjustments
- **Onboarding Agent** — orchestrates screening, pre-fills forms, calculates risk scores
- **Analytics Agent** — answers natural-language questions about utilization, profitability, WIP

---

## 3. Tasks & Capabilities

**What actions must the agent perform?**

- **Time Management:**
  - Pre-fill timesheets from project assignments and calendar data
  - Flag missing time entries and remind users
  - Suggest hour allocations based on historical patterns
- **Billing & Finance:**
  - Draft invoices from approved time entries using the 3-tier rate engine
  - Apply correct VAT determination (21% Latvia / reverse charge EU / zero non-EU)
  - Monitor billing caps and flag projects approaching budget limits
  - Calculate WIP and flag aging items
  - Generate retainer drawdown suggestions
- **Client Onboarding:**
  - Trigger World-Check and Verified.eu screenings
  - Pre-populate compliance forms (A4, A7, A5, A6, A9, AX, A8)
  - Calculate risk scores and recommend approval chains
- **CRM & Marketing:**
  - Summarize opportunity pipeline and win probabilities
  - Draft proposals using Anthropic Claude API (already integrated)
  - Suggest next-best-actions for leads
- **Reporting:**
  - Answer natural-language queries ("What's our utilization this quarter?")
  - Generate on-demand PDF reports (employee performance, finance dashboards)
  - Proactively surface anomalies (low utilization, overdue receivables)

**Example task flow:**
1. Code analysis of approved time entries → 2. Rate engine lookup → 3. VAT determination → 4. Invoice draft generation → 5. Human review & approval

---

## 4. Context Engineering

**What information does the agent need to perform well?**

### Context Sources:
- **Source code:** 17 .NET modules, Next.js frontend, EF Core models
- **Database schemas:** 15 PostgreSQL schemas (org, identity, hr, engagement, billing, etc.)
- **Business rules:**
  - Rate hierarchy: member override → rate card → employee default
  - Gap-free invoice/credit note numbering (legal requirement)
  - Entity isolation (every query filtered by legal entity)
  - Financial amounts: decimal(18,2), hours: decimal(5,2)
  - All dates UTC, displayed Europe/Riga
- **Documentation:** CLAUDE.md, workflow.md, org-structure.md, integration guides
- **Logs / telemetry:** Audit log (append-only), sync logs (Horizon), notification history
- **Historical data:** Past timesheets, invoice history, approval patterns, WIP trends

### Key Questions & Strategies:
- **Task decomposition:** Break billing into rate lookup → WIP calc → VAT → draft → review
- **Plan > Execute > Reflect loops:** Draft invoice → validate against billing caps → flag issues → refine
- **Multi-agent collaboration:** Onboarding agent delegates to screening sub-agent and compliance sub-agent
- **Self-critique / validation:** Cross-check invoice totals against WIP; verify entity isolation on every query
- **Iterative refinement:** Learn from rejected invoices to improve future drafts

---

## 5. Memory Design

**What does the agent remember?**

### Short-term:
- **Conversation context:** Current user request, active project/entity context
- **Current task state:** Which step of a multi-step workflow is in progress
- **Session data:** Active legal entity, user role, service line permissions

### Persistent:
- **Vector database:** Embeddings of past invoices, time patterns, client profiles for similarity search
- **Knowledge graphs:** Entity relationships — which employees belong to which projects, rate card hierarchies, approval chains
- **Document stores:** Compliance form templates, proposal templates, PDF report templates
- **Structured storage:**
  - User preferences (default project, preferred time entry patterns)
  - Historical approval patterns (who approves what, typical turnaround)
  - Rate change history for trend analysis
  - Client risk profiles and screening results

---

## 6. Tooling & Integrations

**What tools can the agent use?**

- **Code repositories:** Lexora monorepo (GitHub) — .NET 8 backend + Next.js frontend
- **Database:** PostgreSQL (15 schemas) via EF Core — read for analytics, write for drafts
- **CI/CD pipelines:** GitHub Actions (planned)
- **External APIs:**
  - Microsoft Entra ID — authentication & user context
  - World-Check API — client screening
  - Verified.eu — KYC/background checks
  - Horizon API — finance system sync
  - Anthropic Claude API — proposal drafting (already integrated)
  - Guardian/Kingland DM — conflict of interest checks (planned)
- **Azure services:** Blob Storage (documents), Key Vault (secrets), App Service
- **PDF engine:** QuestPDF — invoice and report generation
- **Architecture modeling:** 17-module domain model with clear bounded contexts

> Agents become powerful when they can use tools autonomously — e.g., querying the rate engine, generating a PDF, triggering a screening.

> Agents become powerful when they use rule-based automation — e.g., VAT determination rules, billing cap enforcement, entity isolation filters.

---

## 7. Human Interaction Model

**When do humans intervene?**

- **Requirement validation:** Confirm invoice amounts and line items before finalization
- **Architecture approval:** Review any suggested changes to rate cards or billing rules
- **Edge case confirmation:**
  - Cross-entity time entries (employee billing to a different legal entity)
  - Non-standard VAT scenarios
  - Projects with complex pricing models (fixed-fee milestones, retainer drawdowns)
- **Business rule clarification:**
  - Write-up/write-down thresholds
  - Risk scoring factor adjustments
  - Compliance form field mappings for new regulation types

### Interaction types:
- **Review:** Agent presents draft invoice/timesheet → user reviews and approves/rejects
- **Feedback:** User corrects a rate or rejects an onboarding recommendation → agent learns
- **Prompt steering:** User specifies "generate invoice for Project X, Q1 only, exclude expenses"
- **Approval gates:**
  - Timesheet approval (PM level)
  - Invoice approval (Finance level)
  - Client acceptance (Partner level)
  - Write-off approval (CFO level)

---

## Central: Reasoning & Planning

### Typical Strategies:
- **Task decomposition:** Break complex workflows into atomic steps (e.g., invoice = rate lookup + time aggregation + VAT calc + PDF render)
- **Plan → Execute → Reflect cycle:**
  1. **Plan:** Identify all approved time entries for a project
  2. **Execute:** Apply rate engine, calculate totals, determine VAT
  3. **Reflect:** Validate against billing cap, check for anomalies
  4. **Refine:** Adjust based on validation results or user feedback

### Evaluation Testing:
- **Repeatable:** All financial calculations have 100% unit test coverage
- **Deterministic validation:** Invoice totals must match sum of line items; WIP must reconcile

### Architectural Patterns:
- **Goal → Plan → Execute → Reflect → Refine** (continuous loop)
- **Multi-agent collaboration:** Billing agent + Onboarding agent + Analytics agent coordinate through shared database state
- **Becoming autonomous:** Start with high human oversight, gradually reduce as confidence scores improve per task type
